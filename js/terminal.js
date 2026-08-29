/* ==========================================================================
   terminal.js — the console in section 05.

   A small command interpreter over the same facts the page renders, plus
   the four settings the drawer exposes. It exists because the readers this
   site is aimed at — professors, scholarship reviewers, the person who
   ends up interviewing me — are faster with a keyboard than with a scroll
   wheel, and because writing a tokeniser is a more honest demonstration of
   what I can do than a paragraph claiming I can.

   Behaviour it borrows from a real shell, in rough order of how much
   people miss it when it is absent:
     · ↑ / ↓        history, with the in-progress line preserved
     · Tab          completion, and a ghosted preview of the match
     · Ctrl-L / -C  clear, cancel
     · unknown cmd  a suggestion by edit distance, not just an error
   ========================================================================== */

(function (global) {
  'use strict';

  var doc = document;
  var body = doc.getElementById('term-body');
  var form = doc.getElementById('term-form');
  var input = doc.getElementById('term-in');
  var shadow = doc.getElementById('term-shadow');
  if (!body || !form || !input) return;

  var bannerLocale = 'en';
  var history = [];
  var cursor = -1;
  var draft = '';

  /* --- output ----------------------------------------------------------- */

  function esc(s) {
    return String(s).replace(/[&<>]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
    });
  }

  /* `html` is only ever passed literals defined in this file. Anything
     that came from the input box goes through esc() first — see run(). */
  function print(html, cls) {
    var p = doc.createElement('p');
    p.className = 'term-line' + (cls ? ' ' + cls : '');
    p.innerHTML = html;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
    return p;
  }

  var blank = function () { print('&nbsp;'); };
  var head = function (s) { print(esc(s), 'is-head'); };

  /* Two columns, monospace, so a list of facts reads as a table without
     being one. Padding is done here rather than in CSS because the whole
     point of a console is that alignment comes from the characters. */
  var GUTTER = 18;
  function row(k, v) {
    // Always at least one space: `ybreakless.github.io` is 20 characters and
    // used to butt straight up against its own description.
    var pad = k + ' '.repeat(Math.max(1, GUTTER - k.length));
    print('<b>' + esc(pad) + '</b>' + esc(v));
  }

  function link(label, href) {
    print('<a href="' + esc(href) + '" rel="noopener">' + esc(label) + '</a>');
  }

  /* --- the data the commands read -------------------------------------- */

  var FACTS = {
    record: [
      ['diploma', 'Experimental Sciences, 20.0 / 20.0 (maximum)'],
      ['german equiv.', '~1.0, pending anabin / uni-assist evaluation'],
      ['certifications', '7 completed, 2024-2026'],
      ['languages', 'FA native · EN C1-C2 (IELTS) · DE B2'],
      ['testing', 'SAT completed']
    ],
    skills: [
      ['python', 'primary, 3 years'],
      ['bash', 'daily driver'],
      ['sql', 'joins, aggregation'],
      ['html/css/js', 'this site, hand-written'],
      ['rust', 'learning - ownership, traits'],
      ['pandas/numpy', 'cleaning, aggregation'],
      ['linux', 'primary environment'],
      ['git', 'branches, PR workflow'],
      ['tcp/ip', 'certified fundamentals']
    ],
    certs: [
      'Google Data Analytics Professional  - Google/Coursera, 2026',
      'Comprehensive Git & GitHub          - Maktabkhooneh, 2026',
      'Python Programming, full track      - Maktabkhooneh, 2024',
      'Computer Networking Fundamentals    - Maktabkhooneh, 2025',
      'Information Security Essentials     - Maktabkhooneh, 2025',
      'Git & GitHub Fundamentals           - 365 Data Science, 2024',
      'SAT                                 - College Board, 2025'
    ],
    path: [
      ['01  complete', 'Experimental Sciences diploma, 20.0/20.0'],
      ['02  current', 'BSc Informatik - Germany, WS 2027'],
      ['03  planned', 'MSc computational biology - Switzerland'],
      ['04  direction', 'biotech, compute side - Basel/Zurich corridor']
    ],
    repos: [
      ['ybreakless.github.io', 'this site - HTML, CSS, vanilla JS'],
      ['GermanRoadMap', 'preparation material for the German exam'],
      ['Image2dot', 'Python - image to dot-matrix conversion'],
      ['Awesome-AI-ImageStyles', 'a collected reference list']
    ]
  };

  /* --- settings the console can change ---------------------------------- */

  function setCfg(key, value) {
    doc.dispatchEvent(new CustomEvent('cfg:set', { detail: { key: key, value: value } }));
  }

  /* --- commands ---------------------------------------------------------
     Each entry: description for `help`, plus a run function. Adding a
     command means adding one object here and nothing else. */

  var CMD = {};

  CMD.help = {
    about: 'list every command',
    run: function () {
      head('commands');
      Object.keys(CMD).sort().forEach(function (name) {
        row(name, CMD[name].about);
      });
      blank();
      print('Tab completes. Up and down arrows recall. Ctrl-L clears.', 'is-dim');
    }
  };

  CMD.whoami = {
    about: 'the one-paragraph version',
    run: function () {
      head('whoami');
      print('Science graduate turned systems programmer, applying for Informatik');
      print('at German technical universities for Winter Semester 2027, with');
      print('computational biology in Switzerland as the actual destination.');
      blank();
      print('The site deliberately carries the record and not the biography.', 'is-dim');
      print('Everything claimed here is checkable; that is the whole design.', 'is-dim');
    }
  };

  CMD.record = {
    about: 'grades, languages, certifications',
    run: function () {
      head('record');
      FACTS.record.forEach(function (r) { row(r[0], r[1]); });
    }
  };

  CMD.certs = {
    about: 'the seven certifications in full',
    run: function () {
      head('certifications');
      FACTS.certs.forEach(function (c) { print(esc(c)); });
      blank();
      print('Verification URLs are pending. Until they are linked these are', 'is-dim');
      print('claims rather than evidence, and they are listed as such.', 'is-dim');
    }
  };

  CMD.skills = {
    about: 'what I work in, sized to the evidence',
    run: function () {
      head('capability');
      FACTS.skills.forEach(function (s) { row(s[0], s[1]); });
    }
  };

  CMD.path = {
    about: 'the four-stage plan, DE then CH',
    run: function () {
      head('trajectory');
      FACTS.path.forEach(function (p) { row(p[0], p[1]); });
      blank();
      print('Informatik is the instrument, not the destination.', 'is-dim');
    }
  };

  CMD.repos = {
    about: 'public repositories',
    run: function () {
      head('repositories');
      FACTS.repos.forEach(function (r) { row(r[0], r[1]); });
      blank();
      link('github.com/ybreakless', 'https://github.com/ybreakless');
    }
  };

  CMD.contact = {
    about: 'how to reach me',
    run: function () {
      head('contact');
      var a = doc.getElementById('mail-link');
      if (a && a.getAttribute('href') && a.getAttribute('href') !== '#') {
        link(a.getAttribute('href').replace('mailto:', ''), a.getAttribute('href'));
      }
      link('github.com/ybreakless', 'https://github.com/ybreakless');
      link('linkedin.com/in/mohajnajafi', 'https://www.linkedin.com/in/mohajnajafi/');
      blank();
      print('Or the form in section 06. Replies within 24 hours.', 'is-dim');
    }
  };

  CMD.cv = {
    about: 'open the full CV',
    run: function () {
      print('opening resume.html');
      setTimeout(function () { global.location.href = 'resume.html'; }, 350);
    }
  };

  CMD.goto = {
    about: 'jump to a section: goto work',
    run: function (args) {
      var id = (args[0] || '').toLowerCase();
      var target = id && doc.getElementById(id);
      if (!target) {
        print('no section "' + esc(id) + '"', 'is-err');
        print('try: trajectory, record, capability, work, console, contact', 'is-dim');
        return;
      }
      target.scrollIntoView({ behavior: Motion.still() ? 'auto' : 'smooth' });
      print('-> #' + esc(id));
    }
  };

  CMD.theme = {
    about: 'theme dark | light | auto',
    run: function (args) {
      var v = (args[0] || '').toLowerCase();
      if (['dark', 'light', 'auto'].indexOf(v) < 0) {
        print('usage: theme dark | light | auto', 'is-err');
        return;
      }
      setCfg('theme', v);
      print('theme = ' + v);
    }
  };

  CMD.lang = {
    about: 'lang en de fr es ru tr ar fa',
    run: function (args) {
      var v = (args[0] || '').toLowerCase();
      if (!v) {
        head('locales');
        global.i18n.locales.forEach(function (l) {
          row(l.code, l.native + '  (' + l.dir + ')');
        });
        return;
      }
      if (!global.i18n.has(v)) {
        print('unknown locale "' + esc(v) + '"', 'is-err');
        print('available: ' + global.i18n.locales.map(function (l) { return l.code; }).join(' '), 'is-dim');
        return;
      }
      setCfg('lang', v);
      print('lang = ' + v + '  (' + global.i18n.meta(v).native + ')');
    }
  };

  CMD.motion = {
    about: 'motion on | off',
    run: function (args) {
      var v = (args[0] || '').toLowerCase();
      if (v !== 'on' && v !== 'off') { print('usage: motion on | off', 'is-err'); return; }
      setCfg('motion', v);
      print('motion = ' + v);
    }
  };

  CMD.grid = {
    about: 'grid on | off',
    run: function (args) {
      var v = (args[0] || '').toLowerCase();
      if (v !== 'on' && v !== 'off') { print('usage: grid on | off', 'is-err'); return; }
      setCfg('grid', v);
      print('grid = ' + v);
    }
  };

  CMD.config = {
    about: 'print the current settings',
    run: function () {
      var d = doc.documentElement;
      head('configuration');
      row('theme', d.getAttribute('data-theme'));
      row('lang', d.getAttribute('lang') + ' / ' + d.getAttribute('dir'));
      row('motion', d.getAttribute('data-motion') === 'off' ? 'off' : 'on');
      row('grid', d.getAttribute('data-grid') === 'off' ? 'off' : 'on');
      blank();
      print('Stored in localStorage on this device only.', 'is-dim');
    }
  };

  CMD.stack = {
    about: 'what this page is built from',
    run: function () {
      head('stack');
      row('markup', 'hand-written HTML, no generator');
      row('styles', 'one stylesheet, custom properties, no preprocessor');
      row('scripts', 'four files, no framework, no build step');
      row('artwork', 'SVG plotted by tools/gen-art.mjs, fixed seed');
      row('i18n', '8 locales, RTL for ar and fa');
      row('deps', 'none');
      blank();
      link('read the source', 'https://github.com/ybreakless/ybreakless.github.io');
    }
  };

  CMD.clear = { about: 'clear the screen', run: function () { body.innerHTML = ''; } };

  CMD.history = {
    about: 'commands entered this session',
    run: function () {
      if (!history.length) { print('nothing yet', 'is-dim'); return; }
      history.forEach(function (h, i) { row(String(i + 1), h); });
    }
  };

  CMD.date = {
    about: 'the date, in the current locale',
    run: function () {
      print(new Date().toLocaleString(doc.documentElement.getAttribute('lang') || 'en', {
        dateStyle: 'full', timeStyle: 'short'
      }));
    }
  };

  CMD.echo = {
    about: 'echo some text back',
    run: function (args) { print(esc(args.join(' ')) || '&nbsp;'); }
  };

  CMD.sudo = {
    about: 'no',
    run: function () {
      print('This incident will not be reported, because there is nothing here');
      print('to escalate to. It is a static page on GitHub Pages.', 'is-dim');
    }
  };

  /* --- dispatch ---------------------------------------------------------- */

  /* Levenshtein, capped at the length of the shorter word. Used only to
     turn "hlep" into a suggestion rather than a dead end. */
  function distance(a, b) {
    var prev = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      var cur = [i];
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(
          prev[j] + 1,
          cur[j - 1] + 1,
          prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
      prev = cur;
    }
    return prev[b.length];
  }

  function run(line) {
    var parts = line.trim().split(/\s+/);
    var name = parts[0].toLowerCase();
    var args = parts.slice(1);

    print('<span class="subtle">$</span> ' + esc(line), 'is-cmd');
    if (!name) return;

    if (CMD[name]) { CMD[name].run(args); return; }

    print('command not found: ' + esc(name), 'is-err');
    var best = null, bestD = 99;
    Object.keys(CMD).forEach(function (c) {
      var d = distance(name, c);
      if (d < bestD) { bestD = d; best = c; }
    });
    if (best && bestD <= 2) print('did you mean "' + esc(best) + '"?', 'is-dim');
    else print('type "help" for the list', 'is-dim');
  }

  /* --- completion -------------------------------------------------------- */

  function matches(prefix) {
    if (!prefix) return [];
    return Object.keys(CMD).filter(function (c) { return c.indexOf(prefix) === 0; }).sort();
  }

  function updateGhost() {
    var v = input.value;
    var m = v.indexOf(' ') < 0 ? matches(v.toLowerCase()) : [];
    shadow.textContent = (m.length === 1 && m[0] !== v) ? m[0] : '';
  }

  input.addEventListener('input', updateGhost);

  input.addEventListener('keydown', function (e) {
    // Tab completes, but only when there is something to complete. Consuming
    // every Tab (Shift+Tab included) makes this input a keyboard trap with no
    // way out — WCAG 2.1.2. With nothing to complete, Tab must move focus.
    if (e.key === 'Tab' && !e.shiftKey) {
      var m = matches(input.value.trim().toLowerCase());
      if (!m.length) return;
      e.preventDefault();
      if (m.length === 1) input.value = m[0] + ' ';
      else print(esc(m.join('  ')), 'is-dim');
      updateGhost();
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      if (!history.length) return;
      e.preventDefault();
      if (cursor === -1) draft = input.value;
      cursor = e.key === 'ArrowUp'
        ? Math.min(history.length - 1, cursor + 1)
        : cursor - 1;
      input.value = cursor < 0 ? (cursor = -1, draft) : history[history.length - 1 - cursor];
      input.setSelectionRange(input.value.length, input.value.length);
      updateGhost();
      return;
    }

    if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) { e.preventDefault(); body.innerHTML = ''; }
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C') && !global.getSelection().toString()) {
      e.preventDefault();
      print('<span class="subtle">$</span> ' + esc(input.value) + '^C', 'is-cmd');
      input.value = '';
      updateGhost();
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var line = input.value;
    if (line.trim()) history.push(line.trim());
    cursor = -1;
    draft = '';
    input.value = '';
    updateGhost();
    run(line);
  });

  /* Clicking anywhere in the output puts the caret back in the input,
     the way clicking a terminal window does. */
  body.addEventListener('click', function (e) {
    if (e.target.tagName !== 'A' && !global.getSelection().toString()) input.focus();
  });

  /* --- banner ------------------------------------------------------------ */

  function banner() {
    body.innerHTML = '';
    print('ybreakless.github.io — interactive console', 'is-head');
    print('Informatik (DE) &rarr; computational biology (CH)', 'is-dim');
    blank();
    print('Type <b>help</b> for commands, or <b>whoami</b> to start.');
    print('The console can also reconfigure the page: <b>theme light</b>, <b>lang de</b>.', 'is-dim');
    blank();
  }

  banner();

  /* A language change must not wipe the session. The console keeps its
     scrollback and simply notes the switch; command names and their output
     stay English, because that is what a shell is. */
  doc.addEventListener('i18n:change', function (e) {
    if (!e.detail || e.detail.code === bannerLocale) return;
    bannerLocale = e.detail.code;
    print('locale &rarr; ' + esc(e.detail.code) + ' (' + esc(e.detail.native) + ')', 'is-dim');
  });

  global.Terminal = { print: print, run: run, focus: function () { input.focus(); } };
})(window);
