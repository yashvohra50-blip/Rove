/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * Global State Management & Event Bus
 */

import { DESTINATIONS, JAIPUR_CAPSULE_PIECES, JAIPUR_OUTFITS } from './data/mockData.js';
import { authService } from './services/authService.js';

class Store {
  constructor() {
    let initialTrip = {
      destination: 'Jaipur',
      destinationMeta: DESTINATIONS.find(d => d.id === 'jaipur'),
      duration: 5,
      activities: ['sightseeing', 'dining', 'shopping'],
      style: 'minimal',
      luggage: 'carryon'
    };

    try {
      const saved = localStorage.getItem('rove_trip');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.destination) {
          initialTrip = { ...initialTrip, ...parsed };
        }
      }
    } catch (e) {
      // Graceful fallback if cookies/storage blocked
    }

    const initialUser = authService.getActiveSession();

    this.state = {
      currentTrip: initialTrip,
      wardrobe: {
        pieces: [...JAIPUR_CAPSULE_PIECES],
        outfits: [...JAIPUR_OUTFITS],
        selectedOutfitIndex: 0
      },
      builder: {
        isOpen: false,
        step: 1, // 1: Dest, 2: Days, 3: Activities, 4: Style, 5: Luggage, 6: Ready
        isCurating: false
      },
      auth: {
        user: initialUser,
        isAuthenticated: !!initialUser,
        isAuthModalOpen: false,
        authModalView: 'login', // 'login' | 'signup' | 'verify' | 'forgot' | 'reset'
        authEmailContext: '',
        redirectAfterAuth: null
      },
      toast: {
        isOpen: false,
        title: '',
        message: ''
      },
      activeRoute: window.location.hash || '#/'
    };

    this.listeners = new Set();
  }

  saveTripState() {
    try {
      localStorage.setItem('rove_trip', JSON.stringify(this.state.currentTrip));
    } catch (e) {}
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event, payload) {
    for (const listener of this.listeners) {
      listener(event, payload, this.state);
    }
  }

  // Trip Builder Mutations
  openBuilder(step = 1) {
    this.state.builder.isOpen = true;
    this.state.builder.step = step;
    this.state.builder.isCurating = false;
    document.body.style.overflow = 'hidden';
    this.notify('BUILDER_OPENED', this.state.builder);
  }

  closeBuilder() {
    this.state.builder.isOpen = false;
    this.state.builder.isCurating = false;
    document.body.style.overflow = '';
    this.notify('BUILDER_CLOSED', this.state.builder);
  }

  setBuilderStep(step) {
    this.state.builder.step = Math.max(1, Math.min(6, step));
    this.notify('BUILDER_STEP_CHANGED', this.state.builder);
  }

  updateTripDestination(destName) {
    this.state.currentTrip.destination = destName;
    const match = DESTINATIONS.find(d => d.city.toLowerCase() === destName.toLowerCase() || d.id === destName.toLowerCase());
    this.state.currentTrip.destinationMeta = match || {
      id: 'custom',
      city: destName,
      country: 'Global',
      tagline: 'Custom Destination',
      avgTemp: '28°C',
      climate: 'Moderate',
      walkingIntensity: '8 KM / Day',
      recommendedFabrics: ['Lightweight Cotton', 'Linen', 'Merino Wool'],
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=85'
    };
    this.saveTripState();
    this.notify('TRIP_UPDATED', this.state.currentTrip);
  }

  updateTripDuration(days) {
    this.state.currentTrip.duration = Number(days);
    this.saveTripState();
    this.notify('TRIP_UPDATED', this.state.currentTrip);
  }

  toggleActivity(actId) {
    const acts = new Set(this.state.currentTrip.activities);
    if (acts.has(actId)) {
      if (acts.size > 1) acts.delete(actId);
    } else {
      acts.add(actId);
    }
    this.state.currentTrip.activities = Array.from(acts);
    this.saveTripState();
    this.notify('TRIP_UPDATED', this.state.currentTrip);
  }

  updateTripStyle(styleId) {
    this.state.currentTrip.style = styleId;
    this.saveTripState();
    this.notify('TRIP_UPDATED', this.state.currentTrip);
  }

  updateTripLuggage(luggageId) {
    this.state.currentTrip.luggage = luggageId;
    this.saveTripState();
    this.notify('TRIP_UPDATED', this.state.currentTrip);
  }

  // Curation Process
  startCuration(onComplete) {
    this.state.builder.isCurating = true;
    this.notify('CURATION_STARTED', null);

    // Simulate cinematic AI curation sequence
    setTimeout(() => {
      this.state.builder.isCurating = false;
      this.closeBuilder();
      window.location.hash = '#/wardrobe';
      if (onComplete) onComplete();
      this.notify('CURATION_COMPLETED', this.state.wardrobe);
    }, 1700);
  }

  setSelectedOutfit(index) {
    this.state.wardrobe.selectedOutfitIndex = index;
    this.notify('OUTFIT_SELECTED', index);
  }

  // Toast System
  showToast(title, message, duration = 4000) {
    this.state.toast = { isOpen: true, title, message };
    this.notify('TOAST_UPDATED', this.state.toast);

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.state.toast.isOpen = false;
      this.notify('TOAST_UPDATED', this.state.toast);
    }, duration);
  }

  hideToast() {
    this.state.toast.isOpen = false;
    this.notify('TOAST_UPDATED', this.state.toast);
  }

  // Route updates
  setRoute(hash) {
    this.state.activeRoute = hash || '#/';
    this.notify('ROUTE_CHANGED', this.state.activeRoute);
  }

  // ==========================================================================
  // Auth Mutations (Phase 16)
  // ==========================================================================

  openAuthModal(view = 'login', redirectUrl = null, emailContext = '') {
    this.state.auth.isAuthModalOpen = true;
    this.state.auth.authModalView = view;
    if (redirectUrl !== undefined) {
      this.state.auth.redirectAfterAuth = redirectUrl;
    }
    if (emailContext) {
      this.state.auth.authEmailContext = emailContext;
    }
    this.notify('AUTH_MODAL_OPENED', this.state.auth);
  }

  closeAuthModal() {
    this.state.auth.isAuthModalOpen = false;
    this.notify('AUTH_MODAL_CLOSED', this.state.auth);
  }

  setAuthUser(user) {
    this.state.auth.user = user;
    this.state.auth.isAuthenticated = !!user;
    this.notify('AUTH_STATE_CHANGED', this.state.auth);
  }

  logout() {
    authService.logout();
    this.state.auth.user = null;
    this.state.auth.isAuthenticated = false;
    this.state.auth.redirectAfterAuth = null;
    this.notify('AUTH_STATE_CHANGED', this.state.auth);
    this.showToast('SIGNED OUT', 'You have been safely signed out of ROVE.');
    if (window.location.hash === '#/my-rove') {
      window.location.hash = '#/';
    }
  }

  saveCurrentTripToAccount() {
    if (!this.state.auth.isAuthenticated || !this.state.auth.user) {
      this.openAuthModal('login', null);
      this.showToast('SIGN IN REQUIRED', 'Sign in to save this bespoke journey to your ROVE Passport.');
      return false;
    }

    const updatedUser = authService.saveTripToAccount(
      this.state.auth.user.id,
      this.state.currentTrip,
      this.state.wardrobe
    );
    this.setAuthUser(updatedUser);
    this.showToast('JOURNEY ARCHIVED', `${this.state.currentTrip.destination} capsule saved to your ROVE account.`);
    return true;
  }

  // ==========================================================================
  // User Wardrobe Collection Mutations (Phase 17)
  // ==========================================================================

  getUserWardrobe() {
    if (!this.state.auth.isAuthenticated || !this.state.auth.user) {
      return [];
    }
    return authService.getUserWardrobe(this.state.auth.user.id);
  }

  addUserWardrobeItem(item) {
    if (!this.state.auth.isAuthenticated || !this.state.auth.user) {
      this.openAuthModal('login', '#/my-wardrobe');
      return null;
    }
    const res = authService.addWardrobeItem(this.state.auth.user.id, item);
    this.setAuthUser(res.user);
    this.notify('WARDROBE_COLLECTION_UPDATED', res.user.wardrobe);
    this.showToast('GARMENT ARCHIVED', `"${res.item.name}" added to your personal wardrobe.`);
    return res.item;
  }

  updateUserWardrobeItem(itemId, updates) {
    if (!this.state.auth.isAuthenticated || !this.state.auth.user) return null;
    const res = authService.updateWardrobeItem(this.state.auth.user.id, itemId, updates);
    this.setAuthUser(res.user);
    this.notify('WARDROBE_COLLECTION_UPDATED', res.user.wardrobe);
    this.showToast('GARMENT UPDATED', `"${res.item.name}" specifications updated.`);
    return res.item;
  }

  deleteUserWardrobeItem(itemId) {
    if (!this.state.auth.isAuthenticated || !this.state.auth.user) return false;
    const updatedUser = authService.deleteWardrobeItem(this.state.auth.user.id, itemId);
    this.setAuthUser(updatedUser);
    this.notify('WARDROBE_COLLECTION_UPDATED', updatedUser.wardrobe);
    this.showToast('GARMENT REMOVED', 'Item removed from your personal wardrobe.');
    return true;
  }

  togglePinWardrobeItem(itemId) {
    if (!this.state.auth.isAuthenticated || !this.state.auth.user) return false;
    const updatedUser = authService.togglePinWardrobeItem(this.state.auth.user.id, itemId);
    this.setAuthUser(updatedUser);
    this.notify('WARDROBE_COLLECTION_UPDATED', updatedUser.wardrobe);
    return true;
  }

  importEssentialPack() {
    if (!this.state.auth.isAuthenticated || !this.state.auth.user) {
      this.openAuthModal('login', '#/my-wardrobe');
      return false;
    }
    const updatedUser = authService.importEssentialPack(this.state.auth.user.id);
    this.setAuthUser(updatedUser);
    this.notify('WARDROBE_COLLECTION_UPDATED', updatedUser.wardrobe);
    this.showToast('PACK IMPORTED', 'Essential travel pieces loaded into your wardrobe.');
    return true;
  }
}

export const store = new Store();
