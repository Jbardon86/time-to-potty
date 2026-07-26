/*
  TIME TO POTTY — site interactivity
  NOTE: The cart and email signup below are FRONT-END ONLY.
  There is no payment processor or email service connected yet.
  Before launch, wire "Add to Cart" / checkout to a real commerce
  platform (e.g. Shopify, Stripe Checkout) and connect the email
  signup forms to a real ESP (e.g. Mailchimp, Klaviyo, Formspree).
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
    const priceEls = document.querySelectorAll('[data-price]');
    priceEls.forEach(el => { el.textContent = '$' + PRODUCT_DATA.price.toFixed(2); });
  }

  // Mobile nav toggle
  const toggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  // Cart state (front-end only, persisted locally for demo purposes)
  const cartCountEls = document.querySelectorAll('.cart-count');
  function getCartCount() { return parseInt(localStorage.getItem('ttp_cart_count') || '0', 10); }
  function setCartCount(n) {
    localStorage.setItem('ttp_cart_count', String(n));
    cartCountEls.forEach(el => el.textContent = n);
  }
  setCartCount(getCartCount());

  // Quantity selector
  const qtyInput = document.getElementById('qtyInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  if (qtyInput && qtyMinus && qtyPlus) {
    qtyMinus.addEventListener('click', () => {
      qtyInput.value = Math.max(1, parseInt(qtyInput.value || '1', 10) - 1);
    });
    qtyPlus.addEventListener('click', () => {
      qtyInput.value = Math.min(10, parseInt(qtyInput.value || '1', 10) + 1);
    });
  }

  // Add to cart (front-end only — no real checkout wired up yet)
  function wireAddToCart(btnId, feedbackId) {
    const btn = document.getElementById(btnId);
    const feedback = feedbackId ? document.getElementById(feedbackId) : null;
    if (!btn) return;
    btn.addEventListener('click', () => {
      const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value || '1', 10)) : 1;
      setCartCount(getCartCount() + qty);
      if (feedback) {
        feedback.style.display = 'block';
        clearTimeout(feedback._t);
        feedback._t = setTimeout(() => feedback.style.display = 'none', 3000);
      }
    });
  }
  wireAddToCart('addToCartBtn', 'addCartFeedback');
  wireAddToCart('stickyAddToCartBtn', null);

  // Sticky mobile add-to-cart bar: show once purchase section is in view on small screens
  const purchaseSection = document.getElementById('purchase');
  const stickyCart = document.getElementById('stickyCart');
  if (purchaseSection && stickyCart) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (window.innerWidth <= 900) {
          stickyCart.classList.toggle('show', entry.isIntersecting);
        }
      });
    }, { threshold: 0.15 });
    io.observe(purchaseSection);
  }

  // Email signup forms — FRONT-END ONLY, not yet connected to a real ESP
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
