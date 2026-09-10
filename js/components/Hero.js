/**
 * ROVE — Hero Component
 * Cinematic Fashion Campaign Atmosphere with Subdued Cursor Parallax
 */

import { store } from '../store.js';

export class Hero {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.setupParallax();
  }

  render() {
    this.mountPoint.innerHTML = `
      <section class="hero-section" id="heroSection" aria-label="ROVE Travel Wardrobe Hero">
        <!-- Parallax Background Layer -->
        <div class="hero-visual-layer" id="heroVisualLayer">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85" 
            alt="Editorial traveler with bespoke travel luggage in dramatic architectural setting" 
            class="hero-visual-image"
            id="heroImage"
            loading="eager"
          />
        </div>

        <!-- Atmospheric Vignettes & Shaders -->
        <div class="hero-overlay"></div>
        <div class="hero-glow-layer" id="heroGlow"></div>

        <!-- Foreground Hero Content -->
        <div class="hero-content" id="heroContent">
          <div class="hero-eyebrow">
            <span class="hero-eyebrow-line"></span>
            <span class="hero-eyebrow-text">ROVE INTELLIGENCE</span>
            <span class="hero-eyebrow-line"></span>
          </div>

          <h1 class="hero-headline" id="heroMainHeadline">
            PACK FOR WHERE YOU'RE GOING.
          </h1>

          <p class="hero-subtitle">
            Tell ROVE about your trip. We'll figure out what you should wear.
          </p>

          <div class="hero-ctas">
            <button class="btn btn-primary btn-lg" id="heroBuildTripBtn">
              BUILD MY TRIP
            </button>
            <a href="#sectionProblem" class="btn btn-secondary btn-lg" id="heroExploreBtn">
              EXPLORE ROVE
            </a>
          </div>
        </div>

        <!-- Corner Destination Callout -->
        <div class="hero-destination-callout">
          <span class="hero-destination-label">EDITORIAL CASE STUDY</span>
          <span class="hero-destination-value">JAIPUR · 32°C · 5 DAYS · 1 BAG</span>
        </div>

        <!-- Bottom Scroll Cue -->
        <a href="#sectionProblem" class="hero-scroll-indicator" aria-label="Scroll to discover ROVE concept">
          <span class="hero-scroll-text">DISCOVER</span>
          <div class="hero-scroll-line"></div>
        </a>
      </section>
    `;
  }

  bindEvents() {
    const buildBtn = this.mountPoint.querySelector('#heroBuildTripBtn');
    if (buildBtn) {
      buildBtn.addEventListener('click', () => {
        store.openBuilder(1);
      });
    }
  }

  setupParallax() {
    // Only enable subtle parallax on non-touch desktop screens
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const heroSection = this.mountPoint.querySelector('#heroSection');
    const visualLayer = this.mountPoint.querySelector('#heroVisualLayer');
    const heroContent = this.mountPoint.querySelector('#heroContent');
    const heroGlow = this.mountPoint.querySelector('#heroGlow');

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const onMouseMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      // Calculate normalized coords (-1 to +1)
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      if (heroGlow) {
        heroGlow.style.left = `${e.clientX}px`;
        heroGlow.style.top = `${e.clientY}px`;
      }
    };

    heroSection.addEventListener('mousemove', onMouseMove, { passive: true });

    // Smooth interpolated rendering loop
    const animate = () => {
      // Gentle dampening
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (visualLayer) {
        // Very subtle background movement (-12px to +12px)
        const bgX = currentX * -12;
        const bgY = currentY * -10;
        visualLayer.style.transform = `translate3d(${bgX}px, ${bgY}px, 0)`;
      }

      if (heroContent) {
        // Counter typography movement for depth (+6px to -6px)
        const textX = currentX * 6;
        const textY = currentY * 5;
        heroContent.style.transform = `translate3d(${textX}px, ${textY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
  }
}
