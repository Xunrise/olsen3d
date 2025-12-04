import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Rate limiting store (in-memory, resets on deployment)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 requests per window

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

// Input validation
function validateInput(data: ContactFormData): { valid: boolean; error?: string } {
  const { name, email, subject, message, honeypot } = data;

  // Honeypot check (if filled, it's a bot)
  if (honeypot) {
    return { valid: false, error: 'Invalid submission' };
  }

  // Required fields
  if (!name || !email || !subject || !message) {
    return { valid: false, error: 'All fields are required' };
  }

  // Length validation
  if (name.length > 100 || subject.length > 200 || message.length > 5000) {
    return { valid: false, error: 'Input too long' };
  }

  // Email validation (basic)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email address' };
  }

  // Prevent email header injection
  const headerInjectionRegex = /[\r\n]/;
  if (
    headerInjectionRegex.test(name) ||
    headerInjectionRegex.test(email) ||
    headerInjectionRegex.test(subject)
  ) {
    return { valid: false, error: 'Invalid characters detected' };
  }

  return { valid: true };
}

// Sanitize input (prevent XSS in email)
function sanitize(str: string): string {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

// Simple rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);

  if (!userLimit) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Reset if window expired
  if (now - userLimit.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Increment if within window
  if (userLimit.count < RATE_LIMIT_MAX) {
    userLimit.count++;
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    const data: ContactFormData = await request.json();

    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = data;

    // Sanitize inputs
    const safeName = sanitize(name);
    const safeSubject = sanitize(subject);
    const safeMessage = sanitize(message);

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    // Email options
    const mailOptions = {
      from: `"Olsen3D Kontaktskjema" <post@olsen3d.no>`, // Sender's email as From
      to: process.env.MAIL_TO || 'mail@olsen3d.no',
      replyTo: email, // Enable easy reply
      subject: `Kontaktskjema: ${safeSubject}`,
      text: `
Navn: ${safeName}
E-post: ${email}
Emne: ${safeSubject}

Melding:
${safeMessage}

---
Sendt fra kontaktskjema på olsen3d.no
      `,
      html: `
<h2>Ny melding fra kontaktskjema</h2>
<p><strong>Navn:</strong> ${safeName}</p>
<p><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
<p><strong>Emne:</strong> ${safeSubject}</p>
<h3>Melding:</h3>
<p>${safeMessage.replace(/\n/g, '<br>')}</p>
<hr>
<p style="color: #666; font-size: 12px;">Sendt fra kontaktskjema på olsen3d.no</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS (if needed)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
