/* ==========================================================================
   RETRO CRT TERMINAL & TACTICAL ESPORTS PORTFOLIO - MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. WEB AUDIO API - RETRO SOUND EFFECTS
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
    } catch (e) {}
  }

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
     3. TACTICAL RELOAD (FLASHBANG EFFECT)
     -------------------------------------------------------------------------- */
  const flashbangTrigger = document.getElementById('flashbang-trigger');
  const flashbangOverlay = document.getElementById('flashbang-overlay');

  if (flashbangTrigger && flashbangOverlay) {
    flashbangTrigger.addEventListener('click', () => {
      flashbangOverlay.classList.add('active');
      playTone(1200, 'square', 0.2, 0.1);
      setTimeout(() => {
        flashbangOverlay.classList.remove('active');
      }, 400);
    });
  }

  /* --------------------------------------------------------------------------
     4. HERO TYPING ANIMATION (Master Prompt Core Focus Areas)
     -------------------------------------------------------------------------- */
  const taglineEl = document.getElementById('typing-tagline');
  const phrases = [
    "Building with Python & Rust",
    "Analyzing Data",
    "Clutching rounds in Valorant"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeTagline() {
    if (!taglineEl) return;
    const current = phrases[phraseIndex];

    if (isDeleting) {
      taglineEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      taglineEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      typingSpeed = 1600;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeTagline, typingSpeed);
  }

  setTimeout(typeTagline, 500);

  /* --------------------------------------------------------------------------
     5. VISITOR COUNTER
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
     6. INTERACTIVE EMBEDDED TERMINAL WIDGET & TETRIS GAME
     -------------------------------------------------------------------------- */
  const termWidget = document.getElementById('interactive-terminal');
  const termToggleBtn = document.getElementById('terminal-toggle-btn');
  const openTerminalFooterBtn = document.getElementById('open-terminal');
  const termCloseBtn = document.getElementById('term-close');
  const termBody = document.getElementById('term-body');
  const termInput = document.getElementById('term-input');

  function toggleTerminal() {
    if (!termWidget) return;
    termWidget.classList.toggle('open');
    if (termWidget.classList.contains('open') && termInput) {
      termInput.focus();
    }
    playTone(500, 'sine', 0.1);
  }

  if (termToggleBtn) termToggleBtn.addEventListener('click', toggleTerminal);
  if (openTerminalFooterBtn) openTerminalFooterBtn.addEventListener('click', toggleTerminal);
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
        appendTermOutput("Available commands:\n - skills: Display technical stack\n - calisthenics: Triggers terminal push-up animation!\n - about: Display background & honors\n - esports: Display competitive gaming rankings\n - tetris / easteregg: Play retro Tetris game!\n - matrix: Trigger matrix rain effect\n - clear: Clear terminal output\n - exit: Close terminal");
        break;
      case 'skills':
        appendTermOutput("Languages: Python (Advanced), Rust, Bash/Shell\nData & AI: Data Analysis libraries, AWS Educate ML\nTools: Git/GitHub, Windows CMD, Linux Terminal");
        break;
      case 'calisthenics':
        appendTermOutput("Executing physical protocol: Calisthenics push-up boost activated!");
        if (termWidget) {
          termWidget.classList.add('pushup');
          setTimeout(() => termWidget.classList.remove('pushup'), 500);
        }
        break;
      case 'about':
        appendTermOutput("Mohammad 'Mo' Haj Najafi - STEM Scholar, Developer, and Tactical Esports Competitor. Graduated High School with Highest Honors (20/20 Average). IELTS Band 9.");
        break;
      case 'esports':
        appendTermOutput("Valorant & Rainbow Six Siege: Top-rank competitive player. Specializing in high-pressure clutch scenarios and team coordination.");
        break;
      case 'matrix':
        appendTermOutput("Initializing Matrix digital rain...");
        triggerMatrixRain();
        break;
      case 'easteregg':
      case 'tetris':
      case 'konami':
        appendTermOutput("RETRO TETRIS ACTIVATED!\nKeybinds: [←/→] Move | [↑] Rotate | [↓] Soft Drop | [Q] Quit");
        triggerTetrisGame();
        break;
      case 'clear':
        if (termBody) {
          const outputs = termBody.querySelectorAll('.term-output');
          outputs.forEach(o => o.remove());
        }
        break;
      case 'exit':
      case 'quit':
        if (termWidget) termWidget.classList.remove('open');
        break;
      case '':
        break;
      default:
        appendTermOutput(`Command not recognized: '${cmd}'. Type 'help' for available commands.`);
        break;
    }
  }

  /* --------------------------------------------------------------------------
     7. RETRO TETRIS GAME IN TERMINAL (With On-Screen Keybinds)
     -------------------------------------------------------------------------- */
  function triggerTetrisGame() {
    if (!termBody) return;

    const tetrisDiv = document.createElement('div');
    tetrisDiv.className = 'term-output tetris-terminal-game';
    tetrisDiv.style.fontFamily = 'monospace';
    tetrisDiv.style.whiteSpace = 'pre';
    tetrisDiv.style.lineHeight = '1.1';
    tetrisDiv.style.color = 'var(--warning-color)';
    termBody.insertBefore(tetrisDiv, termBody.lastElementChild);

    const COLS = 10;
    const ROWS = 14;
    let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    let score = 0;
    let gameOver = false;

    const SHAPES = [
      [[1, 1, 1, 1]], // I
      [[1, 1], [1, 1]], // O
      [[0, 1, 0], [1, 1, 1]], // T
      [[1, 0, 0], [1, 1, 1]], // L
      [[0, 0, 1], [1, 1, 1]], // J
      [[0, 1, 1], [1, 1, 0]], // S
      [[1, 1, 0], [0, 1, 1]]  // Z
    ];

    let currentPiece = {
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      row: 0,
      col: 3
    };

    function drawBoard() {
      let displayBoard = board.map(row => row.map(cell => (cell ? '██' : '░░')));

      currentPiece.shape.forEach((r, ri) => {
        r.forEach((val, ci) => {
          if (val) {
            let tr = currentPiece.row + ri;
            let tc = currentPiece.col + ci;
            if (tr >= 0 && tr < ROWS && tc >= 0 && tc < COLS) {
              displayBoard[tr][tc] = '██';
            }
          }
        });
      });

      let output = `=== TETRIS === Score: ${score}\n`;
      output += displayBoard.map(row => row.join('')).join('\n');
      output += `\nKEYBINDS: [←/→] Move | [↑] Rotate | [↓] Drop | [Q] Quit\n`;
      tetrisDiv.textContent = output;
      termBody.scrollTop = termBody.scrollHeight;
    }

    function checkCollision(r, col, shape) {
      for (let ri = 0; ri < shape.length; ri++) {
        for (let ci = 0; ci < shape[ri].length; ci++) {
          if (shape[ri][ci]) {
            let tr = r + ri;
            let tc = col + ci;
            if (tc < 0 || tc >= COLS || tr >= ROWS) return true;
            if (tr >= 0 && board[tr][tc]) return true;
          }
        }
      }
      return false;
    }

    function mergePiece() {
      currentPiece.shape.forEach((r, ri) => {
        r.forEach((val, ci) => {
          if (val) {
            let tr = currentPiece.row + ri;
            let tc = currentPiece.col + ci;
            if (tr >= 0 && tr < ROWS && tc >= 0 && tc < COLS) {
              board[tr][tc] = 1;
            }
          }
        });
      });
    }

    function clearLines() {
      let cleared = 0;
      for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(cell => cell === 1)) {
          board.splice(r, 1);
          board.unshift(Array(COLS).fill(0));
          cleared++;
          r++;
        }
      }
      if (cleared > 0) {
        score += cleared * 100;
        playTone(880, 'sine', 0.15);
      }
    }

    function spawnPiece() {
      currentPiece = {
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        row: 0,
        col: 3
      };
      if (checkCollision(currentPiece.row, currentPiece.col, currentPiece.shape)) {
        gameOver = true;
        tetrisDiv.textContent += `\nGAME OVER! Score: ${score}. Type 'tetris' to play again.\n`;
        window.removeEventListener('keydown', handleKey);
      }
    }

    function handleKey(e) {
      if (gameOver) return;
      if (e.key === 'ArrowLeft') {
        if (!checkCollision(currentPiece.row, currentPiece.col - 1, currentPiece.shape)) {
          currentPiece.col--;
          drawBoard();
        }
      } else if (e.key === 'ArrowRight') {
        if (!checkCollision(currentPiece.row, currentPiece.col + 1, currentPiece.shape)) {
          currentPiece.col++;
          drawBoard();
        }
      } else if (e.key === 'ArrowDown') {
        if (!checkCollision(currentPiece.row + 1, currentPiece.col, currentPiece.shape)) {
          currentPiece.row++;
          drawBoard();
        }
      } else if (e.key === 'ArrowUp') {
        let rotated = currentPiece.shape[0].map((_, i) => currentPiece.shape.map(row => row[i]).reverse());
        if (!checkCollision(currentPiece.row, currentPiece.col, rotated)) {
          currentPiece.shape = rotated;
          drawBoard();
        }
      } else if (e.key.toLowerCase() === 'q') {
        gameOver = true;
        tetrisDiv.textContent += `\nGame Quit. Score: ${score}\n`;
        window.removeEventListener('keydown', handleKey);
      }
    }

    window.addEventListener('keydown', handleKey);

    const interval = setInterval(() => {
      if (gameOver) {
        clearInterval(interval);
        return;
      }
      if (!checkCollision(currentPiece.row + 1, currentPiece.col, currentPiece.shape)) {
        currentPiece.row++;
      } else {
        mergePiece();
        clearLines();
        spawnPiece();
      }
      drawBoard();
    }, 700);

    drawBoard();
  }

  function triggerMatrixRain() {
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
    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(7, 9, 15, 0.1)';
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
      if (frameCount > 120) {
        clearInterval(interval);
        canvas.remove();
      }
    }, 33);
  }

});
