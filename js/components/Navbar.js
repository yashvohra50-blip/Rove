/**
 * ROVE — Navbar Component
 * Desktop Minimal Navigation & Full-screen Mobile Drawer
 */

import { store } from '../store.js';

export class Navbar {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.isMobileMenuOpen = false;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.handleScroll();

    store.subscribe((event) => {
      if (event === 'ROUTE_CHANGED') {
        this.updateActiveLinks();
        if (this.isMobileMenuOpen) {
          this.toggleMobileMenu(false);
        }
      }
    });
  }

  render() {
    this.mountPoint.innerHTML = `
      <header class="navbar" id="mainNavbar">
        <div class="container nav-container">
          <!-- Brand -->
          <a href="#/" class="brand-wrapper" id="navBrandLogo" aria-label="ROVE Home">
            <span class="brand-logo">ROVE</span>
            <span class="brand-descriptor">TRAVEL WARDROBE</span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="nav-links" id="desktopNavLinks">
            <a href="#/wardrobe" class="nav-link" data-route="#/wardrobe" id="navLinkWardrobe">WARDROBE</a>
            <a href="#/clothing" class="nav-link" data-route="#/clothing" id="navLinkClothing">CLOTHING</a>
            <a href="#/footwear" class="nav-link" data-route="#/footwear" id="navLinkFootwear">FOOTWEAR</a>
            <a href="#/" class="nav-link" id="navLinkPack">
              PACK
              <span class="nav-link-badge">COMING NEXT</span>
            </a>
            <a href="#footerRoadmap" class="nav-link" id="navLinkAbout">ABOUT</a>
          </nav>

          <!-- Action & Mobile Toggle -->
          <div class="nav-actions">
            <button class="btn btn-primary btn-sm" id="navBuildTripBtn">
              BUILD MY TRIP
            </button>
            <button class="mobile-toggle" id="mobileMenuToggle" aria-label="Toggle Menu" aria-expanded="false">
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Full-screen Overlay -->
      <div class="mobile-menu" id="mobileMenuDrawer">
        <div class="mobile-links">
          <a href="#/" class="mobile-link" data-route="#/">HOME</a>
          <a href="#/wardrobe" class="mobile-link" data-route="#/wardrobe">WARDROBE</a>
          <a href="#/clothing" class="mobile-link" data-route="#/clothing">CLOTHING</a>
          <a href="#/footwear" class="mobile-link" data-route="#/footwear">FOOTWEAR</a>
          <a href="#/" class="mobile-link" id="mobilePackLink">PACK (COMING NEXT)</a>
          <a href="#footerRoadmap" class="mobile-link" id="mobileAboutLink">ABOUT ROVE</a>
        </div>
        <div class="mobile-menu-footer">
          <button class="btn btn-primary btn-lg" id="mobileBuildTripBtn" style="width: 100%;">
            BUILD MY TRIP
          </button>
          <div class="caps-label" style="text-align: center; margin-top: 0.5rem; color: var(--text-tertiary);">
            ROVE TRAVEL OS · PHASE 01
          </div>
        </div>
      </div>
    `;

    this.updateActiveLinks();
  }

  bindEvents() {
    const nav = this.mountPoint.querySelector('#mainNavbar');
    const toggle = this.mountPoint.querySelector('#mobileMenuToggle');
    const packLink = this.mountPoint.querySelector('#navLinkPack');
    const mobilePackLink = this.mountPoint.querySelector('#mobilePackLink');
    const buildBtn = this.mountPoint.querySelector('#navBuildTripBtn');
    const mobileBuildBtn = this.mountPoint.querySelector('#mobileBuildTripBtn');

    // Sticky Scroll
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    // Mobile Toggle
    toggle.addEventListener('click', () => {
      this.toggleMobileMenu(!this.isMobileMenuOpen);
    });

    // PACK Coming Soon Feedback
    const notifyPackComingSoon = (e) => {
      e.preventDefault();
      store.showToast(
        'MODULE IN DEVELOPMENT',
        'PACK — Luggage weight optimization, fold strategies, and packing checklists are arriving in Phase 2.'
      );
      if (this.isMobileMenuOpen) this.toggleMobileMenu(false);
    };

    if (packLink) packLink.addEventListener('click', notifyPackComingSoon);
    if (mobilePackLink) mobilePackLink.addEventListener('click', notifyPackComingSoon);

    // Build Trip trigger
    const triggerBuilder = (e) => {
      e.preventDefault();
      if (this.isMobileMenuOpen) this.toggleMobileMenu(false);
      store.openBuilder(1);
    };

    if (buildBtn) buildBtn.addEventListener('click', triggerBuilder);
    if (mobileBuildBtn) mobileBuildBtn.addEventListener('click', triggerBuilder);
  }

  handleScroll() {
    const nav = this.mountPoint.querySelector('#mainNavbar');
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  toggleMobileMenu(open) {
    this.isMobileMenuOpen = open;
    const toggle = this.mountPoint.querySelector('#mobileMenuToggle');
    const drawer = this.mountPoint.querySelector('#mobileMenuDrawer');

    if (toggle && drawer) {
      if (open) {
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  }

  updateActiveLinks() {
    const currentHash = window.location.hash || '#/';
    const links = this.mountPoint.querySelectorAll('.nav-link, .mobile-link');
    links.forEach(link => {
      const targetRoute = link.getAttribute('data-route');
      if (targetRoute && targetRoute === currentHash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
