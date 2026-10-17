# Joseph Dayan, MD — Medical Expert Witness

An independent professional website presenting Dr. Joseph Dayan's verified clinical background and medical-legal consulting focus. The website is intended for attorneys seeking specialist medical expertise, not patients seeking medical treatment.

## Website

The site is built in **plain HTML, CSS, and JavaScript**. There is no Node.js production runtime, package manager, database, or build process required to serve the pages.

- Home — `index.html`
- Areas of Expertise — `expertise.html`
- Services — `services.html`
- About Dr. Dayan — `about.html`
- Attorney Inquiries — `contact.html`
- Privacy Notice — `privacy.html`
- Styling and interactions — `assets/`
- Optional server-side inquiry endpoint — `functions/api/inquiry.js` (Cloudflare Pages Function)

All pages are responsive, keyboard-navigable, and include mobile navigation. The inquiry page explicitly discourages sharing protected health information, privileged case materials, or patient identifiers.

## Deployment

This project works as an ordinary static website on any host. To enable online attorney inquiries, deploy with **Cloudflare Pages**, which supports the included `functions/api/inquiry.js` without a traditional server.

For Cloudflare Pages, connect this repository, use `main` as the production branch, do not specify a build command, and use the repository root (`.`) as the output directory. Pages Functions in `functions/` will be deployed with the site.

### Inquiry form setup

Joseph should **own and control the Resend account** and the verified sending domain. Set these environment variables in Cloudflare Pages (Settings → Variables and Secrets):

| Name | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes (secret) | Server-side Resend API key |
| `INQUIRY_TO_EMAIL` | Yes | Private recipient address for attorney inquiries |
| `INQUIRY_FROM_EMAIL` | Yes | A sending identity on a domain verified in Resend (e.g. `Inquiries <contact@your-domain.com>`) |

The API key is used **only server-side**, never exposed in frontend files. After configuring the environment variables, redeploy the site and test with a nonconfidential sample inquiry, checking both successful delivery and the response message. Configure domain authentication (SPF/DKIM) as instructed by Resend.

The contact form intentionally **does not send emails** until the required settings are installed. On a static host without the Cloudflare Pages function, it reports that delivery is not enabled; it will not falsely claim a message has been delivered. If a different host is preferred, recreate the `/api/inquiry` endpoint server-side with the same JSON contract and secure environment variables.

### Security and intake

The included endpoint checks request origin, validates required fields and allowed values, caps payload size, and includes a basic honeypot. It transmits business contact details using Resend; it is **not** a secure patient record transfer system. For a public launch, consider adding rate limiting and a managed bot-control mechanism through the hosting provider. Never request or collect case files or protected health information on the public form.

## Items to confirm before publication

1. **Headshot rights and hosting.** The current draft displays a public faculty headshot hosted by the University of Miami. Obtain Dr. Dayan's permission and confirm use rights, ideally replacing the external URL with a locally hosted, authorized photograph. The site does not use university logos.
2. **Consulting services.** Ask Dr. Dayan to approve the practice areas, service descriptions, and whether reports, deposition work, and courtroom testimony should be advertised. The site makes no claims about previous expert testimony or cases.
3. **Contact delivery.** Confirm a private consulting email address/domain and configure the Resend settings described above. Do not substitute a faculty or hospital inbox without explicit approval.
4. **Personal credentials.** Recheck current certifications, titles, affiliations, and training with Dr. Dayan and verify against his most recent CV. No downloadable CV is published because none was provided.
5. **Privacy and legal review.** Have the privacy notice, professional disclaimer, and engagement language reviewed before going live. Update the notice to reflect the final hosting provider, any tracking scripts, business contact details, and actual retention practices.
6. **Domain and discoverability.** When the domain is assigned, add the canonical URL and site-specific social preview information and consider a sitemap. Test mobile layouts and complete a live inquiry delivery test.

## Background verification sources

- [University of Miami — Joseph Dayan faculty profile](https://med.miami.edu/faculty/joseph-dayan-md-faap)
- [University of Miami — Pediatric Anesthesiology Fellowship](https://med.miami.edu/departments/anesthesiology/divisions/pediatric-anesthesiology/fellowship)
- [Jackson Health — Joseph Dayan physician profile](https://jacksonhealth.org/find-a-doctor/joseph-e-dayan/)

The website is independent from the University of Miami, Jackson Health System, and affiliated clinical institutions; factual professional affiliations do not mean those organizations sponsor or endorse the consulting business.
