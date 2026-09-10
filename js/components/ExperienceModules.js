/**
 * ROVE — ExperienceModules Component
 * Phase 7: Product Chapters (CLOTHING, FOOTWEAR, PACK)
 * 
 * Architectural Chapters:
 * - Chapter 01: CLOTHING (Wardrobe Core) -> /clothing
 * - Chapter 02: FOOTWEAR (Kinetic Platform) -> /footwear
 * - Chapter 03: PACK (Container System) -> Coming Soon Modal & Briefing Registration
 */

import { store } from '../store.js';

export class ExperienceModules {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.mountPoint.innerHTML = `
      <section class="modules-section" id="sectionModules">
        <div class="container">
          
          <div class="modules-header reveal-on-scroll">
            <span class="caps-label-accent">THE THREE FOUNDATIONS · SYSTEM ARCHITECTURE</span>
            <h2 class="section-headline">PRODUCT CHAPTERS</h2>
            <p>
              Three interconnected pillars engineered for the modern nomad. From climate-responsive textile science to biomechanical endurance and volumetric compression.
            </p>
          </div>

          <div class="modules-grid">
            
            <!-- Chapter 01: CLOTHING -->
            <a href="#/clothing" class="chapter-card reveal-on-scroll stagger-1" id="chapterCardClothing" data-chapter="01" aria-label="Enter Chapter 01: Clothing Architecture">
              <div class="chapter-backdrop-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=85" 
                  alt="ROVE Clothing Architecture" 
                  class="chapter-backdrop"
                  loading="lazy"
                />
              </div>
              <div class="chapter-gradient-overlay"></div>
              <div class="chapter-ambient-aura"></div>

              <!-- Top Chapter Bar -->
              <div class="chapter-top-bar">
                <div class="chapter-meta">
                  <span class="chapter-index">CHAPTER 01</span>
                  <span class="chapter-role">WARDROBE CORE</span>
                </div>
                <span class="chapter-status-pill status-active">EXPLORE · v1.0</span>
              </div>

              <!-- Main Chapter Content -->
              <div class="chapter-main-content">
                <h3 class="chapter-title">CLOTHING</h3>
                <p class="chapter-quote">“Built around where you are going.”</p>
                
                <div class="chapter-specs-row">
                  <span class="chapter-spec-pill">6 ESSENTIALS</span>
                  <span class="chapter-spec-pill">145G – 380G GSM</span>
                  <span class="chapter-spec-pill">RAPID RECOVERY</span>
                </div>

                <div class="chapter-footer">
                  <div class="chapter-action-link">
                    <span>ENTER CHAPTER 01</span>
                    <span class="action-arrow">→</span>
                  </div>
                  <span class="chapter-foot-meta">TEXTILE SCIENCE</span>
                </div>
              </div>

              <div class="chapter-progress-line"></div>
            </a>

            <!-- Chapter 02: FOOTWEAR -->
            <a href="#/footwear" class="chapter-card reveal-on-scroll stagger-2" id="chapterCardFootwear" data-chapter="02" aria-label="Enter Chapter 02: Footwear Archetypes">
              <div class="chapter-backdrop-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85" 
                  alt="ROVE Footwear Archetypes" 
                  class="chapter-backdrop"
                  loading="lazy"
                />
              </div>
              <div class="chapter-gradient-overlay"></div>
              <div class="chapter-ambient-aura"></div>

              <!-- Top Chapter Bar -->
              <div class="chapter-top-bar">
                <div class="chapter-meta">
                  <span class="chapter-index">CHAPTER 02</span>
                  <span class="chapter-role">KINETIC PLATFORM</span>
                </div>
                <span class="chapter-status-pill status-active">EXPLORE · v1.0</span>
              </div>

              <!-- Main Chapter Content -->
              <div class="chapter-main-content">
                <h3 class="chapter-title">FOOTWEAR</h3>
                <p class="chapter-quote">“The right shoe changes the trip.”</p>
                
                <div class="chapter-specs-row">
                  <span class="chapter-spec-pill">4 ARCHETYPES</span>
                  <span class="chapter-spec-pill">22K STEPS / DAY</span>
                  <span class="chapter-spec-pill">DUAL-DENSITY SOLE</span>
                </div>

                <div class="chapter-footer">
                  <div class="chapter-action-link">
                    <span>ENTER CHAPTER 02</span>
                    <span class="action-arrow">→</span>
                  </div>
                  <span class="chapter-foot-meta">BIOMECHANICS</span>
                </div>
              </div>

              <div class="chapter-progress-line"></div>
            </a>

            <!-- Chapter 03: PACK (Coming Soon Preview) -->
            <div class="chapter-card chapter-card-preview reveal-on-scroll stagger-3" id="chapterCardPack" data-chapter="03" tabindex="0" role="button" aria-haspopup="dialog" aria-label="View Chapter 03: Pack Specifications and Coming Soon briefing">
              <div class="chapter-backdrop-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85" 
                  alt="ROVE Pack Luggage System" 
                  class="chapter-backdrop"
                  loading="lazy"
                />
              </div>
              <div class="chapter-gradient-overlay"></div>
              <div class="chapter-ambient-aura"></div>

              <!-- Top Chapter Bar -->
              <div class="chapter-top-bar">
                <div class="chapter-meta">
                  <span class="chapter-index">CHAPTER 03</span>
                  <span class="chapter-role">CONTAINER SYSTEM</span>
                </div>
                <span class="chapter-status-pill status-preview">CYCLE 02 · COMING SOON</span>
              </div>

              <!-- Main Chapter Content -->
              <div class="chapter-main-content">
                <h3 class="chapter-title chapter-title-preview">PACK</h3>
                <p class="chapter-quote">“Take only what you need. Nothing extra.”</p>
                
                <div class="chapter-specs-row">
                  <span class="chapter-spec-pill">38L CABIN SPEC</span>
                  <span class="chapter-spec-pill">VOLUMETRIC FOLD</span>
                  <span class="chapter-spec-pill">ZERO REDUNDANCY</span>
                </div>

                <div class="chapter-footer">
                  <div class="chapter-action-link chapter-action-preview">
                    <span>PREVIEW SPECS & NOTIFY</span>
                    <span class="action-arrow">🔒</span>
                  </div>
                  <span class="chapter-foot-meta">COMPRESSION</span>
                </div>
              </div>

              <div class="chapter-progress-line"></div>
            </div>

          </div>

        </div>

        <!-- Chapter 03: PACK Dedicated Coming Soon Modal -->
        <div class="coming-soon-modal-backdrop" id="packComingSoonModal" role="dialog" aria-modal="true" aria-labelledby="packModalTitle">
          <div class="coming-soon-modal-card">
            <button class="modal-close-icon" id="packModalCloseBtn" aria-label="Close specifications preview">✕</button>
            
            <div class="modal-header-block">
              <span class="caps-label-accent">ROVE TRAVEL OS · CYCLE 02 ROADMAP</span>
              <h3 class="modal-display-title" id="packModalTitle">CHAPTER 03: PACK</h3>
              <p class="modal-italic-subtitle">“The 38L Volumetric Intelligence Engine.”</p>
            </div>

            <p class="modal-lead-desc">
              Engineered to mathematically eliminate checked luggage forever. Pack is currently in prototype refinement with precision luggage artisans and spatial packaging engineers.
            </p>

            <div class="pack-pillars-grid">
              <div class="pack-pillar-item">
                <span class="pack-pillar-num">01</span>
                <div>
                  <h4 class="pack-pillar-title">38L CABIN GEOMETRY</h4>
                  <p class="pack-pillar-desc">Complies with strict global airline overhead dimensions (55 x 35 x 20 cm) with zero wasted corner volume.</p>
                </div>
              </div>

              <div class="pack-pillar-item">
                <span class="pack-pillar-num">02</span>
                <div>
                  <h4 class="pack-pillar-title">ALGORITHMIC FOLD SEQUENCING</h4>
                  <p class="pack-pillar-desc">Digital spatial fold guidelines mapped directly to garment weave structures, minimizing friction and wrinkles.</p>
                </div>
              </div>

              <div class="pack-pillar-item">
                <span class="pack-pillar-num">03</span>
                <div>
                  <h4 class="pack-pillar-title">MAGNETIC COMPRESSION MODULES</h4>
                  <p class="pack-pillar-desc">High-tenacity Cordura cubes with two-stage perimeter compression zippers delivering 42% volume reduction.</p>
                </div>
              </div>

              <div class="pack-pillar-item">
                <span class="pack-pillar-num">04</span>
                <div>
                  <h4 class="pack-pillar-title">REAL-TIME CABIN WEIGHT SENSORS</h4>
                  <p class="pack-pillar-desc">Micro-tensile handles calculate total pack weight in real time to prevent gate-check weight penalties.</p>
                </div>
              </div>
            </div>

            <div class="modal-notify-box">
              <span class="caps-label" style="font-size: 0.65rem;">BE THE FIRST TO PACK:</span>
              <form class="modal-notify-form" id="packNotifyForm">
                <input 
                  type="email" 
                  class="modal-input" 
                  id="packEmailInput" 
                  placeholder="Enter your email for Cycle 02 briefing..." 
                  required 
                />
                <button type="submit" class="btn btn-accent btn-sm">
                  RESERVE BRIEFING
                </button>
              </form>
            </div>

          </div>
        </div>

      </section>
    `;
  }

  bindEvents() {
    // Chapter 03: Pack Modal Elements
    const packCard = this.mountPoint.querySelector('#chapterCardPack');
    const modalBackdrop = this.mountPoint.querySelector('#packComingSoonModal');
    const modalCloseBtn = this.mountPoint.querySelector('#packModalCloseBtn');
    const notifyForm = this.mountPoint.querySelector('#packNotifyForm');
    const emailInput = this.mountPoint.querySelector('#packEmailInput');

    const openModal = () => {
      if (modalBackdrop) {
        modalBackdrop.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        if (emailInput) emailInput.focus();
      }
    };

    const closeModal = () => {
      if (modalBackdrop) {
        modalBackdrop.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    };

    if (packCard) {
      packCard.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });

      packCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal();
        }
      });
    }

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          closeModal();
        }
      });
    }

    // Keyboard ESC listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Notify Form Submission
    if (notifyForm) {
      notifyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput ? emailInput.value.trim() : '';
        if (email) {
          store.showToast(
            'BRIEFING RESERVED',
            `You are registered for the Cycle 02 Pack Briefing (${email}). Priority allocation confirmed.`
          );
          closeModal();
          if (emailInput) emailInput.value = '';
        }
      });
    }
  }
}
