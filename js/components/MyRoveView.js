/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * MyRoveView Component (Phase 16)
 * Dedicated Luxury Member Dashboard & Digital Nomadic Passport (#/my-rove)
 */

import { store } from '../store.js';
import { authService } from '../services/authService.js';

export class MyRoveView {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    // Re-render when auth or trip state updates
    this.unsubscribe = store.subscribe((event, payload) => {
      if (event === 'AUTH_STATE_CHANGED') {
        if (!store.getState().auth.isAuthenticated) {
          window.location.hash = '#/';
        } else {
          this.render();
          this.bindEvents();
        }
      } else if (event === 'TRIP_UPDATED') {
        this.render();
        this.bindEvents();
      }
    });
  }

  render() {
    const authState = store.getState().auth;
    const user = authState.user;

    if (!user) {
      this.mountPoint.innerHTML = `
        <div class="my-rove-page">
          <div class="my-rove-container" style="text-align: center; padding-top: 4rem;">
            <p>Authenticating session...</p>
          </div>
        </div>
      `;
      return;
    }

    const currentTrip = store.getState().currentTrip;
    const savedTrips = user.savedTrips || [];
    const userWardrobe = store.getUserWardrobe();
    const totalDays = savedTrips.reduce((acc, t) => acc + (t.duration || 0), currentTrip?.duration || 0);

    // Initials for avatar
    const initials = user.name
      ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
      : 'R';

    this.mountPoint.innerHTML = `
      <div class="my-rove-page" id="myRovePage">
        <div class="my-rove-container">
          
          <!-- 1. Digital Nomadic Passport Hero Banner -->
          <div class="passport-banner" id="passportBanner">
            <div class="passport-banner-left">
              <div class="member-avatar" aria-hidden="true">${initials}</div>
              <div class="member-info">
                <div class="member-tier-pill">
                  <span class="pulse-dot"></span>
                  <span>${user.tier || 'MEMBER · TIER 01'}</span>
                </div>
                <h1 class="member-name">${user.name}</h1>
                <div class="member-meta">
                  <span class="member-meta-item">PASSPORT: <strong>${user.membershipId || 'ROVE-0000'}</strong></span>
                  <span class="member-meta-item">HOME BASE: <strong>${user.homeBase || 'GLOBAL'}</strong></span>
                  <span class="member-meta-item">MEMBER SINCE: <strong>${user.memberSince || '2024'}</strong></span>
                  <span class="member-meta-item">EMAIL: <strong>${user.email}</strong></span>
                </div>
              </div>
            </div>

            <div class="passport-banner-actions">
              <button type="button" class="passport-btn-secondary" id="btnSignOutBanner">
                Sign Out
              </button>
            </div>
          </div>

          <!-- 2. Travel Intelligence Performance Metrics -->
          <div class="member-metrics-grid">
            <div class="metric-card">
              <span class="metric-label">Archived Capsules</span>
              <span class="metric-value">${savedTrips.length}</span>
              <span class="metric-sub">Curated itineraries</span>
            </div>
            <div class="metric-card">
              <span class="metric-label">Avg Pack Volume</span>
              <span class="metric-value">${user.preferences?.luggage ? user.preferences.luggage.split(' ')[0] : '38L'}</span>
              <span class="metric-sub">Cabin compliance</span>
            </div>
            <div class="metric-card">
              <span class="metric-label">Fabric Recovery</span>
              <span class="metric-value">100%</span>
              <span class="metric-sub">Anti-wrinkle spec</span>
            </div>
            <div class="metric-card">
              <span class="metric-label">Transit Footprint</span>
              <span class="metric-value">${totalDays} Days</span>
              <span class="metric-sub">Pack-light efficiency</span>
            </div>
          </div>

          <!-- 3. Active Working Capsule -->
          <section class="my-rove-section">
            <div class="section-header-row">
              <div class="section-heading-group">
                <span class="section-tag">CURRENT ITINERARY</span>
                <h2 class="section-title">Active Wardrobe Capsule</h2>
              </div>
              <button class="passport-btn-secondary" id="btnLaunchNewTrip">
                + Build New Itinerary
              </button>
            </div>

            <div class="active-capsule-card">
              <div class="active-capsule-media">
                <img src="${currentTrip.destinationMeta?.image || 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=85'}" alt="${currentTrip.destination}">
              </div>
              <div class="active-capsule-body">
                <div class="active-capsule-meta">
                  <span class="active-badge">
                    <span class="pulse-dot" style="width: 6px; height: 6px; border-radius: 50%; background: #34d399;"></span>
                    ACTIVE CURATION IN PROGRESS
                  </span>
                  <h3 class="active-dest-title">${currentTrip.destination}, ${currentTrip.destinationMeta?.country || 'Destination'}</h3>
                  <div class="active-specs-row">
                    <span class="active-spec-item">Duration: <strong>${currentTrip.duration} Days</strong></span>
                    <span class="active-spec-item">Avg Temp: <strong>${currentTrip.destinationMeta?.avgTemp || '28°C'}</strong></span>
                    <span class="active-spec-item">Style: <strong>${currentTrip.style.toUpperCase()}</strong></span>
                    <span class="active-spec-item">Luggage: <strong>${currentTrip.luggage.toUpperCase()}</strong></span>
                  </div>
                </div>

                <div class="active-actions-row">
                  <a href="#/wardrobe" class="btn-luxury-primary">
                    <span>Inspect Wardrobe</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                  <button type="button" class="passport-btn-secondary" id="btnSaveCurrentTrip">
                    Archive to Account
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- 4. Personal Wardrobe Archive Section (Phase 17) -->
          <section class="my-rove-section">
            <div class="section-header-row">
              <div class="section-heading-group">
                <span class="section-tag">PERSONAL INVENTORY</span>
                <h2 class="section-title">My Wardrobe Archive (${userWardrobe.length} Pieces)</h2>
              </div>
              <a href="#/my-wardrobe" class="btn-luxury-primary">
                <span>Manage Wardrobe Archive</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 1rem;">
              ${userWardrobe.slice(0, 6).map(item => `
                <div style="background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: 4px; overflow: hidden; text-align: center; transition: transform 0.2s ease;">
                  <div style="height: 110px; overflow: hidden; background: #0a0a0c;">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
                  </div>
                  <div style="padding: 0.5rem; font-size: 0.72rem; font-family: var(--font-mono); color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${item.name}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- 5. Saved Capsules Archive Library -->
          <section class="my-rove-section">
            <div class="section-header-row">
              <div class="section-heading-group">
                <span class="section-tag">NOMADIC VAULT</span>
                <h2 class="section-title">Saved Capsules & Itineraries (${savedTrips.length})</h2>
              </div>
            </div>

            ${savedTrips.length === 0 ? `
              <div class="saved-trips-empty">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
                <div class="saved-trips-empty-title">Your Nomadic Vault is Empty</div>
                <p class="saved-trips-empty-sub">
                  When you build custom travel wardrobes with ROVE, archive them here to recall your exact fabric compositions, outfits, and packing manifests anytime.
                </p>
                <button type="button" class="btn-luxury-primary" id="btnBuildFirstCapsule">
                  Curate Your First Trip
                </button>
              </div>
            ` : `
              <div class="saved-trips-grid">
                ${savedTrips.map(trip => `
                  <div class="saved-trip-card" data-trip-id="${trip.id}">
                    <div class="saved-trip-img-wrap">
                      <img src="${trip.image}" alt="${trip.destination}" loading="lazy">
                      <div class="saved-trip-overlay">
                        <span class="saved-trip-badge">${trip.dateSaved || 'Archived'}</span>
                      </div>
                    </div>
                    <div class="saved-trip-body">
                      <div>
                        <h4 class="saved-trip-dest">${trip.destination}, ${trip.country}</h4>
                        <div class="saved-trip-details">
                          <span class="saved-detail-item">Duration: <strong>${trip.duration} Days</strong></span>
                          <span class="saved-detail-item">Pieces: <strong>${trip.pieceCount} Items</strong></span>
                          <span class="saved-detail-item">Climate: <strong>${trip.climate}</strong></span>
                          <span class="saved-detail-item">Luggage: <strong>${trip.bagVolume}</strong></span>
                        </div>
                      </div>
                      <div class="saved-trip-footer">
                        <button type="button" class="btn-restore-trip" data-restore-id="${trip.id}">
                          Restore Capsule
                        </button>
                        <button type="button" class="btn-delete-trip" data-delete-id="${trip.id}" aria-label="Delete saved trip">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </section>

          <!-- 5. Settings: Nomadic Identity & Security -->
          <div class="settings-split-grid">
            
            <!-- Identity & Preferences -->
            <div class="settings-card">
              <h3 class="settings-card-title">
                <svg viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Nomadic Identity & Preferences
              </h3>

              <form class="auth-form" id="formUpdateProfile" novalidate>
                <div class="auth-form-field">
                  <label class="auth-label" for="prefName">Full Name</label>
                  <input type="text" class="auth-input" id="prefName" value="${user.name}">
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="prefHomeBase">Home Base Airport</label>
                  <input type="text" class="auth-input" id="prefHomeBase" value="${user.homeBase || 'London (LHR)'}" placeholder="e.g. London (LHR), Tokyo (HND)">
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="prefStyle">Default Aesthetic Style</label>
                  <select class="auth-input" id="prefStyle">
                    <option value="Minimalist" ${user.preferences?.style === 'Minimalist' ? 'selected' : ''}>Minimalist Technical</option>
                    <option value="Minimal Tailored" ${user.preferences?.style === 'Minimal Tailored' ? 'selected' : ''}>Minimal Tailored</option>
                    <option value="Architectural Monochromatic" ${user.preferences?.style === 'Architectural Monochromatic' ? 'selected' : ''}>Architectural Monochromatic</option>
                    <option value="Classic Heritage" ${user.preferences?.style === 'Classic Heritage' ? 'selected' : ''}>Classic Heritage</option>
                  </select>
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="prefLuggage">Default Luggage Spec</label>
                  <select class="auth-input" id="prefLuggage">
                    <option value="Carry-On (40L)" ${user.preferences?.luggage?.includes('40L') ? 'selected' : ''}>Carry-On (40L Cabin Spec)</option>
                    <option value="Personal Item (24L)" ${user.preferences?.luggage?.includes('24L') ? 'selected' : ''}>Personal Item (24L Underseat)</option>
                    <option value="Checked Transit (65L)" ${user.preferences?.luggage?.includes('65L') ? 'selected' : ''}>Checked Transit (65L Extended)</option>
                  </select>
                </div>

                <button type="submit" class="btn-luxury-primary" style="margin-top: 0.5rem;">
                  Update Preferences
                </button>
              </form>
            </div>

            <!-- Security & Password -->
            <div class="settings-card">
              <h3 class="settings-card-title">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Security & Terminal Access
              </h3>

              <form class="auth-form" id="formChangePassword" novalidate>
                <div class="auth-form-field">
                  <label class="auth-label" for="currentPass">Current Password</label>
                  <input type="password" class="auth-input" id="currentPass" placeholder="••••••••" required autocomplete="current-password">
                  <div class="auth-field-error" id="currentPassError" style="display: none;"></div>
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="newPass">New Password (Min 8 Characters)</label>
                  <input type="password" class="auth-input" id="newPass" placeholder="••••••••" required autocomplete="new-password">
                  <div class="auth-field-error" id="newPassError" style="display: none;"></div>
                </div>

                <button type="submit" class="passport-btn-secondary" style="margin-top: 0.5rem; text-align: center;">
                  Update Encryption Key
                </button>
              </form>

              <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.75rem;">
                <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
                  <strong>Active Session:</strong> Authenticated via Web Crypto API SHA-256 local terminal key.
                </div>
                <button type="button" class="passport-btn-secondary" id="btnSignOutBottom" style="color: #f87171; border-color: rgba(248, 113, 113, 0.3);">
                  Sign Out of All Sessions
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }

  bindEvents() {
    const user = store.getState().auth.user;
    if (!user) return;

    // Sign out buttons
    const signoutBtns = [
      this.mountPoint.querySelector('#btnSignOutBanner'),
      this.mountPoint.querySelector('#btnSignOutBottom')
    ];
    signoutBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          store.logout();
        });
      }
    });

    // Launch builder
    const btnLaunch = this.mountPoint.querySelector('#btnLaunchNewTrip');
    const btnBuildFirst = this.mountPoint.querySelector('#btnBuildFirstCapsule');
    [btnLaunch, btnBuildFirst].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          store.openBuilder(1);
        });
      }
    });

    // Save current trip
    const btnSaveCurrent = this.mountPoint.querySelector('#btnSaveCurrentTrip');
    if (btnSaveCurrent) {
      btnSaveCurrent.addEventListener('click', () => {
        store.saveCurrentTripToAccount();
      });
    }

    // Restore saved trip
    this.mountPoint.querySelectorAll('.btn-restore-trip').forEach(btn => {
      btn.addEventListener('click', () => {
        const tripId = btn.dataset.restoreId;
        const saved = user.savedTrips?.find(t => t.id === tripId);
        if (saved && saved.tripData) {
          store.state.currentTrip = { ...saved.tripData };
          if (saved.wardrobeData) {
            store.state.wardrobe = { ...saved.wardrobeData };
          }
          store.saveTripState();
          store.notify('TRIP_UPDATED', store.state.currentTrip);
          store.showToast('CAPSULE RESTORED', `${saved.destination} itinerary loaded into working memory.`);
          window.location.hash = '#/wardrobe';
        }
      });
    });

    // Delete saved trip
    this.mountPoint.querySelectorAll('.btn-delete-trip').forEach(btn => {
      btn.addEventListener('click', () => {
        const tripId = btn.dataset.deleteId;
        if (confirm('Archive removal: Are you sure you wish to delete this saved capsule?')) {
          const updatedUser = authService.deleteSavedTrip(user.id, tripId);
          store.setAuthUser(updatedUser);
          store.showToast('CAPSULE REMOVED', 'Itinerary removed from your nomadic vault.');
        }
      });
    });

    // Profile preferences form
    const formProfile = this.mountPoint.querySelector('#formUpdateProfile');
    if (formProfile) {
      formProfile.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = formProfile.querySelector('#prefName').value.trim();
        const homeVal = formProfile.querySelector('#prefHomeBase').value.trim();
        const styleVal = formProfile.querySelector('#prefStyle').value;
        const luggageVal = formProfile.querySelector('#prefLuggage').value;

        if (!nameVal) {
          store.showToast('ERROR', 'Name cannot be empty.');
          return;
        }

        const updated = authService.updateProfile(user.id, {
          name: nameVal,
          homeBase: homeVal,
          preferences: {
            style: styleVal,
            luggage: luggageVal
          }
        });

        store.setAuthUser(updated);
        store.showToast('PROFILE UPDATED', 'Your nomad passport preferences have been saved.');
      });
    }

    // Change password form
    const formPassword = this.mountPoint.querySelector('#formChangePassword');
    if (formPassword) {
      formPassword.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currInput = formPassword.querySelector('#currentPass');
        const newInput = formPassword.querySelector('#newPass');
        const currErr = formPassword.querySelector('#currentPassError');
        const newErr = formPassword.querySelector('#newPassError');

        currErr.style.display = 'none';
        newErr.style.display = 'none';

        const currVal = currInput.value;
        const newVal = newInput.value;

        if (!currVal) {
          currErr.textContent = 'Please enter current password.';
          currErr.style.display = 'block';
          return;
        }

        if (newVal.length < 8) {
          newErr.textContent = 'New password must be at least 8 characters.';
          newErr.style.display = 'block';
          return;
        }

        try {
          await authService.changePassword(user.id, currVal, newVal);
          currInput.value = '';
          newInput.value = '';
          store.showToast('SECURITY KEY UPDATED', 'Password updated successfully.');
        } catch (err) {
          currErr.textContent = err.message || 'Incorrect password.';
          currErr.style.display = 'block';
        }
      });
    }
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
