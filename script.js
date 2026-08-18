/*
  TIME TO POTTY — site interactivity

  NOTE: The email signup below is FRONT-END ONLY. There is no email service
  connected yet. Before launch, connect the signup form to a real ESP
  (e.g. Mailchimp, Klaviyo, Formspree) so pre-launch signups are actually
  captured — this list is the single most valuable thing you can build
  before the campaign goes live.

  The shopping cart was removed. The site now points at Kickstarter, since
  rewards do not ship until February 2027. To restore a store later, re-add
  the cart markup and wire it to a real checkout (Shopify, Stripe Checkout).
*/

document.addEventListener('DOMContentLoaded', () => {
  // Populate data-driven fields from PRODUCT_DATA
  if (typeof PRODUCT_DATA !== 'undefined') {
    document.querySelectorAll('[data-field]').forEach(el => {
      const path = el.getAttribute('data-field').split('.');
      let val = PRODUCT_DATA;
      for (const key of path) { val = val ? val[key] : undefined; }
      if (val !== undefined && val !== null) {
        if (el.tagName === 'INPUT') el.value = val;
        else el.textContent = val;
      }
    });

    document.querySelectorAll('[data-price]').forEach(el => {
      el.textContent = '$' + PRODUCT_DATA.price.toFixed(2);
    });

    // Kickstarter links + pre-launch state
    const ks = PRODUCT_DATA.kickstarter || {};
    const ksLinks = document.querySelectorAll('[data-ks-link]');
    const ksNote = document.getElementById('ksLiveNote');

    ksLinks.forEach(el => {
      if (ks.isLive && ks.url) {
        // Campaign is live: send people straight to Kickstarter.
        el.setAttribute('href', ks.url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      } else {
        // Campaign is NOT live yet. An unlaunched Kickstarter project URL
        // bounces logged-out visitors to a login screen, so never link out
        // here. Send them to the reserve form on this page instead.
        el.textContent = 'Get Notified When We Launch';
        el.setAttribute('href', '#reserveBlock');
        el.removeAttribute('target');
        el.removeAttribute('rel');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          const block = document.getElementById('reserveBlock');
          const name = document.getElementById('reserveName');
          if (block) block.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (name) setTimeout(() => name.focus({ preventScroll: true }), 450);
        });
      }
    });

    if (ksNote && ks.isLive) ksNote.style.display = 'none';
  }

  // Mobile nav toggle
  const toggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Email signup — FRONT-END ONLY, not yet connected to a real ESP
  function wireSignupForm(formId, noteId) {
    const form = document.getElementById(formId);
    const note = document.getElementById(noteId);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      if (note) note.style.display = 'block';
    });
  }
  wireSignupForm('footerSignupForm', 'footerSignupNote');

  // Retail reservations. No payment is taken — this records intent only.
  // If reserve.endpoint is set we POST to it. If not, we fall back to opening
  // the visitor's email client so a reservation is never silently discarded.
  (function wireReserve(){
    const cfg = (typeof PRODUCT_DATA !== 'undefined' && PRODUCT_DATA.reserve) || null;
    const block = document.getElementById('reserveBlock');
    const form = document.getElementById('reserveForm');
    const thanks = document.getElementById('reserveThanks');
    if (!block || !form) return;
    if (!cfg || !cfg.enabled) { block.style.display = 'none'; return; }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const qty = form.quantity.value;
      if (!name || !email || !email.includes('@')) {
        form.reportValidity();
        return;
      }
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      btn.textContent = 'Reserving…';

      let ok = false;
      if (cfg.endpoint) {
        try {
          const res = await fetch(cfg.endpoint, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            // Kit expects `email_address` plus a `fields` object. Sending
            // {name, email} instead would be rejected outright.
            body: JSON.stringify({
              email_address: email,
              fields: {
                first_name: name,
                quantity: qty,
                source: 'timetopotty.com reserve'
              }
            })
          });
          ok = res.ok;
        } catch (err) { ok = false; }
      }

      if (!ok) {
        // No endpoint configured, or the POST failed — hand off to email so the
        // reservation still reaches a human.
        const to = cfg.fallbackEmail || '';
        const subject = encodeURIComponent('Time to Potty reservation');
        const body = encodeURIComponent(
          'Name: ' + name + '\nEmail: ' + email + '\nQuantity: ' + qty +
          '\n\nPlease reserve me a Time to Potty Music Button.'
        );
        window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
      }

      form.style.display = 'none';
      if (thanks) thanks.style.display = 'block';
    });
  })();
});


// Interactive "press to preview" demo button on the product photo.
// Plays a short synthesized jingle (not the actual product audio) with the Web Audio API.
document.addEventListener('DOMContentLoaded', () => {
  const pressBtn = document.getElementById('press-demo-btn');
  if (!pressBtn) return;
  let audioCtx;
  function playPreviewJingle() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioCtx = audioCtx || new Ctx();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const noteDur = 0.18;
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const start = now + i * noteDur;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + noteDur);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(start);
      osc.stop(start + noteDur + 0.03);
    });
  }
  function triggerPress() {
    pressBtn.classList.add('is-pressed');
    setTimeout(() => pressBtn.classList.remove('is-pressed'), 160);
    playPreviewJingle();
  }
  pressBtn.addEventListener('click', triggerPress);
});
