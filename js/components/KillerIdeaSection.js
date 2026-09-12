/**
 * ROVE — KillerIdeaSection Component
 * "PACK LESS. WEAR MORE."
 * 6 PIECES -> 8 OUTFITS -> 5 DAYS -> 1 BAG -> NOTHING EXTRA.
 * 
 * Phase 6: Major Product Showcase
 * Step 1: Static Composition & Elevated Assets
 */

import { JAIPUR_CAPSULE_PIECES, JAIPUR_OUTFITS } from '../data/mockData.js';
import { store } from '../store.js';

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

          <!-- Formula Strip: 6 PIECES -> 8 OUTFITS -> 5 DAYS -> 1 BAG -->
          <div class="formula-strip reveal-on-scroll stagger-1" id="formulaStrip">
            <div class="formula-node">
              <span class="formula-value">6</span>
              <span class="formula-label">PIECES</span>
              <span class="formula-sub">FOUNDATIONAL CAPSULE</span>
            </div>
            <div class="formula-arrow">→</div>
            <div class="formula-node">
              <span class="formula-value">8</span>
              <span class="formula-label">OUTFITS</span>
              <span class="formula-sub">COMBINATORIAL LOOKS</span>
            </div>
            <div class="formula-arrow">→</div>
            <div class="formula-node">
              <span class="formula-value">5</span>
              <span class="formula-label">DAYS</span>
              <span class="formula-sub">MODULAR ROTATION</span>
            </div>
            <div class="formula-arrow">→</div>
            <div class="formula-node">
              <span class="formula-value">1</span>
              <span class="formula-label">CABIN BAG</span>
              <span class="formula-sub">38L SPECIFICATION</span>
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
                    <div class="inventory-piece-card ${isActive ? 'active-in-outfit' : ''}" data-piece-id="${piece.id}" role="button" tabindex="0" aria-pressed="${isActive ? 'true' : 'false'}" aria-label="Garment: ${piece.name}. Select to filter outfits.">
                      <img src="${piece.image}" alt="${piece.name}" class="piece-thumb" loading="lazy" />
                      <div class="piece-info">
                        <span class="piece-title">${piece.name}</span>
                        <span class="piece-category">${piece.role} · ${piece.category}</span>
                        <span class="piece-fabric">${piece.fabric}</span>
                        <span class="piece-versatility">${piece.versatility}</span>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Right: Active Combinatorial Outfit Canvas -->
            <div class="outfit-display-column">
              
              <!-- Screen Reader Live Announcer -->
              <div class="sr-only" aria-live="polite" id="outfitLiveAnnouncer"></div>

              <!-- Outfit Tabs -->
              <div class="outfit-selector-tabs" id="outfitTabs" role="tablist" aria-label="Daily outfit looks">
                ${this.outfits.map((outfit, idx) => `
                  <button class="outfit-tab-btn ${idx === this.activeOutfitIndex ? 'active' : ''}" 
                    data-outfit-idx="${idx}" 
                    role="tab" 
                    id="tab-outfit-${idx}" 
                    aria-controls="outfitShowcase" 
                    aria-selected="${idx === this.activeOutfitIndex ? 'true' : 'false'}" 
                    tabindex="${idx === this.activeOutfitIndex ? '0' : '-1'}">
                    ${outfit.day.split('·')[0].trim()}
                  </button>
                `).join('')}
              </div>

              <!-- Active Outfit Canvas Details -->
              <div class="active-outfit-showcase" id="outfitShowcase" role="tabpanel" aria-labelledby="tab-outfit-${this.activeOutfitIndex}" tabindex="0">
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

          <!-- Final Payoff: NOTHING EXTRA. -->
          <div class="killer-payoff-banner reveal-on-scroll" id="payoffBanner">
            <div class="payoff-content">
              <span class="caps-label-accent">THE MATHEMATICAL RESOLUTION</span>
              <h3 class="payoff-headline">NOTHING EXTRA.</h3>
              <p class="payoff-desc">
                Every garment is worn multiple times across daytime exploring and evening dining. Zero redundant layers. 1 standard carry-on cabin bag. Absolute travel freedom.
              </p>
              
              <div class="payoff-stat-strip">
                <div class="payoff-stat-node">
                  <span class="payoff-stat-value">100%</span>
                  <span class="payoff-stat-label">WEAR EFFICIENCY</span>
                </div>
                <div class="payoff-stat-node">
                  <span class="payoff-stat-value">38L</span>
                  <span class="payoff-stat-label">CABIN VOLUME</span>
                </div>
                <div class="payoff-stat-node">
                  <span class="payoff-stat-value">0</span>
                  <span class="payoff-stat-label">CHECKED BAGS</span>
                </div>
              </div>

              <button class="btn btn-accent btn-lg" id="payoffPackBtn">
                ASSEMBLE YOUR CAPSULE
              </button>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  bindEvents() {
    // Outfit tab buttons
    const tabsContainer = this.mountPoint.querySelector('#outfitTabs');
    if (tabsContainer) {
      tabsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.outfit-tab-btn');
        if (!btn) return;
        const idx = parseInt(btn.getAttribute('data-outfit-idx'), 10);
        this.switchOutfit(idx);
      });

      // Keyboard arrow navigation on tabs
      tabsContainer.addEventListener('keydown', (e) => {
        const tabs = Array.from(tabsContainer.querySelectorAll('.outfit-tab-btn'));
        const currentIdx = tabs.findIndex(t => t === document.activeElement);
        if (currentIdx === -1) return;

        let targetIdx = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIdx = (currentIdx + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIdx = (currentIdx - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          targetIdx = 0;
        } else if (e.key === 'End') {
          targetIdx = tabs.length - 1;
        }

        if (targetIdx !== -1) {
          e.preventDefault();
          tabs[targetIdx].focus();
          this.switchOutfit(targetIdx);
        }
      });
    }

    // Piece cards click and keyboard activation to toggle / inspect
    const pieceCards = this.mountPoint.querySelectorAll('.inventory-piece-card');
    pieceCards.forEach(card => {
      const activatePiece = () => {
        const pieceId = card.getAttribute('data-piece-id');
        // Find the first outfit featuring this piece
        const targetOutfitIdx = this.outfits.findIndex(o => o.pieces.includes(pieceId));
        if (targetOutfitIdx !== -1) {
          this.switchOutfit(targetOutfitIdx);
        }
      };

      card.addEventListener('click', activatePiece);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activatePiece();
        }
      });
    });

    // Payoff Call to Action button
    const payoffBtn = this.mountPoint.querySelector('#payoffPackBtn');
    if (payoffBtn) {
      payoffBtn.addEventListener('click', () => {
        store.openBuilder(1);
      });
    }
  }

  switchOutfit(index) {
    if (index === this.activeOutfitIndex) return;
    this.activeOutfitIndex = index;
    const activeOutfit = this.outfits[this.activeOutfitIndex];

    // Update Tabs
    const tabs = this.mountPoint.querySelectorAll('.outfit-tab-btn');
    tabs.forEach((tab, i) => {
      const isSel = i === index;
      tab.classList.toggle('active', isSel);
      tab.setAttribute('aria-selected', isSel ? 'true' : 'false');
      tab.setAttribute('tabindex', isSel ? '0' : '-1');
    });

    // Update Right Canvas Showcase aria-labelledby
    const showcase = this.mountPoint.querySelector('#outfitShowcase');
    if (showcase) {
      showcase.setAttribute('aria-labelledby', `tab-outfit-${index}`);
    }

    // Update Active Pieces Highlight on Left
    const pieceCards = this.mountPoint.querySelectorAll('.inventory-piece-card');
    let activeCount = 0;
    pieceCards.forEach(card => {
      const pieceId = card.getAttribute('data-piece-id');
      const isActive = activeOutfit.pieces.includes(pieceId);
      card.classList.toggle('active-in-outfit', isActive);
      card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      if (isActive) activeCount++;
    });

    // Update Counter
    const counter = this.mountPoint.querySelector('#activePieceCounter');
    if (counter) counter.textContent = `${activeCount} ACTIVE`;

    // Announce to Screen Readers
    const announcer = this.mountPoint.querySelector('#outfitLiveAnnouncer');
    if (announcer) {
      announcer.textContent = `Selected ${activeOutfit.day}: ${activeOutfit.title}. ${activeCount} foundational garments active.`;
    }

    // Update Right Canvas Showcase
    const heroImg = this.mountPoint.querySelector('#activeOutfitHeroImg');
    const dayBadge = this.mountPoint.querySelector('#outfitDayBadge');
    const tempBadge = this.mountPoint.querySelector('#outfitTempBadge');
    const title = this.mountPoint.querySelector('#outfitTitle');
    const desc = this.mountPoint.querySelector('#outfitDesc');
    const components = this.mountPoint.querySelector('#outfitComponents');

    if (heroImg) {
      heroImg.classList.add('is-transforming');
      setTimeout(() => {
        heroImg.src = activeOutfit.image;
        heroImg.alt = activeOutfit.title;
        heroImg.classList.remove('is-transforming');
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
