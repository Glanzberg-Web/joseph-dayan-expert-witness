// Cloudflare Pages Function - POST /api/inquiry
// Requires RESEND_API_KEY, INQUIRY_TO_EMAIL and INQUIRY_FROM_EMAIL as server-side variables.
const reply = (code, data) => new Response(JSON.stringify(data), {
  status: code, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
});
const clean = (v, max) => typeof v === 'string' ? v.replace(/[\r\n\t]/g, ' ').trim().slice(0, max) : '';
const specialties = ['Pediatric Cardiac Anesthesiology', 'Pediatric Anesthesiology', 'Pediatric Critical Care', 'Multiple / Unsure'];

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return reply(403, {ok:false, message:'Unable to accept this request.'});
  if (!(request.headers.get('content-type') || '').toLowerCase().includes('application/json')) return reply(415, {ok:false, message:'Unsupported request format.'});
  if (Number(request.headers.get('content-length') || 0) > 9000) return reply(413, {ok:false, message:'Inquiry is too long.'});

  let input;
  try {
    const body = await request.text();
    if (body.length > 9000) return reply(413, {ok:false, message:'Inquiry is too long.'});
    input = JSON.parse(body);
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid body');
  } catch {
    return reply(400, {ok:false, message:'Invalid inquiry.'});
  }

  if (clean(input.website, 100)) return reply(200, {ok:true}); // honeypot
  const name = clean(input.fullName, 160);
  const firm = clean(input.firm, 150);
  const email = clean(input.email, 190).toLowerCase();
  const phone = clean(input.phone, 45);
  const specialty = clean(input.specialty, 90);
  const message = typeof input.message === 'string' ? input.message.trim().slice(0, 1200).replace(/[\u0000-\u001f\u007f]/g, ' ') : '';

  if (!name || !firm || !email || input.consent !== 'yes' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !specialties.includes(specialty)) {
    return reply(400, {ok:false, message:'Please complete all required fields.'});
  }
  if (!env.RESEND_API_KEY || !env.INQUIRY_FROM_EMAIL || !env.INQUIRY_TO_EMAIL) {
    return reply(503, {ok:false, message:'Online inquiries are not configured yet.'});
  }

  const summary = [
    'Medical expert witness inquiry',
    '',
    'Name: ' + name,
    'Firm / organization: ' + firm,
    'Email: ' + email,
    'Phone: ' + (phone || 'Not provided'),
    'Area of inquiry: ' + specialty,
    '',
    'General nonconfidential description:',
    message || 'Not provided',
    '',
    'Sender acknowledged the no-confidential-information warning.',
    'A submission does not establish an engagement.'
  ].join('\n');

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{'Authorization':'Bearer ' + env.RESEND_API_KEY, 'Content-Type':'application/json'},
      body:JSON.stringify({
        from:env.INQUIRY_FROM_EMAIL,
        to:[env.INQUIRY_TO_EMAIL],
        reply_to:email,
        subject:'New expert witness case inquiry',
        text:summary
      })
    });
    if (!result.ok) return reply(502, {ok:false, message:'Inquiry delivery was unsuccessful. Please try again later.'});
    return reply(200, {ok:true});
  } catch {
    return reply(502, {ok:false, message:'The inquiry service is temporarily unavailable.'});
  }
}
export function onRequestGet() { return reply(405, {ok:false, message:'Method not allowed.'}); }