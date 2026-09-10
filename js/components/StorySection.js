/**
 * ROVE — StorySection Component ("How ROVE Thinks")
 * Sequential Editorial Intelligence Pipeline
 * DESTINATION -> WEATHER -> ACTIVITIES -> DURATION -> STYLE -> WARDROBE -> OUTFITS -> PACKING
 */

export class StorySection {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const steps = [
      {
        num: '01',
        title: 'DESTINATION',
        desc: 'Terrain, local architecture, humidity, and cultural etiquette.',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
      },
      {
        num: '02',
        title: 'WEATHER',
        desc: 'Microclimates, diurnal temperature shifts, and rain probabilities.',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      },
      {
        num: '03',
        title: 'ACTIVITIES',
        desc: 'Palace stair climbing, evening dining, walking mileage, transit hours.',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
      },
      {
        num: '04',
        title: 'DURATION',
        desc: 'Days spent and garment rotation frequency with zero repetition fatigue.',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
      },
      {
        num: '05',
        title: 'YOUR STYLE',
        desc: 'Color palette restraint, preferred silhouettes, and aesthetic comfort.',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>`
      },
      {
        num: '06',
        title: 'YOUR WARDROBE',
        desc: 'Selecting only hyper-compatible, high-yield foundational pieces.',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
      },
      {
        num: '07',
        title: 'OUTFITS',
        desc: 'Algorithmic combinatorial styling for every morning, afternoon, and twilight.',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`
      },
      {
        num: '08',
        title: 'PACKING',
        desc: 'Smallest possible volumetric footprint. One bag. Absolute freedom.',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`
      }
    ];

    this.mountPoint.innerHTML = `
      <section class="story-section" id="sectionStory">
        <div class="container">
          
          <div class="story-header reveal-on-scroll">
            <span class="caps-label-accent">THE INTELLIGENCE PIPELINE</span>
            <h2 class="section-headline">HOW ROVE THINKS</h2>
            <p>
              Travel wardrobe intelligence is not a random checklist. It is a linear mathematical convergence from destination context down to single-bag simplicity.
            </p>
          </div>

          <div class="story-flow-container">
            ${steps.map((step, idx) => `
              <div class="story-card reveal-on-scroll stagger-${(idx % 4) + 1}">
                <div>
                  <div class="story-card-step">
                    <span class="story-step-num">${step.num}</span>
                    <div class="story-card-icon">${step.icon}</div>
                  </div>
                  <h3 class="story-card-title">${step.title}</h3>
                </div>
                <p class="story-card-desc">${step.desc}</p>
              </div>
            `).join('')}
          </div>

        </div>
      </section>
    `;
  }
}
