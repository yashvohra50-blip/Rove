/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * Global State Management & Event Bus
 */

import { DESTINATIONS, JAIPUR_CAPSULE_PIECES, JAIPUR_OUTFITS } from './data/mockData.js';
import { authService } from './services/authService.js';
import { tripIntelligenceEngine } from './services/tripIntelligenceEngine.js';
import { outfitEngine } from './services/outfitEngine.js';

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
    const userWardrobe = initialUser ? authService.getUserWardrobe(initialUser.id) : [];

    const synthesizedInitial = tripIntelligenceEngine.synthesizeCapsule({
      destination: initialTrip.destination,
      duration: initialTrip.duration,
      activities: initialTrip.activities,
      style: initialTrip.style,
      luggage: initialTrip.luggage,
      userWardrobe
    });

    const initialCombos = outfitEngine.generateAllCombinations(
      synthesizedInitial.pieces,
      synthesizedInitial.destination,
      synthesizedInitial.climate
    );
    const initialOpt = outfitEngine.analyzeWardrobeOptimization(
      synthesizedInitial.pieces,
      initialCombos
    );
    const initialGaps = outfitEngine.detectMissingItems({
      pieces: synthesizedInitial.pieces,
      destination: synthesizedInitial.destination,
      activities: initialTrip.activities,
      climate: synthesizedInitial.climate
    });

    this.state = {
      currentTrip: {
        ...initialTrip,
        destinationMeta: synthesizedInitial.destination
      },
      wardrobe: {
        pieces: synthesizedInitial.pieces,
        outfits: synthesizedInitial.outfits,
        allCombinations: initialCombos,
        optimization: initialOpt,
        missingItems: initialGaps,
        selectedOutfitIndex: 0,
        viewMode: 'itinerary', // 'itinerary' | 'combinations'
        combinationsFilter: { occasion: 'all', anchorPieceId: null },
        culturalAdvisories: synthesizedInitial.culturalAdvisories,
        climate: synthesizedInitial.climate,
        stats: synthesizedInitial.stats,
        userPiecesUsedCount: synthesizedInitial.userPiecesUsedCount
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
    const match = tripIntelligenceEngine.resolveDestination(destName);
    this.state.currentTrip.destinationMeta = match;
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

  getTripIntelligence() {
    const destMeta = tripIntelligenceEngine.resolveDestination(this.state.currentTrip.destination);
    const climate = tripIntelligenceEngine.analyzeClimate(destMeta);
    const activities = tripIntelligenceEngine.analyzeActivities(this.state.currentTrip.activities);
    const rotation = tripIntelligenceEngine.calculateDurationRotation(this.state.currentTrip.duration, this.state.currentTrip.luggage);
    const advisories = tripIntelligenceEngine.getCulturalAdvisories(destMeta, this.state.currentTrip.activities);
    const userWardrobe = this.getUserWardrobe();
    const compatibleUserCount = (userWardrobe || []).filter(item => {
      if (!item) return false;
      const itemClimate = item.climate ? item.climate.toLowerCase() : 'all';
      return itemClimate === 'all' || itemClimate === climate.climateBracket;
    }).length;

    return {
      destination: destMeta,
      climate,
      activities,
      rotation,
      advisories,
      compatibleUserCount,
      totalUserGarments: (userWardrobe || []).length
    };
  }

  // Curation Process
  startCuration(onComplete) {
    this.state.builder.isCurating = true;
    this.notify('CURATION_STARTED', null);

    // Dynamic algorithmic wardrobe synthesis
    const synthesized = tripIntelligenceEngine.synthesizeCapsule({
      destination: this.state.currentTrip.destination,
      duration: this.state.currentTrip.duration,
      activities: this.state.currentTrip.activities,
      style: this.state.currentTrip.style,
      luggage: this.state.currentTrip.luggage,
      userWardrobe: this.getUserWardrobe()
    });

    const allCombos = outfitEngine.generateAllCombinations(
      synthesized.pieces,
      synthesized.destination,
      synthesized.climate
    );
    const optimization = outfitEngine.analyzeWardrobeOptimization(
      synthesized.pieces,
      allCombos
    );
    const missingItems = outfitEngine.detectMissingItems({
      pieces: synthesized.pieces,
      destination: synthesized.destination,
      activities: this.state.currentTrip.activities,
      climate: synthesized.climate
    });

    this.state.currentTrip.destinationMeta = synthesized.destination;
    this.state.wardrobe = {
      pieces: synthesized.pieces,
      outfits: synthesized.outfits,
      allCombinations: allCombos,
      optimization,
      missingItems,
      selectedOutfitIndex: 0,
      viewMode: 'itinerary',
      combinationsFilter: { occasion: 'all', anchorPieceId: null },
      culturalAdvisories: synthesized.culturalAdvisories,
      climate: synthesized.climate,
      stats: synthesized.stats,
      userPiecesUsedCount: synthesized.userPiecesUsedCount
    };
    this.saveTripState();

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

  setWardrobeViewMode(mode) {
    this.state.wardrobe.viewMode = mode === 'combinations' ? 'combinations' : 'itinerary';
    this.notify('WARDROBE_VIEW_MODE_CHANGED', this.state.wardrobe.viewMode);
  }

  setCombinationsFilter(filter = {}) {
    this.state.wardrobe.combinationsFilter = {
      ...this.state.wardrobe.combinationsFilter,
      ...filter
    };
    this.notify('COMBINATIONS_FILTER_CHANGED', this.state.wardrobe.combinationsFilter);
  }

  addPieceToActiveCapsule(piece) {
    if (!piece || !piece.name) return false;
    
    const exists = this.state.wardrobe.pieces.some(p => p.id === piece.id || p.name === piece.name);
    if (exists) {
      this.showToast('PIECE ALREADY ACTIVE', `"${piece.name}" is already part of your active capsule.`);
      return false;
    }

    const updatedPieces = [...this.state.wardrobe.pieces, piece];
    const destMeta = this.state.currentTrip.destinationMeta;
    const climate = this.state.wardrobe.climate;

    const allCombos = outfitEngine.generateAllCombinations(updatedPieces, destMeta, climate);
    const optimization = outfitEngine.analyzeWardrobeOptimization(updatedPieces, allCombos);
    const missingItems = outfitEngine.detectMissingItems({
      pieces: updatedPieces,
      destination: destMeta,
      activities: this.state.currentTrip.activities,
      climate
    });

    this.state.wardrobe.pieces = updatedPieces;
    this.state.wardrobe.allCombinations = allCombos;
    this.state.wardrobe.optimization = optimization;
    this.state.wardrobe.missingItems = missingItems;
    if (this.state.wardrobe.stats) {
      this.state.wardrobe.stats.totalPieces = updatedPieces.length;
      this.state.wardrobe.stats.totalOutfits = allCombos.length;
      this.state.wardrobe.stats.totalWeightGrams = updatedPieces.reduce((acc, p) => acc + (parseInt(p.weight, 10) || 250), 0);
    }

    this.showToast('PIECE ADOPTED', `"${piece.name}" added. Capsule re-optimized with ${allCombos.length} combinations.`);
    this.notify('CAPSULE_PIECES_UPDATED', this.state.wardrobe);
    return true;
  }

  removePieceFromActiveCapsule(pieceId) {
    if (this.state.wardrobe.pieces.length <= 4) {
      this.showToast('CAPSULE LIMIT REACHED', 'A travel capsule requires at least 4 foundation pieces.');
      return false;
    }

    const removedPiece = this.state.wardrobe.pieces.find(p => p.id === pieceId);
    const updatedPieces = this.state.wardrobe.pieces.filter(p => p.id !== pieceId);
    const destMeta = this.state.currentTrip.destinationMeta;
    const climate = this.state.wardrobe.climate;

    const allCombos = outfitEngine.generateAllCombinations(updatedPieces, destMeta, climate);
    const optimization = outfitEngine.analyzeWardrobeOptimization(updatedPieces, allCombos);
    const missingItems = outfitEngine.detectMissingItems({
      pieces: updatedPieces,
      destination: destMeta,
      activities: this.state.currentTrip.activities,
      climate
    });

    this.state.wardrobe.pieces = updatedPieces;
    this.state.wardrobe.allCombinations = allCombos;
    this.state.wardrobe.optimization = optimization;
    this.state.wardrobe.missingItems = missingItems;
    if (this.state.wardrobe.stats) {
      this.state.wardrobe.stats.totalPieces = updatedPieces.length;
      this.state.wardrobe.stats.totalOutfits = allCombos.length;
      this.state.wardrobe.stats.totalWeightGrams = updatedPieces.reduce((acc, p) => acc + (parseInt(p.weight, 10) || 250), 0);
    }

    const name = removedPiece ? removedPiece.name : 'Piece';
    this.showToast('PIECE REMOVED', `"${name}" removed from capsule. Outfits recalculated.`);
    this.notify('CAPSULE_PIECES_UPDATED', this.state.wardrobe);
    return true;
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
