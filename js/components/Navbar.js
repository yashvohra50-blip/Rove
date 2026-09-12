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
      } else if (event === 'AUTH_STATE_CHANGED') {
        this.updateAuthUI();
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
          <nav class="nav-links" id="desktopNavLinks" aria-label="Main Navigation">
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
            <div id="navAuthMount" style="display: flex; align-items: center;"></div>
            <button class="btn btn-primary btn-sm" id="navBuildTripBtn" aria-haspopup="dialog">
              BUILD MY TRIP
            </button>
            <button class="mobile-toggle" id="mobileMenuToggle" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="mobileMenuDrawer">
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Full-screen Overlay -->
      <div class="mobile-menu" id="mobileMenuDrawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu" aria-hidden="true">
        <div class="mobile-links">
          <a href="#/" class="mobile-link" data-route="#/">HOME</a>
          <a href="#/wardrobe" class="mobile-link" data-route="#/wardrobe">WARDROBE</a>
          <a href="#/clothing" class="mobile-link" data-route="#/clothing">CLOTHING</a>
          <a href="#/footwear" class="mobile-link" data-route="#/footwear">FOOTWEAR</a>
          <a href="#/" class="mobile-link" id="mobilePackLink">PACK (COMING NEXT)</a>
          <a href="#footerRoadmap" class="mobile-link" id="mobileAboutLink">ABOUT ROVE</a>
          <div id="mobileAuthMount"></div>
        </div>
        <div class="mobile-menu-footer">
          <button class="btn btn-primary btn-lg" id="mobileBuildTripBtn" style="width: 100%;" aria-haspopup="dialog">
            BUILD MY TRIP
          </button>
          <div class="caps-label" style="text-align: center; margin-top: 0.5rem; color: var(--text-tertiary);">
            ROVE TRAVEL OS · PHASE 01
          </div>
        </div>
      </div>
    `;

    this.updateAuthUI();
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
    this.scrollTicking = false;
  }

  handleScroll() {
    if (this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      const nav = this.mountPoint.querySelector('#mainNavbar');
      if (nav) {
        if (window.scrollY > 40) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
      this.scrollTicking = false;
    });
  }

  toggleMobileMenu(open) {
    this.isMobileMenuOpen = open;
    const toggle = this.mountPoint.querySelector('#mobileMenuToggle');
    const drawer = this.mountPoint.querySelector('#mobileMenuDrawer');

    if (toggle && drawer) {
      if (open) {
        this.lastFocused = document.activeElement;
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const focusables = drawer.querySelectorAll('a[href], button:not([disabled])');
        if (focusables.length) focusables[0].focus();

        this.drawerKeyHandler = (e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            this.toggleMobileMenu(false);
          } else if (e.key === 'Tab') {
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
        window.addEventListener('keydown', this.drawerKeyHandler);
      } else {
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        if (this.drawerKeyHandler) {
          window.removeEventListener('keydown', this.drawerKeyHandler);
          this.drawerKeyHandler = null;
        }

        if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
          this.lastFocused.focus();
        } else {
          toggle.focus();
        }
      }
    }
  }

  updateAuthUI() {
    const navMount = this.mountPoint.querySelector('#navAuthMount');
    const mobileMount = this.mountPoint.querySelector('#mobileAuthMount');
    const authState = store.getState().auth;

    if (authState.isAuthenticated && authState.user) {
      const user = authState.user;
      const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : 'R';

      if (navMount) {
        navMount.innerHTML = `
          <a href="#/my-rove" class="nav-auth-btn" id="navMyRoveBtn" aria-label="Open My Rove Dashboard">
            <span class="nav-user-initials" aria-hidden="true">${initials}</span>
            <span>MY ROVE</span>
          </a>
        `;
      }

      if (mobileMount) {
        mobileMount.innerHTML = `
          <a href="#/my-rove" class="mobile-link" data-route="#/my-rove" id="mobileMyRoveLink" style="color: var(--accent-primary);">
            MY ROVE (${user.name})
          </a>
          <button type="button" class="mobile-link" id="mobileSignOutBtn" style="background: none; border: none; text-align: left; cursor: pointer; color: #f87171; font-size: inherit; font-family: inherit;">
            SIGN OUT
          </button>
        `;
        const signOutBtn = mobileMount.querySelector('#mobileSignOutBtn');
        if (signOutBtn) {
          signOutBtn.addEventListener('click', () => {
            this.toggleMobileMenu(false);
            store.logout();
          });
        }
      }
    } else {
      if (navMount) {
        navMount.innerHTML = `
          <button type="button" class="nav-auth-btn" id="navSignInBtn">
            SIGN IN
          </button>
        `;
        const signInBtn = navMount.querySelector('#navSignInBtn');
        if (signInBtn) {
          signInBtn.addEventListener('click', () => {
            store.openAuthModal('login');
          });
        }
      }

      if (mobileMount) {
        mobileMount.innerHTML = `
          <button type="button" class="mobile-link" id="mobileSignInBtn" style="background: none; border: none; text-align: left; cursor: pointer; color: var(--accent-primary); font-size: inherit; font-family: inherit;">
            SIGN IN / JOIN
          </button>
        `;
        const mobileSignIn = mobileMount.querySelector('#mobileSignInBtn');
        if (mobileSignIn) {
          mobileSignIn.addEventListener('click', () => {
            this.toggleMobileMenu(false);
            store.openAuthModal('login');
          });
        }
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
