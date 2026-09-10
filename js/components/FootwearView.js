/**
 * ROVE — FootwearView Component (/footwear)
 * "THE RIGHT SHOE CHANGES THE TRIP."
 * 4 Travel Footwear Archetypes: CITY, WALK, DINNER, ADVENTURE
 */

import { FOOTWEAR_ARCHETYPES } from '../data/mockData.js';
import { store } from '../store.js';

export class FootwearView {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.archetypes = FOOTWEAR_ARCHETYPES;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.mountPoint.innerHTML = `
      <div class="footwear-page" id="footwearPage">
        
        <!-- Shared Chapter Hero Stage -->
        <div class="container chapter-hero-stage">
          
          <!-- Top Breadcrumb Bar -->
          <div class="chapter-breadcrumb-bar">
            <a href="#sectionModules" class="chapter-back-btn" id="footwearBackBtn">
              <span>←</span>
              <span>RETURN TO ROVE ECOSYSTEM</span>
            </a>
            <span class="chapter-num-pill">CHAPTER 02 / III</span>
          </div>

          <span class="caps-label-accent">THE KINETIC FOUNDATION · PLATFORM SPEC</span>
          <h1 class="chapter-main-title">FOOTWEAR</h1>
          <p class="chapter-subtext">“The right shoe changes the trip.”</p>
          <p style="max-width: 52ch; color: var(--text-secondary); margin: 0.25rem auto 0 auto;">
            Bad shoes cut a voyage short. The wrong sole ruins dinner dress codes. ROVE curates exactly two pairs per voyage: one for relentless movement, one for atmospheric elevation.
          </p>

          <!-- Standardized 3-Pill Technical Meta Strip -->
          <div class="chapter-meta-strip">
            <span class="chapter-meta-item">BIOMECHANICS</span>
            <span class="chapter-meta-item">DUAL-DENSITY CUSHION</span>
            <span class="chapter-meta-item">22,000+ DAILY STEPS</span>
          </div>

        </div>

        <div class="container">
          
          <!-- The 4 Core Archetypes Grid -->
          <div class="archetypes-grid">
            ${this.archetypes.map((arch, idx) => `
              <div class="archetype-card reveal-on-scroll stagger-${idx + 1}" id="arch_${arch.id}">
                
                <div class="archetype-media-frame">
                  <img src="${arch.image}" alt="${arch.tagline}" class="archetype-img" loading="lazy" />
                  <span class="archetype-badge-corner">${arch.name} ARCHETYPE</span>
                </div>

                <div class="archetype-content">
                  <div class="archetype-title-row">
                    <h3 class="archetype-name">${arch.tagline}</h3>
                    <span class="archetype-steps-rating">● ${arch.stepRating}</span>
                  </div>

                  <p class="archetype-desc">${arch.description}</p>

                  <div class="archetype-specs-list">
                    <div class="shoe-spec-node">
                      <span class="shoe-spec-lbl">ROLE</span>
                      <span class="shoe-spec-val">${arch.archetypeRole}</span>
                    </div>
                    <div class="shoe-spec-node">
                      <span class="shoe-spec-lbl">WEIGHT</span>
                      <span class="shoe-spec-val">${arch.weight}</span>
                    </div>
                    <div class="shoe-spec-node">
                      <span class="shoe-spec-lbl">SOLE SYSTEM</span>
                      <span class="shoe-spec-val">${arch.soling}</span>
                    </div>
                  </div>

                  <div class="archetype-pairing-pill">
                    PAIRS WITH: <strong>${arch.pairsWith}</strong>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>

          <!-- Bottom Action Callout -->
          <div class="reveal-on-scroll" style="text-align: center; margin-top: 6rem; padding: 4rem 2rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
            <span class="caps-label-accent">TWO PAIRS. UNLIMITED HORIZONS.</span>
            <h3 class="display-title" style="font-size: 2.25rem; margin: 0.75rem 0 1.25rem 0;">READY TO MATCH YOUR TRIP SHOES?</h3>
            <p style="max-width: 48ch; margin: 0 auto 2rem auto; color: var(--text-secondary);">
              Tell us where you are heading and our intelligence system will assign your ideal 2-pair pairing.
            </p>
            <button class="btn btn-primary btn-lg" id="footwearStartTripBtn">
              BUILD MY TRIP FOOTWEAR
            </button>
          </div>

        </div>

      </div>
    `;
  }

  bindEvents() {
    const btn = this.mountPoint.querySelector('#footwearStartTripBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        store.openBuilder(1);
      });
    }
  }
}
