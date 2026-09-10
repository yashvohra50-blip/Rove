/**
 * ROVE — Footer Component
 * Architectural Manifesto & Future Travel OS Roadmap Preview
 */

export class Footer {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.mountPoint.innerHTML = `
      <footer class="site-footer" id="footerRoadmap">
        <div class="container">
          
          <div class="footer-grid">
            
            <!-- Brand Col -->
            <div class="footer-brand-col">
              <span class="footer-logo">ROVE</span>
              <span class="caps-label-accent">TRAVEL WARDROBE INTELLIGENCE</span>
              <p class="footer-manifesto">
                “Pack Less. Wear More.”
                <br /><br />
                A context-driven wardrobe intelligence system engineered to eliminate suitcase friction through mathematical compatibility.
              </p>
            </div>

            <!-- Pillars -->
            <div>
              <h4 class="footer-col-title">PILLARS</h4>
              <ul class="footer-nav-list">
                <li><a href="#/wardrobe" class="footer-nav-link">WARDROBE CAPSULE</a></li>
                <li><a href="#/clothing" class="footer-nav-link">CLOTHING ARCHITECTURE</a></li>
                <li><a href="#/footwear" class="footer-nav-link">FOOTWEAR ARCHETYPES</a></li>
                <li><a href="#/" class="footer-nav-link" id="footerPackLink">PACK (COMING NEXT)</a></li>
              </ul>
            </div>

            <!-- Curated Destinations -->
            <div>
              <h4 class="footer-col-title">CASE DESTINATIONS</h4>
              <ul class="footer-nav-list">
                <li><a href="#/" class="footer-nav-link" style="color: var(--accent-primary);">JAIPUR, IN (ACTIVE)</a></li>
                <li><a href="#/" class="footer-nav-link">KYOTO, JP</a></li>
                <li><a href="#/" class="footer-nav-link">AMALFI, IT</a></li>
                <li><a href="#/" class="footer-nav-link">COPENHAGEN, DK</a></li>
                <li><a href="#/" class="footer-nav-link">MARRAKECH, MA</a></li>
              </ul>
            </div>

            <!-- Architecture Roadmap Tree -->
            <div class="footer-roadmap-col">
              <h4 class="footer-col-title">ROVE TRAVEL OS ARCHITECTURE</h4>
              <div class="roadmap-tree">
ROVE TRAVEL OS
├── <span class="active-mod">WARDROBE [PHASE 1 ACTIVE]</span>
│   ├── Clothing [Live]
│   ├── Footwear [Live]
│   └── Outfit Engine [Live]
├── PACK [Phase 2]
│   ├── Weight Balancing
│   └── Packing Lists
└── TRIP [Phase 3]
    ├── Weather Telemetry
    └── Retailer Connect
              </div>
            </div>

          </div>

          <!-- Bottom Row -->
          <div class="footer-bottom-row">
            <span>© 2026 ROVE TECHNOLOGIES INC. ALL RIGHTS RESERVED.</span>
            <span>DESIGNED WITH EDITORIAL RESTRAINT</span>
            <span>PHASE 01 FRONTEND FOUNDATION</span>
          </div>

        </div>
      </footer>
    `;
  }
}
