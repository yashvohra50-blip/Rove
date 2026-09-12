/**
 * ROVE — WardrobeResult Component
 * Curated Capsule Results with Phase 19 Outfit Engine & Combinations Matrix
 * "Pack Less. Wear More."
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
      if (
        event === 'TRIP_UPDATED' || 
        event === 'CURATION_COMPLETED' || 
        event === 'CAPSULE_PIECES_UPDATED' || 
        event === 'WARDROBE_VIEW_MODE_CHANGED' || 
        event === 'COMBINATIONS_FILTER_CHANGED'
      ) {
        this.render();
        this.bindEvents();
      }
    });
  }

  render() {
    const { currentTrip, wardrobe } = store.getState();
    const activeOutfit = wardrobe.outfits[this.activeOutfitIndex] || wardrobe.outfits[0] || {};
    const destName = (currentTrip.destination || 'Jaipur').toUpperCase();
    const destMeta = currentTrip.destinationMeta;
    
    const stats = wardrobe.stats || {
      totalOutfits: wardrobe.outfits.length,
      totalPieces: wardrobe.pieces.length,
      footwearCount: wardrobe.pieces.filter(p => p.category === 'Footwear').length || 2,
      cabinBags: 1,
      totalWeightGrams: 1890,
      luggageCompliance: '2.8L / 40L Cabin Capacity'
    };

    const optimization = wardrobe.optimization || {
      versatilityMultiplier: '2.2',
      totalCombos: wardrobe.allCombinations?.length || 12,
      totalPieces: wardrobe.pieces.length,
      efficiencyRating: 'MAXIMUM ZERO-WASTE EFFICIENCY'
    };

    const missingItems = wardrobe.missingItems || {
      gaps: [],
      hasCriticalGaps: false,
      readinessScore: 100
    };

    const viewMode = wardrobe.viewMode || 'itinerary';
    const filter = wardrobe.combinationsFilter || { occasion: 'all', anchorPieceId: null };

    // Filter combinations for the Matrix view
    let displayCombos = wardrobe.allCombinations || [];
    if (filter.occasion && filter.occasion !== 'all') {
      displayCombos = displayCombos.filter(c => c.occasion === filter.occasion);
    }
    if (filter.anchorPieceId) {
      displayCombos = displayCombos.filter(c => c.pieces.includes(filter.anchorPieceId));
    }

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
          <div class="wardrobe-intelligence-banner reveal-on-scroll" style="margin: 2rem 0; padding: 1.5rem;">
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
              <span class="wardrobe-stat-label">CURATED LOOKS</span>
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
              <span class="wardrobe-stat-num">${optimization.totalCombos || 12}</span>
              <span class="wardrobe-stat-label">TOTAL PERMUTATIONS</span>
            </div>
          </div>

          <!-- PHASE 19: WARDROBE OPTIMIZATION & VERSATILITY MULTIPLIER STRIP -->
          <div class="wardrobe-optimization-strip reveal-on-scroll stagger-1" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding: 1.25rem 2rem; background: rgba(201, 168, 76, 0.05); border: 1px solid rgba(201, 168, 76, 0.25); border-radius: var(--radius-sm); margin-bottom: 2.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <span style="font-size: 1.5rem; color: var(--accent-primary);">⚡</span>
              <div>
                <span class="caps-label-accent" style="font-size: 0.7rem; letter-spacing: 0.1em;">WARDROBE VERSATILITY MULTIPLIER</span>
                <div style="font-size: 1.15rem; font-family: var(--font-display); font-weight: 700; color: var(--text-primary); letter-spacing: 0.02em;">
                  ${optimization.versatilityMultiplier}x WEAR RATIO · ${optimization.totalCombos} COMBINATIONS FROM ${wardrobe.pieces.length} PIECES
                </div>
              </div>
            </div>
            <div class="badge badge-accent" style="letter-spacing: 0.1em; font-size: 0.7rem; padding: 6px 12px;">
              ${optimization.efficiencyRating}
            </div>
          </div>

          <!-- PHASE 19: MISSING-ITEM DETECTION & WARDROBE READINESS CARD -->
          <div class="wardrobe-gap-card reveal-on-scroll" style="margin-bottom: 3.5rem; padding: 1.5rem; background: ${missingItems.hasCriticalGaps ? 'rgba(235, 87, 87, 0.04)' : 'rgba(39, 174, 96, 0.04)'}; border: 1px solid ${missingItems.hasCriticalGaps ? 'rgba(235, 87, 87, 0.3)' : 'rgba(39, 174, 96, 0.3)'}; border-radius: var(--radius-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.35rem;">${missingItems.hasCriticalGaps ? '⚠️' : '🛡️'}</span>
                <div>
                  <span class="caps-label" style="font-size: 0.7rem; color: ${missingItems.hasCriticalGaps ? '#eb5757' : '#27ae60'}; letter-spacing: 0.12em;">
                    ${missingItems.hasCriticalGaps ? 'WARDROBE READINESS ADVISORY' : 'TRIP READINESS VERIFIED'}
                  </span>
                  <h3 style="font-size: 1.15rem; font-family: var(--font-display); font-weight: 700; margin: 0; color: var(--text-primary);">
                    ${missingItems.hasCriticalGaps 
                      ? `Readiness Index: ${missingItems.readinessScore}% · ${missingItems.gaps.length} Friction Gap(s) Diagnosed`
                      : '100% Trip Readiness · Zero Climate, Cultural, or Activity Gaps'}
                  </h3>
                </div>
              </div>
              <div class="badge" style="background: ${missingItems.hasCriticalGaps ? 'rgba(235,87,87,0.15)' : 'rgba(39,174,96,0.15)'}; color: ${missingItems.hasCriticalGaps ? '#eb5757' : '#27ae60'}; border: 1px solid currentColor;">
                ${missingItems.gaps.length} GAP(S)
              </div>
            </div>

            ${missingItems.gaps.length > 0 ? `
              <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
                ${missingItems.gaps.map(gap => `
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding: 1rem; background: rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px;">
                    <div style="max-width: 650px;">
                      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                        <span class="badge" style="font-size: 0.6rem; text-transform: uppercase;">${gap.type}</span>
                        <strong style="color: var(--text-primary); font-size: 0.95rem;">${gap.title}</strong>
                      </div>
                      <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">${gap.reason}</p>
                    </div>
                    <div>
                      <button class="btn btn-primary btn-sm adopt-gap-btn" data-gap-id="${gap.id}" style="font-size: 0.75rem; letter-spacing: 0.08em; padding: 8px 16px;">
                        + ADOPT ${gap.suggestedPiece.name.toUpperCase()}
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0; line-height: 1.5;">
                Your active capsule satisfies all meteorological requirements for ${destName}, meets sacred site cultural protocols, and covers all scheduled activities.
              </p>
            `}
          </div>

          <!-- Section 1: Dynamic Outfit Combinations System -->
          <div class="wardrobe-grid-section">
            
            <div class="outfits-matrix-container reveal-on-scroll stagger-2">
              
              <!-- DUAL MATRIX MODE TOGGLE -->
              <div style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.25rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1.25rem;">
                <div>
                  <span class="caps-label-accent">THE DAILY SYSTEM & PERMUTATIONS</span>
                  <h2 class="section-headline" style="font-size: 1.75rem; margin-bottom: 0;">
                    ${viewMode === 'itinerary' ? 'DAY-BY-DAY ITINERARY' : 'ALL PERMUTATION MATRIX'}
                  </h2>
                </div>

                <div class="matrix-mode-toggle" role="tablist" aria-label="Outfit viewing modes">
                  <button 
                    class="matrix-mode-btn ${viewMode === 'itinerary' ? 'active' : ''}" 
                    id="modeItineraryBtn"
                    role="tab"
                    aria-selected="${viewMode === 'itinerary' ? 'true' : 'false'}"
                  >
                    ITINERARY (${wardrobe.outfits.length} LOOKS)
                  </button>
                  <button 
                    class="matrix-mode-btn ${viewMode === 'combinations' ? 'active' : ''}" 
                    id="modeCombinationsBtn"
                    role="tab"
                    aria-selected="${viewMode === 'combinations' ? 'true' : 'false'}"
                  >
                    COMBINATIONS (${wardrobe.allCombinations?.length || 12} PERMUTATIONS)
                  </button>
                </div>
              </div>

              ${viewMode === 'itinerary' ? `
                <!-- VIEW A: CHRONOLOGICAL ITINERARY TABS -->
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
                      src="${activeOutfit.image || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85'}" 
                      alt="${activeOutfit.title || 'Outfit'}" 
                      class="outfit-matrix-img"
                      id="matrixHeroImg"
                    />
                  </div>

                  <div class="outfit-matrix-details">
                    <div class="outfit-heading-box">
                      <span class="outfit-day-tag" id="matrixDayTag">${activeOutfit.day || 'DAY 01'} · ${activeOutfit.time || 'Daytime'}</span>
                      <h3 class="outfit-name-large" id="matrixTitle">${activeOutfit.title || 'Itinerary Look'}</h3>
                      <div style="display: flex; gap: 0.5rem; margin-top: 0.25rem;">
                        <span class="badge badge-accent" id="matrixTempBadge">${activeOutfit.tempBadge || '22°C'}</span>
                        <span class="badge" id="matrixStepsBadge">${activeOutfit.stepsEst || '12,000 Steps'}</span>
                      </div>
                    </div>

                    <p class="outfit-desc-p" id="matrixDesc">${activeOutfit.description || 'Calibrated travel combination.'}</p>

                    <div class="outfit-capsule-pieces-list" id="matrixPiecesList">
                      <span class="caps-label" style="font-size: 0.65rem;">PIECES IN THIS ROTATION:</span>
                      ${(activeOutfit.pieceNames || []).map(name => `
                        <div class="capsule-piece-row">
                          <span>${name}</span>
                          <span>ACTIVE IN ENSEMBLE</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              ` : `
                <!-- VIEW B: FULL COMBINATIONS MATRIX & FILTER TOOLBAR -->
                <div class="combinations-toolbar">
                  <!-- Occasion Filters -->
                  <div>
                    <span class="caps-label" style="font-size: 0.65rem; color: var(--text-tertiary); display: block; margin-bottom: 0.4rem;">FILTER OCCASION</span>
                    <div class="combinations-chips-row">
                      <button class="combo-filter-chip ${filter.occasion === 'all' ? 'active' : ''}" data-filter-occasion="all">
                        All (${wardrobe.allCombinations?.length || 0})
                      </button>
                      <button class="combo-filter-chip ${filter.occasion === 'daytime' ? 'active' : ''}" data-filter-occasion="daytime">
                        Daytime Exploration
                      </button>
                      <button class="combo-filter-chip ${filter.occasion === 'evening' ? 'active' : ''}" data-filter-occasion="evening">
                        Dinner & Evening
                      </button>
                      <button class="combo-filter-chip ${filter.occasion === 'transit' ? 'active' : ''}" data-filter-occasion="transit">
                        Transit & Travel
                      </button>
                    </div>
                  </div>

                  <!-- Anchor Garment Filter -->
                  <div>
                    <span class="caps-label" style="font-size: 0.65rem; color: var(--text-tertiary); display: block; margin-bottom: 0.4rem;">FILTER BY ANCHOR GARMENT</span>
                    <div class="combinations-chips-row">
                      <button class="combo-filter-chip ${!filter.anchorPieceId ? 'active' : ''}" data-filter-anchor="">
                        All Pieces
                      </button>
                      ${wardrobe.pieces.map(p => `
                        <button class="combo-filter-chip ${filter.anchorPieceId === p.id ? 'active' : ''}" data-filter-anchor="${p.id}">
                          ${p.name.split(' ')[0]} ${p.name.split(' ')[1] || ''}
                        </button>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <!-- COMBINATIONS PERMUTATION GRID -->
                <div class="combinations-grid">
                  ${displayCombos.map(combo => `
                    <div class="combination-card">
                      <div class="combination-card-img-wrap">
                        <img src="${combo.image}" alt="${combo.title}" class="combination-card-img" loading="lazy" />
                        <span class="badge badge-accent" style="position: absolute; top: 0.75rem; left: 0.75rem; font-size: 0.6rem; letter-spacing: 0.08em; background: rgba(10,10,12,0.85); backdrop-filter: blur(8px);">
                          ${combo.occasionLabel}
                        </span>
                        <span class="badge" style="position: absolute; top: 0.75rem; right: 0.75rem; font-size: 0.6rem; background: rgba(10,10,12,0.85);">
                          ${combo.harmonyScore}% HARMONY
                        </span>
                      </div>
                      <div class="combination-card-body">
                        <div>
                          <span class="caps-label-accent" style="font-size: 0.65rem;">${combo.harmonyRating}</span>
                          <h4 class="combination-card-title">${combo.title}</h4>
                        </div>
                        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">
                          ${combo.harmonyDescription}
                        </p>
                        <div class="combination-pieces-pill-list">
                          <span class="caps-label" style="font-size: 0.6rem; color: var(--text-tertiary);">PIECES COMBINED:</span>
                          ${combo.pieceNames.map(pName => `
                            <span style="font-size: 0.75rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.35rem;">
                              <span style="color: var(--accent-primary);">●</span> ${pName}
                            </span>
                          `).join('')}
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-tertiary); border-top: 1px solid rgba(255,255,255,0.06); padding-top: 0.5rem;">
                          <span>${combo.tempBadge}</span>
                          <span>${combo.stepsEst}</span>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}

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
                  <div class="garment-card" style="position: relative;">
                    <div class="garment-image-box">
                      <img src="${piece.image}" alt="${piece.name}" class="garment-img" loading="lazy" />
                      <span class="garment-tag-pill">${piece.role}</span>
                      ${piece.isFromUserWardrobe ? `
                        <span class="badge badge-accent" style="position: absolute; top: 0.75rem; left: 0.75rem; font-size: 0.6rem; padding: 3px 8px; letter-spacing: 0.08em; background: rgba(18, 18, 18, 0.88); backdrop-filter: blur(8px); border: 1px solid var(--accent-primary); color: var(--accent-primary); box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                          FROM YOUR CLOSET
                        </span>
                      ` : ''}
                      <!-- Prune Button -->
                      <button 
                        class="prune-piece-btn" 
                        data-piece-id="${piece.id}" 
                        title="Remove ${piece.name} from active capsule"
                        aria-label="Remove ${piece.name} from active capsule"
                        style="position: absolute; top: 0.75rem; right: 0.75rem; width: 28px; height: 28px; border-radius: 50%; background: rgba(10,10,12,0.85); border: 1px solid rgba(255,255,255,0.2); color: var(--text-secondary); display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; cursor: pointer; transition: all 0.2s;"
                      >
                        ✕
                      </button>
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
    // Mode Switcher (Itinerary vs Combinations)
    const modeItineraryBtn = this.mountPoint.querySelector('#modeItineraryBtn');
    const modeCombinationsBtn = this.mountPoint.querySelector('#modeCombinationsBtn');

    if (modeItineraryBtn) {
      modeItineraryBtn.addEventListener('click', () => {
        store.setWardrobeViewMode('itinerary');
      });
    }

    if (modeCombinationsBtn) {
      modeCombinationsBtn.addEventListener('click', () => {
        store.setWardrobeViewMode('combinations');
      });
    }

    // Adopt Missing Gap Buttons
    const adoptBtns = this.mountPoint.querySelectorAll('.adopt-gap-btn');
    adoptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const gapId = btn.getAttribute('data-gap-id');
        const { wardrobe } = store.getState();
        const gap = (wardrobe.missingItems?.gaps || []).find(g => g.id === gapId);
        if (gap && gap.suggestedPiece) {
          store.addPieceToActiveCapsule(gap.suggestedPiece);
        }
      });
    });

    // Combinations Occasion Filter Chips
    const occasionChips = this.mountPoint.querySelectorAll('[data-filter-occasion]');
    occasionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const occasion = chip.getAttribute('data-filter-occasion');
        store.setCombinationsFilter({ occasion });
      });
    });

    // Combinations Anchor Garment Filter Chips
    const anchorChips = this.mountPoint.querySelectorAll('[data-filter-anchor]');
    anchorChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const anchorPieceId = chip.getAttribute('data-filter-anchor') || null;
        store.setCombinationsFilter({ anchorPieceId });
      });
    });

    // Garment Prune Buttons
    const pruneBtns = this.mountPoint.querySelectorAll('.prune-piece-btn');
    pruneBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pieceId = btn.getAttribute('data-piece-id');
        store.removePieceFromActiveCapsule(pieceId);
      });
    });

    // Itinerary Tab Navigation
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
