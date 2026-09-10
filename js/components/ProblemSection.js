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
    this.setupJaipurStoryProgression();
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

        <!-- Part 2: Phase 4 Cinematic Trip Context Story (Jaipur Archetype) -->
        <div class="context-story-section" id="contextStorySection">
          
          <!-- Scroll Progression Track for Desktop -->
          <div class="context-story-track" id="jaipurStoryTrack">
            <div class="context-story-stage" id="jaipurStoryStage">
              
              <!-- Dynamic Environmental Background & Atmospheric Shift -->
              <div class="context-story-env" id="jaipurStoryEnv">
                <div class="env-bg-image-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=85" 
                    alt="Jaipur Rajasthan architectural arches and warm sandstone atmosphere" 
                    class="env-bg-image"
                    id="jaipurEnvImage"
                    loading="lazy"
                  />
                  <div class="env-bg-overlay" id="jaipurEnvOverlay"></div>
                </div>
                <!-- Ambient Color Bloom changing subtly per step -->
                <div class="env-ambient-glow" id="jaipurAmbientGlow"></div>
              </div>

              <!-- Stage Header & Context Eyebrow -->
              <div class="context-stage-top">
                <div class="context-eyebrow-pill">
                  <span class="caps-label-accent">THE CONTEXT ENGINE</span>
                  <span class="eyebrow-separator">·</span>
                  <span class="caps-label" id="jaipurStepLabel">STEP 01 OF 07</span>
                </div>
              </div>

              <!-- Central Sequence Stage: Each Item Becomes Visual Focus One at a Time -->
              <div class="context-sequence-container" id="jaipurSequenceContainer">
                
                <!-- Step 1: JAIPUR -->
                <div class="context-seq-item" data-step="0">
                  <span class="seq-sub-label">01 / DESTINATION</span>
                  <h2 class="seq-headline">JAIPUR</h2>
                  <p class="seq-descriptor">Rajasthan · Arid desert gateway & monumental pink stone</p>
                </div>

                <!-- Step 2: 32°C -->
                <div class="context-seq-item" data-step="1">
                  <span class="seq-sub-label">02 / CLIMATE SIGNAL</span>
                  <h2 class="seq-headline">32°C</h2>
                  <p class="seq-descriptor">High diurnal heat · Demands high-twist breathable linen & open-weave tailoring</p>
                </div>

                <!-- Step 3: 5 DAYS -->
                <div class="context-seq-item" data-step="2">
                  <span class="seq-sub-label">03 / DURATION</span>
                  <h2 class="seq-headline">5 DAYS</h2>
                  <p class="seq-descriptor">Modular wardrobe cycle · 6 garments rotate into 8 distinct silhouettes</p>
                </div>

                <!-- Step 4: 8 KM / DAY -->
                <div class="context-seq-item" data-step="3">
                  <span class="seq-sub-label">04 / MOVEMENT & TERRAIN</span>
                  <h2 class="seq-headline">8 KM / DAY</h2>
                  <p class="seq-descriptor">Historic fort ramparts & cobblestones · Dual-density technical footwear</p>
                </div>

                <!-- Step 5: 2 DINNERS -->
                <div class="context-seq-item" data-step="4">
                  <span class="seq-sub-label">05 / EVENING CONTEXT</span>
                  <h2 class="seq-headline">2 DINNERS</h2>
                  <p class="seq-descriptor">Haveli courtyards & rooftop sunsets · Elevated unstructured evening blazers</p>
                </div>

                <!-- Step 6: 1 BAG -->
                <div class="context-seq-item" data-step="5">
                  <span class="seq-sub-label">06 / THE CONSTRAINT</span>
                  <h2 class="seq-headline">1 BAG</h2>
                  <p class="seq-descriptor">38L Cabin specification · Zero checked luggage · Absolute travel freedom</p>
                </div>

                <!-- Step 7: LET'S PACK. -->
                <div class="context-seq-item" data-step="6">
                  <span class="seq-sub-label">07 / THE RESOLUTION</span>
                  <h2 class="seq-headline seq-headline-accent">LET'S PACK.</h2>
                  <p class="seq-descriptor">Capsule synthesized. 6 pieces. 2 shoes. 1 bag. Zero excess.</p>
                  <div class="seq-action-wrap">
                    <button class="btn btn-accent btn-lg" id="problemPackBtn">
                      PLAN A TRIP WITH ROVE
                    </button>
                  </div>
                </div>

              </div>

              <!-- Connector & Step Indicators -->
              <div class="context-stage-bottom">
                <div class="context-step-connector">
                  <span class="context-connector-arrow">↓</span>
                </div>
                <div class="context-timeline-dots" id="jaipurTimelineDots">
                  <span class="t-dot is-active" data-index="0"></span>
                  <span class="t-dot" data-index="1"></span>
                  <span class="t-dot" data-index="2"></span>
                  <span class="t-dot" data-index="3"></span>
                  <span class="t-dot" data-index="4"></span>
                  <span class="t-dot" data-index="5"></span>
                  <span class="t-dot" data-index="6"></span>
                </div>
              </div>

            </div>
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

  setupJaipurStoryProgression() {
    const track = this.mountPoint.querySelector('#jaipurStoryTrack');
    const items = this.mountPoint.querySelectorAll('.context-seq-item');
    const stepLabel = this.mountPoint.querySelector('#jaipurStepLabel');
    const ambientGlow = this.mountPoint.querySelector('#jaipurAmbientGlow');
    const envImage = this.mountPoint.querySelector('#jaipurEnvImage');
    const dots = this.mountPoint.querySelectorAll('.context-timeline-dots .t-dot');
    const connectorArrow = this.mountPoint.querySelector('.context-connector-arrow');

    if (!track || !items.length) return;

    // Environmental glow colors per step (subtle, atmospheric, deep luxury tones)
    const envGlows = [
      'radial-gradient(circle at 50% 50%, rgba(214, 118, 92, 0.20) 0%, transparent 70%)',  // 0: Jaipur (Sandstone Terracotta)
      'radial-gradient(circle at 50% 50%, rgba(235, 145, 45, 0.22) 0%, transparent 70%)',  // 1: 32°C (Arid Heat / Solar Gold)
      'radial-gradient(circle at 50% 50%, rgba(212, 175, 122, 0.18) 0%, transparent 70%)', // 2: 5 Days (Capsule Rotation)
      'radial-gradient(circle at 50% 50%, rgba(165, 155, 130, 0.18) 0%, transparent 70%)', // 3: 8 KM/Day (Dust Stone / Cobblestone)
      'radial-gradient(circle at 50% 50%, rgba(100, 80, 155, 0.24) 0%, transparent 70%)',  // 4: 2 Dinners (Twilight Palace Indigo)
      'radial-gradient(circle at 50% 50%, rgba(200, 210, 220, 0.16) 0%, transparent 70%)', // 5: 1 Bag (Cabin Minimalist Obsidian)
      'radial-gradient(circle at 50% 50%, rgba(212, 175, 122, 0.38) 0%, transparent 75%)'  // 6: Let's Pack (Champagne Gold Resolution)
    ];

    const stepTitles = [
      'STEP 01 OF 07',
      'STEP 02 OF 07',
      'STEP 03 OF 07',
      'STEP 04 OF 07',
      'STEP 05 OF 07',
      'STEP 06 OF 07',
      'STEP 07 OF 07'
    ];

    let ticking = false;
    let observer = null;

    const resetMobileStyles = () => {
      items.forEach(item => {
        item.style.opacity = '';
        item.style.transform = '';
        item.style.visibility = '';
        item.style.pointerEvents = '';
      });
      if (ambientGlow) ambientGlow.style.background = '';
      if (envImage) envImage.style.transform = '';
      if (stepLabel) stepLabel.textContent = 'STEP 01 OF 07';
      dots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === 0));
      if (connectorArrow) connectorArrow.style.opacity = '';
    };

    const updateDesktopProgression = () => {
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

      const rawProgress = -rect.top / scrollableDist;
      const progress = Math.max(0, Math.min(1, rawProgress));

      const numSteps = items.length; // 7 steps
      const activeFloatIndex = progress * (numSteps - 1);
      const activeStepIndex = Math.min(numSteps - 1, Math.max(0, Math.round(activeFloatIndex)));

      // Update Top Step Pill & Timeline Dots
      if (stepLabel && stepTitles[activeStepIndex]) {
        stepLabel.textContent = stepTitles[activeStepIndex];
      }
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === activeStepIndex);
      });

      // Update Background Ambient Glow & Subtle Parallax
      if (ambientGlow && envGlows[activeStepIndex]) {
        ambientGlow.style.background = envGlows[activeStepIndex];
      }
      if (envImage) {
        const imgScale = 1.02 + progress * 0.06;
        const imgTranslateY = -(progress * 35);
        envImage.style.transform = `scale(${imgScale.toFixed(3)}) translate3d(0, ${imgTranslateY.toFixed(1)}px, 0)`;
      }

      // Hide or fade down connector arrow on final step
      if (connectorArrow) {
        connectorArrow.style.opacity = progress > 0.88 ? '0' : '0.8';
      }

      // Update Each Sequence Item with smooth non-overlapping transitions
      items.forEach((item, idx) => {
        const stepCenter = idx / (numSteps - 1);
        const dist = (progress - stepCenter) * (numSteps - 1); // signed distance in step units

        if (Math.abs(dist) > 0.95) {
          // Fully out of view
          item.style.opacity = '0';
          item.style.visibility = 'hidden';
          item.style.pointerEvents = 'none';
          item.style.transform = dist > 0 
            ? 'translate3d(0, -40px, 0) scale(0.92)' 
            : 'translate3d(0, 40px, 0) scale(0.92)';
        } else {
          // In or entering active focus window
          const absDist = Math.abs(dist);
          const opacity = Math.max(0, 1 - Math.pow(absDist, 1.4));
          const scale = 1.04 - absDist * 0.12;
          const translateY = -(dist * 36);

          item.style.opacity = opacity.toFixed(3);
          item.style.visibility = 'visible';
          item.style.pointerEvents = opacity > 0.7 ? 'auto' : 'none';
          item.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        }
      });

      ticking = false;
    };

    const setupMobileObserver = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (!isMobile) return;

      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-mobile-focus');
            const stepIdx = parseInt(entry.target.getAttribute('data-step') || '0', 10);
            if (stepLabel && stepTitles[stepIdx]) {
              stepLabel.textContent = stepTitles[stepIdx];
            }
            if (ambientGlow && envGlows[stepIdx]) {
              ambientGlow.style.background = envGlows[stepIdx];
            }
            dots.forEach((dot, idx) => {
              dot.classList.toggle('is-active', idx === stepIdx);
            });
          } else {
            entry.target.classList.remove('is-mobile-focus');
          }
        });
      }, {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.2
      });

      items.forEach(item => observer.observe(item));
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateDesktopProgression);
        ticking = true;
      }
    };

    const onResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateDesktopProgression();
          setupMobileObserver();
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    
    // Initial run
    updateDesktopProgression();
    setupMobileObserver();
  }
}
