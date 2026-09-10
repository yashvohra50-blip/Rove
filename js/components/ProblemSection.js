/**
 * ROVE — Problem Section Component
 * Minimalist Editorial Context Architecture
 * "YOU PACK FOR THE TRIP." -> "ROVE PACKS FOR THE EXPERIENCE."
 */

import { store } from '../store.js';

export class ProblemSection {
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
      <section class="section-padding-large problem-section" id="sectionProblem">
        <div class="container problem-editorial-wrap">
          
          <!-- Editorial Contrast Lead -->
          <div class="problem-contrast-lead reveal-on-scroll">
            <span class="caps-label-accent">THE SHIFT</span>
            <div class="problem-subdued-phrase">
              YOU PACK FOR THE TRIP.
            </div>
            <div class="problem-highlight-phrase">
              ROVE PACKS FOR <span>THE EXPERIENCE.</span>
            </div>
          </div>

          <!-- Context Demonstration Case Study (Jaipur Archetype) -->
          <div class="problem-context-card reveal-on-scroll stagger-1">
            <div class="context-card-header">
              <div class="context-location">
                <span class="caps-label">TRIP CONTEXT MATRIX</span>
                <h3 style="font-family: var(--font-display); font-size: 1.75rem; letter-spacing: 0.05em; text-transform: uppercase;">
                  JAIPUR, RAJASTHAN
                </h3>
              </div>
              <div class="badge badge-accent">
                ACTIVE CONTEXT MODEL
              </div>
            </div>

            <!-- The Core 6 Atmospheric Signals -->
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
          <div class="problem-cta-moment reveal-on-scroll stagger-2">
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
}
