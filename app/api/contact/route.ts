import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { renderConfirmationEmail, renderInquiryEmail } from '../../../lib/email';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Attachment limits — keep in sync with the hint copy in data.ts (form.attachHint). */
const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 15 * 1024 * 1024; // 15 MB across all files
const ALLOWED_EXT = new Set([
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
  'txt', 'csv', 'zip', 'png', 'jpg', 'jpeg', 'gif', 'webp',
]);

function clean(value: FormDataEntryValue | null, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function extOf(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : '';
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: pretend success so bots move on.
  if (clean(form.get('website'), 1)) return NextResponse.json({ ok: true });

  const name = clean(form.get('name'), 120);
  const email = clean(form.get('email'), 200);
  const company = clean(form.get('company'), 160);
  const message = clean(form.get('message'), 5000);
  const lang = clean(form.get('lang'), 2) === 'es' ? 'es' : 'en';

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Missing or invalid fields.' }, { status: 400 });
  }

  // Collect + validate uploaded files.
  const uploads = form.getAll('files').filter((f): f is File => f instanceof File && f.size > 0);
  if (uploads.length > MAX_FILES) {
    return NextResponse.json({ ok: false, error: `Up to ${MAX_FILES} files allowed.` }, { status: 400 });
  }

  let totalBytes = 0;
  const attachments: { filename: string; content: Buffer }[] = [];
  for (const file of uploads) {
    if (!ALLOWED_EXT.has(extOf(file.name))) {
      return NextResponse.json({ ok: false, error: `Unsupported file type: ${file.name}` }, { status: 400 });
    }
    totalBytes += file.size;
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json({ ok: false, error: 'Attachments exceed 15 MB.' }, { status: 400 });
    }
    attachments.push({
      filename: file.name.slice(0, 200),
      content: Buffer.from(await file.arrayBuffer()),
    });
  }
  const fileNames = attachments.map((a) => a.filename);

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
  const teamLines = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    company ? `Company: ${company}` : null,
    fileNames.length ? `Files:   ${fileNames.join(', ')}` : null,
    '',
    message,
  ].filter((l): l is string => l !== null);

  // 1) Notify the team. This is the critical send — fail the request if it errors.
  try {
    await transporter.sendMail({
      from: `"Z. Consulting Website" <${SMTP_USER}>`,
      to,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New project inquiry from ${name}${company ? ` (${company})` : ''}`,
      text: teamLines.join('\n'),
      html: renderInquiryEmail({ name, email, company, message, attachments: fileNames }),
      attachments,
    });
  } catch (err) {
    console.error('contact: failed to send team notification', err);
    return NextResponse.json({ ok: false, error: 'Failed to send. Please email us directly.' }, { status: 502 });
  }

  // 2) Auto-reply to the visitor confirming a proposal is coming.
  //    Best-effort — the inquiry already reached us, so don't fail on this.
  try {
    const confirm = renderConfirmationEmail({ name, lang, attachments: fileNames });
    await transporter.sendMail({
      from: `"Z. Consulting" <${SMTP_USER}>`,
      to: `"${name.replace(/"/g, '')}" <${email}>`,
      replyTo: to,
      subject: confirm.subject,
      text: confirm.text,
      html: confirm.html,
    });
  } catch (err) {
    console.error('contact: failed to send visitor confirmation', err);
  }

  return NextResponse.json({ ok: true });
}
