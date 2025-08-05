import Link from "next/link";
import "./Services.css";

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Professional solutions tailored to your needs, from hands-on work to
            comprehensive learning experiences.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3 className="service-title">Professional Work</h3>
            <p className="service-description">
              Ready-to-deliver solutions for your project needs. We handle the
              technical complexity so you can focus on your vision.
            </p>
            <ul className="service-features">
              <li>Custom 3D Design & Modeling</li>
              <li>High-Quality 3D Printing</li>
              <li>Complete IT System Builds</li>
              <li>Hardware Setup & Configuration</li>
            </ul>
            <Link href="/portfolio" className="service-link" prefetch={true}>
              View Our Work <span>→</span>
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon">💡</div>
            <h3 className="service-title">Expert Guidance</h3>
            <p className="service-description">
              Get personalized advice and direction for your projects. Perfect
              when you want to learn while getting professional insight.
            </p>
            <ul className="service-features">
              <li>Project Planning & Strategy</li>
              <li>Technology Recommendations</li>
              <li>Troubleshooting Support</li>
              <li>Best Practices Consultation</li>
            </ul>
            <a href="/guidance" className="service-link">
              Get Guidance <span>→</span>
            </a>
          </div>

          <div className="service-card">
            <div className="service-icon">🎓</div>
            <h3 className="service-title">Learning Courses</h3>
            <p className="service-description">
              Comprehensive courses designed to take you from beginner to
              confident practitioner in 3D design, printing, and IT systems.
            </p>
            <ul className="service-features">
              <li>Beginner-Friendly 3D Modeling</li>
              <li>3D Printing Fundamentals</li>
              <li>PC Building & IT Basics</li>
              <li>Hands-On Project Experience</li>
            </ul>
            <a href="/courses" className="service-link">
              Browse Courses <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
