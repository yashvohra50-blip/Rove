/**
 * ROVE — WardrobeResult Component
 * Curated Capsule Results: "YOUR JAIPUR WARDROBE"
 * "7 OUTFITS · 6 CLOTHING PIECES · 2 FOOTWEAR OPTIONS · 1 BAG"
 * "YOU DON'T NEED MORE."
 */

import { store } from '../store.js';

export class WardrobeResult {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.activeOutfitIndex = 0;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    store.subscribe((event) => {
      if (event === 'TRIP_UPDATED' || event === 'CURATION_COMPLETED') {
        this.render();
        this.bindEvents();
      }
    });
  }

  render() {
    const { currentTrip, wardrobe } = store.getState();
    const activeOutfit = wardrobe.outfits[this.activeOutfitIndex] || wardrobe.outfits[0];
    const destName = currentTrip.destination.toUpperCase();
    const destMeta = currentTrip.destinationMeta;
    const stats = wardrobe.stats || {
      totalOutfits: wardrobe.outfits.length,
      totalPieces: wardrobe.pieces.length,
      footwearCount: wardrobe.pieces.filter(p => p.category === 'Footwear').length || 2,
      cabinBags: 1,
      totalWeightGrams: 1890,
      luggageCompliance: '2.8L / 40L Cabin Capacity'
    };

    this.mountPoint.innerHTML = `
      <section class="wardrobe-view" id="wardrobeView">
        <div class="container">
          
          <!-- Editorial Hero Header -->
          <div class="wardrobe-hero-header reveal-on-scroll">
            <div class="wardrobe-destination-badge">
              <span>●</span>
              <span>${currentTrip.duration} DAYS IN ${destName}</span>
            </div>

            <h1 class="wardrobe-main-title">
              YOUR ${destName} WARDROBE
            </h1>

            <div class="wardrobe-mantra-box">
              <div class="wardrobe-mantra">
                YOU DON'T NEED MORE.
              </div>
              <p class="wardrobe-context-sub">
                Engineered specifically for ${destName}'s climate (${destMeta ? destMeta.avgTemp : '22°C'}), 
                your ${currentTrip.style} aesthetic, and 15,000+ daily steps across ${currentTrip.activities.join(', ')}.
              </p>
            </div>
          </div>

          <!-- Trip Intelligence & Cultural Requirements Banner -->
          <div class="wardrobe-intelligence-banner reveal-on-scroll" style="margin: 2rem 0; padding: 1.5rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.85rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                <span class="caps-label-accent" style="font-size: 0.75rem; letter-spacing: 0.12em;">CALIBRATED TRIP INTELLIGENCE</span>
                <span class="badge badge-accent">${destMeta?.avgTemp || '22°C'} · ${destMeta?.climate || 'Temperate'}</span>
                <span class="badge" style="font-size: 0.65rem;">${destMeta?.walkingIntensity || '10 KM / Day'}</span>
              </div>
              <div class="caps-label" style="font-size: 0.7rem; color: var(--accent-primary);">
                ${wardrobe.userPiecesUsedCount > 0 
                  ? `✓ ${wardrobe.userPiecesUsedCount} PERSONAL ARCHIVE PIECES INTEGRATED` 
                  : 'ROVE MASTER ARCHETYPE CALIBRATION'}
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
              <div>
                <span class="caps-label" style="font-size: 0.65rem; color: var(--text-tertiary); display: block; margin-bottom: 0.35rem;">METEOROLOGY & FABRIC WEIGHT</span>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                  ${wardrobe.climate?.summary || `${destName} climate analysis complete.`} 
                  Target weight: <strong style="color: var(--text-primary);">${wardrobe.climate?.gsmRange || '160–220 GSM'}</strong>.
                </p>
              </div>

              <div>
                <span class="caps-label" style="font-size: 0.65rem; color: var(--text-tertiary); display: block; margin-bottom: 0.35rem;">CULTURAL DRESS REQUIREMENTS</span>
                <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem;">
                  ${(wardrobe.culturalAdvisories || destMeta?.culturalDressCodes || ['Standard international smart-casual decorum.']).map(adv => `
                    <li style="font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: flex-start; gap: 0.5rem; line-height: 1.4;">
                      <span style="color: var(--accent-primary); line-height: 1.4;">◆</span>
                      <span>${adv}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div>
                <span class="caps-label" style="font-size: 0.65rem; color: var(--text-tertiary); display: block; margin-bottom: 0.35rem;">LUGGAGE & VOLUME CAPACITY</span>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                  Total Pack Weight: <strong style="color: var(--text-primary);">${stats.totalWeightGrams || 1890}g</strong> · Volume: <strong style="color: var(--text-primary);">${stats.luggageCompliance || '2.8L / 40L'}</strong>.
                  <br />
                  <span style="color: var(--accent-primary); font-size: 0.75rem;">100% Carry-On Approved · Zero Airport Baggage Queues</span>
                </p>
              </div>
            </div>
          </div>

          <!-- 4 Core Metrics Strip -->
          <div class="wardrobe-stat-strip reveal-on-scroll stagger-1">
            <div class="wardrobe-stat-col">
              <span class="wardrobe-stat-num">${stats.totalOutfits || wardrobe.outfits.length}</span>
              <span class="wardrobe-stat-label">CURATED OUTFITS</span>
            </div>
            <div class="wardrobe-stat-col">
              <span class="wardrobe-stat-num">${stats.totalPieces || wardrobe.pieces.length}</span>
              <span class="wardrobe-stat-label">CLOTHING PIECES</span>
            </div>
            <div class="wardrobe-stat-col">
              <span class="wardrobe-stat-num">${stats.footwearCount || 2}</span>
              <span class="wardrobe-stat-label">FOOTWEAR OPTIONS</span>
            </div>
            <div class="wardrobe-stat-col">
              <span class="wardrobe-stat-num">1</span>
              <span class="wardrobe-stat-label">CABIN BAG</span>
            </div>
          </div>

          <!-- Section 1: Dynamic Outfit Combinations Matrix -->
          <div class="wardrobe-grid-section">
            
            <div class="outfits-matrix-container reveal-on-scroll stagger-2">
              <div class="section-head-flex">
                <div>
                  <span class="caps-label-accent">THE DAILY SYSTEM</span>
                  <h2 class="section-headline" style="font-size: 1.75rem;">DAY-BY-DAY COMBINATIONS</h2>
                </div>
                <div class="caps-label" style="color: var(--text-tertiary);">
                  CLICK TO VIEW OUTFIT DETAILS
                </div>
              </div>

              <!-- Day Tabs Navigation -->
              <div class="outfit-timeline-nav" id="wardrobeOutfitTabs" role="tablist" aria-label="Daily outfit looks">
                ${wardrobe.outfits.map((outfit, idx) => `
                  <button 
                    class="outfit-timeline-pill ${idx === this.activeOutfitIndex ? 'active' : ''}" 
                    data-idx="${idx}"
                    role="tab"
                    id="wardrobe-tab-${idx}"
                    aria-controls="outfitMatrixStage"
                    aria-selected="${idx === this.activeOutfitIndex ? 'true' : 'false'}"
                    tabindex="${idx === this.activeOutfitIndex ? '0' : '-1'}"
                  >
                    ${outfit.day}
                  </button>
                `).join('')}
              </div>

              <!-- Live Region for Outfit Switch Announcements -->
              <div class="sr-only" aria-live="polite" id="wardrobeOutfitAnnouncer"></div>

              <!-- Active Outfit Matrix View -->
              <div 
                class="outfit-matrix-stage" 
                id="outfitMatrixStage"
                role="tabpanel"
                aria-labelledby="wardrobe-tab-${this.activeOutfitIndex}"
                tabindex="0"
              >
                <div class="outfit-matrix-preview">
                  <img 
                    src="${activeOutfit.image}" 
                    alt="${activeOutfit.title}" 
                    class="outfit-matrix-img"
                    id="matrixHeroImg"
                  />
                </div>

                <div class="outfit-matrix-details">
                  <div class="outfit-heading-box">
                    <span class="outfit-day-tag" id="matrixDayTag">${activeOutfit.day} · ${activeOutfit.time}</span>
                    <h3 class="outfit-name-large" id="matrixTitle">${activeOutfit.title}</h3>
                    <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
                      <span class="badge badge-accent" id="matrixTempBadge">${activeOutfit.tempBadge}</span>
                      <span class="badge" id="matrixStepsBadge">${activeOutfit.stepsEst}</span>
                    </div>
                  </div>

                  <p class="outfit-desc-p" id="matrixDesc">${activeOutfit.description}</p>

                  <div class="outfit-capsule-pieces-list" id="matrixPiecesList">
                    <span class="caps-label" style="font-size: 0.65rem;">PIECES IN THIS ROTATION:</span>
                    ${activeOutfit.pieceNames.map(name => `
                      <div class="capsule-piece-row">
                        <span>${name}</span>
                        <span>ACTIVE IN ENSEMBLE</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 2: The Foundational Capsule Inventory -->
            <div class="reveal-on-scroll stagger-3">
              <div class="section-head-flex">
                <div>
                  <span class="caps-label-accent">THE ANATOMY OF PACKING LESS</span>
                  <h2 class="section-headline" style="font-size: 1.75rem;">THE ${wardrobe.pieces.length} MASTER PIECES</h2>
                </div>
                <div class="badge badge-accent">
                  100% COMPATIBLE CAPSULE
                </div>
              </div>

              <div class="capsule-cards-grid">
                ${wardrobe.pieces.map(piece => `
                  <div class="garment-card">
                    <div class="garment-image-box">
                      <img src="${piece.image}" alt="${piece.name}" class="garment-img" loading="lazy" />
                      <span class="garment-tag-pill">${piece.role}</span>
                      ${piece.isFromUserWardrobe ? `
                        <span class="badge badge-accent" style="position: absolute; top: 0.75rem; left: 0.75rem; font-size: 0.6rem; padding: 3px 8px; letter-spacing: 0.08em; background: rgba(18, 18, 18, 0.88); backdrop-filter: blur(8px); border: 1px solid var(--accent-primary); color: var(--accent-primary); box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                          FROM YOUR CLOSET
                        </span>
                      ` : ''}
                    </div>
                    <div class="garment-body">
                      <h4 class="garment-name">${piece.name}</h4>
                      <p class="garment-fabric">${piece.fabric}</p>
                      <div class="garment-specs">
                        <span>WEIGHT: ${piece.weight}</span>
                        <span style="color: var(--accent-primary);">${piece.versatility}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- Bottom Action Bar -->
          <div class="wardrobe-action-bar reveal-on-scroll">
            <button class="btn btn-secondary" id="reconfigureTripBtn">
              ↺ RECONFIGURE TRIP
            </button>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <a href="#/clothing" class="btn btn-secondary">
                EXPLORE CLOTHING PILLARS
              </a>
              <a href="#/footwear" class="btn btn-secondary">
                EXPLORE FOOTWEAR
              </a>
              <button class="btn btn-primary" id="downloadChecklistBtn">
                PACKING CHECKLIST ✓
              </button>
              <button class="btn btn-primary" id="saveCapsuleBtn" style="background: linear-gradient(135deg, var(--accent-primary) 0%, #a87e38 100%);">
                SAVE TO VAULT 🗄️
              </button>
            </div>
          </div>

        </div>
      </section>
    `;
  }

  bindEvents() {
    const tabs = Array.from(this.mountPoint.querySelectorAll('#wardrobeOutfitTabs .outfit-timeline-pill'));
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.getAttribute('data-idx'), 10);
        this.switchOutfit(idx);
      });

      tab.addEventListener('keydown', (e) => {
        let targetIdx = -1;
        if (e.key === 'ArrowRight') {
          targetIdx = (i + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          targetIdx = (i - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          targetIdx = 0;
        } else if (e.key === 'End') {
          targetIdx = tabs.length - 1;
        }

        if (targetIdx !== -1) {
          e.preventDefault();
          this.switchOutfit(targetIdx);
          tabs[targetIdx]?.focus();
        }
      });
    });

    const reconfigureBtn = this.mountPoint.querySelector('#reconfigureTripBtn');
    if (reconfigureBtn) {
      reconfigureBtn.addEventListener('click', () => {
        store.openBuilder(1);
      });
    }

    const checklistBtn = this.mountPoint.querySelector('#downloadChecklistBtn');
    if (checklistBtn) {
      checklistBtn.addEventListener('click', () => {
        const { currentTrip, wardrobe } = store.getState();
        store.showToast(
          'PACKING LIST GENERATED',
          `Your ${wardrobe.pieces.length}-piece carry-on allocation for ${currentTrip.destination.toUpperCase()} has been saved to your session.`
        );
      });
    }

    const saveCapsuleBtn = this.mountPoint.querySelector('#saveCapsuleBtn');
    if (saveCapsuleBtn) {
      saveCapsuleBtn.addEventListener('click', () => {
        store.saveCurrentTripToAccount();
      });
    }
  }

  switchOutfit(idx) {
    this.activeOutfitIndex = idx;
    const { wardrobe } = store.getState();
    const outfit = wardrobe.outfits[idx];
    if (!outfit) return;

    // Update active tab & ARIA attributes
    const tabs = this.mountPoint.querySelectorAll('#wardrobeOutfitTabs .outfit-timeline-pill');
    tabs.forEach((tab, i) => {
      const isSelected = i === idx;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    const stage = this.mountPoint.querySelector('#outfitMatrixStage');
    if (stage) {
      stage.setAttribute('aria-labelledby', `wardrobe-tab-${idx}`);
    }

    // Announce to screen readers
    const announcer = this.mountPoint.querySelector('#wardrobeOutfitAnnouncer');
    if (announcer) {
      announcer.textContent = `Showing outfit for ${outfit.day} ${outfit.time}: ${outfit.title}.`;
    }

    // Update details
    const img = this.mountPoint.querySelector('#matrixHeroImg');
    const dayTag = this.mountPoint.querySelector('#matrixDayTag');
    const title = this.mountPoint.querySelector('#matrixTitle');
    const tempBadge = this.mountPoint.querySelector('#matrixTempBadge');
    const stepsBadge = this.mountPoint.querySelector('#matrixStepsBadge');
    const desc = this.mountPoint.querySelector('#matrixDesc');
    const list = this.mountPoint.querySelector('#matrixPiecesList');

    if (img) {
      img.style.opacity = '0.2';
      setTimeout(() => {
        img.src = outfit.image;
        img.style.opacity = '1';
      }, 120);
    }

    if (dayTag) dayTag.textContent = `${outfit.day} · ${outfit.time}`;
    if (title) title.textContent = outfit.title;
    if (tempBadge) tempBadge.textContent = outfit.tempBadge;
    if (stepsBadge) stepsBadge.textContent = outfit.stepsEst;
    if (desc) desc.textContent = outfit.description;

    if (list) {
      list.innerHTML = `
        <span class="caps-label" style="font-size: 0.65rem;">PIECES IN THIS ROTATION:</span>
        ${outfit.pieceNames.map(name => `
          <div class="capsule-piece-row">
            <span>${name}</span>
            <span>ACTIVE IN ENSEMBLE</span>
          </div>
        `).join('')}
      `;
    }
  }
}
