/**
 * ROVE — ClothingView Component (/clothing)
 * "Built around where you're going."
 * Dedicated Editorial Garment Architecture
 */

import { CLOTHING_CATEGORIES } from '../data/mockData.js';
import { store } from '../store.js';

export class ClothingView {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.categories = CLOTHING_CATEGORIES;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.mountPoint.innerHTML = `
      <div class="clothing-page" id="clothingPage">
        
        <!-- Shared Chapter Hero Stage -->
        <div class="container chapter-hero-stage">
          
          <!-- Top Breadcrumb Bar -->
          <nav class="chapter-breadcrumb-bar" aria-label="Breadcrumb">
            <a href="#sectionModules" class="chapter-back-btn" id="clothingBackBtn">
              <span aria-hidden="true">←</span>
              <span>RETURN TO ROVE ECOSYSTEM</span>
            </a>
            <span class="chapter-num-pill" aria-current="page">CHAPTER 01 / III</span>
          </nav>

          <span class="caps-label-accent">THE FABRIC INTELLIGENCE · SYSTEM CORE</span>
          <h1 class="chapter-main-title">CLOTHING</h1>
          <p class="chapter-subtext">“Built around where you're going.”</p>
          <p style="max-width: 52ch; color: var(--text-secondary); margin: 0.25rem auto 0 auto;">
            Every weave, weight, and fiber is calibrated for climate friction, transit endurance, and rapid overnight revitalization.
          </p>

          <!-- Standardized 3-Pill Technical Meta Strip -->
          <div class="chapter-meta-strip">
            <span class="chapter-meta-item">TEXTILE SCIENCE</span>
            <span class="chapter-meta-item">145G – 380G GSM WEAVES</span>
            <span class="chapter-meta-item">RAPID OVERNIGHT RECOVERY</span>
          </div>

        </div>

        <!-- Sticky Quick Navigation -->
        <nav class="category-nav-bar" id="categoryNavBar" aria-label="Clothing Categories">
          ${this.categories.map(cat => `
            <a href="#cat_${cat.id}" class="category-nav-btn">${cat.name}</a>
          `).join('')}
        </nav>

        <div class="container">
          ${this.categories.map((cat, idx) => `
            <section class="category-section-block" id="cat_${cat.id}">
              
              <!-- Category Header -->
              <div class="category-lead-row reveal-on-scroll">
                <div class="category-title-wrap">
                  <span class="caps-label-accent">CATEGORY 0${idx + 1}</span>
                  <h2 class="category-name">${cat.name}</h2>
                </div>
                <p class="category-philosophy">${cat.philosophy}</p>
              </div>

              <!-- Large Editorial Hero Showcase -->
              <div class="category-editorial-hero reveal-on-scroll stagger-1">
                <div class="editorial-hero-media">
                  <img src="${cat.heroItem.image}" alt="${cat.heroItem.name}" class="editorial-hero-img" loading="lazy" />
                </div>
                <div class="editorial-hero-info">
                  <span class="badge badge-accent" style="align-self: flex-start;">${cat.heroItem.tag}</span>
                  <h3 class="editorial-lead-piece">${cat.heroItem.name}</h3>
                  <p class="editorial-fabric-notes">${cat.heroItem.care}</p>

                  <div class="fabric-specs-grid">
                    <div class="fabric-spec-item">
                      <span class="spec-label">FABRIC BLEND</span>
                      <span class="spec-val">${cat.heroItem.fabric}</span>
                    </div>
                    <div class="fabric-spec-item">
                      <span class="spec-label">WEAVE STRUCTURE</span>
                      <span class="spec-val">${cat.heroItem.weave}</span>
                    </div>
                    <div class="fabric-spec-item">
                      <span class="spec-label">PACK DENSITY</span>
                      <span class="spec-val">${cat.heroItem.packVolume}</span>
                    </div>
                    <div class="fabric-spec-item">
                      <span class="spec-label">CLIMATE SUITABILITY</span>
                      <span class="spec-val">18°C – 36°C Breathable</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Supporting Category Pieces Grid -->
              <div class="category-subgrid reveal-on-scroll stagger-2">
                ${cat.items.map(item => `
                  <div class="garment-card">
                    <div class="garment-image-box">
                      <img src="${item.image}" alt="${item.name}" class="garment-img" loading="lazy" />
                    </div>
                    <div class="garment-body">
                      <h4 class="garment-name" style="font-size: 1.1rem;">${item.name}</h4>
                      <p class="garment-fabric" style="color: var(--accent-primary); font-size: 0.8rem;">${item.fabric}</p>
                      <p style="font-size: 0.8rem; color: var(--text-secondary);">${item.desc}</p>
                    </div>
                  </div>
                `).join('')}
              </div>

            </section>
          `).join('')}

          <!-- Bottom Action Callout -->
          <div class="reveal-on-scroll" style="text-align: center; margin-top: 6rem; padding: 4rem 2rem; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
            <span class="caps-label-accent">CURATE YOUR OWN</span>
            <h3 class="display-title" style="font-size: 2.25rem; margin: 0.75rem 0 1.25rem 0;">READY TO ASSEMBLE YOUR CAPSULE?</h3>
            <p style="max-width: 48ch; margin: 0 auto 2rem auto; color: var(--text-secondary);">
              Let ROVE calculate the exact minimum allocation for where your journey begins.
            </p>
            <button class="btn btn-primary btn-lg" id="clothingStartTripBtn">
              BUILD MY TRIP NOW
            </button>
          </div>

        </div>

      </div>
    `;
  }

  bindEvents() {
    const btn = this.mountPoint.querySelector('#clothingStartTripBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        store.openBuilder(1);
      });
    }

    // Smooth scroll navigation
    const navLinks = this.mountPoint.querySelectorAll('.category-nav-btn');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetEl = this.mountPoint.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}
