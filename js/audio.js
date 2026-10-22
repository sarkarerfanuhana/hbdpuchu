/* ==========================================================================
   Romantic Ambient Audio Engine ("Dooron Dooron" by Paresh Pahuja)
   With seamless HTML5 Audio streaming & Web Audio Fallback
   ========================================================================== */

class RomanticAudioEngine {
  constructor() {
    this.audio = new Audio('assets/dooron_dooron.mp3');
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.isPlaying = false;

    // Web Audio Context for chimes and fallback
    this.ctx = null;

    // Monitor playback errors or ends
    this.audio.addEventListener('error', (e) => {
      console.warn('Custom song error, falling back to ambient synth:', e);
    });
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play() {
    this.ensureContext();
    return this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateUI(true);
      return true;
    }).catch(err => {
      console.log('Audio autoplay prevented or waiting for interaction:', err);
      this.isPlaying = false;
      this.updateUI(false);
      return false;
    });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  updateUI(playing) {
    const btn = document.getElementById('ambient-audio-toggle');
    if (!btn) return;
    if (playing) {
      btn.classList.add('playing');
      btn.querySelector('.pill-text').textContent = 'Dooron Dooron ♫';
    } else {
      btn.classList.remove('playing');
      btn.querySelector('.pill-text').textContent = 'Play Song ♫';
    }
  }

  // Playful sweet chime for correct quiz answers / interactions
  playChime() {
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.0001, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.06, now + i * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.2);
      });
    } catch (e) {
      // Ignore audio chime errors
    }
  }

  // Celebratory birthday arpeggio when blowing out candles
  playCelebrationTune() {
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const melody = [
        { f: 392.00, d: 0.25 },
        { f: 392.00, d: 0.25 },
        { f: 440.00, d: 0.5 },
        { f: 392.00, d: 0.5 },
        { f: 523.25, d: 0.5 },
        { f: 493.88, d: 1.0 }
      ];

      let t = now;
      melody.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, t);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.12, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + note.d * 1.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + note.d * 1.5);
        t += note.d * 0.55;
      });
    } catch (e) {
      // Ignore
    }
  }
}

window.AmbientAudioEngine = RomanticAudioEngine;
