(() => {
  'use strict';
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

  const toggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('#mobile-nav');
  if (toggle && mobileNav) {
    const close = () => { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); mobileNav.hidden = true; };
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      mobileNav.hidden = expanded;
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('motion-ready');
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.07, rootMargin: '0px 0px 30px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const form = document.querySelector('[data-inquiry-form]');
  if (!form) return;
  const submit = form.querySelector('[data-submit]');
  const status = form.querySelector('[data-form-status]');
  const initialLabel = submit.innerHTML;
  const notice = (state, message) => {
    status.dataset.state = state;
    status.textContent = message;
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    if (fields.get('consent') !== 'yes') {
      notice('error', 'Please confirm that you will not share confidential case information.');
      return;
    }
    const data = Object.fromEntries(fields.entries());
    submit.disabled = true;
    submit.textContent = 'Sending inquiry…';
    status.removeAttribute('data-state');
    status.textContent = '';

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (response.ok && result && result.ok) {
        notice('success', 'Thank you. Your inquiry has been submitted. If follow-up is appropriate, you will receive a response using the contact information supplied.');
        form.reset();
      } else if (response.status === 503 || response.status === 404 || !result) {
        notice('info', 'Online inquiry delivery has not been activated yet. No message was sent. Please try again once business email setup is complete.');
      } else {
        notice('error', (result && result.message) || 'We could not submit this inquiry. No message was confirmed as delivered. Please try again later.');
      }
    } catch (error) {
      notice('error', 'The inquiry could not be submitted. No delivery was confirmed. Please check your connection and try again later.');
    } finally {
      window.clearTimeout(timeout);
      submit.disabled = false;
      submit.innerHTML = initialLabel;
    }
  });
})();