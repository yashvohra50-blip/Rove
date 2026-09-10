/**
 * ROVE — StorySection Component ("How ROVE Thinks")
 * Phase 5: Scroll-Driven Storytelling Experience
 * Sequence: 
 * 01 DESTINATION -> 02 WEATHER -> 03 ACTIVITIES -> 04 DURATION
 * 05 YOUR STYLE -> 06 YOUR WARDROBE -> 07 OUTFITS -> 08 PACKING
 * 
 * Features:
 * - Single dominant stage focus at any moment on desktop
 * - Subtle progress indicator with step counter, fill bar, and clickable navigation dots
 * - Atmospheric ghost watermark numeral
 * - Zero animation / prefers-reduced-motion accessibility fallback:
 *   unwraps into an accessible, sequential, high-contrast vertical reading flow
 */

export class StorySection {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.steps = [
      {
        num: '01',
        title: 'DESTINATION',
        desc: 'Terrain, local architecture, humidity, and cultural etiquette.',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
      },
      {
        num: '02',
        title: 'WEATHER',
        desc: 'Microclimates, diurnal temperature shifts, and rain probabilities.',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      },
      {
        num: '03',
        title: 'ACTIVITIES',
        desc: 'Palace stair climbing, evening dining, walking mileage, transit hours.',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
      },
      {
        num: '04',
        title: 'DURATION',
        desc: 'Days spent and garment rotation frequency with zero repetition fatigue.',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
      },
      {
        num: '05',
        title: 'YOUR STYLE',
        desc: 'Color palette restraint, preferred silhouettes, and aesthetic comfort.',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>`
      },
      {
        num: '06',
        title: 'YOUR WARDROBE',
        desc: 'Selecting only hyper-compatible, high-yield foundational pieces.',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
      },
      {
        num: '07',
        title: 'OUTFITS',
        desc: 'Algorithmic combinatorial styling for every morning, afternoon, and twilight.',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`
      },
      {
        num: '08',
        title: 'PACKING',
        desc: 'Smallest possible volumetric footprint. One bag. Absolute freedom.',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`
      }
    ];
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.setupPipelineScroll();
  }

  render() {
    this.mountPoint.innerHTML = `
      <section class="story-section" id="sectionStory">
        
        <!-- Header & Manifesto Lead -->
        <div class="story-header-wrap">
          <div class="container text-center">
            <span class="caps-label-accent">THE INTELLIGENCE PIPELINE</span>
            <h2 class="section-headline">HOW ROVE THINKS</h2>
            <p class="story-subtitle">
              Travel wardrobe intelligence is not a random checklist. It is a linear mathematical convergence from destination context down to single-bag simplicity.
            </p>
          </div>
        </div>

        <!-- Scroll-Driven Pipeline Track (Desktop) / Accessible Sequential Timeline (Mobile & Reduced Motion) -->
        <div class="story-pipeline-track" id="storyPipelineTrack">
          <div class="story-pipeline-stage" id="storyPipelineStage">
            
            <!-- Ghost Watermark Step Numeral in Background -->
            <div class="story-ghost-num" id="storyGhostNum" aria-hidden="true">01</div>
            
            <!-- Ambient Atmospheric Lighting -->
            <div class="story-ambient-glow" id="storyAmbientGlow"></div>

            <!-- Subtle Progress Indicator Track -->
            <div class="story-progress-indicator" id="storyProgressIndicator">
              <div class="story-progress-meta">
                <span class="story-progress-tag">PIPELINE STAGE</span>
                <span class="story-progress-counter" id="storyProgressCounter">01 / 08</span>
              </div>
              <div class="story-progress-trackbar">
                <div class="story-progress-fill" id="storyProgressFill"></div>
              </div>
              <div class="story-progress-steps" id="storyProgressDots">
                ${this.steps.map((s, idx) => `
                  <button 
                    class="story-nav-dot ${idx === 0 ? 'is-active' : ''}" 
                    data-step="${idx}" 
                    title="Jump to Stage ${s.num}: ${s.title}"
                    aria-label="Stage ${s.num}: ${s.title}"
                  ></button>
                `).join('')}
              </div>
            </div>

            <!-- Dominant Central Stage Container: Only One Stage Dominates At A Time -->
            <div class="story-dominant-container" id="storyDominantContainer">
              ${this.steps.map((step, idx) => `
                <article class="story-stage-item ${idx === 0 ? 'is-active' : ''}" data-index="${idx}" aria-label="Stage ${step.num}: ${step.title}">
                  <div class="stage-badge-wrap">
                    <span class="stage-step-pill">${step.num} / 08</span>
                    <div class="stage-icon-halo">${step.icon}</div>
                  </div>
                  <h3 class="stage-headline">${step.title}</h3>
                  <p class="stage-desc">${step.desc}</p>
                  <div class="stage-next-cue" aria-hidden="true">
                    <span class="stage-cue-line"></span>
                    <span class="stage-cue-arrow">${idx < 7 ? '↓' : '✓'}</span>
                  </div>
                </article>
              `).join('')}
            </div>

          </div>
        </div>

      </section>
    `;
  }

  bindEvents() {
    const dots = this.mountPoint.querySelectorAll('.story-nav-dot');
    const track = this.mountPoint.querySelector('#storyPipelineTrack');

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const stepIdx = parseInt(e.currentTarget.getAttribute('data-step') || '0', 10);
        if (track) {
          const windowH = window.innerHeight;
          const scrollableDist = track.offsetHeight - windowH;
          const targetTop = track.getBoundingClientRect().top + window.pageYOffset + (stepIdx / 7) * scrollableDist;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupPipelineScroll() {
    const track = this.mountPoint.querySelector('#storyPipelineTrack');
    const items = this.mountPoint.querySelectorAll('.story-stage-item');
    const ghostNum = this.mountPoint.querySelector('#storyGhostNum');
    const progressCounter = this.mountPoint.querySelector('#storyProgressCounter');
    const progressFill = this.mountPoint.querySelector('#storyProgressFill');
    const dots = this.mountPoint.querySelectorAll('.story-nav-dot');
    const ambientGlow = this.mountPoint.querySelector('#storyAmbientGlow');

    if (!track || !items.length) return;

    const numSteps = items.length; // 8 steps
    let ticking = false;

    // Ambient glow colors subtly shifting across the 8 stages
    const stageGlows = [
      'radial-gradient(circle at 50% 50%, rgba(212, 175, 122, 0.16) 0%, transparent 65%)', // 01: Destination
      'radial-gradient(circle at 50% 50%, rgba(235, 155, 60, 0.18) 0%, transparent 65%)',  // 02: Weather
      'radial-gradient(circle at 50% 50%, rgba(150, 180, 130, 0.16) 0%, transparent 65%)', // 03: Activities
      'radial-gradient(circle at 50% 50%, rgba(130, 160, 210, 0.16) 0%, transparent 65%)', // 04: Duration
      'radial-gradient(circle at 50% 50%, rgba(190, 130, 190, 0.18) 0%, transparent 65%)', // 05: Style
      'radial-gradient(circle at 50% 50%, rgba(210, 180, 140, 0.18) 0%, transparent 65%)', // 06: Wardrobe
      'radial-gradient(circle at 50% 50%, rgba(220, 160, 100, 0.20) 0%, transparent 65%)', // 07: Outfits
      'radial-gradient(circle at 50% 50%, rgba(212, 175, 122, 0.32) 0%, transparent 70%)'  // 08: Packing
    ];

    const resetReducedMotionStyles = () => {
      items.forEach(item => {
        item.style.opacity = '';
        item.style.transform = '';
        item.style.visibility = '';
        item.style.pointerEvents = '';
      });
      if (progressFill) progressFill.style.width = '100%';
      if (progressCounter) progressCounter.textContent = '08 / 08';
      if (ghostNum) ghostNum.textContent = '01';
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === 0));
    };

    const updatePipelineProgression = () => {
      // Auto-cleanup if component disconnected
      if (!track.isConnected) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        return;
      }

      const isDesktop = window.matchMedia('(min-width: 769px)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // When animations disabled or on mobile, maintain 100% accessible static flow
      if (!isDesktop || prefersReducedMotion) {
        resetReducedMotionStyles();
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

      const activeFloatIndex = progress * (numSteps - 1);
      const activeStepIndex = Math.min(numSteps - 1, Math.max(0, Math.round(activeFloatIndex)));

      // Update Step Counter & Ghost Numeral
      const currentStepNum = String(activeStepIndex + 1).padStart(2, '0');
      if (progressCounter) {
        progressCounter.textContent = `${currentStepNum} / 08`;
      }
      if (ghostNum) {
        ghostNum.textContent = currentStepNum;
      }
      if (progressFill) {
        progressFill.style.width = `${Math.round(progress * 100)}%`;
      }

      // Update Nav Dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === activeStepIndex);
      });

      // Update Ambient Glow Tone
      if (ambientGlow && stageGlows[activeStepIndex]) {
        ambientGlow.style.background = stageGlows[activeStepIndex];
      }

      // Update Dominant Stage Items (Only one dominates the screen at a time)
      items.forEach((item, idx) => {
        const stepCenter = idx / (numSteps - 1);
        const dist = (progress - stepCenter) * (numSteps - 1);

        if (Math.abs(dist) > 0.95) {
          // Fully hidden outside its active window
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

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePipelineProgression);
        ticking = true;
      }
    };

    const onResize = () => {
      if (!ticking) {
        requestAnimationFrame(updatePipelineProgression);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Initial calculation
    updatePipelineProgression();
  }
}
