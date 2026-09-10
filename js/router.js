/**
 * ROVE — Client-Side Router
 * Handles hash navigation with chapter transitions:
 * #/ (Home)
 * #/wardrobe (Curated Capsule & Outfits)
 * #/clothing (Dedicated Clothing Pillars)
 * #/footwear (Dedicated Footwear Archetypes)
 */

import { store } from './store.js';
import { globalScrollReveal } from './components/ScrollReveal.js';

export class Router {
  constructor(routes, pageContainer) {
    this.routes = routes;
    this.pageContainer = pageContainer;
    this.currentRoute = null;

    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRouting());
    // Initial route
    this.handleRouting();
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

      // Trigger formalized scroll observer for newly rendered elements
      requestAnimationFrame(() => {
        this.pageContainer.classList.remove('page-entering');
        globalScrollReveal.observeAll(this.pageContainer);
      });
    }, 200);
  }
}
