/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * Phase 19 — Outfit Engine
 * 
 * Capabilities:
 * 1. Combinatorial Outfit Generation (permutations of Tops × Bottoms × Footwear ± Outerwear)
 * 2. Aesthetic Harmony & Formality Modeling (Color balance, texture congruence, occasion tags)
 * 3. Wardrobe Optimization & Versatility Analytics (Wear multiplier, redundancy detection)
 * 4. Missing-Item Detection / Gap Analysis (Climate, activity, cultural, and duration friction detection)
 */

export class OutfitEngine {
  /**
   * 1. COMBINATORIAL OUTFIT GENERATION
   * Generates all mathematically sound and aesthetically balanced outfit permutations
   */
  generateAllCombinations(pieces = [], destMeta = {}, climateAnalysis = {}) {
    if (!Array.isArray(pieces) || pieces.length === 0) return [];

    const shirts = pieces.filter(p => p.category === 'Shirts');
    const bottoms = pieces.filter(p => p.category === 'Trousers');
    const outers = pieces.filter(p => p.category === 'Outerwear');
    const shoes = pieces.filter(p => p.category === 'Footwear');

    // Fallbacks if categories are sparse
    const effectiveShirts = shirts.length > 0 ? shirts : [pieces[0]];
    const effectiveBottoms = bottoms.length > 0 ? bottoms : [pieces[1] || pieces[0]];
    const effectiveShoes = shoes.length > 0 ? shoes : [pieces[2] || pieces[0]];
    const primaryOuter = outers.length > 0 ? outers[0] : null;

    const combinations = [];
    let comboIndex = 1;

    const editorialImages = [
      destMeta.editorialImage || destMeta.image || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1508189860394-700627075077?auto=format&fit=crop&w=1000&q=85'
    ];

    // Systematic combinatorial generation
    effectiveShirts.forEach((shirt, sIdx) => {
      effectiveBottoms.forEach((bottom, bIdx) => {
        effectiveShoes.forEach((shoe, shIdx) => {
          // Look A: Core Base Ensemble (Daytime / Exploration)
          const basePieces = [shirt, bottom, shoe];
          const harmony = this.calculateHarmony(shirt, bottom, shoe, null);

          combinations.push({
            id: `combo_${comboIndex++}`,
            title: `${shirt.color.split('/')[0].trim()} on ${bottom.color.split('/')[0].trim()}`,
            occasion: 'daytime',
            occasionLabel: 'Daytime Exploration',
            pieces: basePieces.map(p => p.id),
            pieceNames: basePieces.map(p => p.name),
            pieceDetails: basePieces,
            harmonyScore: harmony.score,
            harmonyRating: harmony.rating,
            harmonyDescription: harmony.description,
            tempBadge: `${climateAnalysis.avgTempLabel || '22°C'} · Daytime`,
            stepsEst: `${10000 + ((sIdx + bIdx) * 1200)} Steps`,
            image: editorialImages[(comboIndex - 2) % editorialImages.length],
            hasOuterwear: false
          });

          // Look B: Layered Ensemble with Outerwear (Evening / Dining / Transit)
          if (primaryOuter && (sIdx + bIdx) % 2 === 0) {
            const layeredPieces = [shirt, bottom, primaryOuter, shoe];
            const layeredHarmony = this.calculateHarmony(shirt, bottom, shoe, primaryOuter);

            const isFormal = bottom.name.toLowerCase().includes('chino') || 
                             bottom.name.toLowerCase().includes('trouser') || 
                             primaryOuter.name.toLowerCase().includes('blazer');

            combinations.push({
              id: `combo_${comboIndex++}`,
              title: isFormal 
                ? `${primaryOuter.name.split(' ')[0]} Layered Over ${shirt.name.split(' ')[0]}`
                : `Layered ${primaryOuter.name.split(' ')[0]} Exploration Look`,
              occasion: isFormal ? 'evening' : 'transit',
              occasionLabel: isFormal ? 'Dinner & Evening' : 'Transit & Microclimate',
              pieces: layeredPieces.map(p => p.id),
              pieceNames: layeredPieces.map(p => p.name),
              pieceDetails: layeredPieces,
              harmonyScore: layeredHarmony.score,
              harmonyRating: layeredHarmony.rating,
              harmonyDescription: layeredHarmony.description,
              tempBadge: `${Math.max(12, (climateAnalysis.tempNumeric || 22) - 5)}°C · Cool Twilight`,
              stepsEst: isFormal ? '4,500 Steps' : '8,000 Steps',
              image: editorialImages[(comboIndex - 2) % editorialImages.length],
              hasOuterwear: true
            });
          }
        });
      });
    });

    return combinations;
  }

  /**
   * 2. AESTHETIC HARMONY & COLOR/TEXTURE MODELING
   */
  calculateHarmony(shirt, bottom, shoe, outer = null) {
    let score = 92;
    let description = 'Clean tonal balance engineered for continuous all-day comfort.';

    const shirtColor = (shirt.color || '').toLowerCase();
    const bottomColor = (bottom.color || '').toLowerCase();

    const isHighContrast = (shirtColor.includes('white') || shirtColor.includes('ecru') || shirtColor.includes('sand')) &&
                           (bottomColor.includes('indigo') || bottomColor.includes('navy') || bottomColor.includes('black'));

    const isMonochrome = (shirtColor.includes('black') || shirtColor.includes('charcoal') || shirtColor.includes('graphite')) &&
                         (bottomColor.includes('black') || bottomColor.includes('charcoal') || bottomColor.includes('graphite'));

    const isEarthTones = (shirtColor.includes('sand') || shirtColor.includes('ecru') || shirtColor.includes('chalk')) &&
                         (bottomColor.includes('olive') || bottomColor.includes('stone'));

    if (isHighContrast) {
      score = 98;
      description = 'High-contrast architectural pairing: light breathable upper balances dark structured foundation.';
    } else if (isMonochrome) {
      score = 96;
      description = 'Monochromatic obsidian sophistication: sleek slimming proportions ideal for galleries and evening bistros.';
    } else if (isEarthTones) {
      score = 97;
      description = 'Harmonious mineral earth tones: natural dye palette reflecting Mediterranean and arid sun.';
    }

    if (outer) {
      score = Math.min(100, score + 1);
      description += ' Elevated with structured outer layer for rapid temperature transitions.';
    }

    let rating = 'Exceptional Match';
    if (score >= 96) rating = 'Master Architectural Pairing';
    else if (score >= 92) rating = 'High Harmony';

    return { score, rating, description };
  }

  /**
   * 3. WARDROBE OPTIMIZATION & VERSATILITY ANALYTICS
   */
  analyzeWardrobeOptimization(pieces = [], combinations = []) {
    const totalPieces = pieces.length;
    const totalCombos = combinations.length;

    const multiplier = totalPieces > 0 ? (totalCombos / totalPieces).toFixed(1) : '1.0';

    let efficiencyRating = 'BALANCED TRAVEL CAPSULE';
    if (parseFloat(multiplier) >= 2.5) {
      efficiencyRating = 'ELITE MINIMALIST (2.5x+ MULTIPLIER)';
    } else if (parseFloat(multiplier) >= 2.0) {
      efficiencyRating = 'HIGHLY OPTIMIZED CAPSULE (2.0x+ MULTIPLIER)';
    } else if (parseFloat(multiplier) >= 1.5) {
      efficiencyRating = 'BALANCED TRAVEL CAPSULE (1.5x+ MULTIPLIER)';
    } else {
      efficiencyRating = 'MODERATE CAPSULE ALLOCATION';
    }

    // Measure piece wear distribution
    const pieceUsageMap = {};
    pieces.forEach(p => {
      pieceUsageMap[p.id] = {
        piece: p,
        appearances: 0
      };
    });

    combinations.forEach(combo => {
      combo.pieces.forEach(pId => {
        if (pieceUsageMap[pId]) {
          pieceUsageMap[pId].appearances++;
        }
      });
    });

    // Detect potential redundancy
    const redundancies = [];
    const tops = pieces.filter(p => p.category === 'Shirts');
    const bottoms = pieces.filter(p => p.category === 'Trousers');

    // Check for exact color and role duplication among bottoms
    for (let i = 0; i < bottoms.length; i++) {
      for (let j = i + 1; j < bottoms.length; j++) {
        if (bottoms[i].color.toLowerCase() === bottoms[j].color.toLowerCase()) {
          redundancies.push({
            type: 'similar_bottoms',
            garments: [bottoms[i].name, bottoms[j].name],
            advice: `Both ${bottoms[i].name} and ${bottoms[j].name} share similar ${bottoms[i].color} tones. Consider swapping one for an alternate weave or colorway.`
          });
        }
      }
    }

    return {
      totalPieces,
      totalCombos,
      versatilityMultiplier: multiplier,
      efficiencyRating,
      pieceUsage: Object.values(pieceUsageMap),
      redundancies,
      isFullyOptimized: redundancies.length === 0 && parseFloat(multiplier) >= 1.8
    };
  }

  /**
   * 4. MISSING-ITEM DETECTION & GAP ANALYSIS
   * Diagnoses friction gaps based on destination climate, planned activities, and cultural rules
   */
  detectMissingItems({ pieces = [], destination = {}, activities = [], climate = {} }) {
    const gaps = [];

    const hasRainRisk = (destination.precipitationRisk || '').toLowerCase() === 'high';
    const isCold = (climate.tempNumeric || destination.tempNumeric || 22) <= 15;
    const isHot = (climate.tempNumeric || destination.tempNumeric || 22) >= 28;

    const acts = Array.isArray(activities) ? activities.map(a => a.toLowerCase()) : [];
    const hasDining = acts.includes('dining') || acts.includes('events');
    const hasHiking = acts.includes('hiking');

    // Catalog piece references for 1-click remediation
    const hasWeatherDefense = pieces.some(p => 
      (p.category === 'Outerwear' && (p.fabric || '').toLowerCase().includes('dwr')) ||
      (p.fabric || '').toLowerCase().includes('membrane') ||
      (p.features || []).some(f => f.toLowerCase().includes('water') || f.toLowerCase().includes('wind'))
    );

    const hasCollaredTop = pieces.some(p =>
      p.category === 'Shirts' && 
      (p.name.toLowerCase().includes('collar') || p.name.toLowerCase().includes('poplin') || p.name.toLowerCase().includes('shirt'))
    );

    const hasTailoredBottom = pieces.some(p =>
      p.category === 'Trousers' && 
      (p.name.toLowerCase().includes('chino') || p.name.toLowerCase().includes('trouser') || p.name.toLowerCase().includes('wool'))
    );

    const hasTractionFootwear = pieces.some(p =>
      p.category === 'Footwear' && 
      ((p.fabric || '').toLowerCase().includes('vibram') || p.name.toLowerCase().includes('runner') || p.name.toLowerCase().includes('trail'))
    );

    const hasThermalLayer = pieces.some(p =>
      (p.fabric || '').toLowerCase().includes('merino') || 
      (p.fabric || '').toLowerCase().includes('wool') || 
      (p.fabric || '').toLowerCase().includes('flannel')
    );

    const hasLinenOrAiryTop = pieces.some(p =>
      (p.fabric || '').toLowerCase().includes('linen') || 
      (p.fabric || '').toLowerCase().includes('silk') ||
      (p.fabric || '').toLowerCase().includes('air')
    );

    // 1. Weather / Precipitation Gap
    if (hasRainRisk && !hasWeatherDefense) {
      gaps.push({
        id: 'gap_rain_defense',
        type: 'weather',
        severity: 'warning',
        title: 'Missing Water-Repellent Outer Layer',
        reason: `${destination.city} has high precipitation risk (${climate.rainRisk || 'High'}). A DWR shell is critical to keep base layers dry.`,
        suggestedPiece: {
          id: 'suggested_rain_shell',
          name: '3-Layer DWR Weather-Defense Field Shell',
          category: 'Outerwear',
          role: 'Outerwear 02',
          color: 'Obsidian Matte',
          fabric: 'Japanese 3-Layer Micro-Ripstop with 20,000mm Hydrostatic Membrane (220 GSM)',
          weight: '450g',
          features: ['100% wind and gale proof', 'Taped waterproof seams', 'Packs into own hood'],
          versatility: 'Ultimate storm protection for maritime showers and harbor winds',
          image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85',
          isFromUserWardrobe: false
        }
      });
    }

    // 2. Formal Dining / Event Etiquette Gap
    if (hasDining && (!hasCollaredTop || !hasTailoredBottom)) {
      gaps.push({
        id: 'gap_dining_etiquette',
        type: 'activity',
        severity: 'advisory',
        title: 'Formal Evening Dining Etiquette Warning',
        reason: `Dining is planned in ${destination.city}. Upscale restaurants and bistros mandate collared shirts and non-denim trousers.`,
        suggestedPiece: {
          id: 'suggested_formal_chino',
          name: 'Pleated High-Twist Travel Chino',
          category: 'Trousers',
          role: 'Trouser 02',
          color: 'Muted Olive Stone',
          fabric: '70% Tencel Lyocell, 28% High-Twist Cotton (240 GSM)',
          weight: '320g',
          features: ['Wrinkle recovery drape', 'Hidden passport security zip', 'Refined tailored taper'],
          versatility: 'Bridges museum visits and Michelin-starred dining tables',
          image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85',
          isFromUserWardrobe: false
        }
      });
    }

    // 3. Terrain / Hiking Traction Gap
    if ((hasHiking || (destination.terrainType && destination.terrainType.toLowerCase().includes('cliffside'))) && !hasTractionFootwear) {
      gaps.push({
        id: 'gap_terrain_traction',
        type: 'terrain',
        severity: 'warning',
        title: 'High-Traction Footwear Recommended',
        reason: `${destination.city}'s terrain includes ${destination.terrainType || 'rugged trails & stones'}. Smooth cupsole sneakers risk slipping on wet stones.`,
        suggestedPiece: {
          id: 'suggested_trail_runner',
          name: 'Ergonomic Technical Walking Runner',
          category: 'Footwear',
          role: 'Footwear 02',
          color: 'Onyx / Bone',
          fabric: 'Engineered Technical Knit with Vibram MegaGrip Soling (280g)',
          weight: '290g',
          features: ['22,000 steps daily maximum endurance', 'All-weather wet traction', 'Sock-like comfort'],
          versatility: 'High mileage city walking, subway transitions, and wet stone flagstones',
          image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=85',
          isFromUserWardrobe: false
        }
      });
    }

    // 4. Cold Insulation Gap
    if (isCold && !hasThermalLayer) {
      gaps.push({
        id: 'gap_thermal_insulation',
        type: 'climate',
        severity: 'warning',
        title: 'Thermal Insulation Gap (<15°C Average)',
        reason: `${destination.city} temperatures average ${climate.avgTempLabel || destination.avgTemp}. Thermal baselayers prevent hypothermic wind chill.`,
        suggestedPiece: {
          id: 'suggested_merino_baselayer',
          name: '260 GSM Heavyweight Thermal Merino Baselayer',
          category: 'Shirts',
          role: 'Shirt 03',
          color: 'Heather Charcoal',
          fabric: '100% 21.5u New Zealand Heavyweight Merino Wool (260 GSM)',
          weight: '270g',
          features: ['Maximum thermal insulation', 'Zero itch skin contact', 'Moisture-buffering core'],
          versatility: 'Essential base layer for sub-arctic winds and chilly evenings',
          image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85',
          isFromUserWardrobe: false
        }
      });
    }

    // 5. Arid / Extreme Heat Gap
    if (isHot && !hasLinenOrAiryTop) {
      gaps.push({
        id: 'gap_heat_breathability',
        type: 'climate',
        severity: 'advisory',
        title: 'Heat Ventilation Recommendation (30°C+ Sun)',
        reason: `${destination.city} features high thermal radiation. Dense cotton weaves trap moisture; open-slub linen is recommended.`,
        suggestedPiece: {
          id: 'suggested_linen_shirt',
          name: 'Camp Collar Normandy Linen Shirt',
          category: 'Shirts',
          role: 'Shirt 03',
          color: 'Sand / Ecru',
          fabric: '100% Normandy Breathable Linen (160 GSM)',
          weight: '185g',
          features: ['Heat-dispersing open slub weave', 'Self-drying in 45 min', 'Wrinkle-forgiving'],
          versatility: 'High breathability during peak afternoon desert sun',
          image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85',
          isFromUserWardrobe: false
        }
      });
    }

    // 6. Sacred Cultural Site Modesty Protocol Gap
    const hasModestProtocols = (destination.culturalDressCodes && destination.culturalDressCodes.length > 0) ||
                               ['marrakech', 'jaipur', 'kyoto'].includes((destination.id || '').toLowerCase());
    const hasFullLengthBottom = pieces.some(p => 
      p.category === 'Trousers' && 
      (p.name.toLowerCase().includes('trouser') || p.name.toLowerCase().includes('chino') || p.name.toLowerCase().includes('pant'))
    );

    if (hasModestProtocols && !hasFullLengthBottom) {
      gaps.push({
        id: 'gap_cultural_modesty',
        type: 'cultural',
        severity: 'warning',
        title: 'Sacred Site Modesty Protocol Advisory',
        reason: `${destination.city} temples and shrines mandate covered knees and shoulders. Full-length lightweight trousers ensure seamless entry.`,
        suggestedPiece: {
          id: 'suggested_modest_trouser',
          name: 'Relaxed Lightweight Linen-Tencel Modest Trouser',
          category: 'Trousers',
          role: 'Trouser 02',
          color: 'Washed Stone / Taupe',
          fabric: '55% French Linen, 45% Lyocell (200 GSM)',
          weight: '295g',
          features: ['Meets all sacred site modesty protocols', 'Breathable airflow drape', 'Crease resistant'],
          versatility: 'Essential for religious sanctuaries, historic temples, and respectful community visits',
          image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=85',
          isFromUserWardrobe: false
        }
      });
    }

    return {
      gaps,
      hasCriticalGaps: gaps.some(g => g.severity === 'warning'),
      readinessScore: Math.max(70, 100 - (gaps.length * 10))
    };
  }
}

export const outfitEngine = new OutfitEngine();
