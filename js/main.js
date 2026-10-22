/* ==========================================================================
   Main Orchestrator: Gatekeeper Quiz, Photo Gallery, Countdown, & Progressive Reveal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Celestial Canvas
  window.celestialCanvas = new window.CelestialCanvas('celestial-canvas');

  // 2. Initialize Romantic Audio Engine
  window.audioEngine = new window.AmbientAudioEngine();
  setupAudioToggle();

  // 3. Initialize Gatekeeper Quiz (From Erfan's Handwritten Notes)
  initGatekeeperQuiz();

  // 4. Initialize Countdown Timer
  initMidnightCountdown();

  // 5. Initialize Wax Seal Envelope Opener
  initEnvelopeOpener();

  // 6. Initialize Nickname Garden
  initNicknameGarden();

  // 7. Render Subarna's Photo Gallery
  renderPhotoGallery();

  // 8. Render Letters Vault
  if (typeof window.renderLettersVault === 'function') {
    window.renderLettersVault();
  }

  // 9. Initialize 21 Reasons Grid
  render21Reasons();

  // 10. Initialize Birthday Cake Ceremony
  new window.BirthdayCakeCeremony();
});

// Ambient Audio Toggle Button
function setupAudioToggle() {
  const btn = document.getElementById('ambient-audio-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.audioEngine.toggle();
  });
}

/* ==========================================================================
   GATEKEEPER QUIZ (Erfan's Handwritten Questions)
   ========================================================================== */
const QUIZ_QUESTIONS = [
  {
    step: 1,
    eyebrow: "Question 01 of 03",
    question: "Do I (Erfan) love you?",
    type: "love_check",
    options: [
      { text: "No", correct: false, runaway: true, message: "Wrong answer! Are you crazy Puchu? Try again! 😤❤️" },
      { text: "Yes", correct: true, runaway: false, message: "Obviously! Forever and always! 🥰" }
    ]
  },
  {
    step: 2,
    eyebrow: "Question 02 of 03",
    question: "How much do I (Erfan) love you?",
    type: "multiple_choice",
    options: [
      { text: "A. 0", correct: false, message: "Zero?! Absolutely not! Try again! 🥺" },
      { text: "B. ∞ (Infinity)", correct: true, message: "Correct! To infinity and across all lifetimes! ✨" },
      { text: "C. I hate you", correct: false, message: "How dare you! Erfan adores you! Try again! 😤" }
    ]
  },
  {
    step: 3,
    eyebrow: "Question 03 of 03 • Final Question",
    question: "Who are you?",
    type: "multiple_choice",
    options: [
      { text: "A. Subarna Sultana", correct: false, message: "That's your name, but who are you to ME? Think deeper 🥺" },
      { text: "B. Erfan's wife", correct: true, message: "BINGO! My forever wife, my home, my Queen! ❤️" },
      { text: "C. Erfan's girlfriend", correct: false, message: "Technically yes, but you are so much more than that... think bigger 😉" }
    ]
  }
];

let currentQuizIndex = 0;

function initGatekeeperQuiz() {
  const overlay = document.getElementById('gatekeeper-overlay');
  if (!overlay) return;

  renderQuizStep(0);
}

function renderQuizStep(index) {
  currentQuizIndex = index;
  const q = QUIZ_QUESTIONS[index];
  const container = document.getElementById('quiz-options-container');
  const questionEl = document.getElementById('quiz-question-text');
  const eyebrowEl = document.getElementById('quiz-eyebrow-text');
  const toastEl = document.getElementById('quiz-toast');
  const dots = document.querySelectorAll('.quiz-dot');

  if (!q || !container || !questionEl) return;

  eyebrowEl.textContent = q.eyebrow;
  questionEl.textContent = q.question;
  toastEl.textContent = "";

  dots.forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i < index) dot.classList.add('completed');
    if (i === index) dot.classList.add('active');
  });

  // Render options
  container.innerHTML = q.options.map((opt, i) => {
    return `
      <button class="quiz-option-btn ${opt.runaway ? 'btn-runaway' : ''}" 
              data-index="${i}">
        ${opt.text}
      </button>
    `;
  }).join('');

  // Attach click & runaway listeners
  const buttons = container.querySelectorAll('.quiz-option-btn');
  buttons.forEach(btn => {
    const optIndex = parseInt(btn.dataset.index, 10);
    const opt = q.options[optIndex];

    if (opt.runaway) {
      // Playful runaway interaction on hover or tap attempt
      btn.addEventListener('mouseover', (e) => {
        const x = (Math.random() - 0.5) * 140;
        const y = (Math.random() - 0.5) * 80;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
    }

    btn.addEventListener('click', (e) => {
      handleQuizAnswer(opt, btn);
    });
  });
}

function handleQuizAnswer(opt, btn) {
  const toastEl = document.getElementById('quiz-toast');

  if (opt.correct) {
    btn.style.background = 'linear-gradient(135deg, rgba(46, 213, 115, 0.4), rgba(247, 215, 148, 0.3))';
    btn.style.borderColor = '#2ed573';
    toastEl.style.color = '#2ed573';
    toastEl.textContent = opt.message;

    if (window.audioEngine) window.audioEngine.playChime();

    if (window.celestialCanvas) {
      const rect = btn.getBoundingClientRect();
      window.celestialCanvas.triggerConfettiBurst(rect.left + rect.width / 2, rect.top);
    }

    setTimeout(() => {
      if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
        renderQuizStep(currentQuizIndex + 1);
      } else {
        // Passed all questions! Unlock site!
        finishGatekeeper();
      }
    }, 900);

  } else {
    btn.style.borderColor = '#ff4757';
    toastEl.style.color = '#ff6b81';
    toastEl.textContent = opt.message;

    // Shake animation
    btn.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(0)' }
    ], { duration: 350 });
  }
}

function finishGatekeeper() {
  const overlay = document.getElementById('gatekeeper-overlay');
  if (overlay) {
    overlay.classList.add('passed');
  }

  // Play "Dooron Dooron" song automatically upon entering
  if (window.audioEngine) {
    window.audioEngine.play();
  }

  // Large stardust burst
  if (window.celestialCanvas) {
    window.celestialCanvas.triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.4);
    setTimeout(() => window.celestialCanvas.triggerConfettiBurst(window.innerWidth * 0.3, window.innerHeight * 0.5), 300);
    setTimeout(() => window.celestialCanvas.triggerConfettiBurst(window.innerWidth * 0.7, window.innerHeight * 0.5), 600);
  }
}

/* ==========================================================================
   PHOTO GALLERY RENDERING (12 Photos)
   ========================================================================== */
const PHOTO_CAPTIONS = [
  "The smile that makes my entire world stop ❤️",
  "My absolute favorite human in the cosmos ✨",
  "Perfection in every single frame 🌸",
  "Puchu being the cutest girl on earth 🥺",
  "That gorgeous glow that lights up my life 🌟",
  "My forever peace and happy place 🕊️",
  "The girl who holds my whole heart 💖",
  "Pure radiance and effortless grace 🌷",
  "My beautiful Sonu baby 🥰",
  "Every picture of you is my favorite view 📸",
  "To 21 years of beauty, kindness, and love 🎂",
  "The sweetest soul who makes every second brighter 💫"
];

function renderPhotoGallery() {
  const container = document.getElementById('photo-gallery-grid');
  if (!container) return;

  const photos = [];
  for (let i = 1; i <= 12; i++) {
    const num = i < 10 ? '0' + i : i;
    photos.push({
      src: `assets/photos/photo_${num}.jpg`,
      caption: PHOTO_CAPTIONS[i - 1] || "My beautiful Puchu"
    });
  }

  container.innerHTML = photos.map((p, idx) => {
    return `
      <div class="polaroid-card" onclick="openPhotoModal('${p.src}', '${p.caption.replace(/'/g, "\\'")}')">
        <div class="polaroid-img-wrap">
          <img src="${p.src}" alt="Subarna Sultana Photo ${idx + 1}" loading="lazy" />
        </div>
        <span class="polaroid-note">${p.caption}</span>
      </div>
    `;
  }).join('');
}

function openPhotoModal(src, caption) {
  const modal = document.getElementById('letter-modal');
  const body = document.getElementById('modal-letter-body');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="text-align: center;">
      <div style="max-height: 72vh; overflow: hidden; border-radius: 8px; border: 1px solid var(--border-gold); background: #000; box-shadow: 0 10px 40px rgba(0,0,0,0.7); margin-bottom: 16px;">
        <img src="${src}" alt="Photo" style="width: 100%; height: auto; max-height: 70vh; object-fit: contain; display: block;" />
      </div>
      <p style="font-family: var(--font-handwriting); font-size: 1.6rem; color: var(--gold-primary); margin: 8px 0;">${caption}</p>
      <a href="${src}" target="_blank" class="btn-outline" style="margin-top: 10px; display: inline-block;">🔍 Open Full Resolution</a>
    </div>
  `;

  modal.classList.add('open');
  if (window.audioEngine) window.audioEngine.playChime();
}

window.openPhotoModal = openPhotoModal;

/* ==========================================================================
   COUNTDOWN & ENVELOPE
   ========================================================================== */
function initMidnightCountdown() {
  const targetDate = new Date('2026-10-23T00:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const daysEl = document.getElementById('count-days');
    const hoursEl = document.getElementById('count-hours');
    const minsEl = document.getElementById('count-mins');
    const secsEl = document.getElementById('count-secs');

    if (diff <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';

      const subtitle = document.querySelector('.gateway-subtitle');
      if (subtitle) {
        subtitle.innerHTML = '✨ It is October 23rd! <strong>Happy 21st Birthday, Sonu!</strong> Every star in the sky is shining for you tonight. ✨';
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

function initEnvelopeOpener() {
  const envelope = document.getElementById('interactive-envelope');
  const chapters = document.getElementById('chapters-container');

  if (!envelope) return;

  envelope.addEventListener('click', () => {
    if (window.audioEngine) window.audioEngine.playChime();
    if (window.celestialCanvas) {
      window.celestialCanvas.triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.5);
    }

    envelope.style.transform = 'scale(0.96) translateY(-10px)';
    const flap = envelope.querySelector('.envelope-flap');
    if (flap) {
      flap.style.transform = 'rotateX(180deg)';
      flap.style.zIndex = '1';
    }

    setTimeout(() => {
      if (chapters) {
        chapters.style.display = 'flex';
        chapters.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 450);
  });
}

/* ==========================================================================
   NICKNAMES & 21 REASONS
   ========================================================================== */
const NICKNAMES_INFO = {
  'Sonu': '“My quiet warmth, my steady light in every dark room.”',
  'Baby': '“The one I want to pamper, protect, and hold close forever.”',
  'Puchu': '“My favorite little trouble with the sweetest smile in this entire universe!”',
  'Sonu baby': '“The love of my life, the keeper of my heart, and my forever home.”'
};

function initNicknameGarden() {
  const chips = document.querySelectorAll('.nickname-chip');
  const toast = document.getElementById('nickname-toast-message');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const name = chip.dataset.name;
      if (toast && NICKNAMES_INFO[name]) {
        toast.style.opacity = '0';
        setTimeout(() => {
          toast.textContent = NICKNAMES_INFO[name];
          toast.style.opacity = '1';
        }, 150);
      }

      if (window.audioEngine) window.audioEngine.playChime();
    });
  });
}

const REASONS = [
  "The gentle warmth in your voice when you say my name.",
  "How you make 1,000 miles feel like zero with just one phone call.",
  "Your beautiful, radiant laugh that cures my hardest days.",
  "The way you care so deeply about the people you love.",
  "Your stubborn little pouts when you want your way (and get it!).",
  "How adorable you look whenever you get shy or blush.",
  "You are the strongest, most resilient person I know.",
  "The peace I feel just knowing you are in my life.",
  "How passionately you dream and talk about your goals.",
  "You understand my silence just as well as my words.",
  "The way your eyes crinkle when you laugh uncontrollably.",
  "Because you are my favorite midnight thought and morning wish.",
  "Your pure heart that always sees good in others.",
  "How safe and secure I feel when I share my secrets with you.",
  "The sweetest little handwritten notes you write.",
  "How effortlessly you make every ordinary day feel like magic.",
  "Because you are my best friend and soulmate in one person.",
  "The way you believe in me even when I doubt myself.",
  "How cute you are when you get sleepy while talking to me.",
  "You gave the word 'home' a heartbeat and a name: Subarna.",
  "Because I want to celebrate every single one of your birthdays for the rest of my life."
];

function render21Reasons() {
  const container = document.getElementById('reasons-cards-grid');
  if (!container) return;

  container.innerHTML = REASONS.map((reason, index) => {
    const num = index + 1;
    return `
      <div class="reason-card" onclick="this.classList.toggle('flipped'); if(window.audioEngine) window.audioEngine.playChime();">
        <div class="reason-inner">
          <div class="reason-front">
            <span class="reason-number">${num < 10 ? '0' + num : num}</span>
            <span class="reason-front-hint">Tap to Reveal</span>
          </div>
          <div class="reason-back">
            <p>${reason}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
}


