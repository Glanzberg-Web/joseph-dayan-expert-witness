(() => {
  'use strict';
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('#mobile-nav');
  if (toggle && menu) {
    const close = () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    };
    toggle.addEventListener('click', () => {
      const shouldOpen = menu.hidden;
      menu.hidden = !shouldOpen;
      toggle.setAttribute('aria-expanded', String(shouldOpen));
      toggle.setAttribute('aria-label', shouldOpen ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  const form = document.querySelector('[data-inquiry-form]');
  if (!form) return;
  const submit = form.querySelector('[data-submit]');
  const status = form.querySelector('[data-form-status]');
  const originalText = submit.innerHTML;
  const show = (state, message) => {
    status.dataset.state = state;
    status.textContent = message;
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    if (fields.get('consent') !== 'yes') {
      show('error', 'Please acknowledge the confidentiality notice.');
      return;
    }
    const data = Object.fromEntries(fields.entries());
    submit.disabled = true;
    submit.textContent = 'Submitting…';
    delete status.dataset.state;
    status.textContent = '';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result && result.ok) {
        show('success', 'Thank you. Your inquiry has been submitted.');
        form.reset();
      } else if (response.status === 503 || response.status === 404 || !result) {
        show('info', 'Online submissions have not yet been activated. No inquiry was delivered.');
      } else {
        show('error', (result && result.message) || 'We could not submit your inquiry. No delivery was confirmed.');
      }
    } catch {
      show('error', 'We could not submit your inquiry. No delivery was confirmed. Please try again later.');
    } finally {
      clearTimeout(timeout);
      submit.disabled = false;
      submit.innerHTML = originalText;
    }
  });
})();