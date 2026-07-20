/* ==========================================================================
   RETRO CRT TERMINAL PORTFOLIO - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. WEB AUDIO API - RETRO SOUND EFFECTS (Zero external audio assets needed!)
     -------------------------------------------------------------------------- */
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(frequency, type, duration, volume = 0.05) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context policy handled gracefully
    }
  }

  // Sound triggers
  const soundToggleBtn = document.getElementById('sound-toggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.textContent = soundEnabled ? 'AUDIO: ON' : 'AUDIO: OFF';
      playTone(600, 'square', 0.1);
    });
  }

  /* --------------------------------------------------------------------------
     2. THEME TOGGLE (Green / Amber / Cyan)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themes = ['green', 'amber', 'cyan'];
  let currentThemeIndex = 0;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const newTheme = themes[currentThemeIndex];
      if (newTheme === 'green') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', newTheme);
      }
      themeToggleBtn.textContent = `THEME: ${newTheme.toUpperCase()}`;
      playTone(450, 'sawtooth', 0.1);
    });
  }

  /* --------------------------------------------------------------------------
     3. BOOT SCREEN SEQUENCE
     -------------------------------------------------------------------------- */
  const bootScreen = document.getElementById('boot-screen');
  const bootLog = document.getElementById('boot-log');
  const skipBootBtn = document.getElementById('skip-boot');

  const bootMessages = [
    "BIOS v4.02 - RETRO-TERMINAL-OS 64-bit",
    "Initializing CPU... [ OK ]",
    "Checking Base Memory: 640K Conventional / 32768K Extended [ OK ]",
    "Mounting Virtual File System at /home/ybreakless... [ OK ]",
    "Loading CRT phosphor scanlines & color buffers... [ OK ]",
    "Establishing secure connection to GitHub Pages server... [ OK ]",
    "Launching Portfolio OS v2.6.0...",
    "SUCCESS: Welcome visitor! System ready."
  ];

  let bootIndex = 0;
  let bootTimer = null;

  function runBootSequence() {
    if (!bootLog) return;
    if (bootIndex < bootMessages.length) {
      bootLog.textContent += bootMessages[bootIndex] + "\n";
      playTone(300 + bootIndex * 50, 'square', 0.08, 0.03);
      bootIndex++;
      bootTimer = setTimeout(runBootSequence, 280);
    } else {
      setTimeout(hideBootScreen, 400);
    }
  }

  function hideBootScreen() {
    if (!bootScreen) return;
    if (bootTimer) clearTimeout(bootTimer);
    bootScreen.style.opacity = '0';
    bootScreen.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      bootScreen.style.display = 'none';
      playTone(880, 'sine', 0.2);
    }, 500);
  }

  if (skipBootBtn) {
    skipBootBtn.addEventListener('click', hideBootScreen);
  }

  // Start boot sequence on load
  setTimeout(runBootSequence, 200);

  /* --------------------------------------------------------------------------
     4. HERO TYPING ANIMATION FOR TAGLINE
     -------------------------------------------------------------------------- */
  const taglineEl = document.getElementById('typing-tagline');
  const taglineText = "Aspiring Software Engineer | Future CS Student in Germany 🇩🇪";
  let charIndex = 0;

  function typeTagline() {
    if (!taglineEl) return;
    if (charIndex < taglineText.length) {
      taglineEl.textContent += taglineText.charAt(charIndex);
      if (charIndex % 3 === 0) playTone(800, 'sine', 0.03, 0.02);
      charIndex++;
      setTimeout(typeTagline, 45);
    }
  }

  // Start typing after boot or slightly delayed
  setTimeout(typeTagline, 2500);

  /* --------------------------------------------------------------------------
     5. INTERSECTION OBSERVER FOR SKILL / LANGUAGE BARS
     -------------------------------------------------------------------------- */
  const observerOptions = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fillBars = entry.target.querySelectorAll('.pixel-progress-fill, .skill-fill');
        fillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          if (targetWidth) {
            bar.style.width = targetWidth;
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sectionsToObserve = document.querySelectorAll('#about, #skills');
  sectionsToObserve.forEach(sec => observer.observe(sec));

  /* --------------------------------------------------------------------------
     6. VISITOR COUNTER SIMULATION
     -------------------------------------------------------------------------- */
  const visitorCountEl = document.getElementById('visitor-count');
  if (visitorCountEl) {
    let visits = localStorage.getItem('ybreakless_visits');
    if (!visits) {
      visits = 13370;
    } else {
      visits = parseInt(visits, 10) + 1;
    }
    localStorage.setItem('ybreakless_visits', visits);
    visitorCountEl.textContent = String(visits).padStart(6, '0');
  }

  /* --------------------------------------------------------------------------
     7. INTERACTIVE EMBEDDED TERMINAL WIDGET
     -------------------------------------------------------------------------- */
  const termWidget = document.getElementById('interactive-terminal');
  const termToggleBtn = document.getElementById('terminal-toggle-btn');
  const termCloseBtn = document.getElementById('term-close');
  const termBody = document.getElementById('term-body');
  const termInput = document.getElementById('term-input');

  if (termToggleBtn && termWidget) {
    termToggleBtn.addEventListener('click', () => {
      termWidget.classList.toggle('open');
      if (termWidget.classList.contains('open') && termInput) {
        termInput.focus();
      }
      playTone(500, 'sine', 0.1);
    });
  }

  if (termCloseBtn && termWidget) {
    termCloseBtn.addEventListener('click', () => {
      termWidget.classList.remove('open');
    });
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = '';
        executeTerminalCommand(cmd);
      }
    });
  }

  function appendTermOutput(text) {
    if (!termBody) return;
    const div = document.createElement('div');
    div.className = 'term-output';
    div.textContent = text;
    termBody.insertBefore(div, termBody.lastElementChild);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function executeTerminalCommand(cmd) {
    appendTermOutput(`guest@portfolio:~$ ${cmd}`);
    playTone(700, 'square', 0.05);

    const parts = cmd.split(' ');
    const mainCmd = parts[0];

    switch (mainCmd) {
      case 'help':
        appendTermOutput("Available commands:\n - about: Display background & RPG stats\n - skills: List technical stack & proficiencies\n - projects: List portfolio projects\n - contact: Show contact channels\n - clear: Clear terminal screen\n - matrix: Trigger matrix rain effect\n - sudo hire: Unlock recruiter bonus!\n - easteregg: Activate Konami celebration");
        break;
      case 'about':
        appendTermOutput("Mohammad 'Mo' HajNajafi | Developer & CS Aspirant in Germany 🇩🇪\nLevel: 18 | Location: Dubai, UAE\nPassionate about systems, Python, and web engineering.");
        break;
      case 'skills':
        appendTermOutput("Core Skills:\n- Languages: Python, JS, HTML/CSS, C++, SQL\n- Tools & Web: Git, GitHub, Linux, Bash, VS Code\n- Concepts: Data Structures, Algorithms, Networking, Ethical Hacking");
        break;
      case 'projects':
        appendTermOutput("Projects:\n1. Retro Portfolio OS (this site)\n2. Terminal Hacker Tool (Python network scanner)\n3. Data Analysis Dashboard (Google Data Analysis capstone)");
        break;
      case 'contact':
        appendTermOutput("Email: ybreakless@gmail.com\nGitHub: https://github.com/ybreakless\nUse the contact form below to drop a message!");
        break;
      case 'clear':
        if (termBody) {
          const outputs = termBody.querySelectorAll('.term-output');
          outputs.forEach(o => o.remove());
        }
        break;
      case 'matrix':
        appendTermOutput("Initializing Matrix digital rain overlay...");
        triggerMatrixRain();
        break;
      case 'sudo':
        if (parts[1] === 'hire') {
          appendTermOutput("ACCESS GRANTED! Recruiter bonus unlocked: Mohammad is ready to join your team or university program!");
          playTone(990, 'sine', 0.3);
        } else {
          appendTermOutput("sudo: permission denied. Try 'sudo hire'");
        }
        break;
      case 'easteregg':
      case 'konami':
        appendTermOutput("EASTER EGG UNLOCKED! Enjoy the retro arcade celebration!");
        triggerEasterEgg();
        break;
      case '':
        break;
      default:
        appendTermOutput(`Command not recognized: '${cmd}'. Type 'help' for commands.`);
        playTone(200, 'sawtooth', 0.15);
        break;
    }
  }

  /* --------------------------------------------------------------------------
     8. EASTER EGG: KONAMI CODE (↑↑↓↓←→←→BA) & SPECIAL EFFECTS
     -------------------------------------------------------------------------- */
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  window.addEventListener('keydown', (e) => {
    // Check Konami code
    if (e.key === konamiSequence[konamiIndex] || e.key.toLowerCase() === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        triggerEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerEasterEgg() {
    playTone(523, 'sine', 0.1);
    setTimeout(() => playTone(659, 'sine', 0.1), 100);
    setTimeout(() => playTone(784, 'sine', 0.15), 200);
    setTimeout(() => playTone(1046, 'sine', 0.3), 300);

    alert("🎮 KONAMI CODE ACTIVATED! 🎮\nWelcome to secret Retro Arcade Mode, ybreakless!");
    triggerMatrixRain();
  }

  function triggerMatrixRain() {
    // Create a temporary full-screen matrix overlay effect
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '99997';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+~';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    let frameCount = 0;
    const matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#33ff33';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frameCount++;
      if (frameCount > 150) {
        clearInterval(matrixInterval);
        canvas.remove();
      }
    }, 33);
  }

  /* --------------------------------------------------------------------------
     9. CONTACT FORM INTERACTION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // If using Formspree or mailto
      playTone(880, 'sine', 0.2);
      // Let it submit or show retro success alert
    });
  }

  // General click sound for retro buttons
  const buttons = document.querySelectorAll('.retro-btn, .ctrl-btn, .social-icon-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      playTone(550, 'square', 0.04);
    });
  });

});
