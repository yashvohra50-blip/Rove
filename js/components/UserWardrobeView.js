/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * UserWardrobeView Component (Phase 17)
 * Dedicated Personal Wardrobe Archive & Inventory Management (#/my-wardrobe)
 */

import { store } from '../store.js';

export class UserWardrobeView {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.selectedCategory = 'All';
    this.selectedClimate = 'All Climates';
    this.searchQuery = '';
    this.sortBy = 'recent'; // 'recent' | 'weight-asc' | 'weight-desc' | 'alpha'
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    this.unsubscribe = store.subscribe((event) => {
      if (event === 'WARDROBE_COLLECTION_UPDATED' || event === 'AUTH_STATE_CHANGED') {
        this.render();
        this.bindEvents();
      }
    });
  }

  getFilteredItems() {
    let items = store.getUserWardrobe();

    // Category filter
    if (this.selectedCategory !== 'All') {
      items = items.filter(i => i.category === this.selectedCategory);
    }

    // Climate filter
    if (this.selectedClimate !== 'All Climates') {
      items = items.filter(i => i.climate === this.selectedClimate || i.climate === 'All Climates');
    }

    // Search query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        (i.fabric && i.fabric.toLowerCase().includes(q)) ||
        (i.color && i.color.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (this.sortBy === 'weight-asc') {
      items.sort((a, b) => (a.weight || 0) - (b.weight || 0));
    } else if (this.sortBy === 'weight-desc') {
      items.sort((a, b) => (b.weight || 0) - (a.weight || 0));
    } else if (this.sortBy === 'alpha') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }

  render() {
    const allItems = store.getUserWardrobe();
    const filtered = this.getFilteredItems();

    // Compute metrics
    const totalCount = allItems.length;
    const topsCount = allItems.filter(i => i.category === 'Tops & Shirts').length;
    const bottomsCount = allItems.filter(i => i.category === 'Bottoms & Trousers').length;
    const outerwearCount = allItems.filter(i => i.category === 'Outerwear & Jackets').length;
    const footwearCount = allItems.filter(i => i.category === 'Footwear').length;
    const totalWeightGrams = allItems.reduce((acc, i) => acc + (Number(i.weight) || 0), 0);
    const weightKg = (totalWeightGrams / 1000).toFixed(1);

    this.mountPoint.innerHTML = `
      <div class="wardrobe-manager-page" id="wardrobeManagerPage">
        <div class="wardrobe-manager-container">
          
          <!-- 1. Header Banner -->
          <div class="wardrobe-manager-header">
            <div class="wm-header-title-group">
              <div class="wm-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                </svg>
                ROVE TRAVEL OS · PERSONAL INVENTORY
              </div>
              <h1 class="wm-title">My Wardrobe Archive</h1>
              <p class="wm-subtitle">
                Catalog your real garments. The travel intelligence engine models your packing volume and synthesizes modular outfits directly from these pieces.
              </p>
            </div>

            <div class="wm-header-actions">
              <button type="button" class="btn btn-primary" id="btnOpenAddGarment">
                + Add Garment
              </button>
              <button type="button" class="passport-btn-secondary" id="btnQuickImportPack">
                Import Essential 8-Pack
              </button>
            </div>
          </div>

          <!-- 2. Metrics Strip -->
          <div class="wm-metrics-strip">
            <div class="wm-metric-card">
              <span class="wm-metric-label">Total Catalog</span>
              <span class="wm-metric-num">${totalCount}</span>
              <span class="wm-metric-sub">Archived pieces</span>
            </div>
            <div class="wm-metric-card">
              <span class="wm-metric-label">Tops & Shirts</span>
              <span class="wm-metric-num">${topsCount}</span>
              <span class="wm-metric-sub">Air-dry rotation</span>
            </div>
            <div class="wm-metric-card">
              <span class="wm-metric-label">Bottoms</span>
              <span class="wm-metric-num">${bottomsCount}</span>
              <span class="wm-metric-sub">High-twist / denim</span>
            </div>
            <div class="wm-metric-card">
              <span class="wm-metric-label">Outer & Footwear</span>
              <span class="wm-metric-num">${outerwearCount + footwearCount}</span>
              <span class="wm-metric-sub">Weather & steps</span>
            </div>
            <div class="wm-metric-card">
              <span class="wm-metric-label">Modeled Weight</span>
              <span class="wm-metric-num">${weightKg} kg</span>
              <span class="wm-metric-sub">${totalWeightGrams}g total pack</span>
            </div>
          </div>

          <!-- 3. Toolbar (Category, Climate, Search, Sort) -->
          <div class="wm-toolbar">
            <div class="wm-toolbar-top">
              
              <!-- Category Tabs -->
              <div class="wm-category-pills" id="wmCategoryPills">
                ${['All', 'Tops & Shirts', 'Bottoms & Trousers', 'Outerwear & Jackets', 'Footwear', 'Accessories & Essentials'].map(cat => `
                  <button type="button" class="wm-cat-btn ${this.selectedCategory === cat ? 'is-active' : ''}" data-cat="${cat}">
                    ${cat}
                  </button>
                `).join('')}
              </div>

              <!-- Search & Sort -->
              <div class="wm-toolbar-controls">
                <div class="wm-search-wrap">
                  <input type="text" class="wm-search-input" id="wmSearchInput" placeholder="Search garment or fabric..." value="${this.searchQuery}">
                  <span class="wm-search-icon">🔍</span>
                </div>

                <select class="wm-sort-select" id="wmSortSelect">
                  <option value="recent" ${this.sortBy === 'recent' ? 'selected' : ''}>Recently Added</option>
                  <option value="weight-asc" ${this.sortBy === 'weight-asc' ? 'selected' : ''}>Lightest First</option>
                  <option value="weight-desc" ${this.sortBy === 'weight-desc' ? 'selected' : ''}>Heaviest First</option>
                  <option value="alpha" ${this.sortBy === 'alpha' ? 'selected' : ''}>Alphabetical (A–Z)</option>
                </select>
              </div>

            </div>

            <!-- Secondary Climate Filter Strip -->
            <div class="wm-toolbar-bottom">
              <span class="wm-filter-label">Climate Filter:</span>
              <div class="wm-climate-pills" id="wmClimatePills">
                ${['All Climates', 'Warm / Arid', 'Temperate', 'Alpine / Cold'].map(clm => `
                  <button type="button" class="wm-climate-btn ${this.selectedClimate === clm ? 'is-active' : ''}" data-climate="${clm}">
                    ${clm}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- 4. Garment Cards Grid or Empty State -->
          ${filtered.length === 0 ? `
            <div class="wm-empty-state">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" stroke-width="1.5">
                <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
              </svg>
              ${totalCount === 0 ? `
                <div class="wm-empty-title">Your Wardrobe is Empty</div>
                <p class="wm-empty-sub">
                  Add pieces from your real closet or load ROVE's essential 8-piece foundational capsule to begin modeling your packing manifests.
                </p>
                <div class="wm-empty-actions">
                  <button type="button" class="btn btn-primary" id="btnEmptyAddGarment">
                    + Add Your First Garment
                  </button>
                  <button type="button" class="passport-btn-secondary" id="btnEmptyImportPack">
                    Import Essential 8-Pack
                  </button>
                </div>
              ` : `
                <div class="wm-empty-title">No Garments Match Filters</div>
                <p class="wm-empty-sub">
                  No archived items found matching "${this.searchQuery || this.selectedCategory}".
                </p>
                <button type="button" class="passport-btn-secondary" id="btnClearFilters">
                  Reset All Filters
                </button>
              `}
            </div>
          ` : `
            <div class="wm-grid">
              ${filtered.map(item => `
                <div class="garment-card ${item.isPinned ? 'is-pinned' : ''}" data-id="${item.id}">
                  <div class="garment-media-wrap">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <div class="garment-media-overlay">
                      <div class="garment-top-tags">
                        <span class="garment-cat-pill">${item.category}</span>
                        <button type="button" class="garment-pin-btn ${item.isPinned ? 'is-active' : ''}" data-pin-id="${item.id}" aria-label="Pin garment as travel essential">
                          ★
                        </button>
                      </div>
                      <div class="garment-bottom-tags">
                        <span class="garment-climate-tag">${item.climate}</span>
                        <span class="garment-weight-badge">${item.weight}g</span>
                      </div>
                    </div>
                  </div>

                  <div class="garment-body">
                    <div class="garment-title-area">
                      <h3 class="garment-name">${item.name}</h3>
                      <div class="garment-fabric">${item.fabric}</div>
                    </div>

                    <div class="garment-meta-rows">
                      <div class="garment-meta-row">
                        <span>Color / Tone</span>
                        <strong>${item.color || 'Neutral'}</strong>
                      </div>
                      <div class="garment-meta-row">
                        <span>Laundry Turnaround</span>
                        <strong>${item.laundryTurnaround || 'Air dry'}</strong>
                      </div>
                      <div class="garment-meta-row">
                        <span>Versatility</span>
                        <strong>${item.versatility || 'Modular'}</strong>
                      </div>
                    </div>

                    <div class="garment-card-footer">
                      <button type="button" class="garment-btn-edit" data-edit-id="${item.id}">
                        Edit Specs
                      </button>
                      <button type="button" class="garment-btn-delete" data-del-id="${item.id}" aria-label="Remove garment">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}

        </div>
      </div>
    `;
  }

  bindEvents() {
    const allItems = store.getUserWardrobe();

    // Add Garment buttons
    const btnAdd = this.mountPoint.querySelector('#btnOpenAddGarment');
    const btnEmptyAdd = this.mountPoint.querySelector('#btnEmptyAddGarment');
    [btnAdd, btnEmptyAdd].forEach(b => {
      if (b) {
        b.addEventListener('click', () => {
          window.dispatchEvent(new CustomEvent('rove:open-wardrobe-modal', {
            detail: { mode: 'add', item: null }
          }));
        });
      }
    });

    // Import Essential Pack buttons
    const btnImport = this.mountPoint.querySelector('#btnQuickImportPack');
    const btnEmptyImport = this.mountPoint.querySelector('#btnEmptyImportPack');
    [btnImport, btnEmptyImport].forEach(b => {
      if (b) {
        b.addEventListener('click', () => {
          store.importEssentialPack();
        });
      }
    });

    // Reset filters button
    const btnClear = this.mountPoint.querySelector('#btnClearFilters');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        this.selectedCategory = 'All';
        this.selectedClimate = 'All Climates';
        this.searchQuery = '';
        this.render();
        this.bindEvents();
      });
    }

    // Category filter pills
    const catPills = this.mountPoint.querySelector('#wmCategoryPills');
    if (catPills) {
      catPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.wm-cat-btn');
        if (!btn) return;
        this.selectedCategory = btn.dataset.cat;
        this.render();
        this.bindEvents();
      });
    }

    // Climate filter pills
    const climatePills = this.mountPoint.querySelector('#wmClimatePills');
    if (climatePills) {
      climatePills.addEventListener('click', (e) => {
        const btn = e.target.closest('.wm-climate-btn');
        if (!btn) return;
        this.selectedClimate = btn.dataset.climate;
        this.render();
        this.bindEvents();
      });
    }

    // Search input (debounced)
    const searchInput = this.mountPoint.querySelector('#wmSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (this.searchTimeout) clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.render();
          this.bindEvents();
          const reFocus = this.mountPoint.querySelector('#wmSearchInput');
          if (reFocus) {
            reFocus.focus();
            reFocus.selectionStart = reFocus.selectionEnd = reFocus.value.length;
          }
        }, 250);
      });
    }

    // Sort selector
    const sortSelect = this.mountPoint.querySelector('#wmSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.render();
        this.bindEvents();
      });
    }

    // Pin toggle
    this.mountPoint.querySelectorAll('.garment-pin-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.pinId;
        store.togglePinWardrobeItem(itemId);
      });
    });

    // Edit button
    this.mountPoint.querySelectorAll('.garment-btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.editId;
        const item = allItems.find(i => i.id === itemId);
        if (item) {
          window.dispatchEvent(new CustomEvent('rove:open-wardrobe-modal', {
            detail: { mode: 'edit', item }
          }));
        }
      });
    });

    // Delete button
    this.mountPoint.querySelectorAll('.garment-btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.delId;
        if (confirm('Are you sure you wish to remove this garment from your personal wardrobe?')) {
          store.deleteUserWardrobeItem(itemId);
        }
      });
    });
  }

  destroy() {
    if (this.unsubscribe) this.unsubscribe();
  }
}
