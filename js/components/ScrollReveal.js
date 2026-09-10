/**
 * ROVE — ScrollReveal Utility Component
 * Reusable scroll-triggered animation controller
 * Respects prefers-reduced-motion and unobserves elements after entering viewport
 */

export class ScrollReveal {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: options.rootMargin || '0px 0px -60px 0px',
      threshold: options.threshold || 0.1,
      ...options
    };

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.observer = null;
    this.init();
  }

  init() {
    if (this.isReducedMotion) {
      // Instantly reveal everything if reduced motion is requested
      this.revealAllInstantly();
      return;
    }

    this.observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('is-visible');

          // Handle data-delay if provided
          const delay = el.getAttribute('data-delay');
          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
          }

          obs.unobserve(el);
        }
      });
    }, this.options);

    this.observeAll();
  }

  observeAll(rootEl = document) {
    if (this.isReducedMotion) {
      this.revealAllInstantly(rootEl);
      return;
    }

    if (!this.observer) return;
    const elements = rootEl.querySelectorAll('.reveal-on-scroll:not(.is-visible), [data-reveal]:not(.is-visible)');
    elements.forEach(el => this.observer.observe(el));
  }

  revealAllInstantly(rootEl = document) {
    const elements = rootEl.querySelectorAll('.reveal-on-scroll, [data-reveal]');
    elements.forEach(el => el.classList.add('is-visible'));
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export const globalScrollReveal = new ScrollReveal();
