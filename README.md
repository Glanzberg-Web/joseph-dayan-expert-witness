# Joseph Dayan, MD — Medical Consulting Website

A static website for Dr. Joseph Dayan, MD, FAAP, with a temporary work-in-progress homepage while the full site is under review.

## Current arrangement

- **`/`** — temporary public-facing **Work in Progress** page (`index.html`)
- **`/joey/`** — full working website (`joey/index.html`)
- **`/joey/privacy.html`** — privacy notice for the full website
- **`/joey/assets/`** — stylesheet, JavaScript, and favicon for the full website
- Legacy page URLs (`/about.html`, `/expertise.html`, `/services.html`, `/contact.html`, and `/privacy.html`) redirect to their updated locations under `/joey/`.

The public landing page intentionally has no navigation to `/joey/`. The preview can be opened directly by someone who knows that path; **it is not password-protected**. The main and preview pages request no search indexing, but a URL with noindex is not private or access-restricted.

## Deployment

Plain HTML, CSS, and JavaScript: no build command or runtime required. On a static host that serves folder `index.html` files, the website will resolve at `/joey/`. Publish the repository root as the site root (for Cloudflare Pages, publish directory `.` and no build command).

Do not set `/joey` as the publish directory; doing so would replace the temporary public homepage with the working website. If the host requires an explicit index URL, use `/joey/index.html`.

The Work in Progress page provides direct contact links:
- Email: [josephdayan@gmail.com](mailto:josephdayan@gmail.com)
- WhatsApp: [wa.me/17325704002](https://wa.me/17325704002)

No form service or Resend account is required. Direct email and WhatsApp links remain present on the preview site. Do not send privileged materials or patient information using general contact links.

## Before final publication

Confirm the biography, academic title, certifications, consulting services, and rights to use the University of Miami-hosted professional portrait. Approve the privacy notice and set a domain and canonical URL once the website is ready. Academic affiliations do not imply institutional endorsement.

Source: [University of Miami faculty profile](https://med.miami.edu/faculty/joseph-dayan-md-faap).
