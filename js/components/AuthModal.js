/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * AuthModal Component (Phase 16)
 * Multi-view Luxury Authentication & Security Dialog
 */

import { store } from '../store.js';
import { authService } from '../services/authService.js';

export class AuthModal {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.currentView = 'login'; // 'login' | 'signup' | 'verify' | 'forgot' | 'reset'
    this.emailContext = '';
    this.activeCode = '';
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    store.subscribe((event, payload) => {
      if (event === 'AUTH_MODAL_OPENED') {
        this.currentView = payload.authModalView || 'login';
        this.emailContext = payload.authEmailContext || '';
        this.open();
      } else if (event === 'AUTH_MODAL_CLOSED') {
        this.close();
      }
    });
  }

  render() {
    this.mountPoint.innerHTML = `
      <div class="auth-modal-backdrop" id="authBackdrop" aria-hidden="true">
        <div class="auth-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="authModalTitle" id="authDialog">
          
          <button class="auth-modal-close" id="authCloseBtn" aria-label="Close authentication dialog">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>

          <div class="auth-modal-header">
            <div class="auth-brand-badge">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
              </svg>
              ROVE INTELLIGENCE
            </div>
            <h2 class="auth-modal-title" id="authModalTitle">Sign In</h2>
            <p class="auth-modal-subtitle" id="authModalSubtitle">Access your bespoke wardrobe capsules and nomadic passport.</p>
          </div>

          <div class="auth-view-tabs" id="authTabsNav" role="tablist">
            <button class="auth-view-tab is-active" id="tabLogin" data-view="login" role="tab" aria-selected="true">Sign In</button>
            <button class="auth-view-tab" id="tabSignUp" data-view="signup" role="tab" aria-selected="false">Join ROVE</button>
          </div>

          <div class="auth-demo-banner" id="authDemoBanner">
            <div class="auth-demo-text">
              <strong>Demo Traveler:</strong> traveler@rove.com<br>
              <span>Password: Password123!</span>
            </div>
            <button class="auth-demo-btn" id="btnFillDemo" type="button">Quick Fill</button>
          </div>

          <div class="auth-modal-body" id="authModalBody">
            <!-- Dynamic view inserted here -->
          </div>

          <!-- Live Announcer for Screen Readers -->
          <div class="sr-only" aria-live="polite" id="authLiveAnnouncer"></div>

        </div>
      </div>
    `;

    this.renderCurrentView();
  }

  renderCurrentView() {
    const body = this.mountPoint.querySelector('#authModalBody');
    const title = this.mountPoint.querySelector('#authModalTitle');
    const subtitle = this.mountPoint.querySelector('#authModalSubtitle');
    const tabsNav = this.mountPoint.querySelector('#authTabsNav');
    const demoBanner = this.mountPoint.querySelector('#authDemoBanner');

    if (!body) return;

    // Update tabs state
    const tabLogin = this.mountPoint.querySelector('#tabLogin');
    const tabSignUp = this.mountPoint.querySelector('#tabSignUp');

    if (this.currentView === 'login' || this.currentView === 'signup') {
      tabsNav.style.display = 'flex';
      tabLogin.classList.toggle('is-active', this.currentView === 'login');
      tabLogin.setAttribute('aria-selected', this.currentView === 'login');
      tabSignUp.classList.toggle('is-active', this.currentView === 'signup');
      tabSignUp.setAttribute('aria-selected', this.currentView === 'signup');
      demoBanner.style.display = this.currentView === 'login' ? 'flex' : 'none';
    } else {
      tabsNav.style.display = 'none';
      demoBanner.style.display = 'none';
    }

    if (this.currentView === 'login') {
      title.textContent = 'Sign In';
      subtitle.textContent = 'Access your bespoke wardrobe capsules and nomadic passport.';
      body.innerHTML = `
        <form class="auth-form" id="formLogin" novalidate>
          <div class="auth-form-field">
            <label class="auth-label" for="loginEmail">Email Address</label>
            <div class="auth-input-wrapper">
              <input type="email" class="auth-input" id="loginEmail" name="email" value="${this.emailContext}" placeholder="traveler@rove.com" required autocomplete="email">
            </div>
            <div class="auth-field-error" id="loginEmailError" style="display: none;"></div>
          </div>

          <div class="auth-form-field">
            <div class="auth-label-row">
              <label class="auth-label" for="loginPassword">Password</label>
              <button type="button" class="auth-link-text" id="btnGoForgot">Forgot password?</button>
            </div>
            <div class="auth-input-wrapper">
              <input type="password" class="auth-input" id="loginPassword" name="password" placeholder="••••••••" required autocomplete="current-password">
              <button type="button" class="auth-pw-toggle" id="toggleLoginPw" aria-label="Toggle password visibility">SHOW</button>
            </div>
            <div class="auth-field-error" id="loginPasswordError" style="display: none;"></div>
          </div>

          <div class="auth-checkbox-row">
            <input type="checkbox" class="auth-checkbox" id="loginRemember" checked>
            <label class="auth-checkbox-label" for="loginRemember">Keep this terminal authorized (30 days)</label>
          </div>

          <button type="submit" class="auth-submit-btn" id="btnLoginSubmit">
            <span>Authenticate</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>
      `;
    } else if (this.currentView === 'signup') {
      title.textContent = 'Create Account';
      subtitle.textContent = 'Join the private travel wardrobe collective.';
      body.innerHTML = `
        <form class="auth-form" id="formSignUp" novalidate>
          <div class="auth-form-field">
            <label class="auth-label" for="signupName">Full Name</label>
            <div class="auth-input-wrapper">
              <input type="text" class="auth-input" id="signupName" name="name" placeholder="Julian Vance" required autocomplete="name">
            </div>
            <div class="auth-field-error" id="signupNameError" style="display: none;"></div>
          </div>

          <div class="auth-form-field">
            <label class="auth-label" for="signupEmail">Email Address</label>
            <div class="auth-input-wrapper">
              <input type="email" class="auth-input" id="signupEmail" name="email" value="${this.emailContext}" placeholder="traveler@rove.com" required autocomplete="email">
            </div>
            <div class="auth-field-error" id="signupEmailError" style="display: none;"></div>
          </div>

          <div class="auth-form-field">
            <label class="auth-label" for="signupPassword">Create Password</label>
            <div class="auth-input-wrapper">
              <input type="password" class="auth-input" id="signupPassword" name="password" placeholder="Minimum 8 characters" required autocomplete="new-password">
              <button type="button" class="auth-pw-toggle" id="toggleSignupPw" aria-label="Toggle password visibility">SHOW</button>
            </div>
            <div class="password-meter" id="pwStrengthMeter">
              <div class="password-meter-bars">
                <div class="password-meter-bar" id="bar1"></div>
                <div class="password-meter-bar" id="bar2"></div>
                <div class="password-meter-bar" id="bar3"></div>
                <div class="password-meter-bar" id="bar4"></div>
              </div>
              <div class="password-meter-text">
                <span id="pwStrengthLabel">STRENGTH: NONE</span>
                <span id="pwRequirement">Min 8 chars</span>
              </div>
            </div>
            <div class="auth-field-error" id="signupPasswordError" style="display: none;"></div>
          </div>

          <button type="submit" class="auth-submit-btn" id="btnSignUpSubmit">
            <span>Issue Membership</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>
      `;
    } else if (this.currentView === 'verify') {
      title.textContent = 'Verify Identity';
      subtitle.textContent = `A 6-digit security code was dispatched to ${this.emailContext || 'your email'}.`;
      body.innerHTML = `
        <form class="auth-form" id="formVerify" novalidate>
          <div class="otp-container">
            <div class="otp-digit-group" id="otpGroup">
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-idx="0" required autofocus>
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-idx="1" required>
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-idx="2" required>
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-idx="3" required>
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-idx="4" required>
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-idx="5" required>
            </div>
            <div class="auth-field-error" id="verifyError" style="display: none;"></div>
            <div class="otp-resend-row">
              <span>Didn't receive the code?</span>
              <button type="button" class="auth-link-text" id="btnResendOTP">Resend Code</button>
            </div>
          </div>

          <button type="submit" class="auth-submit-btn" id="btnVerifySubmit">
            <span>Complete Verification</span>
          </button>

          <button type="button" class="auth-link-text" id="btnBackToLogin" style="text-align: center; margin-top: 0.5rem;">
            ← Return to Sign In
          </button>
        </form>
      `;
    } else if (this.currentView === 'forgot') {
      title.textContent = 'Password Recovery';
      subtitle.textContent = 'Enter your email to receive a confidential reset token.';
      body.innerHTML = `
        <form class="auth-form" id="formForgot" novalidate>
          <div class="auth-form-field">
            <label class="auth-label" for="forgotEmail">Registered Email</label>
            <div class="auth-input-wrapper">
              <input type="email" class="auth-input" id="forgotEmail" name="email" value="${this.emailContext}" placeholder="traveler@rove.com" required autocomplete="email">
            </div>
            <div class="auth-field-error" id="forgotEmailError" style="display: none;"></div>
          </div>

          <button type="submit" class="auth-submit-btn" id="btnForgotSubmit">
            <span>Dispatch Recovery Code</span>
          </button>

          <button type="button" class="auth-link-text" id="btnBackToLoginFromForgot" style="text-align: center; margin-top: 0.5rem;">
            ← Return to Sign In
          </button>
        </form>
      `;
    } else if (this.currentView === 'reset') {
      title.textContent = 'Reset Password';
      subtitle.textContent = `Enter the recovery code sent to ${this.emailContext} and set a new password.`;
      body.innerHTML = `
        <form class="auth-form" id="formReset" novalidate>
          <div class="auth-form-field">
            <label class="auth-label" for="resetCode">6-Digit Recovery Code</label>
            <div class="auth-input-wrapper">
              <input type="text" class="auth-input" id="resetCode" placeholder="6-digit code" required style="letter-spacing: 0.2em; font-family: var(--font-mono);">
            </div>
            <div class="auth-field-error" id="resetCodeError" style="display: none;"></div>
          </div>

          <div class="auth-form-field">
            <label class="auth-label" for="resetPassword">New Password</label>
            <div class="auth-input-wrapper">
              <input type="password" class="auth-input" id="resetPassword" placeholder="Minimum 8 characters" required autocomplete="new-password">
              <button type="button" class="auth-pw-toggle" id="toggleResetPw" aria-label="Toggle password visibility">SHOW</button>
            </div>
            <div class="auth-field-error" id="resetPasswordError" style="display: none;"></div>
          </div>

          <button type="submit" class="auth-submit-btn" id="btnResetSubmit">
            <span>Confirm & Update Password</span>
          </button>

          <button type="button" class="auth-link-text" id="btnBackToLoginFromReset" style="text-align: center; margin-top: 0.5rem;">
            ← Return to Sign In
          </button>
        </form>
      `;
    }

    this.bindViewSpecificEvents();
  }

  bindEvents() {
    // Backdrop click to close
    const backdrop = this.mountPoint.querySelector('#authBackdrop');
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        store.closeAuthModal();
      }
    });

    // Close button
    const closeBtn = this.mountPoint.querySelector('#authCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        store.closeAuthModal();
      });
    }

    // Keyboard handling: Escape to close & Tab trapping
    document.addEventListener('keydown', (e) => {
      if (!store.getState().auth.isAuthModalOpen) return;

      if (e.key === 'Escape') {
        store.closeAuthModal();
        return;
      }

      if (e.key === 'Tab') {
        this.trapFocus(e);
      }
    });

    // Tabs switching
    const tabsNav = this.mountPoint.querySelector('#authTabsNav');
    if (tabsNav) {
      tabsNav.addEventListener('click', (e) => {
        const tab = e.target.closest('.auth-view-tab');
        if (!tab) return;
        this.currentView = tab.dataset.view;
        this.renderCurrentView();
      });
    }

    // Quick Fill Demo Button
    const btnDemo = this.mountPoint.querySelector('#btnFillDemo');
    if (btnDemo) {
      btnDemo.addEventListener('click', () => {
        const email = this.mountPoint.querySelector('#loginEmail');
        const pw = this.mountPoint.querySelector('#loginPassword');
        if (email && pw) {
          email.value = 'traveler@rove.com';
          pw.value = 'Password123!';
          store.showToast('CREDENTIALS LOADED', 'Demo traveler credentials entered.');
        }
      });
    }
  }

  bindViewSpecificEvents() {
    // 1. LOGIN
    const formLogin = this.mountPoint.querySelector('#formLogin');
    if (formLogin) {
      // Toggle password
      const pwToggle = this.mountPoint.querySelector('#toggleLoginPw');
      const pwInput = this.mountPoint.querySelector('#loginPassword');
      if (pwToggle && pwInput) {
        pwToggle.addEventListener('click', () => {
          const isPw = pwInput.type === 'password';
          pwInput.type = isPw ? 'text' : 'password';
          pwToggle.textContent = isPw ? 'HIDE' : 'SHOW';
        });
      }

      const btnGoForgot = this.mountPoint.querySelector('#btnGoForgot');
      if (btnGoForgot) {
        btnGoForgot.addEventListener('click', () => {
          this.currentView = 'forgot';
          this.emailContext = pwInput?.value || this.emailContext;
          this.renderCurrentView();
        });
      }

      formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = formLogin.querySelector('#loginEmail');
        const passInput = formLogin.querySelector('#loginPassword');
        const rememberInput = formLogin.querySelector('#loginRemember');
        const btnSubmit = formLogin.querySelector('#btnLoginSubmit');
        const emailErr = formLogin.querySelector('#loginEmailError');
        const passErr = formLogin.querySelector('#loginPasswordError');

        emailErr.style.display = 'none';
        passErr.style.display = 'none';

        const emailVal = emailInput.value.trim();
        const passVal = passInput.value;

        if (!emailVal) {
          emailErr.textContent = 'Please enter your email address.';
          emailErr.style.display = 'block';
          emailInput.focus();
          return;
        }

        if (!passVal) {
          passErr.textContent = 'Please enter your password.';
          passErr.style.display = 'block';
          passInput.focus();
          return;
        }

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span>Verifying...</span>';

        try {
          const user = await authService.login(emailVal, passVal, rememberInput.checked);
          store.setAuthUser(user);
          store.closeAuthModal();
          store.showToast('AUTHENTICATED', `Welcome back, ${user.name}.`);

          const redirect = store.getState().auth.redirectAfterAuth;
          if (redirect) {
            window.location.hash = redirect;
          }
        } catch (err) {
          if (err.code === 'UNVERIFIED') {
            this.emailContext = err.email;
            this.currentView = 'verify';
            this.renderCurrentView();
            store.showToast('VERIFICATION REQUIRED', `Security code sent. [Demo Code: ${err.verificationCode}]`, 8000);
          } else {
            passErr.textContent = err.message || 'Invalid credentials.';
            passErr.style.display = 'block';
            this.announce(err.message);
          }
        } finally {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = `
            <span>Authenticate</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          `;
        }
      });
    }

    // 2. SIGN UP
    const formSignUp = this.mountPoint.querySelector('#formSignUp');
    if (formSignUp) {
      const pwInput = formSignUp.querySelector('#signupPassword');
      const pwToggle = formSignUp.querySelector('#toggleSignupPw');

      if (pwToggle && pwInput) {
        pwToggle.addEventListener('click', () => {
          const isPw = pwInput.type === 'password';
          pwInput.type = isPw ? 'text' : 'password';
          pwToggle.textContent = isPw ? 'HIDE' : 'SHOW';
        });
      }

      // Password strength meter
      if (pwInput) {
        pwInput.addEventListener('input', () => {
          this.updatePasswordStrength(pwInput.value);
        });
      }

      formSignUp.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = formSignUp.querySelector('#signupName');
        const emailInput = formSignUp.querySelector('#signupEmail');
        const passInput = formSignUp.querySelector('#signupPassword');
        const btnSubmit = formSignUp.querySelector('#btnSignUpSubmit');
        const nameErr = formSignUp.querySelector('#signupNameError');
        const emailErr = formSignUp.querySelector('#signupEmailError');
        const passErr = formSignUp.querySelector('#signupPasswordError');

        nameErr.style.display = 'none';
        emailErr.style.display = 'none';
        passErr.style.display = 'none';

        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const passVal = passInput.value;

        if (!nameVal) {
          nameErr.textContent = 'Please enter your name.';
          nameErr.style.display = 'block';
          nameInput.focus();
          return;
        }

        if (!emailVal || !emailVal.includes('@')) {
          emailErr.textContent = 'Please enter a valid email address.';
          emailErr.style.display = 'block';
          emailInput.focus();
          return;
        }

        if (passVal.length < 8) {
          passErr.textContent = 'Password must be at least 8 characters.';
          passErr.style.display = 'block';
          passInput.focus();
          return;
        }

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span>Issuing Passport...</span>';

        try {
          const res = await authService.signUp(nameVal, emailVal, passVal);
          this.emailContext = res.email;
          this.currentView = 'verify';
          this.renderCurrentView();
          store.showToast('CODE DISPATCHED', `Verification code sent to ${res.email}. [Demo: ${res.verificationCode}]`, 10000);
        } catch (err) {
          emailErr.textContent = err.message || 'Registration failed.';
          emailErr.style.display = 'block';
          this.announce(err.message);
        } finally {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = `
            <span>Issue Membership</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          `;
        }
      });
    }

    // 3. OTP VERIFICATION
    const formVerify = this.mountPoint.querySelector('#formVerify');
    if (formVerify) {
      const inputs = Array.from(formVerify.querySelectorAll('.otp-digit-input'));
      const verifyErr = formVerify.querySelector('#verifyError');
      const btnResend = formVerify.querySelector('#btnResendOTP');
      const btnBack = formVerify.querySelector('#btnBackToLogin');

      if (btnBack) {
        btnBack.addEventListener('click', () => {
          this.currentView = 'login';
          this.renderCurrentView();
        });
      }

      if (btnResend) {
        btnResend.addEventListener('click', () => {
          try {
            const newCode = authService.resendVerificationCode(this.emailContext);
            store.showToast('NEW CODE GENERATED', `New verification code dispatched. [Demo: ${newCode}]`, 8000);
          } catch (e) {
            store.showToast('ERROR', e.message);
          }
        });
      }

      // Input auto-advance & paste handler
      inputs.forEach((input, idx) => {
        input.addEventListener('input', (e) => {
          const val = e.target.value.replace(/\D/g, '');
          e.target.value = val.slice(0, 1);
          if (val && idx < inputs.length - 1) {
            inputs[idx + 1].focus();
          }
        });

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !input.value && idx > 0) {
            inputs[idx - 1].focus();
          }
        });

        input.addEventListener('paste', (e) => {
          e.preventDefault();
          const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
          pasted.split('').forEach((char, i) => {
            if (inputs[i]) inputs[i].value = char;
          });
          if (inputs[Math.min(pasted.length, inputs.length - 1)]) {
            inputs[Math.min(pasted.length, inputs.length - 1)].focus();
          }
        });
      });

      formVerify.addEventListener('submit', async (e) => {
        e.preventDefault();
        const code = inputs.map(i => i.value).join('');
        if (code.length < 6) {
          verifyErr.textContent = 'Please enter all 6 digits of your code.';
          verifyErr.style.display = 'block';
          return;
        }

        verifyErr.style.display = 'none';
        const btnSubmit = formVerify.querySelector('#btnVerifySubmit');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span>Verifying...</span>';

        try {
          const user = await authService.verifyEmail(this.emailContext, code);
          store.setAuthUser(user);
          store.closeAuthModal();
          store.showToast('PASSPORT ISSUED', `Welcome to ROVE, ${user.name}. Your account is fully verified.`);
          
          const redirect = store.getState().auth.redirectAfterAuth;
          if (redirect) {
            window.location.hash = redirect;
          }
        } catch (err) {
          verifyErr.textContent = err.message || 'Invalid verification code.';
          verifyErr.style.display = 'block';
          this.announce(err.message);
        } finally {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = '<span>Complete Verification</span>';
        }
      });
    }

    // 4. FORGOT PASSWORD
    const formForgot = this.mountPoint.querySelector('#formForgot');
    if (formForgot) {
      const btnBack = formForgot.querySelector('#btnBackToLoginFromForgot');
      if (btnBack) {
        btnBack.addEventListener('click', () => {
          this.currentView = 'login';
          this.renderCurrentView();
        });
      }

      formForgot.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = formForgot.querySelector('#forgotEmail');
        const emailErr = formForgot.querySelector('#forgotEmailError');
        const btnSubmit = formForgot.querySelector('#btnForgotSubmit');

        emailErr.style.display = 'none';
        const emailVal = emailInput.value.trim();

        if (!emailVal || !emailVal.includes('@')) {
          emailErr.textContent = 'Please enter a valid email address.';
          emailErr.style.display = 'block';
          emailInput.focus();
          return;
        }

        try {
          const code = authService.requestPasswordReset(emailVal);
          this.emailContext = emailVal;
          this.currentView = 'reset';
          this.renderCurrentView();
          store.showToast('RECOVERY CODE ISSUED', `Recovery token sent to ${emailVal}. [Demo: ${code}]`, 10000);
        } catch (err) {
          emailErr.textContent = err.message || 'Email not recognized.';
          emailErr.style.display = 'block';
        }
      });
    }

    // 5. RESET PASSWORD
    const formReset = this.mountPoint.querySelector('#formReset');
    if (formReset) {
      const btnBack = formReset.querySelector('#btnBackToLoginFromReset');
      if (btnBack) {
        btnBack.addEventListener('click', () => {
          this.currentView = 'login';
          this.renderCurrentView();
        });
      }

      const pwInput = formReset.querySelector('#resetPassword');
      const pwToggle = formReset.querySelector('#toggleResetPw');
      if (pwToggle && pwInput) {
        pwToggle.addEventListener('click', () => {
          const isPw = pwInput.type === 'password';
          pwInput.type = isPw ? 'text' : 'password';
          pwToggle.textContent = isPw ? 'HIDE' : 'SHOW';
        });
      }

      formReset.addEventListener('submit', async (e) => {
        e.preventDefault();
        const codeInput = formReset.querySelector('#resetCode');
        const codeErr = formReset.querySelector('#resetCodeError');
        const passErr = formReset.querySelector('#resetPasswordError');
        const btnSubmit = formReset.querySelector('#btnResetSubmit');

        codeErr.style.display = 'none';
        passErr.style.display = 'none';

        const codeVal = codeInput.value.trim();
        const passVal = pwInput.value;

        if (!codeVal) {
          codeErr.textContent = 'Please enter your recovery code.';
          codeErr.style.display = 'block';
          codeInput.focus();
          return;
        }

        if (passVal.length < 8) {
          passErr.textContent = 'New password must be at least 8 characters.';
          passErr.style.display = 'block';
          pwInput.focus();
          return;
        }

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span>Updating Security Keys...</span>';

        try {
          const user = await authService.resetPassword(this.emailContext, codeVal, passVal);
          store.setAuthUser(user);
          store.closeAuthModal();
          store.showToast('PASSWORD UPDATED', 'Your password has been changed and your session secured.');
          
          const redirect = store.getState().auth.redirectAfterAuth;
          if (redirect) {
            window.location.hash = redirect;
          }
        } catch (err) {
          codeErr.textContent = err.message || 'Failed to reset password.';
          codeErr.style.display = 'block';
        } finally {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = '<span>Confirm & Update Password</span>';
        }
      });
    }
  }

  updatePasswordStrength(pw) {
    const bars = [
      this.mountPoint.querySelector('#bar1'),
      this.mountPoint.querySelector('#bar2'),
      this.mountPoint.querySelector('#bar3'),
      this.mountPoint.querySelector('#bar4')
    ];
    const label = this.mountPoint.querySelector('#pwStrengthLabel');
    if (!bars[0] || !label) return;

    bars.forEach(b => b.className = 'password-meter-bar');

    if (!pw) {
      label.textContent = 'STRENGTH: NONE';
      return;
    }

    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++;

    if (score === 1) {
      bars[0].classList.add('active-weak');
      label.textContent = 'STRENGTH: WEAK';
    } else if (score === 2) {
      bars[0].classList.add('active-medium');
      bars[1].classList.add('active-medium');
      label.textContent = 'STRENGTH: MODERATE';
    } else if (score === 3) {
      bars[0].classList.add('active-strong');
      bars[1].classList.add('active-strong');
      bars[2].classList.add('active-strong');
      label.textContent = 'STRENGTH: STRONG';
    } else if (score >= 4) {
      bars.forEach(b => b.classList.add('active-bulletproof'));
      label.textContent = 'STRENGTH: IMPENETRABLE';
    }
  }

  open() {
    const backdrop = this.mountPoint.querySelector('#authBackdrop');
    if (!backdrop) return;

    this.renderCurrentView();
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const firstInput = this.mountPoint.querySelector('.auth-modal-dialog input:not([type=hidden])');
      if (firstInput) firstInput.focus();
    }, 100);
  }

  close() {
    const backdrop = this.mountPoint.querySelector('#authBackdrop');
    if (!backdrop) return;

    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  trapFocus(e) {
    const focusable = this.mountPoint.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }

  announce(message) {
    const announcer = this.mountPoint.querySelector('#authLiveAnnouncer');
    if (announcer) {
      announcer.textContent = message;
    }
  }
}
