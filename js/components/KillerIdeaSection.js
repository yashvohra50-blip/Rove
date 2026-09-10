/**
 * ROVE — KillerIdeaSection Component
 * "PACK LESS. WEAR MORE."
 * 6 PIECES -> 8 OUTFITS -> 5 DAYS -> 1 BAG
 * Live Interactive Combinatorial Wardrobe Engine
 */

import { JAIPUR_CAPSULE_PIECES, JAIPUR_OUTFITS } from '../data/mockData.js';

export class KillerIdeaSection {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.activeOutfitIndex = 0;
    this.pieces = JAIPUR_CAPSULE_PIECES;
    this.outfits = JAIPUR_OUTFITS;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    const activeOutfit = this.outfits[this.activeOutfitIndex];

    this.mountPoint.innerHTML = `
      <section class="killer-section" id="sectionKillerIdea">
        <div class="container">
          
          <div class="killer-header reveal-on-scroll">
            <span class="caps-label-accent">THE CORE PHILOSOPHY</span>
            <h2 class="display-title">PACK LESS. WEAR MORE.</h2>
            <p style="max-width: 54ch; font-size: var(--text-base);">
              A hyper-curated capsule is not about limitation. It is about maximum combinatorial freedom without luggage burden.
            </p>
          </div>

          <!-- Formula Strip -->
          <div class="formula-strip reveal-on-scroll stagger-1">
            <div class="formula-node">
              <span class="formula-value">6</span>
              <span class="formula-label">PIECES</span>
            </div>
            <div class="formula-arrow">→</div>
            <div class="formula-node">
              <span class="formula-value">8</span>
              <span class="formula-label">OUTFITS</span>
            </div>
            <div class="formula-arrow">→</div>
            <div class="formula-node">
              <span class="formula-value">5</span>
              <span class="formula-label">DAYS</span>
            </div>
            <div class="formula-arrow">→</div>
            <div class="formula-node">
              <span class="formula-value">1</span>
              <span class="formula-label">CABIN BAG</span>
            </div>
          </div>

          <!-- Interactive Wardrobe Combiner Stage -->
          <div class="wardrobe-interactive-stage reveal-on-scroll stagger-2" id="combinerStage">
            
            <!-- Left: The 6 Foundational Pieces -->
            <div class="capsule-inventory-column">
              <div class="capsule-inventory-header">
                <span class="caps-label">THE 6 MASTER PIECES</span>
                <span class="badge badge-accent" id="activePieceCounter">3 ACTIVE</span>
              </div>
              
              <div class="inventory-item-list" id="pieceList">
                ${this.pieces.map(piece => {
                  const isActive = activeOutfit.pieces.includes(piece.id);
                  return `
                    <div class="inventory-piece-card ${isActive ? 'active-in-outfit' : ''}" data-piece-id="${piece.id}">
                      <img src="${piece.image}" alt="${piece.name}" class="piece-thumb" loading="lazy" />
                      <div class="piece-info">
                        <span class="piece-title">${piece.name}</span>
                        <span class="piece-category">${piece.role} · ${piece.category}</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Right: Active Combinatorial Outfit Canvas -->
            <div class="outfit-display-column">
              
              <!-- Outfit Tabs -->
              <div class="outfit-selector-tabs" id="outfitTabs">
                ${this.outfits.map((outfit, idx) => `
                  <button class="outfit-tab-btn ${idx === this.activeOutfitIndex ? 'active' : ''}" data-outfit-idx="${idx}">
                    ${outfit.day.split('·')[0].trim()}
                  </button>
                `).join('')}
              </div>

              <!-- Active Outfit Canvas Details -->
              <div class="active-outfit-showcase" id="outfitShowcase">
                <div class="outfit-hero-visual">
                  <img 
                    src="${activeOutfit.image}" 
                    alt="${activeOutfit.title}" 
                    class="outfit-hero-img" 
                    id="activeOutfitHeroImg"
                  />
                </div>

                <div class="outfit-details-box">
                  <div class="outfit-badge-row">
                    <span class="badge badge-accent" id="outfitDayBadge">${activeOutfit.day}</span>
                    <span class="badge" id="outfitTempBadge">${activeOutfit.tempBadge}</span>
                  </div>

                  <h3 class="outfit-title" id="outfitTitle">${activeOutfit.title}</h3>
                  <p class="outfit-description" id="outfitDesc">${activeOutfit.description}</p>

                  <div class="outfit-components-list" id="outfitComponents">
                    <span class="caps-label" style="font-size: 0.65rem;">PIECES COMBINED:</span>
                    ${activeOutfit.pieceNames.map(name => `
                      <div class="outfit-component-item">
                        <span class="outfit-component-dot"></span>
                        <span>${name}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    `;
  }

  bindEvents() {
    const tabsContainer = this.mountPoint.querySelector('#outfitTabs');
    if (!tabsContainer) return;

    tabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.outfit-tab-btn');
      if (!btn) return;
      const idx = parseInt(btn.getAttribute('data-outfit-idx'), 10);
      this.switchOutfit(idx);
    });
  }

  switchOutfit(index) {
    if (index === this.activeOutfitIndex) return;
    this.activeOutfitIndex = index;
    const activeOutfit = this.outfits[this.activeOutfitIndex];

    // Update Tabs
    const tabs = this.mountPoint.querySelectorAll('.outfit-tab-btn');
    tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    // Update Active Pieces Highlight on Left
    const pieceCards = this.mountPoint.querySelectorAll('.inventory-piece-card');
    let activeCount = 0;
    pieceCards.forEach(card => {
      const pieceId = card.getAttribute('data-piece-id');
      const isActive = activeOutfit.pieces.includes(pieceId);
      card.classList.toggle('active-in-outfit', isActive);
      if (isActive) activeCount++;
    });

    // Update Counter
    const counter = this.mountPoint.querySelector('#activePieceCounter');
    if (counter) counter.textContent = `${activeCount} ACTIVE`;

    // Update Right Canvas Showcase
    const heroImg = this.mountPoint.querySelector('#activeOutfitHeroImg');
    const dayBadge = this.mountPoint.querySelector('#outfitDayBadge');
    const tempBadge = this.mountPoint.querySelector('#outfitTempBadge');
    const title = this.mountPoint.querySelector('#outfitTitle');
    const desc = this.mountPoint.querySelector('#outfitDesc');
    const components = this.mountPoint.querySelector('#outfitComponents');

    if (heroImg) {
      heroImg.style.opacity = '0.3';
      setTimeout(() => {
        heroImg.src = activeOutfit.image;
        heroImg.style.opacity = '1';
      }, 140);
    }

    if (dayBadge) dayBadge.textContent = activeOutfit.day;
    if (tempBadge) tempBadge.textContent = activeOutfit.tempBadge;
    if (title) title.textContent = activeOutfit.title;
    if (desc) desc.textContent = activeOutfit.description;

    if (components) {
      components.innerHTML = `
        <span class="caps-label" style="font-size: 0.65rem;">PIECES COMBINED:</span>
        ${activeOutfit.pieceNames.map(name => `
          <div class="outfit-component-item">
            <span class="outfit-component-dot"></span>
            <span>${name}</span>
          </div>
        `).join('')}
      `;
    }
  }
}
