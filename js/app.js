/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * Application Coordinator & Bootstrap
 * "Pack Less. Wear More."
 */

import { store } from './store.js';
import { Router } from './router.js';
import { Navbar } from './components/Navbar.js';
import { Hero } from './components/Hero.js';
import { ProblemSection } from './components/ProblemSection.js';
import { StorySection } from './components/StorySection.js';
import { KillerIdeaSection } from './components/KillerIdeaSection.js';
import { ExperienceModules } from './components/ExperienceModules.js';
import { TripBuilder } from './components/TripBuilder.js';
import { WardrobeResult } from './components/WardrobeResult.js';
import { ClothingView } from './components/ClothingView.js';
import { FootwearView } from './components/FootwearView.js';
import { Footer } from './components/Footer.js';
import { ToastModal } from './components/ToastModal.js';
import { AuthModal } from './components/AuthModal.js';
import { MyRoveView } from './components/MyRoveView.js';
import { UserWardrobeView } from './components/UserWardrobeView.js';
import { WardrobeItemModal } from './components/WardrobeItemModal.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    // 1. Mount Persistent Layout Components
    const navMount = document.getElementById('navMount');
    const builderMount = document.getElementById('builderMount');
    const toastMount = document.getElementById('toastMount');
    const authModalMount = document.getElementById('authModalMount');
    const wardrobeModalMount = document.getElementById('wardrobeModalMount');
    const footerMount = document.getElementById('footerMount');
    const appView = document.getElementById('appView');

    if (navMount) new Navbar(navMount);
    if (builderMount) new TripBuilder(builderMount);
    if (toastMount) new ToastModal(toastMount);
    if (authModalMount) new AuthModal(authModalMount);
    if (wardrobeModalMount) new WardrobeItemModal(wardrobeModalMount);
    if (footerMount) new Footer(footerMount);

    // 2. Define Route Handlers
    const routes = {
      '#/': (container) => {
        const heroWrapper = document.createElement('div');
        const problemWrapper = document.createElement('div');
        const storyWrapper = document.createElement('div');
        const killerWrapper = document.createElement('div');
        const modulesWrapper = document.createElement('div');

        container.appendChild(heroWrapper);
        container.appendChild(problemWrapper);
        container.appendChild(storyWrapper);
        container.appendChild(killerWrapper);
        container.appendChild(modulesWrapper);

        new Hero(heroWrapper);
        new ProblemSection(problemWrapper);
        new StorySection(storyWrapper);
        new KillerIdeaSection(killerWrapper);
        new ExperienceModules(modulesWrapper);
      },
      '#/wardrobe': (container) => {
        const wardrobeWrapper = document.createElement('div');
        container.appendChild(wardrobeWrapper);
        new WardrobeResult(wardrobeWrapper);
      },
      '#/clothing': (container) => {
        const clothingWrapper = document.createElement('div');
        container.appendChild(clothingWrapper);
        new ClothingView(clothingWrapper);
      },
      '#/footwear': (container) => {
        const footwearWrapper = document.createElement('div');
        container.appendChild(footwearWrapper);
        new FootwearView(footwearWrapper);
      },
      '#/my-rove': (container) => {
        const myRoveWrapper = document.createElement('div');
        container.appendChild(myRoveWrapper);
        new MyRoveView(myRoveWrapper);
      },
      '#/my-wardrobe': (container) => {
        const userWardrobeWrapper = document.createElement('div');
        container.appendChild(userWardrobeWrapper);
        new UserWardrobeView(userWardrobeWrapper);
      }
    };

    // 3. Initialize Router
    this.router = new Router(routes, appView);

    // 4. Developer API for console inspection
    window.ROVE = {
      store,
      openBuilder: (step = 1) => store.openBuilder(step),
      version: '1.0.0-phase1'
    };

    console.log(
      '%c ROVE %c TRAVEL WARDROBE INTELLIGENCE %c Phase 1 Initialized ',
      'background: #D4AF7A; color: #0A0A0C; font-weight: bold; padding: 4px 8px; border-radius: 2px;',
      'background: #18181E; color: #F5F4F0; padding: 4px 8px;',
      'background: #0A0A0C; color: #8E8D8A; padding: 4px 8px;'
    );
  }
}

// Bootstrap once DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
