/* ==========================================================================
   Stardust, Fireflies & Confetti Physics Engine
   ========================================================================== */

class CelestialCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.confetti = [];
    this.width = 0;
    this.height = 0;
    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles(75);
    this.loop();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35 - 0.1,
        color: Math.random() > 0.4 ? '#f7d794' : (Math.random() > 0.5 ? '#f78fb3' : '#ffffff'),
        pulse: Math.random() * 0.03 + 0.01
      });
    }
  }

  triggerConfettiBurst(originX, originY) {
    const colors = ['#f7d794', '#f78fb3', '#ff6b81', '#70a1ff', '#eccc68', '#ffffff', '#ff4757'];
    for (let i = 0; i < 160; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3;
      this.confetti.push({
        x: originX || this.width / 2,
        y: originY || this.height * 0.6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        life: 1,
        decay: Math.random() * 0.008 + 0.004,
        gravity: 0.18
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render Stardust / Fireflies
    for (let p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around screen
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      p.alpha += Math.sin(Date.now() * 0.002 + p.x) * 0.008;
      const clampedAlpha = Math.max(0.1, Math.min(0.9, p.alpha));

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = clampedAlpha;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.restore();
    }

    // Render Confetti
    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const c = this.confetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.vx *= 0.99;
      c.rotation += c.rotationSpeed;
      c.life -= c.decay;

      if (c.life <= 0 || c.y > this.height + 50) {
        this.confetti.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate((c.rotation * Math.PI) / 180);
      this.ctx.fillStyle = c.color;
      this.ctx.globalAlpha = Math.max(0, c.life);
      this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.7);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

window.CelestialCanvas = CelestialCanvas;
