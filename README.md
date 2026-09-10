# ROVE — Travel Wardrobe Intelligence System

> **“Pack Less. Wear More.”**

ROVE is a luxury travel-wardrobe intelligence system. A user tells ROVE where they are going, how long they are staying, what they will be doing, their personal style, and luggage capacity. ROVE then synthesizes the smallest useful capsule wardrobe for that trip, generates day and evening outfit combinations, and models the exact packing volume.

---

## Brand Philosophy

* **Pack for where you're going.**
* **Where you go. What you wear.**
* **Pack Less. Wear More.**

ROVE is designed like a luxury fashion campaign and product launch film rather than a generic SaaS dashboard or e-commerce grid.

---

## Phase 1 Frontend Foundation

Phase 1 establishes an editorial, production-quality frontend foundation with realistic mock data structures and interactive states:

### 1. Cinematic Homepage
* **Full Viewport Hero**: Dominant headline *“PACK FOR WHERE YOU'RE GOING.”*, subtle cursor-linked parallax depth, and primary CTA `[BUILD MY TRIP]`.
* **The Problem**: Minimalist contrast (*“YOU PACK FOR THE TRIP.”* → *“ROVE PACKS FOR THE EXPERIENCE.”*) with concrete contextual signals: `JAIPUR · 5 DAYS · 32°C · 8 KM WALKING / DAY · 2 DINNERS · 1 BAG` → *“LET'S PACK.”*
* **How ROVE Thinks**: 8 sequential intelligence steps (`DESTINATION` → `WEATHER` → `ACTIVITIES` → `DURATION` → `YOUR STYLE` → `YOUR WARDROBE` → `OUTFITS` → `PACKING`).
* **The Killer Idea ("PACK LESS. WEAR MORE.")**: Interactive wardrobe combiner displaying `6 PIECES` → `8 OUTFITS` → `5 DAYS` → `1 BAG`. Switching outfit tabs dynamically highlights and rearranges the 6 foundational pieces.
* **Choose Your Experience**: Large editorial panels for **CLOTHING** (links to `#/clothing`), **FOOTWEAR** (links to `#/footwear`), and **PACK** (`COMING NEXT` badge).

### 2. Full-Screen 5-Step “Build My Trip” Flow
* **Step 01: Destination**: City search with instant curated destination chips (Jaipur, Kyoto, Amalfi Coast, Copenhagen, Marrakech).
* **Step 02: Duration**: 2 Days, 3 Days, 5 Days (Recommended), 7 Days, 10+ Days.
* **Step 03: Activities**: Multi-select chips (Sightseeing, Dining, Shopping, Nightlife, Hiking, Beach, Business, Events).
* **Step 04: Style**: Minimal, Casual, Smart, Street, Classic, Adventure.
* **Step 05: Luggage**: Personal Item (24L), Carry-On (40L), Checked Bag (65L).
* **Step 06: Trip Summary**: Compiled trip brief with real-time parameter validation.
* **Curation Phase**: Branded scanner animation (*“BUILDING YOUR WARDROBE… Analyzing 32°C climate and walking demands…”*) before revealing the results.

### 3. Mock Wardrobe Results (`#/wardrobe`)
* **Headline**: **YOUR JAIPUR WARDROBE** (5 DAYS).
* **Core Mantra**: **“YOU DON'T NEED MORE.”**
* **Metric Strip**: **7 CURATED OUTFITS · 6 CLOTHING PIECES · 2 FOOTWEAR OPTIONS · 1 CABIN BAG**.
* **Interactive Day-by-Day Outfit Matrix**: View Day 1 Transit, Night 1 Suvarna Mahal Palace Dining, Day 2 Amber Fort Walk, Night 2 Rooftop Drinks, etc.
* **6 Master Pieces Breakdown**: Detailed cards featuring fabrics (*100% Normandy Breathable Linen*, *17.5u Merino Air Knit*, *Pleated High-Twist Tencel Chinos*, *Kurabo Selvedge Denim*), weights, and versatility metrics.

### 4. Dedicated Route Experiences
* **Clothing (`#/clothing`)**: Category navigation across **SHIRTS**, **TROUSERS**, **OUTERWEAR**, **ESSENTIALS** with weave, pack volume, and climate suitability specs.
* **Footwear (`#/footwear`)**: 4 travel archetypes (**CITY**, **WALK**, **DINNER**, **ADVENTURE**) with step ratings and sole systems.
* **Travel OS Footer**: Architectural roadmap tree and brand manifesto.

---

## Project Structure

```
rove/
├── index.html                   # Semantic HTML5 entry, Google Fonts, meta tags, root containers
├── server.ps1                   # Local HTTP server (native PowerShell, port 8090)
├── audit_code.ps1               # Static code validator
├── css/
│   ├── tokens.css               # Design tokens, color system, typography scales, spacing
│   ├── base.css                 # CSS resets, global layout, scrollbars, utility classes
│   ├── components.css           # Navigation, buttons, badges, modals, cards, toast alerts
│   ├── hero.css                 # Full viewport hero, parallax layer transforms, CTAs
│   ├── editorial.css            # "The Problem", "How ROVE Thinks", "Pack Less. Wear More."
│   ├── builder.css              # Immersive full-screen 5-step trip planner modal
│   ├── wardrobe.css             # Wardrobe result view, outfit matrix, item breakdown
│   ├── clothing.css             # /clothing editorial category showcase
│   ├── footwear.css             # /footwear archetype experience
│   └── transitions.css          # Chapter reveals, clip-path fades, reduced-motion queries
└── js/
    ├── app.js                   # Application coordinator, lifecycle events, cursor parallax
    ├── router.js                # Hash-based SPA router (#/, #/clothing, #/footwear, #/wardrobe)
    ├── store.js                 # Reactive state store (active trip state, curated wardrobe, filters)
    ├── data/
    │   └── mockData.js          # Destinations, capsules, outfits, clothing & footwear
    └── components/
        ├── Navbar.js            # Desktop & full-screen mobile menu with active indicators
        ├── Hero.js              # Cinematic hero section with interactive CTA
        ├── ProblemSection.js    # Editorial transition ("YOU PACK FOR THE TRIP" -> "EXPERIENCE")
        ├── StorySection.js      # "How ROVE Thinks" sequential storytelling flow
        ├── KillerIdeaSection.js # Interactive 6 Pieces -> 8 Outfits live combiner
        ├── ExperienceModules.js # CLOTHING, FOOTWEAR, PACK (Coming Soon) editorial cards
        ├── TripBuilder.js       # 5-step full-screen planner
        ├── WardrobeResult.js    # Curated capsule results, metrics, outfit switcher
        ├── ClothingView.js      # Dedicated /clothing page with category tabs
        ├── FootwearView.js      # Dedicated /footwear page with 4 archetypes
        ├── Footer.js            # Minimalist brand footer with future OS roadmap preview
        └── ToastModal.js        # Editorial toast alerts
```

---

## Evolution Milestones (Phases 1 – 10)

1. **Phase 1 — Protect Foundation**: Stable component modularization, zero console errors, reliable router & store.
2. **Phase 2 — Hero Refinement**: Multi-plane depth, ambient lighting, fluid scroll indicator.
3. **Phase 3 — Cinematic Transition**: Controlled scroll progression (*"YOU PACK FOR THE TRIP."* → *"ROVE PACKS FOR THE EXPERIENCE."*).
4. **Phase 4 — Trip Context Story**: 7-beat sequential focus with dynamic environmental shifts for Jaipur.
5. **Phase 5 — How ROVE Thinks**: 8-stage intelligence pipeline with single dominant stage focus & progress tracking.
6. **Phase 6 — Pack Less. Wear More.**: Major product showcase (`6 PIECES` → `8 OUTFITS` → `5 DAYS` → `1 BAG` → `NOTHING EXTRA.`).
7. **Phase 7 — Experience Modules**: Product chapters for Clothing, Footwear, and Pack with Coming Soon modal.
8. **Phase 8 — Internal Page Transitions**: Shared transition system and unified chapter heroes across `/clothing` and `/footwear`.
9. **Phase 9 — Micro-Interaction Pass**: Tactile `:active` depression feedback, focus rings, and directional indicators.
10. **Phase 10 — Atmosphere Pass**: Restrained analog film grain veil, multi-layer optical diffuse shadows, soft ambient lighting blooms with 20s organic drift, and tactile clothing weave micro-textures ("depth, not clutter").

---

## Running Locally

To run the local server without any external dependencies:

```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

Then open your browser to **`http://localhost:8090/`**.

---

## Future Roadmap: ROVE Travel OS

```
ROVE TRAVEL OS
├── WARDROBE [Phase 1 Active]
│   ├── Clothing [Live]
│   ├── Footwear [Live]
│   └── Outfit Engine [Live]
├── PACK [Phase 2]
│   ├── Weight Balancing
│   └── Packing Lists
└── TRIP [Phase 3]
    ├── Weather Telemetry
    └── Retailer Connect
```
