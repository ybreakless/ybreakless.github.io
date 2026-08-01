/* ==========================================================================
   MOHAMMAD HAJ NAJAFI — PORTFOLIO
   main.js  ·  ~3 KB unminified, zero dependencies

   Everything here is progressive enhancement. Disable JavaScript and the
   page still reads, navigates and submits perfectly — only the theme
   toggle, the mobile menu and the reveal animation go away.
   ========================================================================== */

(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. THEME TOGGLE
     The initial value is set by the inline script in <head> to avoid a
     flash of the wrong theme; this only handles the click.
     ------------------------------------------------------------------------ */
  var themeBtn = doc.getElementById('theme-toggle');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
      themeBtn.setAttribute(
        'aria-label',
        next === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      );
    });
  }

  /* ------------------------------------------------------------------------
     2. MOBILE NAVIGATION
     ------------------------------------------------------------------------ */
  var navToggle = doc.getElementById('nav-toggle');
  var navLinks = doc.getElementById('nav-links');

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close after choosing a destination
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    // Escape closes the menu and returns focus to the trigger
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. STICKY NAV BORDER
     A hairline appears once the page has scrolled, so the nav separates
     from the content without a permanent divider at rest.
     ------------------------------------------------------------------------ */
  var nav = doc.getElementById('nav');
  var ticking = false;

  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll();

  /* ------------------------------------------------------------------------
     4. SCROLL SPY
     Highlights the nav link for whichever section owns the viewport.
     ------------------------------------------------------------------------ */
  var sections = Array.prototype.slice.call(doc.querySelectorAll('main section[id]'));
  var linkFor = {};

  Array.prototype.forEach.call(doc.querySelectorAll('#nav-links a[href^="#"]'), function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(linkFor).forEach(function (k) {
            linkFor[k].classList.remove('is-active');
            linkFor[k].removeAttribute('aria-current');
          });
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------------------------------------------------------
     5. SCROLL REVEAL
     Elements fade up once, then stop being observed. Skipped entirely for
     users who have asked for reduced motion.
     ------------------------------------------------------------------------ */
  var revealables = doc.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) { revealer.observe(el); });
  }

  /* ------------------------------------------------------------------------
     6. FOOTER YEAR
     ------------------------------------------------------------------------ */
  var year = doc.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------------
     7. CONTACT FORM — inline pending state
     The form still posts normally; this only stops double submissions and
     tells the user something is happening.
     ------------------------------------------------------------------------ */
  var form = doc.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }
    });
  }
})();
