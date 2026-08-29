/* ==========================================================================
   motion.js — a ~120-line tween engine.

   The site needs four animated things: numbers that roll up, a headline
   that arrives word by word, a progress meter during the cold start, and
   scroll reveals. A general animation library is roughly 20 KB for that.
   This is the subset, written out, so the dependency count stays at zero.

   Everything funnels through one requestAnimationFrame loop and one
   easing function, and every entry point checks whether motion is wanted
   before it starts — the caller is never responsible for remembering.
   ========================================================================== */

(function (global) {
  'use strict';

  var doc = document;
  var root = doc.documentElement;

  /* --- Should anything move at all? ------------------------------------- */

  var mq = matchMedia('(prefers-reduced-motion: reduce)');

  function still() {
    return mq.matches || root.getAttribute('data-motion') === 'off';
  }

  /* --- Easing ------------------------------------------------------------
     The same curve the stylesheet uses (cubic-bezier .22 1 .36 1), solved
     numerically rather than approximated, so JS-driven and CSS-driven
     motion on the same screen actually match. Newton–Raphson converges in
     four iterations at this precision; the bisection fallback covers the
     flat regions where the derivative is near zero. */

  function bezier(x1, y1, x2, y2) {
    var A = function (a, b) { return 1 - 3 * b + 3 * a; };
    var B = function (a, b) { return 3 * b - 6 * a; };
    var C = function (a) { return 3 * a; };
    var calc = function (t, a, b) { return ((A(a, b) * t + B(a, b)) * t + C(a)) * t; };
    var slope = function (t, a, b) { return 3 * A(a, b) * t * t + 2 * B(a, b) * t + C(a); };

    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      var t = x;
      for (var i = 0; i < 4; i++) {
        var d = slope(t, x1, x2);
        if (d === 0) break;
        t -= (calc(t, x1, x2) - x) / d;
      }
      if (t < 0 || t > 1) {                       // Newton wandered off
        var lo = 0, hi = 1;
        t = x;
        for (var j = 0; j < 20; j++) {
          if (calc(t, x1, x2) > x) hi = t; else lo = t;
          t = (lo + hi) / 2;
        }
      }
      return calc(t, y1, y2);
    };
  }

  var ease = bezier(0.22, 1, 0.36, 1);

  /* --- The loop ----------------------------------------------------------
     One rAF for every active tween. Adding a second loop is how pages end
     up with two animations a frame out of step with each other. */

  var running = [];
  var frame = 0;

  function step(now) {
    frame = running.length ? requestAnimationFrame(step) : 0;
    for (var i = running.length - 1; i >= 0; i--) {
      var t = running[i];
      if (t.start === 0) t.start = now;
      var p = Math.min(1, (now - t.start - t.delay) / t.duration);
      if (p < 0) continue;
      t.update(ease(p), p);
      if (p === 1) {
        running.splice(i, 1);
        if (t.done) t.done();
      }
    }
  }

  function tween(opts) {
    var t = {
      start: 0,
      delay: opts.delay || 0,
      duration: Math.max(1, opts.duration || 600),
      update: opts.update,
      done: opts.done
    };
    if (still()) {                                // jump to the end, still call back
      t.update(1, 1);
      if (t.done) t.done();
      return;
    }
    running.push(t);
    if (!frame) frame = requestAnimationFrame(step);
    return t;
  }

  /* --- Numbers -----------------------------------------------------------
     `data-to` is the target, `data-dec` the decimal places. The element's
     existing text is the resting state, so a visitor without JavaScript
     sees a sensible zero rather than an empty box. */

  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-to'));
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    if (isNaN(to)) return;
    var fmt = new Intl.NumberFormat(root.getAttribute('lang') || 'en', {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    });
    tween({
      duration: 1100,
      update: function (e) { el.textContent = fmt.format(to * e); }
    });
  }

  /* --- Headline ----------------------------------------------------------
     Words, never letters. Splitting to letters puts a <span> between every
     glyph, which makes a screen reader spell the headline out loud and
     breaks the joining behaviour that Arabic and Persian depend on
     entirely. Whole words survive both. */

  function splitWords(el) {
    if (el.dataset.split) return;
    el.dataset.split = '1';
    var i = 0;
    Array.prototype.forEach.call(el.children, function (part) {
      var words = part.textContent.split(/\s+/).filter(Boolean);
      part.textContent = '';
      words.forEach(function (word) {
        var outer = doc.createElement('span');
        outer.className = 'w';
        var inner = doc.createElement('span');
        inner.textContent = word;
        inner.style.setProperty('--d', (i++ * 55) + 'ms');
        outer.appendChild(inner);
        part.appendChild(outer);
        part.appendChild(doc.createTextNode(' '));
      });
    });
  }

  global.Motion = {
    tween: tween,
    ease: ease,
    bezier: bezier,
    still: still,
    countUp: countUp,
    splitWords: splitWords
  };
})(window);
