/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * WardrobeItemModal Component (Phase 17)
 * High-End Garment Cataloging, Image Upload & Studio Presets Dialog
 */

import { store } from '../store.js';

export const EDITORIAL_GARMENT_PRESETS = [
  {
    name: 'Belgian Linen Shirt',
    category: 'Tops & Shirts',
    fabric: '100% Normandy Breathable Linen (160 GSM)',
    weight: 185,
    color: 'Sand / Ecru',
    climate: 'Warm / Arid',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Merino Air Tee',
    category: 'Tops & Shirts',
    fabric: '17.5 Micron Ultra-fine Merino (145 GSM)',
    weight: 160,
    color: 'Obsidian Black',
    climate: 'All Climates',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Oxford Popover Shirt',
    category: 'Tops & Shirts',
    fabric: 'Long-Staple Supima Cotton (190 GSM)',
    weight: 220,
    color: 'Chalk White',
    climate: 'Temperate',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Pleated Travel Chinos',
    category: 'Bottoms & Trousers',
    fabric: '70% Tencel Lyocell, 28% High-Twist Cotton',
    weight: 320,
    color: 'Muted Olive Stone',
    climate: 'All Climates',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Kurabo Selvedge Denim',
    category: 'Bottoms & Trousers',
    fabric: '12.5oz Japanese Lightweight Denim',
    weight: 440,
    color: 'Raw Indigo',
    climate: 'Temperate',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Field Canvas Overshirt',
    category: 'Outerwear & Jackets',
    fabric: 'Washed Cotton Canvas with DWR Coating (340 GSM)',
    weight: 380,
    color: 'Deep Graphite',
    climate: 'All Climates',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Nappa Court Sneaker',
    category: 'Footwear',
    fabric: 'Full-Grain Italian Nappa Leather',
    weight: 410,
    color: 'Chalk White',
    climate: 'All Climates',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Suede Belgian Loafer',
    category: 'Footwear',
    fabric: 'Water-Resistant Reverse Calfskin Suede',
    weight: 360,
    color: 'Espresso Suede',
    climate: 'Temperate',
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Technical Rain Shell',
    category: 'Outerwear & Jackets',
    fabric: '3-Layer Toray Membrane (20,000mm Hydrostatic)',
    weight: 290,
    color: 'Slate Charcoal',
    climate: 'Alpine / Cold',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Cashmere Knit Crewneck',
    category: 'Tops & Shirts',
    fabric: 'Grade-A Mongolian 2-Ply Cashmere (260 GSM)',
    weight: 275,
    color: 'Heather Taupe',
    climate: 'Alpine / Cold',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'Drawstring Linen Short',
    category: 'Bottoms & Trousers',
    fabric: 'Belgian Delave Linen with Cotton Poplin Pockets',
    weight: 210,
    color: 'Natural Flax',
    climate: 'Warm / Arid',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=85'
  },
  {
    name: 'All-Weather Chelsea Boot',
    category: 'Footwear',
    fabric: 'Waxed Suede, Vibram Commando Rubber Sole',
    weight: 520,
    color: 'Dark Umber',
    climate: 'Alpine / Cold',
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=600&q=85'
  }
];

export class WardrobeItemModal {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.mode = 'add'; // 'add' | 'edit'
    this.editingItemId = null;
    this.selectedImageUrl = EDITORIAL_GARMENT_PRESETS[0].image;
    this.showPresets = false;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    // Listen to open requests from other components
    window.addEventListener('rove:open-wardrobe-modal', (e) => {
      const detail = e.detail || {};
      this.open(detail.mode || 'add', detail.item || null);
    });
  }

  render() {
    this.mountPoint.innerHTML = `
      <div class="wm-modal-backdrop" id="wmBackdrop" aria-hidden="true">
        <div class="wm-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="wmModalTitle" id="wmDialog">
          
          <button class="wm-modal-close" id="wmCloseBtn" aria-label="Close dialog">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>

          <div class="wm-modal-header">
            <div class="wm-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              </svg>
              PERSONAL WARDROBE ARCHIVE
            </div>
            <h2 class="wm-title" id="wmModalTitle" style="font-size: 1.6rem; margin-top: 0.35rem;">Add Garment</h2>
          </div>

          <div class="wm-modal-body">
            <form id="formGarment" novalidate>
              
              <!-- 1. Image Upload & Studio Presets -->
              <div class="wm-image-section">
                <label class="auth-label">Garment Photography</label>
                
                <div class="wm-image-preview-box" id="wmImageDropzone" title="Click or drag to upload garment photo">
                  <img src="${this.selectedImageUrl}" alt="Preview" id="wmImgPreview">
                </div>
                <input type="file" id="wmFileInput" accept="image/png, image/jpeg, image/webp" style="display: none;">

                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <button type="button" class="auth-link-text" id="btnTriggerUpload">
                    ↑ Upload from Device
                  </button>
                  <button type="button" class="wm-presets-toggle-btn" id="btnTogglePresets">
                    Browse Studio Presets Gallery
                  </button>
                </div>

                <!-- Presets Grid Container -->
                <div class="wm-presets-grid" id="wmPresetsGrid" style="display: none;">
                  ${EDITORIAL_GARMENT_PRESETS.map((p, idx) => `
                    <div class="wm-preset-thumb ${idx === 0 ? 'is-selected' : ''}" data-url="${p.image}" data-name="${p.name}" data-cat="${p.category}" data-fabric="${p.fabric}" data-weight="${p.weight}" data-color="${p.color}" data-climate="${p.climate}">
                      <img src="${p.image}" alt="${p.name}">
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 2. Form Grid -->
              <div class="wm-form-grid">
                
                <div class="auth-form-field">
                  <label class="auth-label" for="grmName">Garment Name</label>
                  <input type="text" class="auth-input" id="grmName" required placeholder="e.g. Belgian Linen Popover">
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="grmCategory">Category</label>
                  <select class="auth-input" id="grmCategory">
                    <option value="Tops & Shirts">Tops & Shirts</option>
                    <option value="Bottoms & Trousers">Bottoms & Trousers</option>
                    <option value="Outerwear & Jackets">Outerwear & Jackets</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories & Essentials">Accessories & Essentials</option>
                  </select>
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="grmFabric">Fabric / Textile Composition</label>
                  <input type="text" class="auth-input" id="grmFabric" required placeholder="e.g. 100% Normandy Linen (160 GSM)">
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="grmWeight">Weight in Grams (Pack Math)</label>
                  <input type="number" class="auth-input" id="grmWeight" required min="20" max="2500" value="200">
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="grmColor">Color & Tone</label>
                  <input type="text" class="auth-input" id="grmColor" placeholder="e.g. Sand / Ecru">
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="grmClimate">Climate Suitability</label>
                  <select class="auth-input" id="grmClimate">
                    <option value="All Climates">All Climates</option>
                    <option value="Warm / Arid">Warm / Arid (28°C+)</option>
                    <option value="Temperate">Temperate (16°C – 26°C)</option>
                    <option value="Alpine / Cold">Alpine / Cold (&lt;15°C)</option>
                  </select>
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="grmTurnaround">Laundry & Recovery</label>
                  <input type="text" class="auth-input" id="grmTurnaround" placeholder="e.g. Overnight air dry">
                </div>

                <div class="auth-form-field">
                  <label class="auth-label" for="grmVersatility">Versatility Notes</label>
                  <input type="text" class="auth-input" id="grmVersatility" placeholder="e.g. Pairs with all bottoms">
                </div>

              </div>

              <!-- Pin as Essential Toggle -->
              <div class="auth-checkbox-row" style="margin-top: 1.25rem;">
                <input type="checkbox" class="auth-checkbox" id="grmPinned">
                <label class="auth-checkbox-label" for="grmPinned">
                  Pin as Essential Travel Piece (priority for algorithm synthesis)
                </label>
              </div>

              <!-- Actions -->
              <div style="display: flex; gap: 1rem; margin-top: 1.75rem;">
                <button type="submit" class="auth-submit-btn" id="btnSaveGarment" style="margin-top: 0;">
                  <span>Save Garment to Archive</span>
                </button>
                <button type="button" class="passport-btn-secondary" id="btnCancelModal" style="padding: 0 1.5rem;">
                  Cancel
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    `;
  }

  bindEvents() {
    const backdrop = this.mountPoint.querySelector('#wmBackdrop');
    const closeBtn = this.mountPoint.querySelector('#wmCloseBtn');
    const cancelBtn = this.mountPoint.querySelector('#btnCancelModal');
    const fileInput = this.mountPoint.querySelector('#wmFileInput');
    const btnUpload = this.mountPoint.querySelector('#btnTriggerUpload');
    const dropzone = this.mountPoint.querySelector('#wmImageDropzone');
    const btnTogglePresets = this.mountPoint.querySelector('#btnTogglePresets');
    const presetsGrid = this.mountPoint.querySelector('#wmPresetsGrid');
    const form = this.mountPoint.querySelector('#formGarment');

    // Close listeners
    [closeBtn, cancelBtn].forEach(b => {
      if (b) b.addEventListener('click', () => this.close());
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (backdrop.classList.contains('is-open') && e.key === 'Escape') {
        this.close();
      }
    });

    // Upload triggers
    if (btnUpload && fileInput) {
      btnUpload.addEventListener('click', () => fileInput.click());
    }
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
    }

    // Drag & Drop
    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--accent-primary)';
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = '';
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.processImageFile(e.dataTransfer.files[0]);
        }
      });
    }

    // File input change
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.processImageFile(e.target.files[0]);
        }
      });
    }

    // Presets gallery toggle
    if (btnTogglePresets && presetsGrid) {
      btnTogglePresets.addEventListener('click', () => {
        this.showPresets = !this.showPresets;
        presetsGrid.style.display = this.showPresets ? 'grid' : 'none';
        btnTogglePresets.textContent = this.showPresets
          ? 'Hide Studio Presets'
          : 'Browse Studio Presets Gallery';
      });
    }

    // Preset selection
    if (presetsGrid) {
      presetsGrid.addEventListener('click', (e) => {
        const thumb = e.target.closest('.wm-preset-thumb');
        if (!thumb) return;

        presetsGrid.querySelectorAll('.wm-preset-thumb').forEach(t => t.classList.remove('is-selected'));
        thumb.classList.add('is-selected');

        this.selectedImageUrl = thumb.dataset.url;
        const preview = this.mountPoint.querySelector('#wmImgPreview');
        if (preview) preview.src = this.selectedImageUrl;

        // Auto-fill form fields if blank
        const nameInput = this.mountPoint.querySelector('#grmName');
        const catInput = this.mountPoint.querySelector('#grmCategory');
        const fabricInput = this.mountPoint.querySelector('#grmFabric');
        const weightInput = this.mountPoint.querySelector('#grmWeight');
        const colorInput = this.mountPoint.querySelector('#grmColor');
        const climateInput = this.mountPoint.querySelector('#grmClimate');

        if (!nameInput.value) nameInput.value = thumb.dataset.name;
        if (thumb.dataset.cat) catInput.value = thumb.dataset.cat;
        if (!fabricInput.value) fabricInput.value = thumb.dataset.fabric;
        if (thumb.dataset.weight) weightInput.value = thumb.dataset.weight;
        if (!colorInput.value) colorInput.value = thumb.dataset.color;
        if (thumb.dataset.climate) climateInput.value = thumb.dataset.climate;
      });
    }

    // Form submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = this.mountPoint.querySelector('#grmName').value.trim();
        const category = this.mountPoint.querySelector('#grmCategory').value;
        const fabric = this.mountPoint.querySelector('#grmFabric').value.trim();
        const weight = Number(this.mountPoint.querySelector('#grmWeight').value) || 200;
        const color = this.mountPoint.querySelector('#grmColor').value.trim() || 'Neutral';
        const climate = this.mountPoint.querySelector('#grmClimate').value;
        const laundryTurnaround = this.mountPoint.querySelector('#grmTurnaround').value.trim() || 'Overnight air dry';
        const versatility = this.mountPoint.querySelector('#grmVersatility').value.trim() || 'Modular capsule base';
        const isPinned = this.mountPoint.querySelector('#grmPinned').checked;

        if (!name) {
          store.showToast('MISSING FIELD', 'Please provide a name for this garment.');
          return;
        }

        const itemPayload = {
          name,
          category,
          fabric,
          weight,
          color,
          climate,
          laundryTurnaround,
          versatility,
          image: this.selectedImageUrl,
          isPinned
        };

        if (this.mode === 'add') {
          store.addUserWardrobeItem(itemPayload);
        } else {
          store.updateUserWardrobeItem(this.editingItemId, itemPayload);
        }

        this.close();
      });
    }
  }

  processImageFile(file) {
    if (!file.type.startsWith('image/')) {
      store.showToast('INVALID FILE', 'Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // High-fidelity client-side canvas compression
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export as compressed WebP or JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        this.selectedImageUrl = compressedDataUrl;

        const preview = this.mountPoint.querySelector('#wmImgPreview');
        if (preview) preview.src = compressedDataUrl;

        store.showToast('IMAGE PROCESSED', 'Garment photograph optimized for local vault.');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  open(mode = 'add', item = null) {
    this.mode = mode;
    this.editingItemId = item ? item.id : null;

    const backdrop = this.mountPoint.querySelector('#wmBackdrop');
    const title = this.mountPoint.querySelector('#wmModalTitle');
    const submitBtnSpan = this.mountPoint.querySelector('#btnSaveGarment span');
    const preview = this.mountPoint.querySelector('#wmImgPreview');

    if (mode === 'edit' && item) {
      title.textContent = 'Edit Garment Specifications';
      submitBtnSpan.textContent = 'Save Updates';
      this.selectedImageUrl = item.image;
      if (preview) preview.src = item.image;

      this.mountPoint.querySelector('#grmName').value = item.name;
      this.mountPoint.querySelector('#grmCategory').value = item.category;
      this.mountPoint.querySelector('#grmFabric').value = item.fabric;
      this.mountPoint.querySelector('#grmWeight').value = item.weight;
      this.mountPoint.querySelector('#grmColor').value = item.color;
      this.mountPoint.querySelector('#grmClimate').value = item.climate;
      this.mountPoint.querySelector('#grmTurnaround').value = item.laundryTurnaround;
      this.mountPoint.querySelector('#grmVersatility').value = item.versatility;
      this.mountPoint.querySelector('#grmPinned').checked = !!item.isPinned;
    } else {
      title.textContent = 'Add Garment to Archive';
      submitBtnSpan.textContent = 'Save Garment to Archive';
      this.selectedImageUrl = EDITORIAL_GARMENT_PRESETS[0].image;
      if (preview) preview.src = this.selectedImageUrl;

      this.mountPoint.querySelector('#grmName').value = '';
      this.mountPoint.querySelector('#grmFabric').value = '';
      this.mountPoint.querySelector('#grmWeight').value = '200';
      this.mountPoint.querySelector('#grmColor').value = '';
      this.mountPoint.querySelector('#grmTurnaround').value = 'Overnight air dry';
      this.mountPoint.querySelector('#grmVersatility').value = '';
      this.mountPoint.querySelector('#grmPinned').checked = false;
    }

    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      this.mountPoint.querySelector('#grmName')?.focus();
    }, 100);
  }

  close() {
    const backdrop = this.mountPoint.querySelector('#wmBackdrop');
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
