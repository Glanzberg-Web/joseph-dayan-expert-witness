// Cloudflare Pages Function: POST /api/inquiry
// The site remains static. This endpoint is activated only when Resend secrets are configured.
// Never put RESEND_API_KEY or recipient email into browser-side JavaScript.
const respond = (status, payload) => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
});

const safe = (value, length = 150) =>
  typeof value === 'string' ? value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, length) : '';

const choices = {
  specialty: ['Pediatric Cardiac Anesthesiology', 'Pediatric Anesthesiology', 'Pediatric Critical Care', 'Multiple / Unsure'],
  timeline: ['', 'Within 2 weeks', 'Within 1 month', '1–3 months', 'Flexible / Unsure']
};

export async function onRequestPost({ request, env }) {
  // Ignore cross-origin form submissions.
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) {
    return respond(403, { ok: false, message: 'Unable to accept this request.' });
  }
  if (!(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) {
    return respond(415, { ok: false, message: 'Unsupported request format.' });
  }
  const length = Number(request.headers.get('content-length') || 0);
  if (length > 9000) return respond(413, { ok: false, message: 'Inquiry is too long.' });

  let payload;
  try {
    const body = await request.text();
    if (body.length > 9000) return respond(413, { ok: false, message: 'Inquiry is too long.' });
    payload = JSON.parse(body);
    if (!payload || Array.isArray(payload) || typeof payload !== 'object') throw Error('Invalid');
  } catch {
    return respond(400, { ok: false, message: 'The request could not be read.' });
  }

  // Honeypot: do not reveal rejection to bots.
  if (safe(payload.website)) return respond(200, { ok: true });

  const firstName = safe(payload.firstName, 80);
  const lastName = safe(payload.lastName, 80);
  const firm = safe(payload.firm, 150);
  const email = safe(payload.email, 190).toLowerCase();
  const phone = safe(payload.phone, 45);
  const specialty = safe(payload.specialty, 90);
  const timeline = safe(payload.timeline, 40);
  const message = typeof payload.message === 'string' ? payload.message.trim().slice(0, 1200) : '';
  const consent = payload.consent === 'yes';
  if (!firstName || !lastName || !firm || !email || !consent ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !choices.specialty.includes(specialty) || !choices.timeline.includes(timeline)) {
    return respond(400, { ok: false, message: 'Please check all required fields and try again.' });
  }

  if (!env.RESEND_API_KEY || !env.INQUIRY_TO_EMAIL || !env.INQUIRY_FROM_EMAIL) {
    return respond(503, { ok: false, message: 'Online inquiries are not configured yet.' });
  }

  const summary = [
    'New attorney inquiry via joseph-dayan-expert-witness website',
    '',
    'First name: ' + firstName,
    'Last name: ' + lastName,
    'Organization: ' + firm,
    'Professional email: ' + email,
    'Phone: ' + (phone || 'Not provided'),
    'Area of inquiry: ' + specialty,
    'Timeline: ' + (timeline || 'Not provided'),
    '',
    'Nonconfidential inquiry description:',
    message.replace(/[\u0000-\u001f\u007f]/g, ' ').slice(0, 1200) || 'Not provided',
    '',
    'Requesting counsel confirmed the nonconfidential-submission warning.',
    'This form does not establish a professional engagement.'
  ].join('\n');

  try {
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.INQUIRY_FROM_EMAIL,
        to: [env.INQUIRY_TO_EMAIL],
        reply_to: email,
        subject: 'New medical expert witness inquiry',
        text: summary
      })
    });
    if (!sent.ok) return respond(502, { ok: false, message: 'The inquiry could not be delivered. Please try again later.' });
    return respond(200, { ok: true });
  } catch {
    return respond(502, { ok: false, message: 'The inquiry service is temporarily unavailable.' });
  }
}

export function onRequestGet() {
  return respond(405, { ok: false, message: 'Method not allowed.' });
}