/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * Authentication & Security Service (Phase 16)
 * Native Web Crypto API Hashing & Secure Session Management
 */

const STORAGE_USERS_KEY = 'rove_users_db';
const STORAGE_SESSION_KEY = 'rove_active_session';
const SESSION_DURATION_STANDARD = 24 * 60 * 60 * 1000; // 24 Hours
const SESSION_DURATION_EXTENDED = 30 * 24 * 60 * 60 * 1000; // 30 Days (Remember Me)

export const DEFAULT_JULIAN_WARDROBE = [
  {
    id: 'grm_jv_01',
    name: 'Belgian Camp Collar Linen Shirt',
    category: 'Tops & Shirts',
    fabric: '100% Normandy Breathable Linen (160 GSM)',
    weight: 185,
    color: 'Sand / Ecru',
    climate: 'Warm / Arid',
    laundryTurnaround: '45 min fast air-dry',
    versatility: 'Pairs with all tailored chinos and shorts',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85',
    isPinned: true,
    dateAdded: 'Aug 2024'
  },
  {
    id: 'grm_jv_02',
    name: 'Fine-Gauge Merino Air Tee',
    category: 'Tops & Shirts',
    fabric: '17.5 Micron Ultra-fine New Zealand Merino (145 GSM)',
    weight: 160,
    color: 'Obsidian Black',
    climate: 'All Climates',
    laundryTurnaround: 'Odor-immune (wear 3x before wash)',
    versatility: 'Base layer for flights or casual city walks',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85',
    isPinned: true,
    dateAdded: 'Aug 2024'
  },
  {
    id: 'grm_jv_03',
    name: 'Structured Oxford Popover',
    category: 'Tops & Shirts',
    fabric: 'Long-Staple Supima Cotton (190 GSM)',
    weight: 220,
    color: 'Chalk White',
    climate: 'Temperate',
    laundryTurnaround: 'Overnight hanger dry',
    versatility: 'Elevated dinner or gallery visits',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85',
    isPinned: false,
    dateAdded: 'Sep 2024'
  },
  {
    id: 'grm_jv_04',
    name: 'Pleated High-Twist Travel Chinos',
    category: 'Bottoms & Trousers',
    fabric: '70% Tencel Lyocell, 28% High-Twist Cotton, 2% Elastane',
    weight: 320,
    color: 'Muted Olive Stone',
    climate: 'All Climates',
    laundryTurnaround: 'Wrinkle recovery in humid bathroom',
    versatility: 'Internal zipped passport pocket',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85',
    isPinned: true,
    dateAdded: 'Jul 2024'
  },
  {
    id: 'grm_jv_05',
    name: 'Japanese Washed Selvedge Denim',
    category: 'Bottoms & Trousers',
    fabric: '12.5oz Kurabo Mills Lightweight Stretch Denim',
    weight: 440,
    color: 'Raw Indigo Rinse',
    climate: 'Temperate',
    laundryTurnaround: 'Spot clean only during transit',
    versatility: 'High transit durability across flights and trains',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=85',
    isPinned: false,
    dateAdded: 'Jun 2024'
  },
  {
    id: 'grm_jv_06',
    name: 'Unconstructed Field Overshirt',
    category: 'Outerwear & Jackets',
    fabric: 'Washed Cotton Canvas with DWR Nano Shield (340 GSM)',
    weight: 380,
    color: 'Deep Graphite',
    climate: 'All Climates',
    laundryTurnaround: 'Brush clean',
    versatility: 'Transit layer with 3 concealed passport compartments',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85',
    isPinned: true,
    dateAdded: 'Aug 2024'
  },
  {
    id: 'grm_jv_07',
    name: 'Minimalist Italian Nappa Court Sneaker',
    category: 'Footwear',
    fabric: 'Full-Grain Nappa Leather with Margom Rubber Sole',
    weight: 410,
    color: 'Chalk White / Charcoal',
    climate: 'All Climates',
    laundryTurnaround: 'Wipe down clean',
    versatility: '18,000 daily steps comfort without visual bulk',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85',
    isPinned: true,
    dateAdded: 'May 2024'
  },
  {
    id: 'grm_jv_08',
    name: 'Deconstructed Suede Belgian Loafer',
    category: 'Footwear',
    fabric: 'Water-Resistant Reverse Calfskin Suede, Flexible Blake Sole',
    weight: 360,
    color: 'Espresso Suede',
    climate: 'Temperate',
    laundryTurnaround: 'Cedar shoe tree rest',
    versatility: 'Formal dinners, private clubs, relaxed evenings',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=85',
    isPinned: false,
    dateAdded: 'Aug 2024'
  }
];

class AuthService {
  constructor() {
    this.initDatabase();
  }

  // ==========================================================================
  // 1. CRYPTOGRAPHIC PRIMITIVES (Web Crypto API with robust fallback)
  // ==========================================================================

  async hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    if (window.crypto && window.crypto.subtle) {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback deterministic hash if subtle crypto unavailable
    let hash = 0;
    const str = password + salt;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'fb_' + Math.abs(hash).toString(16).padStart(16, '0');
  }

  generateRandomToken(length = 32) {
    if (window.crypto && window.crypto.getRandomValues) {
      const arr = new Uint8Array(length);
      window.crypto.getRandomValues(arr);
      return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  }

  generateOTP() {
    // 6-digit numeric security code
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // ==========================================================================
  // 2. USER DATABASE & SEED INITIALIZATION
  // ==========================================================================

  initDatabase() {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      // Pre-seed demo traveler Julian Vance
      const defaultSalt = 'rove_salt_jv_2024';
      const defaultHash = '16f1d508bcacd8c08da93bc0f545ab8885069666473452a7efe756700f3bec31'; // SHA-256 for Password123! + salt

      const demoUser = {
        id: 'usr_julian_vance',
        email: 'traveler@rove.com',
        name: 'Julian Vance',
        homeBase: 'London (LHR)',
        salt: defaultSalt,
        passwordHash: defaultHash,
        verified: true,
        verificationCode: null,
        resetToken: null,
        resetTokenExpires: null,
        membershipId: 'ROVE-8492-X',
        tier: 'FOUNDING NOMAD · TIER 01',
        memberSince: '2024',
        preferences: {
          style: 'Minimal Tailored',
          luggage: 'Carry-On (40L)',
          climateTolerance: 'High Heat / Humidity',
          excludedFabrics: ['Synthetics', 'Heavy Denim']
        },
        wardrobe: [...DEFAULT_JULIAN_WARDROBE],
        savedTrips: [
          {
            id: 'trip_jaipur_5d',
            destination: 'Jaipur',
            country: 'India',
            duration: 5,
            climate: '32°C · Arid Heat',
            pieceCount: 6,
            outfitCount: 8,
            bagVolume: '38L Cabin Spec',
            dateSaved: 'September 2024',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=85'
          },
          {
            id: 'trip_kyoto_7d',
            destination: 'Kyoto',
            country: 'Japan',
            duration: 7,
            climate: '18°C · Autumn Mist',
            pieceCount: 7,
            outfitCount: 11,
            bagVolume: '40L Carry-On',
            dateSaved: 'August 2024',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=85'
          }
        ]
      };

      this.saveUsers([demoUser]);
    }
  }

  getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  saveUsers(users) {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {}
  }

  // ==========================================================================
  // 3. AUTHENTICATION LIFECYCLE
  // ==========================================================================

  async signUp(name, email, password) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some(u => u.email === cleanEmail)) {
      throw new Error('An account with this email already exists.');
    }

    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    const salt = this.generateRandomToken(16);
    const passwordHash = await this.hashPassword(password, salt);
    const verificationCode = this.generateOTP();

    const newUser = {
      id: 'usr_' + this.generateRandomToken(8),
      email: cleanEmail,
      name: name.trim(),
      homeBase: 'Global Nomad',
      salt,
      passwordHash,
      verified: false,
      verificationCode,
      resetToken: null,
      resetTokenExpires: null,
      membershipId: 'ROVE-' + Math.floor(1000 + Math.random() * 9000) + '-N',
      tier: 'EXPLORER · TIER 01',
      memberSince: new Date().getFullYear().toString(),
      preferences: {
        style: 'Minimalist',
        luggage: 'Carry-On (40L)',
        climateTolerance: 'Moderate',
        excludedFabrics: []
      },
      wardrobe: [],
      savedTrips: []
    };

    users.push(newUser);
    this.saveUsers(users);

    return {
      email: cleanEmail,
      name: newUser.name,
      verificationCode // Returned to simulate email reception in UI toast
    };
  }

  async verifyEmail(email, code) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email === cleanEmail);

    if (!user) {
      throw new Error('User not found.');
    }

    if (user.verified) {
      return this.createSession(user, false);
    }

    if (user.verificationCode !== code.trim()) {
      throw new Error('Invalid verification code. Please verify and try again.');
    }

    user.verified = true;
    user.verificationCode = null;
    this.saveUsers(users);

    return this.createSession(user, false);
  }

  resendVerificationCode(email) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email === cleanEmail);

    if (!user) {
      throw new Error('User not found.');
    }

    const newCode = this.generateOTP();
    user.verificationCode = newCode;
    this.saveUsers(users);

    return newCode;
  }

  async login(email, password, rememberMe = false) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email === cleanEmail);

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const testHash = await this.hashPassword(password, user.salt);
    if (testHash !== user.passwordHash) {
      throw new Error('Invalid email or password.');
    }

    if (!user.verified) {
      // Need verification first
      const code = this.resendVerificationCode(cleanEmail);
      const err = new Error('Account pending email verification.');
      err.code = 'UNVERIFIED';
      err.verificationCode = code;
      err.email = cleanEmail;
      throw err;
    }

    return this.createSession(user, rememberMe);
  }

  logout() {
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    } catch (e) {}
    return true;
  }

  // ==========================================================================
  // 4. PASSWORD RESET LIFECYCLE
  // ==========================================================================

  requestPasswordReset(email) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email === cleanEmail);

    if (!user) {
      throw new Error('No account found with this email.');
    }

    const resetCode = this.generateOTP();
    user.resetToken = resetCode;
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    this.saveUsers(users);

    return resetCode;
  }

  async resetPassword(email, code, newPassword) {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email === cleanEmail);

    if (!user) {
      throw new Error('No account found with this email.');
    }

    if (!user.resetToken || user.resetToken !== code.trim()) {
      throw new Error('Invalid or expired reset code.');
    }

    if (Date.now() > user.resetTokenExpires) {
      throw new Error('Reset code has expired. Please request a new one.');
    }

    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long.');
    }

    const newSalt = this.generateRandomToken(16);
    user.salt = newSalt;
    user.passwordHash = await this.hashPassword(newPassword, newSalt);
    user.resetToken = null;
    user.resetTokenExpires = null;
    user.verified = true;
    this.saveUsers(users);

    return this.createSession(user, false);
  }

  // ==========================================================================
  // 5. SECURE SESSION MANAGEMENT
  // ==========================================================================

  createSession(user, rememberMe) {
    const duration = rememberMe ? SESSION_DURATION_EXTENDED : SESSION_DURATION_STANDARD;
    const session = {
      token: this.generateRandomToken(32),
      userId: user.id,
      email: user.email,
      name: user.name,
      membershipId: user.membershipId,
      tier: user.tier,
      expiresAt: Date.now() + duration,
      rememberMe
    };

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    } catch (e) {}

    return this.sanitizeUser(user);
  }

  getActiveSession() {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!raw) return null;

      const session = JSON.parse(raw);
      if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
        this.logout();
        return null;
      }

      // Fetch fresh user record
      const users = this.getUsers();
      const user = users.find(u => u.id === session.userId);
      if (!user) {
        this.logout();
        return null;
      }

      return this.sanitizeUser(user);
    } catch (e) {
      this.logout();
      return null;
    }
  }

  isAuthenticated() {
    return !!this.getActiveSession();
  }

  sanitizeUser(user) {
    const { passwordHash, salt, verificationCode, resetToken, resetTokenExpires, ...safe } = user;
    return safe;
  }

  // ==========================================================================
  // 6. PROFILE & SAVED TRIPS MANAGEMENT
  // ==========================================================================

  updateProfile(userId, updates) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    if (updates.name) user.name = updates.name.trim();
    if (updates.homeBase) user.homeBase = updates.homeBase.trim();
    if (updates.preferences) {
      user.preferences = { ...user.preferences, ...updates.preferences };
    }

    this.saveUsers(users);
    return this.sanitizeUser(user);
  }

  async changePassword(userId, currentPassword, newPassword) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    const currentTestHash = await this.hashPassword(currentPassword, user.salt);
    if (currentTestHash !== user.passwordHash) {
      throw new Error('Incorrect current password.');
    }

    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long.');
    }

    const newSalt = this.generateRandomToken(16);
    user.salt = newSalt;
    user.passwordHash = await this.hashPassword(newPassword, newSalt);
    this.saveUsers(users);

    return true;
  }

  saveTripToAccount(userId, trip, wardrobe) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    const newSavedTrip = {
      id: 'trip_' + this.generateRandomToken(8),
      destination: trip.destination,
      country: trip.destinationMeta?.country || 'Global',
      duration: trip.duration,
      climate: `${trip.destinationMeta?.avgTemp || '32°C'} · ${trip.destinationMeta?.climate || 'Travel Climate'}`,
      pieceCount: wardrobe?.pieces?.length || 6,
      outfitCount: wardrobe?.outfits?.length || 8,
      bagVolume: trip.luggage === 'personal' ? '24L Underseat' : trip.luggage === 'checked' ? '65L Checked' : '38L Cabin Spec',
      dateSaved: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      image: trip.destinationMeta?.image || 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=600&q=85',
      tripData: JSON.parse(JSON.stringify(trip)),
      wardrobeData: JSON.parse(JSON.stringify(wardrobe))
    };

    user.savedTrips = [newSavedTrip, ...(user.savedTrips || [])];
    this.saveUsers(users);

    return this.sanitizeUser(user);
  }

  deleteSavedTrip(userId, tripId) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    user.savedTrips = (user.savedTrips || []).filter(t => t.id !== tripId);
    this.saveUsers(users);

    return this.sanitizeUser(user);
  }

  // ==========================================================================
  // 7. USER WARDROBE ARCHIVE MANAGEMENT (PHASE 17)
  // ==========================================================================

  getUserWardrobe(userId) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return [];

    // Ensure demo user has wardrobe seeded if empty
    if ((!user.wardrobe || user.wardrobe.length === 0) && user.id === 'usr_julian_vance') {
      user.wardrobe = [...DEFAULT_JULIAN_WARDROBE];
      this.saveUsers(users);
    }

    return user.wardrobe || [];
  }

  addWardrobeItem(userId, item) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    if (!user.wardrobe) user.wardrobe = [];

    const newItem = {
      id: 'grm_' + this.generateRandomToken(8),
      name: item.name.trim(),
      category: item.category || 'Tops & Shirts',
      fabric: item.fabric ? item.fabric.trim() : 'Natural Fiber Blend',
      weight: item.weight ? Number(item.weight) : 200,
      color: item.color ? item.color.trim() : 'Neutral',
      climate: item.climate || 'All Climates',
      laundryTurnaround: item.laundryTurnaround ? item.laundryTurnaround.trim() : 'Overnight air dry',
      versatility: item.versatility ? item.versatility.trim() : 'Modular capsule base',
      image: item.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85',
      isPinned: !!item.isPinned,
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    user.wardrobe.unshift(newItem);
    this.saveUsers(users);
    return { user: this.sanitizeUser(user), item: newItem };
  }

  updateWardrobeItem(userId, itemId, updates) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    if (!user.wardrobe) user.wardrobe = [];
    const index = user.wardrobe.findIndex(i => i.id === itemId);
    if (index === -1) throw new Error('Garment not found.');

    user.wardrobe[index] = {
      ...user.wardrobe[index],
      ...updates,
      weight: updates.weight ? Number(updates.weight) : user.wardrobe[index].weight,
      id: itemId
    };

    this.saveUsers(users);
    return { user: this.sanitizeUser(user), item: user.wardrobe[index] };
  }

  deleteWardrobeItem(userId, itemId) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    user.wardrobe = (user.wardrobe || []).filter(i => i.id !== itemId);
    this.saveUsers(users);
    return this.sanitizeUser(user);
  }

  togglePinWardrobeItem(userId, itemId) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    const item = (user.wardrobe || []).find(i => i.id === itemId);
    if (item) {
      item.isPinned = !item.isPinned;
      this.saveUsers(users);
    }
    return this.sanitizeUser(user);
  }

  importEssentialPack(userId) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');

    const existingIds = new Set((user.wardrobe || []).map(i => i.name));
    const toAdd = DEFAULT_JULIAN_WARDROBE
      .filter(i => !existingIds.has(i.name))
      .map(i => ({ ...i, id: 'grm_' + this.generateRandomToken(8) }));

    user.wardrobe = [...toAdd, ...(user.wardrobe || [])];
    this.saveUsers(users);
    return this.sanitizeUser(user);
  }
}

export const authService = new AuthService();
