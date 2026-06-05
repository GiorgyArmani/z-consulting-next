import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { renderInquiryEmail } from '../../../lib/email';

export const runtime = 'nodejs';

/** Basic shape of a project inquiry coming from the contact modal. */
interface Inquiry {
  name: string;
  email: string;
  company?: string;
  message: string;
  /** Honeypot — real users never fill this. */
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  let body: Inquiry;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: pretend success so bots move on.
  if (body.website) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const message = clean(body.message, 5000);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Missing or invalid fields.' }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error('contact: SMTP_USER / SMTP_PASS not configured');
    return NextResponse.json({ ok: false, error: 'Email is not configured.' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.hostinger.com',
    port: Number(SMTP_PORT) || 465,
    secure: (Number(SMTP_PORT) || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = CONTACT_TO || 'hello@zconsulting.tech';
  const lines = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    '',
    message,
  ].filter((l): l is string => l !== null);

  try {
    await transporter.sendMail({
      from: `"Z. Consulting Website" <${SMTP_USER}>`,
      to,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New project inquiry from ${name}${company ? ` (${company})` : ''}`,
      text: lines.join('\n'),
      html: renderInquiryEmail({ name, email, company, message }),
    });
  } catch (err) {
    console.error('contact: failed to send', err);
    return NextResponse.json({ ok: false, error: 'Failed to send. Please email us directly.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
