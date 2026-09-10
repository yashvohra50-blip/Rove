/**
 * ROVE — ExperienceModules Component
 * Large Editorial Panels: CLOTHING, FOOTWEAR, PACK (Coming Soon)
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
            <span class="caps-label-accent">PRODUCT ECOSYSTEM</span>
            <h2 class="section-headline">CHOOSE YOUR EXPERIENCE</h2>
            <p>
              Explore the dedicated pillars of the ROVE travel wardrobe intelligence system.
            </p>
          </div>

          <div class="modules-grid">
            
            <!-- Module 1: CLOTHING -->
            <a href="#/clothing" class="module-panel reveal-on-scroll stagger-1" id="moduleCardClothing">
              <img 
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85" 
                alt="ROVE Clothing Architecture" 
                class="module-backdrop"
                loading="lazy"
              />
              <div class="module-gradient-overlay"></div>
              <div class="module-content">
                <span class="badge badge-accent module-tag">INTERACTIVE PILLAR</span>
                <h3 class="module-title">CLOTHING</h3>
                <p class="module-quote">“Build the wardrobe.”</p>
                <div class="module-action-link">
                  ENTER EXPERIENCE <span>→</span>
                </div>
              </div>
            </a>

            <!-- Module 2: FOOTWEAR -->
            <a href="#/footwear" class="module-panel reveal-on-scroll stagger-2" id="moduleCardFootwear">
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=85" 
                alt="ROVE Footwear Archetypes" 
                class="module-backdrop"
                loading="lazy"
              />
              <div class="module-gradient-overlay"></div>
              <div class="module-content">
                <span class="badge badge-accent module-tag">INTERACTIVE PILLAR</span>
                <h3 class="module-title">FOOTWEAR</h3>
                <p class="module-quote">“Walk the trip.”</p>
                <div class="module-action-link">
                  ENTER EXPERIENCE <span>→</span>
                </div>
              </div>
            </a>

            <!-- Module 3: PACK (Coming Soon) -->
            <div class="module-panel module-panel-disabled reveal-on-scroll stagger-3" id="moduleCardPack">
              <img 
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85" 
                alt="ROVE Pack Luggage System" 
                class="module-backdrop"
                loading="lazy"
              />
              <div class="module-gradient-overlay"></div>
              <div class="module-content">
                <span class="badge module-tag">COMING NEXT</span>
                <h3 class="module-title" style="color: #8E8D8A;">PACK</h3>
                <p class="module-quote">“Take only what you need.”</p>
                <div class="module-action-link" style="color: var(--text-tertiary);">
                  IN DEVELOPMENT <span>🔒</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    `;
  }

  bindEvents() {
    const packPanel = this.mountPoint.querySelector('#moduleCardPack');
    if (packPanel) {
      packPanel.addEventListener('click', (e) => {
        e.preventDefault();
        store.showToast(
          'PACK MODULE COMING NEXT',
          'Intelligent luggage weight optimization, fold algorithms, and dynamic packing lists arrive in Phase 2.'
        );
      });
    }
  }
}
