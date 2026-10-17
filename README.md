# Joseph Dayan, MD — Medical Expert Witness

An independent, attorney-focused website for Dr. Joseph Dayan, MD, FAAP. Designed as a **concise single-page presentation** of his clinical specialties, verified credentials, medical-legal services, and case inquiry form.

## Site structure

- `index.html` — primary website: expertise, services, biography, credentials, and attorney inquiry
- `privacy.html` — privacy notice and disclaimer
- `assets/` — responsive design, interactions, and favicon
- `functions/api/inquiry.js` — Cloudflare Pages Function for sending inquiries through Resend
- `about.html`, `expertise.html`, `services.html`, `contact.html` — compatibility redirects to the corresponding sections of the homepage

The website uses **static HTML, CSS, and JavaScript**, with no frontend framework or build process. An optional server-side Cloudflare Pages Function delivers contact emails.

## Deployment and contact form

Deploy this repository to Cloudflare Pages with no build command and the repository root (`.`) as the publish directory. Alternatively, deploy the static pages to any HTML-compatible host; the inquiry form will require an equivalent server-side `/api/inquiry` handler.

For inquiry delivery, Dr. Dayan should own a Resend account and a verified sending domain. Configure the following Cloudflare Pages environment variables:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Secret API key from Dr. Dayan's Resend account |
| `INQUIRY_TO_EMAIL` | Private inbox receiving new case inquiries |
| `INQUIRY_FROM_EMAIL` | Verified sending identity such as `Inquiries <contact@your-domain.com>` |

The form asks for basic professional information and explicitly prohibits confidential case materials or patient identifiers. It does **not** send any messages until the function and these variables are configured. It reports a clear error instead of claiming a submission was delivered. Test a nonconfidential inquiry and confirm receipt before public launch.

## Content review checklist

Before publishing:

1. Confirm with Dr. Dayan that **all advertised services**, including written opinions, depositions, and testimony, accurately reflect his intended consulting practice.
2. Obtain permission to use the University of Miami faculty portrait or replace it with an **approved professional headshot** that he owns or is licensed to publish. The current homepage displays the university-hosted faculty photo.
3. Confirm current board certifications, academic title, fellowship director role, and clinical scope. The [official University of Miami faculty biography](https://med.miami.edu/faculty/joseph-dayan-md-faap) and [Pediatric Anesthesiology Fellowship page](https://med.miami.edu/departments/anesthesiology/divisions/pediatric-anesthesiology/fellowship) provide reference information.
4. Set up a private business email/domain, verify the Resend sending identity, test the contact form, and add rate limiting or managed bot protection before significant public traffic.
5. Have the privacy notice and professional disclaimers reviewed to match actual business operations and hosting. Do not include institutional logos in a way that implies endorsement.
6. After domain selection, configure domain metadata, canonical URL, and any desired CV link once an approved CV is supplied.

The website is independent of the University of Miami and affiliated hospitals. Academic affiliations are cited as professional background only.
