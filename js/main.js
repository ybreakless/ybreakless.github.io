/* ==========================================================================
   main.js — everything that is not the console or the tween engine.

     1  settings store      one source of truth for theme/lang/motion/grid
     2  cold start          the first-visit boot sequence
     3  navigation          sticky border, mobile menu, scroll spy
     4  reveals             scroll-triggered entrance, headline, counters
     5  drawer              the configuration panel
     6  odds and ends       year

   All of it is progressive enhancement. With JavaScript off the page
   still reads, navigates and translates to whatever the markup says;
   what disappears is the console, the settings panel and the motion.
   ========================================================================== */

(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;

  /* ======================================================================
     1  SETTINGS
     Three things can change a setting: the drawer, the console, and the
     nav buttons. They all go through here, and here is the only place
     that touches localStorage or the DOM attributes — otherwise the three
     of them drift apart the first time one grows a special case.
     ====================================================================== */

  var SYSTEM_THEME = matchMedia('(prefers-color-scheme: light)');

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { /* private mode */ } }
  };

  var settings = {
    theme:  store.get('theme') || 'auto',
    motion: store.get('motion') === 'off' ? 'off' : 'on',
    grid:   store.get('grid') === 'off' ? 'off' : 'on',
    lang:   store.get('lang') || 'en'
  };

  function applyTheme() {
    var t = settings.theme === 'auto'
      ? (SYSTEM_THEME.matches ? 'light' : 'dark')
      : settings.theme;
    root.setAttribute('data-theme', t);
  }

  /* When the theme is on "auto" the OS is allowed to change it under us. */
  SYSTEM_THEME.addEventListener('change', function () {
    if (settings.theme === 'auto') applyTheme();
  });

  function set(key, value) {
    settings[key] = value;

    if (key === 'theme') {
      applyTheme();
      if (value === 'auto') store.del('theme'); else store.set('theme', value);
    } else if (key === 'motion') {
      root.setAttribute('data-motion', value);
      store.set('motion', value);
      if (value === 'off') showEverything();
    } else if (key === 'grid') {
      root.setAttribute('data-grid', value);
      store.set('grid', value);
    } else if (key === 'lang') {
      window.i18n.apply(value);                    // i18n.js persists this itself
    }

    syncControls();
  }

  applyTheme();
  root.setAttribute('data-motion', settings.motion);
  root.setAttribute('data-grid', settings.grid);

  /* The console dispatches these rather than reaching in directly. */
  doc.addEventListener('cfg:set', function (e) { set(e.detail.key, e.detail.value); });

  /* ======================================================================
     2  COLD START
     A short printed boot, once per session. The lines are not decorative:
     each one names something the page genuinely does at load, which is
     the difference between a loading screen and a costume.
     ====================================================================== */

  var boot = doc.getElementById('boot');

  function coldStart() {
    if (!boot) return;
    if (!root.hasAttribute('data-booting')) { boot.remove(); return; }

    var log = doc.getElementById('boot-log');
    var meter = doc.getElementById('boot-meter');
    var skip = doc.getElementById('boot-skip');

    var LINES = [
      ['design tokens', 'monochrome, 2 themes'],
      ['locales', '8 loaded, 2 right-to-left'],
      ['artwork', '4 plots, generated from seed'],
      ['console', 'interpreter ready'],
      ['dependencies', 'none']
    ];

    boot.setAttribute('aria-hidden', 'true');      // it is decoration; the page is the content
    doc.body.style.overflow = 'hidden';

    var finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      try { sessionStorage.setItem('booted', '1'); } catch (e) { /* private mode */ }
      doc.body.style.overflow = '';
      root.removeAttribute('data-booting');
      boot.classList.add('is-done');
      doc.removeEventListener('keydown', finish);
      setTimeout(function () { if (boot.parentNode) boot.remove(); }, 560);
      start();                                     // reveals begin only now
    }

    doc.addEventListener('keydown', finish);
    if (skip) skip.addEventListener('click', finish);

    LINES.forEach(function (pair, i) {
      var p = doc.createElement('p');
      p.innerHTML = '<b>' + pair[0] + '</b> <span class="ok">' + pair[1] + '</span>';
      log.appendChild(p);
      setTimeout(function () { p.classList.add('on'); }, 90 + i * 130);
    });

    Motion.tween({
      duration: 900,
      update: function (e) { meter.style.width = (e * 100) + '%'; },
      done: function () { setTimeout(finish, 220); }
    });
  }

  /* ======================================================================
     3  NAVIGATION
     ====================================================================== */

  var nav = doc.getElementById('nav');
  var navLinks = doc.getElementById('nav-links');
  var navToggle = doc.getElementById('nav-toggle');

  var ticking = false;
  function onScroll() {
    ticking = false;
    if (nav) nav.toggleAttribute('data-stuck', window.scrollY > 8);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  function closeNav() {
    if (!navLinks) return;
    navLinks.removeAttribute('data-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.toggleAttribute('data-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
  }

  /* Scroll spy. The margins make "current" mean the section occupying the
     middle band of the viewport, not merely one that is visible. */
  var linkFor = {};
  Array.prototype.forEach.call(doc.querySelectorAll('#nav-links a[href^="#"]'), function (a) {
    linkFor[a.getAttribute('href').slice(1)] = a;
  });

  var sections = doc.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link || !entry.isIntersecting) return;
        Object.keys(linkFor).forEach(function (k) { linkFor[k].removeAttribute('aria-current'); });
        link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Array.prototype.forEach.call(sections, function (s) { spy.observe(s); });
  }

  /* ======================================================================
     4  REVEALS
     ====================================================================== */

  var revealables = doc.querySelectorAll('[data-reveal]');
  var counters = doc.querySelectorAll('.count');
  var headline = doc.getElementById('hero-h1');

  function showEverything() {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
    if (headline) headline.classList.add('is-in');
    Array.prototype.forEach.call(counters, function (el) { Motion.countUp(el); });
  }

  var started = false;

  function start() {
    if (started) return;
    started = true;

    if (Motion.still() || !('IntersectionObserver' in window)) { showEverything(); return; }

    if (headline) {
      Motion.splitWords(headline);
      requestAnimationFrame(function () { headline.classList.add('is-in'); });
    }

    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });

    /* Counters are separate: they should run when the number is on screen,
       not when its container first crosses the threshold. */
    var co = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Motion.countUp(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (el) { co.observe(el); });
  }

  /* Re-split after a locale change: i18n replaces the headline's innerHTML,
     which removes the word wrappers splitWords built. Without this the
     entrance animation is silently dead for the rest of the session. */
  doc.addEventListener('i18n:change', function () {
    if (!headline || !started || Motion.still()) return;
    delete headline.dataset.split;
    headline.classList.remove('is-in');
    Motion.splitWords(headline);
    requestAnimationFrame(function () { headline.classList.add('is-in'); });
  });

  /* ======================================================================
     5  DRAWER
     ====================================================================== */

  var drawer = doc.getElementById('drawer');
  var scrim = doc.getElementById('drawer-scrim');
  var cfgBtn = doc.getElementById('cfg-btn');
  var lastFocus = null;
  var hideTimer = 0;

  function openDrawer() {
    if (!drawer || drawer.hasAttribute('data-open')) return;
    clearTimeout(hideTimer);            // a fast reopen must cancel the hide
    lastFocus = doc.activeElement;
    drawer.hidden = false;
    scrim.hidden = false;
    requestAnimationFrame(function () {
      drawer.setAttribute('data-open', '');
      scrim.setAttribute('data-open', '');
    });
    cfgBtn.setAttribute('aria-expanded', 'true');
    doc.getElementById('drawer-close').focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.removeAttribute('data-open');
    scrim.removeAttribute('data-open');
    cfgBtn.setAttribute('aria-expanded', 'false');
    hideTimer = setTimeout(function () { drawer.hidden = true; scrim.hidden = true; }, 380);
    // If the drawer was opened without a focused trigger — a programmatic
    // click, or the console — lastFocus is <body>, and returning focus there
    // strands the keyboard user at the top of the document.
    (lastFocus && lastFocus !== doc.body ? lastFocus : cfgBtn).focus();
  }

  /* aria-modal="true" is a promise that Tab cannot leave the panel. The
     scrim stops the mouse; this stops the keyboard. */
  function trapFocus(e) {
    if (e.key !== 'Tab' || !drawer.hasAttribute('data-open')) return;
    var focusable = drawer.querySelectorAll('button, [href], input, select, textarea');
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  if (drawer && cfgBtn) {
    cfgBtn.addEventListener('click', function () {
      drawer.hasAttribute('data-open') ? closeDrawer() : openDrawer();
    });
    scrim.addEventListener('click', closeDrawer);
    doc.getElementById('drawer-close').addEventListener('click', closeDrawer);
    doc.addEventListener('keydown', trapFocus);
  }

  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (drawer && drawer.hasAttribute('data-open')) closeDrawer();
    else if (navLinks && navLinks.hasAttribute('data-open')) { closeNav(); navToggle.focus(); }
  });

  /* Build the locale grid from the locale list rather than the markup, so
     adding a language is a one-line change in i18n.js. */
  var langGrid = doc.getElementById('lang-grid');
  if (langGrid) {
    window.i18n.locales.forEach(function (l) {
      var b = doc.createElement('button');
      b.type = 'button';
      b.setAttribute('data-v', l.code);
      b.innerHTML = '<span>' + l.native + '</span><span class="lang-code">' + l.code.toUpperCase() + '</span>';
      b.addEventListener('click', function () { set('lang', l.code); });
      langGrid.appendChild(b);
    });
  }

  var segs = { theme: 'seg-theme', motion: 'seg-motion', grid: 'seg-grid' };
  Object.keys(segs).forEach(function (key) {
    var el = doc.getElementById(segs[key]);
    if (!el) return;
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-v]');
      if (b) set(key, b.getAttribute('data-v'));
    });
  });

  var reset = doc.getElementById('cfg-reset');
  if (reset) {
    reset.addEventListener('click', function () {
      ['theme', 'motion', 'grid', 'lang'].forEach(store.del);
      settings.theme = 'auto';
      settings.motion = 'on';
      settings.grid = 'on';
      applyTheme();
      root.setAttribute('data-motion', 'on');
      root.setAttribute('data-grid', 'on');
      settings.lang = 'en';
      window.i18n.apply('en', false);
      syncControls();
    });
  }

  /* Reflect state onto every control at once — the drawer, the nav
     buttons, and the language code in the header. */
  function syncControls() {
    Object.keys(segs).forEach(function (key) {
      var el = doc.getElementById(segs[key]);
      if (!el) return;
      Array.prototype.forEach.call(el.querySelectorAll('button[data-v]'), function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === settings[key]));
      });
    });
    if (langGrid) {
      Array.prototype.forEach.call(langGrid.querySelectorAll('button[data-v]'), function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-v') === settings.lang));
      });
    }
    var code = doc.getElementById('lang-code');
    if (code) code.textContent = settings.lang.toUpperCase();
  }

  /* The header theme button is a plain toggle; "auto" only lives in the
     drawer, because a two-state button that silently has three states is
     the sort of thing that makes people stop trusting a control. */
  var themeBtn = doc.getElementById('theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      set('theme', root.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
  }

  var langBtn = doc.getElementById('lang-btn');
  if (langBtn && drawer) {
    langBtn.addEventListener('click', function () {
      openDrawer();                     // no-ops if it is already open
      setTimeout(function () {
        var first = langGrid && langGrid.querySelector('button');
        if (first) first.focus();
      }, 400);
    });
  }

  /* ======================================================================
     6  ODDS AND ENDS
     ====================================================================== */

  var year = doc.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ======================================================================
     GO
     ====================================================================== */

  // persist:false — loading the page is not a language choice. apply() also
  // snapshots the English source out of the DOM on this first call.
  window.i18n.apply(settings.lang, false);
  syncControls();

  if (root.hasAttribute('data-booting')) coldStart();
  else { if (boot) boot.remove(); start(); }
})();
