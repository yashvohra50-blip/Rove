/**
 * ROVE — TripBuilder Component
 * Full-Screen Immersive 5-Step Trip Planning Experience
 */

import { store } from '../store.js';
import { DESTINATIONS, DURATION_OPTIONS, ACTIVITY_OPTIONS, STYLE_OPTIONS, LUGGAGE_OPTIONS } from '../data/mockData.js';

export class TripBuilder {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    store.subscribe((event) => {
      if (event === 'BUILDER_OPENED' || event === 'BUILDER_STEP_CHANGED' || event === 'BUILDER_CLOSED' || event === 'TRIP_UPDATED') {
        this.updateView();
      }
      if (event === 'CURATION_STARTED') {
        this.showCurationOverlay(true);
      }
      if (event === 'CURATION_COMPLETED') {
        this.showCurationOverlay(false);
      }
    });
  }

  render() {
    this.mountPoint.innerHTML = `
      <div class="builder-modal" id="builderModal" role="dialog" aria-modal="true" aria-labelledby="builderModalTitle">
        
        <!-- Screen Reader Live Announcer -->
        <div class="sr-only" aria-live="polite" id="builderStepAnnouncer"></div>
        <h1 id="builderModalTitle" class="sr-only">ROVE Trip Architect</h1>

        <!-- Sticky Top Navigation -->
        <div class="builder-nav-bar">
          <div class="builder-brand">
            <span class="brand-logo" style="font-size: 1.25rem;">ROVE</span>
            <span class="caps-label-accent" style="font-size: 0.65rem;">TRIP ARCHITECT</span>
          </div>

          <div style="display: flex; align-items: center; gap: 1.5rem;">
            <div class="builder-progress-bar-wrap">
              <div class="builder-progress-bar" id="builderProgressBar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="5" aria-label="Trip builder progress"></div>
            </div>
            <div class="builder-step-tracker" id="builderStepCounter" aria-label="Step 1 of 5">01 / 05</div>
          </div>

          <button class="builder-close-btn" id="builderCloseBtn" aria-label="Close trip builder">
            ✕
          </button>
        </div>

        <!-- Stage Container -->
        <div class="builder-stage">
          
          <!-- STEP 01: Destination -->
          <div class="builder-step-card" data-step="1" id="stepCard1">
            <div class="step-header">
              <span class="step-label">STEP 01</span>
              <h2 class="step-question" id="stepQuestion1">WHERE ARE YOU GOING?</h2>
              <p class="step-hint">Enter your destination or choose one of our curated high-context locations.</p>
            </div>

            <div class="destination-input-group">
              <label for="destInput" class="visually-hidden">Destination City or Region</label>
              <input 
                type="text" 
                class="destination-text-input" 
                id="destInput" 
                placeholder="e.g. Jaipur, Kyoto, Amalfi..." 
                autocomplete="off"
              />
              <span class="destination-suggestions-label">CURATED DESTINATIONS:</span>
              <div class="destination-chips-row" id="destChipsRow" role="group" aria-label="Curated Destinations">
                ${DESTINATIONS.map(d => `
                  <button class="chip" data-dest-id="${d.id}" data-dest-name="${d.city}" role="button" aria-pressed="false">
                    ${d.city} (${d.avgTemp})
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- STEP 02: Duration -->
          <div class="builder-step-card" data-step="2" id="stepCard2">
            <div class="step-header">
              <span class="step-label">STEP 02</span>
              <h2 class="step-question" id="stepQuestion2">HOW LONG ARE YOU STAYING?</h2>
              <p class="step-hint">Trip duration dictates the rotation frequency and garment pack density.</p>
            </div>

            <div class="options-grid" id="durationOptionsGrid" role="radiogroup" aria-labelledby="stepQuestion2">
              ${DURATION_OPTIONS.map(opt => `
                <div class="option-box" data-duration="${opt.value}" role="radio" tabindex="0" aria-checked="false" aria-label="${opt.label}: ${opt.subtext}">
                  <span class="option-title">${opt.label}</span>
                  <span class="option-subtext">${opt.subtext}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- STEP 03: Activities -->
          <div class="builder-step-card" data-step="3" id="stepCard3">
            <div class="step-header">
              <span class="step-label">STEP 03</span>
              <h2 class="step-question" id="stepQuestion3">WHAT ARE YOU DOING?</h2>
              <p class="step-hint">Select all activities you anticipate during your stay.</p>
            </div>

            <div class="activities-grid" id="activitiesGrid" role="group" aria-labelledby="stepQuestion3">
              ${ACTIVITY_OPTIONS.map(act => `
                <div class="activity-chip" data-act-id="${act.id}" role="checkbox" tabindex="0" aria-checked="false" aria-label="${act.label}">
                  <span class="activity-name">${act.label}</span>
                  <div class="activity-check" aria-hidden="true">✓</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- STEP 04: Style -->
          <div class="builder-step-card" data-step="4" id="stepCard4">
            <div class="step-header">
              <span class="step-label">STEP 04</span>
              <h2 class="step-question" id="stepQuestion4">WHAT'S YOUR STYLE?</h2>
              <p class="step-hint">Your aesthetic tone for silhouettes, palette, and tailoring level.</p>
            </div>

            <div class="options-grid" id="styleOptionsGrid" role="radiogroup" aria-labelledby="stepQuestion4">
              ${STYLE_OPTIONS.map(s => `
                <div class="option-box" data-style-id="${s.id}" role="radio" tabindex="0" aria-checked="false" aria-label="${s.label}: ${s.desc}">
                  <span class="option-title">${s.label}</span>
                  <span class="option-subtext">${s.desc}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- STEP 05: Luggage -->
          <div class="builder-step-card" data-step="5" id="stepCard5">
            <div class="step-header">
              <span class="step-label">STEP 05</span>
              <h2 class="step-question" id="stepQuestion5">HOW MUCH ARE YOU PACKING?</h2>
              <p class="step-hint">Volumetric boundaries define the absolute maximum garment allocation.</p>
            </div>

            <div class="options-grid" id="luggageOptionsGrid" role="radiogroup" aria-labelledby="stepQuestion5">
              ${LUGGAGE_OPTIONS.map(l => `
                <div class="option-box" data-luggage-id="${l.id}" role="radio" tabindex="0" aria-checked="false" aria-label="${l.label}: ${l.desc}">
                  <span class="option-title">${l.label}</span>
                  <span class="option-subtext">${l.desc}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- STEP 06: Final Trip Ready Brief -->
          <div class="builder-step-card" data-step="6" id="stepCard6">
            <div class="step-header">
              <span class="step-label">SUMMARY</span>
              <h2 class="step-question" id="stepQuestion6">YOUR TRIP IS READY.</h2>
              <p class="step-hint">Review your trip parameters before ROVE synthesizes your capsule wardrobe.</p>
            </div>

            <div class="trip-ready-brief">
              <div class="ready-dest-banner">
                <div>
                  <span class="caps-label-accent">CURATED DESTINATION</span>
                  <h3 class="ready-dest-title" id="readyDestName">JAIPUR</h3>
                </div>
                <div class="badge badge-accent" id="readyTemp">32°C · ARID WARMTH</div>
              </div>

              <div class="ready-params-list">
                <div class="ready-param-item">
                  <span class="ready-param-label">DURATION</span>
                  <span class="ready-param-val" id="readyDuration">5 DAYS</span>
                </div>
                <div class="ready-param-item">
                  <span class="ready-param-label">ACTIVITIES</span>
                  <span class="ready-param-val" id="readyActivities">SIGHTSEEING · DINING · SHOPPING</span>
                </div>
                <div class="ready-param-item">
                  <span class="ready-param-label">STYLE INTENT</span>
                  <span class="ready-param-val" id="readyStyle">MINIMAL</span>
                </div>
                <div class="ready-param-item">
                  <span class="ready-param-label">LUGGAGE CONSTRAINT</span>
                  <span class="ready-param-val" id="readyLuggage">CARRY-ON (40L)</span>
                </div>
              </div>

              <div style="border-top: 1px solid var(--border-subtle); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <span class="caps-label" style="color: var(--text-secondary);">ESTIMATED CAPSULE: 6 PIECES · 8 OUTFITS</span>
                <button class="btn btn-primary btn-lg" id="builderSubmitBtn">
                  BUILD MY WARDROBE →
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- Sticky Bottom Controls -->
        <div class="builder-bottom-controls" id="builderBottomControls">
          <button class="btn btn-ghost" id="builderBackBtn">
            ← BACK
          </button>
          <div class="builder-controls-right">
            <button class="btn btn-primary" id="builderNextBtn">
              CONTINUE →
            </button>
          </div>
        </div>

      </div>

      <!-- Curation / Loading Overlay -->
      <div class="curation-overlay" id="curationOverlay">
        <div class="curation-spinner-line"></div>
        <h3 class="curation-title">BUILDING YOUR WARDROBE…</h3>
        <p class="curation-phrase" id="curationPhrase">“Analyzing 32°C climate, foot mileage, and dining context…”</p>
      </div>
    `;
  }

  bindEvents() {
    const modal = this.mountPoint.querySelector('#builderModal');
    const closeBtn = this.mountPoint.querySelector('#builderCloseBtn');
    const backBtn = this.mountPoint.querySelector('#builderBackBtn');
    const nextBtn = this.mountPoint.querySelector('#builderNextBtn');
    const destInput = this.mountPoint.querySelector('#destInput');
    const submitBtn = this.mountPoint.querySelector('#builderSubmitBtn');

    // Close
    if (closeBtn) closeBtn.addEventListener('click', () => store.closeBuilder());

    // Destination Input
    if (destInput) {
      destInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val) store.updateTripDestination(val);
      });
      destInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.goNext();
        }
      });
    }

    // Curated Destination Chips
    const chips = this.mountPoint.querySelectorAll('#destChipsRow .chip');
    chips.forEach(chip => {
      const selectChip = () => {
        const name = chip.getAttribute('data-dest-name');
        if (destInput) destInput.value = name;
        store.updateTripDestination(name);
        this.goNext();
      };
      chip.addEventListener('click', selectChip);
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectChip();
        }
      });
    });

    // Duration Options
    const durations = this.mountPoint.querySelectorAll('#durationOptionsGrid .option-box');
    durations.forEach(box => {
      const selectDur = () => {
        const val = box.getAttribute('data-duration');
        store.updateTripDuration(val);
        this.goNext();
      };
      box.addEventListener('click', selectDur);
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectDur();
        }
      });
    });

    // Activity Chips
    const acts = this.mountPoint.querySelectorAll('#activitiesGrid .activity-chip');
    acts.forEach(chip => {
      const toggleAct = () => {
        const actId = chip.getAttribute('data-act-id');
        store.toggleActivity(actId);
      };
      chip.addEventListener('click', toggleAct);
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAct();
        }
      });
    });

    // Style Options
    const styles = this.mountPoint.querySelectorAll('#styleOptionsGrid .option-box');
    styles.forEach(box => {
      const selectStyle = () => {
        const styleId = box.getAttribute('data-style-id');
        store.updateTripStyle(styleId);
        this.goNext();
      };
      box.addEventListener('click', selectStyle);
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectStyle();
        }
      });
    });

    // Luggage Options
    const luggage = this.mountPoint.querySelectorAll('#luggageOptionsGrid .option-box');
    luggage.forEach(box => {
      const selectLug = () => {
        const lugId = box.getAttribute('data-luggage-id');
        store.updateTripLuggage(lugId);
        this.goNext();
      };
      box.addEventListener('click', selectLug);
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectLug();
        }
      });
    });

    // Back / Next
    if (backBtn) backBtn.addEventListener('click', () => this.goBack());
    if (nextBtn) nextBtn.addEventListener('click', () => this.goNext());

    // Submit / Curation Trigger
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        store.startCuration();
      });
    }
  }

  goNext() {
    const { step } = store.getState().builder;
    if (step < 6) {
      store.setBuilderStep(step + 1);
    }
  }

  goBack() {
    const { step } = store.getState().builder;
    if (step > 1) {
      store.setBuilderStep(step - 1);
    } else {
      store.closeBuilder();
    }
  }

  updateView() {
    const { isOpen, step } = store.getState().builder;
    const { currentTrip } = store.getState();
    const modal = this.mountPoint.querySelector('#builderModal');
    const progressBar = this.mountPoint.querySelector('#builderProgressBar');
    const stepCounter = this.mountPoint.querySelector('#builderStepCounter');
    const backBtn = this.mountPoint.querySelector('#builderBackBtn');
    const nextBtn = this.mountPoint.querySelector('#builderNextBtn');
    const bottomControls = this.mountPoint.querySelector('#builderBottomControls');
    const announcer = this.mountPoint.querySelector('#builderStepAnnouncer');

    if (!modal) return;

    if (isOpen) {
      modal.classList.add('open');
      if (!this.wasOpen) {
        this.wasOpen = true;
        this.lastFocused = document.activeElement;
        
        // Trap focus & Escape
        this.modalKeyHandler = (e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            store.closeBuilder();
          } else if (e.key === 'Tab') {
            const focusables = modal.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex="0"]');
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        };
        window.addEventListener('keydown', this.modalKeyHandler);

        // Initial focus
        setTimeout(() => {
          const input = this.mountPoint.querySelector('#destInput');
          if (input) input.focus();
        }, 80);
      }
    } else {
      modal.classList.remove('open');
      if (this.wasOpen) {
        this.wasOpen = false;
        if (this.modalKeyHandler) {
          window.removeEventListener('keydown', this.modalKeyHandler);
          this.modalKeyHandler = null;
        }
        if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
          this.lastFocused.focus();
        }
      }
      return;
    }

    // Step cards visibility
    const cards = this.mountPoint.querySelectorAll('.builder-step-card');
    cards.forEach(c => {
      const cardStep = parseInt(c.getAttribute('data-step'), 10);
      c.classList.toggle('active', cardStep === step);
    });

    // Step tracker & Progress bar
    if (step <= 5) {
      if (stepCounter) {
        stepCounter.textContent = `0${step} / 05`;
        stepCounter.setAttribute('aria-label', `Step ${step} of 5`);
      }
      if (progressBar) {
        progressBar.style.width = `${(step / 5) * 100}%`;
        progressBar.setAttribute('aria-valuenow', step.toString());
      }
      if (bottomControls) bottomControls.style.display = 'flex';
      if (nextBtn) {
        nextBtn.textContent = 'CONTINUE →';
        nextBtn.style.display = 'inline-flex';
      }

      // Live region announcement
      const currentCard = this.mountPoint.querySelector(`.builder-step-card[data-step="${step}"]`);
      const qText = currentCard ? currentCard.querySelector('.step-question')?.textContent : '';
      if (announcer && qText) {
        announcer.textContent = `Step ${step} of 5: ${qText}`;
      }
    } else {
      // Step 6: Ready Summary
      if (stepCounter) {
        stepCounter.textContent = 'READY';
        stepCounter.setAttribute('aria-label', 'Trip parameter summary ready');
      }
      if (progressBar) {
        progressBar.style.width = '100%';
        progressBar.setAttribute('aria-valuenow', '5');
      }
      if (nextBtn) nextBtn.style.display = 'none';
      if (announcer) {
        announcer.textContent = 'Summary: Your trip parameters are ready. Review and assemble your wardrobe.';
      }
    }

    // Update active selections on cards
    // 1. Destination
    const destInput = this.mountPoint.querySelector('#destInput');
    if (destInput && document.activeElement !== destInput) {
      destInput.value = currentTrip.destination;
    }
    const chips = this.mountPoint.querySelectorAll('#destChipsRow .chip');
    chips.forEach(chip => {
      const name = chip.getAttribute('data-dest-name');
      const isAct = name.toLowerCase() === currentTrip.destination.toLowerCase();
      chip.classList.toggle('active', isAct);
      chip.setAttribute('aria-pressed', isAct ? 'true' : 'false');
    });

    // 2. Duration
    const durations = this.mountPoint.querySelectorAll('#durationOptionsGrid .option-box');
    durations.forEach(box => {
      const dur = parseInt(box.getAttribute('data-duration'), 10);
      const isSel = dur === currentTrip.duration;
      box.classList.toggle('selected', isSel);
      box.setAttribute('aria-checked', isSel ? 'true' : 'false');
    });

    // 3. Activities
    const acts = this.mountPoint.querySelectorAll('#activitiesGrid .activity-chip');
    acts.forEach(chip => {
      const actId = chip.getAttribute('data-act-id');
      const isSel = currentTrip.activities.includes(actId);
      chip.classList.toggle('selected', isSel);
      chip.setAttribute('aria-checked', isSel ? 'true' : 'false');
    });

    // 4. Style
    const styles = this.mountPoint.querySelectorAll('#styleOptionsGrid .option-box');
    styles.forEach(box => {
      const sid = box.getAttribute('data-style-id');
      const isSel = sid === currentTrip.style;
      box.classList.toggle('selected', isSel);
      box.setAttribute('aria-checked', isSel ? 'true' : 'false');
    });

    // 5. Luggage
    const luggage = this.mountPoint.querySelectorAll('#luggageOptionsGrid .option-box');
    luggage.forEach(box => {
      const lid = box.getAttribute('data-luggage-id');
      const isSel = lid === currentTrip.luggage;
      box.classList.toggle('selected', isSel);
      box.setAttribute('aria-checked', isSel ? 'true' : 'false');
    });

    // 6. Summary Brief
    const readyDest = this.mountPoint.querySelector('#readyDestName');
    const readyTemp = this.mountPoint.querySelector('#readyTemp');
    const readyDuration = this.mountPoint.querySelector('#readyDuration');
    const readyActs = this.mountPoint.querySelector('#readyActivities');
    const readyStyle = this.mountPoint.querySelector('#readyStyle');
    const readyLuggage = this.mountPoint.querySelector('#readyLuggage');

    if (readyDest) readyDest.textContent = currentTrip.destination.toUpperCase();
    if (readyTemp) {
      const meta = currentTrip.destinationMeta;
      readyTemp.textContent = meta ? `${meta.avgTemp} · ${meta.climate}` : '32°C · WARM ARID';
    }
    if (readyDuration) readyDuration.textContent = `${currentTrip.duration} DAYS`;
    if (readyActs) readyActs.textContent = currentTrip.activities.map(a => a.toUpperCase()).join(' · ');
    if (readyStyle) readyStyle.textContent = currentTrip.style.toUpperCase() + ' STYLE';
    if (readyLuggage) {
      const lObj = LUGGAGE_OPTIONS.find(l => l.id === currentTrip.luggage);
      readyLuggage.textContent = lObj ? lObj.label : 'CARRY-ON';
    }
  }

  showCurationOverlay(active) {
    const overlay = this.mountPoint.querySelector('#curationOverlay');
    if (!overlay) return;
    overlay.classList.toggle('active', active);

    if (active) {
      const phrase = this.mountPoint.querySelector('#curationPhrase');
      const phrases = [
        '“Analyzing destination climate and walking demands…”',
        '“Filtering 6 foundational garments for maximum compatibility…”',
        '“Synthesizing day and evening outfit combinations…”',
        '“Finalizing single-bag volumetric limits…”'
      ];
      let pIdx = 0;
      this.phraseInterval = setInterval(() => {
        pIdx = (pIdx + 1) % phrases.length;
        if (phrase) phrase.textContent = phrases[pIdx];
      }, 400);
    } else {
      if (this.phraseInterval) clearInterval(this.phraseInterval);
    }
  }
}
