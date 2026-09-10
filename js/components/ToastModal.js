/**
 * ROVE — ToastModal Component
 * Luxury Editorial Notifications
 */

import { store } from '../store.js';

export class ToastModal {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    store.subscribe((event, payload) => {
      if (event === 'TOAST_UPDATED') {
        this.update(payload);
      }
    });
  }

  render() {
    this.mountPoint.innerHTML = `
      <div class="toast-container" id="globalToastContainer">
        <div class="toast" id="globalToast" role="alert" aria-live="polite">
          <div class="toast-content">
            <span class="toast-title" id="toastTitle">NOTIFICATION</span>
            <p class="toast-message" id="toastMessage">Message content</p>
          </div>
          <button class="toast-close" id="toastCloseBtn" aria-label="Dismiss notification">✕</button>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const closeBtn = this.mountPoint.querySelector('#toastCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        store.hideToast();
      });
    }
  }

  update(toastState) {
    const toast = this.mountPoint.querySelector('#globalToast');
    const title = this.mountPoint.querySelector('#toastTitle');
    const msg = this.mountPoint.querySelector('#toastMessage');

    if (!toast) return;

    if (toastState.isOpen) {
      if (title) title.textContent = toastState.title;
      if (msg) msg.textContent = toastState.message;
      toast.classList.add('show');
    } else {
      toast.classList.remove('show');
    }
  }
}
