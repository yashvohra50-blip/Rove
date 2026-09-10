/**
 * ROVE — Client-Side Router
 * Handles hash navigation with chapter transitions:
 * #/ (Home)
 * #/wardrobe (Curated Capsule & Outfits)
 * #/clothing (Dedicated Clothing Pillars)
 * #/footwear (Dedicated Footwear Archetypes)
 */

import { store } from './store.js';

export class Router {
  constructor(routes, pageContainer) {
    this.routes = routes;
    this.pageContainer = pageContainer;
    this.currentRoute = null;
    this.observer = null;

    this.init();
  }

  init() {
    this.setupIntersectionObserver();

    window.addEventListener('hashchange', () => this.handleRouting());
    // Initial route
    this.handleRouting();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);
  }

  observeReveals() {
    if (!this.observer) return;
    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
    elements.forEach(el => this.observer.observe(el));
  }

  handleRouting() {
    const hash = window.location.hash || '#/';
    store.setRoute(hash);

    // Support internal section anchors on homepage
    if (hash.startsWith('#section') || hash.startsWith('#cat_') || hash.startsWith('#footer')) {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const routeKey = Object.keys(this.routes).find(key => {
      if (key === hash) return true;
      if (key === '#/' && (hash === '' || hash === '#')) return true;
      return false;
    }) || '#/';

    if (this.currentRoute === routeKey) return;
    this.currentRoute = routeKey;

    // Transition: Leave -> Mount -> Enter
    this.pageContainer.classList.add('page-leaving');

    setTimeout(() => {
      // Clear container and render new view
      this.pageContainer.innerHTML = '';
      window.scrollTo({ top: 0, behavior: 'instant' });

      const renderView = this.routes[routeKey];
      if (renderView) {
        renderView(this.pageContainer);
      }

      this.pageContainer.classList.remove('page-leaving');
      this.pageContainer.classList.add('page-entering');

      // Trigger scroll observer for new elements
      requestAnimationFrame(() => {
        this.pageContainer.classList.remove('page-entering');
        this.observeReveals();
      });
    }, 200);
  }
}
