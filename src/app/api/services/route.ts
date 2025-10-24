import { NextResponse } from 'next/server';
import { getAllServices } from '@/lib/mdx';

export async function GET() {
  const services = getAllServices();
  return NextResponse.json(services);
}
