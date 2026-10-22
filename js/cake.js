/* ==========================================================================
   Interactive Birthday Cake & Candle Ceremony
   ========================================================================== */

class BirthdayCakeCeremony {
  constructor() {
    this.isBlownOut = false;
    this.init();
  }

  init() {
    const blowBtn = document.getElementById('blow-candles-btn');
    const flames = document.querySelectorAll('.candle-flame');

    if (blowBtn) {
      blowBtn.addEventListener('click', () => this.blowCandles());
    }

    flames.forEach(flame => {
      flame.addEventListener('click', () => this.blowCandles());
    });
  }

  blowCandles() {
    if (this.isBlownOut) return;
    this.isBlownOut = true;

    const flames = document.querySelectorAll('.candle-flame');
    const smokes = document.querySelectorAll('.candle-smoke');
    const banner = document.getElementById('celebration-banner');
    const blowBtn = document.getElementById('blow-candles-btn');

    // Extinguish flames
    flames.forEach(flame => {
      flame.classList.add('blown-out');
    });

    // Animate smoke
    smokes.forEach(smoke => {
      smoke.classList.add('active');
    });

    // Play celebration audio arpeggio
    if (window.audioEngine) {
      window.audioEngine.playCelebrationTune();
    }

    // Trigger confetti explosions
    if (window.celestialCanvas) {
      const cakeEl = document.querySelector('.cake-visual-wrap');
      const rect = cakeEl ? cakeEl.getBoundingClientRect() : null;
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : window.innerHeight * 0.6;

      window.celestialCanvas.triggerConfettiBurst(x, y);

      // Subsequent bursts for maximum celebration!
      setTimeout(() => window.celestialCanvas.triggerConfettiBurst(x - 180, y - 50), 300);
      setTimeout(() => window.celestialCanvas.triggerConfettiBurst(x + 180, y - 50), 600);
      setTimeout(() => window.celestialCanvas.triggerConfettiBurst(x, y - 100), 1000);
    }

    // Update UI
    if (blowBtn) {
      blowBtn.style.display = 'none';
    }

    if (banner) {
      banner.classList.add('show');
      banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

window.BirthdayCakeCeremony = BirthdayCakeCeremony;
