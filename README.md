# Joseph Dayan, MD — Medical-Legal Consulting

Client-facing static site for Dr. Joseph Dayan, MD, FAAP, available at **https://drjosephdayan.com/**.

## Launch configuration

- **`/`** is now the complete public website; the temporary Work in Progress page has been replaced.
- **`/privacy.html`** contains the privacy notice, which is intentionally excluded from search indexing.
- **`/joey/`** and **`/joey/privacy.html`** forward to the new root URLs for anyone using older preview links.
- Legacy `/about.html`, `/expertise.html`, `/services.html` and `/contact.html` URLs forward to their corresponding homepage sections.
- The root **`CNAME`** file remains `drjosephdayan.com`; preserve it while hosting on GitHub Pages.
- Static HTML, CSS, and JavaScript, with no build command or server-side form.
- The primary photo is `assets/joseph-dayan-primary-2026.webp` and the branded 1200 × 630 social preview is `assets/social-preview.jpg`.

### Search setup

The root homepage is indexable and includes its canonical URL, title, meta description, Open Graph and Twitter image metadata, and JSON-LD Person structured data. `robots.txt` points search engines to `/sitemap.xml`, which includes only the public homepage.

After confirming the live deployment, add **drjosephdayan.com** to [Google Search Console](https://search.google.com/search-console/about), verify domain ownership, submit `https://drjosephdayan.com/sitemap.xml`, and request a crawl of the homepage. Search indexing can take time and is not guaranteed.

Domain handling: set the HTTPS/custom-domain options in your actual hosting provider. GitHub Pages does not support arbitrary 301 redirect rules in this repository; the old-page redirects use immediate HTML refresh plus JavaScript fallback. If the site is moved to a host supporting server-side redirects, replace these with HTTP 301 rules. Check that `www` directs to the chosen non-`www` canonical domain, rather than serving duplicate indexed content.

### Privacy-conscious visitor analytics

The website includes `assets/analytics.js`, prepared for **Cloudflare Web Analytics**. This service offers aggregate traffic, referral and performance analytics without advertising cookies, even when the website is hosted outside Cloudflare.

**One account-level action is still required before analytics records traffic:**

1. Have Dr. Dayan or the website owner create or access a [Cloudflare account](https://dash.cloudflare.com/).
2. Under **Web Analytics**, add `drjosephdayan.com` and copy the beacon token from the installation snippet.
3. Replace the empty `siteToken = ''` value in `assets/analytics.js` with the 32-character public token and publish the change. It is not an API secret.
4. Open the live site and confirm page views, visitors and referring domains appear in the Cloudflare dashboard.

If the production site is deployed through Cloudflare Pages with its own Web Analytics automatic injection enabled, use that option *instead* of configuring a second manual beacon to avoid double counting. Analytics isn't yet active while the token is empty. The privacy notice includes a conditional disclosure about analytics.

### Consulting and contact

- Email: [JDayan@med.miami.edu](mailto:JDayan@med.miami.edu)
- WhatsApp: [wa.me/17325704002](https://wa.me/17325704002)
- Phone: [+1 (732) 570-4002](tel:+17325704002)
- Case review: [Google Form](https://forms.gle/VSAVzxjfs5dsTmnk8)
- [UM Faculty Profile](https://med.miami.edu/faculty/joseph-dayan-md-faap)
- [LinkedIn](https://www.linkedin.com/in/joseph-dayan-md-79019a79)

Never submit patient records, privileged case materials, or confidential identifiers through general contact methods. Confirm the privacy notice and business practices as needed.

Academic affiliations do not imply institutional endorsement. The university U mark and UHealth lettering on the portrait should only be published with the appropriate authorization.
