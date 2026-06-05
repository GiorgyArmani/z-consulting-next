/**
 * Branded HTML for the project-inquiry notification email.
 *
 * Email clients ignore stylesheets, so everything is table-based with inline
 * styles. Colors mirror the site tokens in globals.css (paper / ink / rust
 * accent). User-supplied values are HTML-escaped before interpolation.
 */

interface InquiryEmail {
  name: string;
  email: string;
  company?: string;
  message: string;
}

/* Brand tokens — keep in sync with :root in app/globals.css */
const C = {
  paper: '#F4EFE7',
  paper2: '#EAE2D4',
  card: '#FBF8F2',
  ink: '#1A1714',
  ink2: '#615a50',
  ink3: '#8d8579',
  line: '#DED5C6',
  accent: '#CB4E22',
  onAccent: '#FCF7EF',
};

const DISPLAY = "'Space Grotesk',Arial,Helvetica,sans-serif";
const TEXT = "'Manrope',-apple-system,'Segoe UI',Arial,Helvetica,sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escape, then preserve user line breaks. */
function nl2br(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br />');
}

function fieldRow(label: string, valueHtml: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${C.line};font-family:${TEXT};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.ink3};width:96px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid ${C.line};font-family:${TEXT};font-size:15px;color:${C.ink};vertical-align:top;">${valueHtml}</td>
    </tr>`;
}

export function renderInquiryEmail({ name, email, company, message }: InquiryEmail): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const preheader = escapeHtml(`${name}${company ? ` (${company})` : ''}: ${message.slice(0, 90)}`);

  const rows = [
    fieldRow('Name', safeName),
    fieldRow('Email', `<a href="mailto:${safeEmail}" style="color:${C.accent};font-weight:600;text-decoration:none;">${safeEmail}</a>`),
    company ? fieldRow('Company', escapeHtml(company)) : '',
  ].join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New project inquiry</title>
</head>
<body style="margin:0;padding:0;background:${C.paper};">
  <!-- Preheader: shows in the inbox preview, hidden in the body -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Brand header -->
          <tr>
            <td style="padding:0 6px 18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="36" height="36" align="center" valign="middle" style="background:${C.ink};border-radius:9px;font-family:${DISPLAY};font-weight:700;font-size:16px;color:${C.onAccent};line-height:36px;">Z.</td>
                  <td style="padding-left:12px;font-family:${DISPLAY};font-weight:600;font-size:18px;letter-spacing:-0.3px;color:${C.ink};">Z<span style="color:${C.accent};">.</span> Consulting</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:${C.card};border:1px solid ${C.line};border-radius:14px;padding:34px 36px;">

              <!-- Eyebrow -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="26" style="padding-right:10px;"><div style="width:26px;height:2px;background:${C.accent};font-size:0;line-height:0;">&nbsp;</div></td>
                  <td style="font-family:${TEXT};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.accent};">New project inquiry</td>
                </tr>
              </table>

              <h1 style="margin:16px 0 24px;font-family:${DISPLAY};font-weight:600;font-size:26px;line-height:1.1;letter-spacing:-0.5px;color:${C.ink};">${safeName} wants to build something.</h1>

              <!-- Fields -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">
                ${rows}
              </table>

              <!-- Message -->
              <p style="margin:26px 0 10px;font-family:${TEXT};font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.ink3};">Project details</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:${C.paper2};border-left:3px solid ${C.accent};border-radius:0 10px 10px 0;padding:18px 20px;font-family:${TEXT};font-size:15px;line-height:1.65;color:${C.ink};">${nl2br(message)}</td>
                </tr>
              </table>

              <!-- Reply CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
                <tr>
                  <td style="background:${C.ink};border-radius:12px;">
                    <a href="mailto:${safeEmail}" style="display:inline-block;padding:13px 24px;font-family:${TEXT};font-weight:600;font-size:14px;color:${C.onAccent};text-decoration:none;">Reply to ${safeName} &rarr;</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:22px 6px 0;font-family:${TEXT};font-size:12px;line-height:1.6;color:${C.ink3};">
              Sent by the contact form at <a href="https://zconsulting.tech" style="color:${C.ink2};text-decoration:none;font-weight:600;">zconsulting.tech</a> &middot; replying goes straight to ${safeName}.<br />
              Solutions from the A to the Z.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
