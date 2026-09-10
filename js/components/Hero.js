/**
 * ROVE — Hero Component (Phase 2 Refined)
 * Editorial Fashion Campaign Atmosphere with Subdued Multi-Layer Parallax
 * Atmospheric Lighting, Smooth Typography Entrance, and Polished Micro-Interactions
 */

import { store } from '../store.js';

export class Hero {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.rafId = null;
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
        
        <!-- Multi-Plane Background Depth Layers -->
        <div class="hero-visual-layer" id="heroVisualLayer">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85" 
            alt="Editorial traveler with bespoke luggage in dramatic architectural setting" 
            class="hero-visual-image"
            id="heroImage"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        <!-- Atmospheric Vignettes, Film Grain & Ambient Lighting -->
        <div class="hero-overlay"></div>
        <div class="hero-grain-overlay"></div>
        <div class="hero-ambient-pulse"></div>
        <div class="hero-glow-layer" id="heroGlow"></div>

        <!-- Foreground Hero Content (Staggered Cinematic Entrance) -->
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

        <!-- Floating Corner Destination Context -->
        <div class="hero-destination-callout" id="heroDestCallout">
          <span class="hero-destination-label">EDITORIAL CASE STUDY</span>
          <span class="hero-destination-value">JAIPUR · 32°C · 5 DAYS · 1 BAG</span>
        </div>

        <!-- Minimalist Flow Scroll Indicator -->
        <a href="#sectionProblem" class="hero-scroll-indicator" id="heroScrollCue" aria-label="Scroll to discover ROVE concept">
          <span class="hero-scroll-text">DISCOVER</span>
          <div class="hero-scroll-line-box">
            <div class="hero-scroll-indicator-bar"></div>
          </div>
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

    const scrollCue = this.mountPoint.querySelector('#heroScrollCue');
    if (scrollCue) {
      scrollCue.addEventListener('click', (e) => {
        e.preventDefault();
        const problemSection = document.getElementById('sectionProblem');
        if (problemSection) {
          problemSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  setupParallax() {
    // Check for pointer device capabilities and user reduced-motion preferences
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    const heroSection = this.mountPoint.querySelector('#heroSection');
    const visualLayer = this.mountPoint.querySelector('#heroVisualLayer');
    const heroContent = this.mountPoint.querySelector('#heroContent');
    const destCallout = this.mountPoint.querySelector('#heroDestCallout');
    const heroGlow = this.mountPoint.querySelector('#heroGlow');

    if (!heroSection || !visualLayer) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let glowTargetX = 0;
    let glowTargetY = 0;
    let glowCurrentX = 0;
    let glowCurrentY = 0;
    let isHovering = false;

    const onMouseMove = (e) => {
      const rect = heroSection.getBoundingClientRect();
      if (!isHovering) {
        isHovering = true;
        if (heroGlow) heroGlow.classList.add('is-active');
      }

      // Calculate normalized coordinates (-1 to +1 from viewport center)
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Glow coordinates relative to hero container
      glowTargetX = e.clientX - rect.left;
      glowTargetY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      if (heroGlow) heroGlow.classList.remove('is-active');
      isHovering = false;
    };

    heroSection.addEventListener('mousemove', onMouseMove, { passive: true });
    heroSection.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // 60fps Smooth Organic Lerp Loop
    const renderFrame = () => {
      // Damped interpolation (0.055 lerp factor provides silk-like motion)
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      // Layer 1: Background Visual (-16px max pan)
      const bgX = currentX * -16;
      const bgY = currentY * -12;
      visualLayer.style.transform = `translate3d(${bgX.toFixed(2)}px, ${bgY.toFixed(2)}px, 0)`;

      // Layer 2: Foreground Content Counter-Movement (+8px depth)
      if (heroContent) {
        const contentX = currentX * 8;
        const contentY = currentY * 6;
        heroContent.style.transform = `translate3d(${contentX.toFixed(2)}px, ${contentY.toFixed(2)}px, 0)`;
      }

      // Layer 3: Floating Corner Badge (+12px depth)
      if (destCallout) {
        const calloutX = currentX * 12;
        const calloutY = currentY * 8;
        destCallout.style.transform = `translate3d(${calloutX.toFixed(2)}px, ${calloutY.toFixed(2)}px, 0)`;
      }

      // Layer 4: Organic Ambient Cursor Glow
      if (heroGlow && isHovering) {
        glowCurrentX += (glowTargetX - glowCurrentX) * 0.08;
        glowCurrentY += (glowTargetY - glowCurrentY) * 0.08;
        heroGlow.style.left = `${glowCurrentX.toFixed(1)}px`;
        heroGlow.style.top = `${glowCurrentY.toFixed(1)}px`;
      }

      this.rafId = requestAnimationFrame(renderFrame);
    };

    this.rafId = requestAnimationFrame(renderFrame);
  }
}
