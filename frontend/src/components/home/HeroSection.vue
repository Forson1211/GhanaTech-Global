<template>
  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="hero-background" aria-hidden="true">
      <div class="hero-glow hero-glow-lilac" />
      <div class="hero-glow hero-glow-blue" />
      <div class="hero-orbit hero-orbit-right" />
      <div class="hero-orbit hero-orbit-left" />
      <span v-for="(particle, index) in particles" :key="index" class="hero-particle" :style="particle" />
    </div>
    <div class="hero-container">
      <div class="hero-copy">
        <p class="hero-eyebrow">GhanaTech Global</p>
        <h1 id="home-hero-title">Find your dream<br />remote jobs here</h1>
        <p class="hero-description">Connect with U.S. companies, explore remote technology roles, and build your next chapter from Ghana.</p>
        <div class="hero-actions">
          <router-link to="/jobs" class="hero-primary">Explore remote jobs <ArrowRight :size="20" aria-hidden="true" /></router-link>
          <router-link to="/hire-talent" class="hero-secondary">Hire talent</router-link>
        </div>
      </div>
      <div class="hero-visual">
        <img src="/images/talent-hero-transparent.png" alt="Ghanaian technology professional" width="620" height="600" fetchpriority="high" />
      </div>
    </div>
    <div class="hero-curve" aria-hidden="true">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" focusable="false">
        <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="#fff" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';

const particles = Array.from({ length: 12 }, (_, index) => ({
  '--x': `${(index * 23 + 7) % 100}%`,
  '--y': `${(index * 17 + 13) % 88}%`,
  '--size': `${4 + index % 3 * 2}px`,
  '--duration': `${14 + index % 4 * 4}s`,
  '--delay': `${-index * 3}s`,
}));
</script>

<style scoped>
.home-hero { position: relative; display: flex; align-items: center; min-height: 100vh; min-height: 100svh; padding: 120px 0 80px; background: linear-gradient(120deg, #6527c8, #4c1d95); color: #fff; overflow: hidden; }
.hero-background { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.hero-glow { position: absolute; width: 680px; height: 680px; border-radius: 50%; animation: hero-glow-drift 24s ease-in-out infinite alternate; }
.hero-glow-lilac { top: -320px; left: -120px; background: radial-gradient(circle, #c4b5fd33, #b496f512 40%, transparent 68%); }
.hero-glow-blue { right: -100px; bottom: -220px; background: radial-gradient(circle, #93c5fd26, #a78bfa14 42%, transparent 68%); animation-delay: -12s; animation-duration: 30s; }
.hero-orbit { position: absolute; border: 1px solid #ffffff2b; border-radius: 50%; animation: hero-orbit-turn 80s linear infinite; }
.hero-orbit::before { content: ''; position: absolute; inset: 40px; border: 1px dashed #ffffff22; border-radius: inherit; animation: hero-ring-breathe 10s ease-in-out infinite; }
.hero-orbit::after { content: ''; position: absolute; top: 50%; left: -4px; width: 8px; height: 8px; border-radius: 50%; background: #ddd6fe80; box-shadow: 0 0 18px #ddd6fe55; }
.hero-orbit-right { width: 640px; height: 640px; top: -180px; right: -170px; }
.hero-orbit-left { width: 470px; height: 470px; bottom: -230px; left: -220px; animation-direction: reverse; animation-duration: 100s; }
.hero-particle { position: absolute; left: var(--x); top: var(--y); width: var(--size); height: var(--size); border-radius: 50%; background: #ede9fe; opacity: .25; animation: hero-particle-drift var(--duration) ease-in-out var(--delay) infinite alternate; }
@keyframes hero-glow-drift { from { transform: translate3d(0, 0, 0) scale(1); } to { transform: translate3d(70px, 45px, 0) scale(1.12); } }
@keyframes hero-orbit-turn { to { transform: rotate(360deg); } }
@keyframes hero-ring-breathe { 0%, 100% { transform: scale(1); opacity: .7; } 50% { transform: scale(1.025); opacity: 1; } }
@keyframes hero-particle-drift { from { transform: translate3d(0, 15px, 0); opacity: .15; } to { transform: translate3d(18px, -35px, 0); opacity: .4; } }
.hero-container { position: relative; z-index: 1; width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: 1.1fr 1fr; align-items: center; gap: 56px; }
.hero-curve { position: absolute; bottom: -2px; left: 0; right: 0; z-index: 2; line-height: 0; pointer-events: none; }
.hero-curve svg { display: block; width: 100%; height: clamp(48px, 7vw, 96px); }
.hero-copy { padding: 32px 0 80px; }
.hero-eyebrow { margin-bottom: 24px; color: #eee4ff; font-size: 16px; font-weight: 600; }
.hero-copy h1 { max-width: 650px; font-size: clamp(40px, 4.8vw, 64px); line-height: 1.12; font-weight: 800; letter-spacing: -1.8px; color: #fff; }
.hero-description { max-width: 490px; margin-top: 28px; font-size: 18px; line-height: 1.8; color: #eee4ff; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 34px; }
.hero-actions a { display: inline-flex; align-items: center; justify-content: center; gap: 12px; padding: 15px 24px; border-radius: 8px; font-size: 16px; font-weight: 700; text-decoration: none; transition: background .2s; }
.hero-primary { background: #fff; color: #5b21b6; }
.hero-primary:hover { background: #eee4ff; }
.hero-secondary { border: 1px solid #ffffff80; color: #fff; }
.hero-secondary:hover { background: #ffffff15; }
.hero-actions a:focus-visible { outline: 3px solid #ddd6fe; outline-offset: 4px; }
.hero-visual { align-self: end; display: flex; align-items: flex-end; justify-content: center; min-width: 0; }
.hero-visual img { display: block; width: 100%; max-width: 560px; height: auto; max-height: 560px; object-fit: contain; object-position: bottom; }
@media (max-width: 900px) {
  .home-hero { padding-top: 110px; }
  .hero-container { gap: 24px; }
  .hero-copy { padding-bottom: 56px; }
  .hero-copy h1 { font-size: 44px; }
}
@media (max-width: 767px) {
  .home-hero { padding: 100px 0 48px; }
  .hero-glow { width: 450px; height: 450px; }
  .hero-glow-lilac { top: -160px; left: -180px; }
  .hero-glow-blue { right: -180px; bottom: -80px; }
  .hero-orbit-right { width: 420px; height: 420px; top: -100px; right: -230px; }
  .hero-orbit-left, .hero-particle:nth-of-type(n + 7) { display: none; }
  .hero-container { grid-template-columns: 1fr; gap: 28px; padding: 0 20px; }
  .hero-copy { padding: 20px 0 0; text-align: center; }
  .hero-eyebrow { margin-bottom: 20px; }
  .hero-copy h1 { font-size: clamp(36px, 7vw, 48px); letter-spacing: -1px; }
  .hero-description { margin: 22px auto 0; font-size: 17px; }
  .hero-actions { margin-top: 28px; gap: 12px; justify-content: center; }
  .hero-actions a { padding: 14px 18px; }
  .hero-visual img { max-width: 340px; max-height: 340px; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-glow, .hero-orbit, .hero-orbit::before, .hero-particle { animation: none; }
}
</style>
