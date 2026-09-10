/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * Global State Management & Event Bus
 */

import { DESTINATIONS, JAIPUR_CAPSULE_PIECES, JAIPUR_OUTFITS } from './data/mockData.js';

class Store {
  constructor() {
    this.state = {
      currentTrip: {
        destination: 'Jaipur',
        destinationMeta: DESTINATIONS.find(d => d.id === 'jaipur'),
        duration: 5,
        activities: ['sightseeing', 'dining', 'shopping'],
        style: 'minimal',
        luggage: 'carryon'
      },
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
      toast: {
        isOpen: false,
        title: '',
        message: ''
      },
      activeRoute: window.location.hash || '#/'
    };

    this.listeners = new Set();
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
    this.notify('TRIP_UPDATED', this.state.currentTrip);
  }

  updateTripDuration(days) {
    this.state.currentTrip.duration = Number(days);
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
    this.notify('TRIP_UPDATED', this.state.currentTrip);
  }

  updateTripStyle(styleId) {
    this.state.currentTrip.style = styleId;
    this.notify('TRIP_UPDATED', this.state.currentTrip);
  }

  updateTripLuggage(luggageId) {
    this.state.currentTrip.luggage = luggageId;
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
}

export const store = new Store();
