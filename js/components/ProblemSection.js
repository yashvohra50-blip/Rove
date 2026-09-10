/**
 * ROVE — ProblemSection Component (Phase 3 Cinematic Transition)
 * "YOU PACK FOR THE TRIP."
 *          ↓
 * "ROVE PACKS FOR THE EXPERIENCE."
 * 
 * Features:
 * - Controlled scroll progression track
 * - Multi-plane typography scaling & vertical displacement
 * - Subtle architectural background imagery with deep radial vignette
 * - Clean responsive degradation on touch/mobile devices
 */

import { store } from '../store.js';

export class ProblemSection {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.rafId = null;
    this.isListening = false;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.setupScrollProgression();
  }

  render() {
    this.mountPoint.innerHTML = `
      <section class="problem-section" id="sectionProblem">
        
        <!-- Phase 3: Controlled Scroll Progression Track -->
        <div class="chapter-scroll-track" id="chapterScrollTrack">
          <div class="chapter-sticky-stage" id="chapterStickyStage">
            
            <!-- Subtle Architectural Background Imagery -->
            <div class="chapter-bg-layer" id="chapterBgLayer">
              <img 
                src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=85" 
                alt="Atmospheric architectural arches at twilight" 
                class="chapter-bg-image"
                loading="lazy"
              />
              <div class="chapter-bg-overlay"></div>
            </div>

            <!-- Central Editorial Typography Stage -->
            <div class="chapter-editorial-stage">
              
              <div class="chapter-badge-eyebrow" id="chapterEyebrow">
                <span class="caps-label-accent">CHAPTER 01</span>
                <span class="caps-label">· THE PARADIGM SHIFT</span>
              </div>

              <!-- Phrase 1: "YOU PACK FOR THE TRIP." -->
              <div class="chapter-phrase-1" id="chapterPhrase1">
                YOU PACK FOR THE TRIP.
              </div>

              <!-- Vertical Flow Connector -->
              <div class="chapter-connector" id="chapterConnector">
                <div class="chapter-connector-line" id="chapterConnectorLine"></div>
                <div class="chapter-connector-arrow">↓</div>
              </div>

              <!-- Phrase 2: "ROVE PACKS FOR THE EXPERIENCE." -->
              <div class="chapter-phrase-2" id="chapterPhrase2">
                ROVE PACKS FOR <span>THE EXPERIENCE.</span>
              </div>

            </div>

            <!-- Controlled Progress Indicator -->
            <div class="chapter-progress-strip" id="chapterProgressStrip">
              <span class="chapter-progress-label">TRANSITION</span>
              <div class="chapter-progress-pill">
                <div class="chapter-progress-bar" id="chapterProgressBar"></div>
              </div>
              <span class="chapter-progress-label" id="chapterProgressVal">01</span>
            </div>

          </div>
        </div>

        <!-- Part 2: Context Demonstration Case Study (Jaipur Archetype) & Call to Action -->
        <div class="container problem-context-stage">
          
          <!-- Context Demonstration Case Study (Jaipur Archetype) -->
          <div class="problem-context-card reveal-on-scroll">
            <div class="context-card-header">
              <div class="context-location">
                <span class="caps-label-accent">REAL-WORLD PROOF</span>
                <h3 style="font-family: var(--font-display); font-size: 1.75rem; letter-spacing: 0.05em; text-transform: uppercase;">
                  JAIPUR, RAJASTHAN
                </h3>
              </div>
              <div class="badge badge-accent">
                ACTIVE CONTEXT MODEL
              </div>
            </div>

            <!-- The Core 5 Atmospheric Signals -->
            <div class="context-meta-grid">
              <div class="context-stat-node">
                <span class="context-stat-value">5</span>
                <span class="context-stat-label">DAYS</span>
              </div>
              <div class="context-stat-node">
                <span class="context-stat-value">32°C</span>
                <span class="context-stat-label">ARID HEAT</span>
              </div>
              <div class="context-stat-node">
                <span class="context-stat-value">8 KM</span>
                <span class="context-stat-label">WALKING / DAY</span>
              </div>
              <div class="context-stat-node">
                <span class="context-stat-value">2</span>
                <span class="context-stat-label">HERITAGE DINNERS</span>
              </div>
              <div class="context-stat-node">
                <span class="context-stat-value">1</span>
                <span class="context-stat-label">CABIN BAG</span>
              </div>
            </div>
          </div>

          <!-- Emotional Call to Action -->
          <div class="problem-cta-moment reveal-on-scroll">
            <div class="problem-manifesto-line">
              LET'S PACK.
            </div>
            <p style="max-width: 44ch; text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem;">
              Not by cramming your entire closet into a suitcase, but by assembling an intelligent modular capsule engineered for where your feet will land.
            </p>
            <button class="btn btn-accent btn-lg" id="problemPackBtn">
              PLAN A TRIP WITH ROVE
            </button>
          </div>

        </div>

      </section>
    `;
  }

  bindEvents() {
    const btn = this.mountPoint.querySelector('#problemPackBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        store.openBuilder(1);
      });
    }
  }

  setupScrollProgression() {
    const track = this.mountPoint.querySelector('#chapterScrollTrack');
    const phrase1 = this.mountPoint.querySelector('#chapterPhrase1');
    const phrase2 = this.mountPoint.querySelector('#chapterPhrase2');
    const connectorLine = this.mountPoint.querySelector('#chapterConnectorLine');
    const bgLayer = this.mountPoint.querySelector('#chapterBgLayer');
    const progressBar = this.mountPoint.querySelector('#chapterProgressBar');
    const progressVal = this.mountPoint.querySelector('#chapterProgressVal');

    if (!track || !phrase1 || !phrase2) return;

    let ticking = false;

    const resetMobileStyles = () => {
      phrase1.style.opacity = '';
      phrase1.style.transform = '';
      phrase2.style.opacity = '';
      phrase2.style.transform = '';
      if (connectorLine) connectorLine.style.transform = '';
      if (bgLayer) {
        bgLayer.style.opacity = '';
        bgLayer.style.transform = '';
      }
      if (progressBar) progressBar.style.width = '100%';
      if (progressVal) progressVal.textContent = '02';
    };

    const updateProgression = () => {
      // Auto-cleanup if component was unmounted
      if (!track.isConnected) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        return;
      }

      const isDesktop = window.matchMedia('(min-width: 769px)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!isDesktop || prefersReducedMotion) {
        resetMobileStyles();
        ticking = false;
        return;
      }

      const rect = track.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrollableDist = rect.height - windowH;

      if (scrollableDist <= 0) {
        ticking = false;
        return;
      }

      // Normalized progress 0.0 to 1.0 through the track
      const rawProgress = -rect.top / scrollableDist;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // 1. Phrase 1: "YOU PACK FOR THE TRIP."
      // Prominent at start, scales down and fades out by 50% scroll
      if (progress < 0.48) {
        const p1Ratio = progress / 0.48;
        const opacity1 = Math.max(0.12, 1 - p1Ratio * 0.88);
        const scale1 = 1 - p1Ratio * 0.12;
        const translateY1 = -(p1Ratio * 32);
        phrase1.style.opacity = opacity1.toFixed(3);
        phrase1.style.transform = `translate3d(0, ${translateY1.toFixed(1)}px, 0) scale(${scale1.toFixed(3)})`;
      } else {
        phrase1.style.opacity = '0.12';
        phrase1.style.transform = 'translate3d(0, -32px, 0) scale(0.88)';
      }

      // 2. Connector Flow Line: expands downward
      if (connectorLine) {
        const lineScale = Math.max(0.15, Math.min(1, progress * 2));
        connectorLine.style.transform = `scaleY(${lineScale.toFixed(3)})`;
      }

      // 3. Phrase 2: "ROVE PACKS FOR THE EXPERIENCE."
      // Begins hidden, reveals starting at 24% scroll, reaches peak presence at 85%+
      if (progress < 0.22) {
        phrase2.style.opacity = '0';
        phrase2.style.transform = 'translate3d(0, 44px, 0) scale(0.86)';
      } else {
        const p2Ratio = Math.min(1, (progress - 0.22) / 0.65);
        const opacity2 = Math.min(1, p2Ratio * 1.3);
        const scale2 = 0.86 + p2Ratio * 0.18; // Scales up to 1.04
        const translateY2 = (1 - p2Ratio) * 44;
        phrase2.style.opacity = opacity2.toFixed(3);
        phrase2.style.transform = `translate3d(0, ${translateY2.toFixed(1)}px, 0) scale(${scale2.toFixed(3)})`;
      }

      // 4. Subtle Background Imagery Depth & Parallax
      if (bgLayer) {
        const bgOpacity = 0.15 + progress * 0.20;
        const bgTranslateY = -(progress * 28);
        bgLayer.style.opacity = bgOpacity.toFixed(3);
        bgLayer.style.transform = `translate3d(0, ${bgTranslateY.toFixed(1)}px, 0)`;
      }

      // 5. Progress Indicator
      if (progressBar) {
        progressBar.style.width = `${Math.round(progress * 100)}%`;
      }
      if (progressVal) {
        progressVal.textContent = progress > 0.5 ? '02' : '01';
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgression);
        ticking = true;
      }
    };

    const onResize = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgression);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    // Initial calculation
    updateProgression();
  }
}
