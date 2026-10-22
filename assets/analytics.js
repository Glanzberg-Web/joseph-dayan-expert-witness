// Cloudflare Web Analytics — privacy-first aggregate visitor and referrer statistics.
// Site owner action: obtain the public beacon token in Cloudflare > Web Analytics > Add a site.
// Replace the empty string below with the token for drjosephdayan.com.
// This script deliberately does nothing until a valid token is configured.
// Do NOT add Google Analytics, advertising pixels, or client identifiers.
(() => {
  'use strict';
  const siteToken = '';
  if (!/^[a-f0-9]{32}$/i.test(siteToken)) return;
  if (!/^(?:www\.)?drjosephdayan\.com$/i.test(window.location.hostname)) return;
  const beacon = document.createElement('script');
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.setAttribute('data-cf-beacon', JSON.stringify({ token: siteToken }));
  document.head.appendChild(beacon);
})();
