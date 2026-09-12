/**
 * ROVE TRAVEL WARDROBE INTELLIGENCE SYSTEM
 * Trip Intelligence Engine
 * 
 * Computes:
 * 1. Climate & Weather Analysis (temperature bracket, fabric GSM modeling, precipitation risk, clo thermal rating)
 * 2. Activity Friction & Dress Code Profiling (formal dining, temple modesty, hiking traction, nightlife silhouettes)
 * 3. Duration & Rotation Math (wear-per-piece formulas, laundry turnaround, luggage capacity boundaries)
 * 4. Cultural Dress Requirements & Advisories (sacred modesty, terrain traction, bistro dress standards)
 * 5. Dynamic Wardrobe Synthesis (harmonizing personal closet archive with ROVE catalog pieces, daily outfit matrix)
 */

import { DESTINATIONS } from '../data/mockData.js';

// Master Garment Catalog across Climate Archetypes
export const CLIMATE_CATALOG = {
  hot: [
    {
      id: 'hot_top_1',
      name: 'Camp Collar Normandy Linen Shirt',
      category: 'Shirts',
      role: 'Shirt 01',
      color: 'Sand / Ecru',
      fabric: '100% Normandy Breathable Linen (160 GSM)',
      weight: '185g',
      features: ['Heat-dispersing open slub weave', 'Wrinkle-forgiving texture', 'Self-drying in 45 min'],
      versatility: 'High breathability in 30°C+ heat; pairs with chinos and denim',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['hot', 'temperate']
    },
    {
      id: 'hot_top_2',
      name: 'Ultra-Fine Merino Air Knit Shirt',
      category: 'Shirts',
      role: 'Shirt 02',
      color: 'Obsidian Black',
      fabric: 'Ultra-fine 17.5 Micron New Zealand Merino (145 GSM)',
      weight: '160g',
      features: ['Natural odor immunity (Wear 3x without wash)', 'Thermoregulating core', 'Silk-touch handle'],
      versatility: 'Day sightseeing or formal dinner base layer',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['hot', 'temperate', 'cold', 'all']
    },
    {
      id: 'hot_top_3',
      name: 'Silk-Linen Popover Tunic',
      category: 'Shirts',
      role: 'Shirt 03',
      color: 'Chalk White',
      fabric: '60% Mulberry Silk, 40% Belgian Linen (140 GSM)',
      weight: '175g',
      features: ['Cool-to-touch skin contact', 'Temple shoulder coverage', 'Air-channel drape'],
      versatility: 'Sacred architectural visits and twilight rooftop drinks',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['hot', 'temperate']
    },
    {
      id: 'hot_bottom_1',
      name: 'Pleated High-Twist Travel Chino',
      category: 'Trousers',
      role: 'Trouser 01',
      color: 'Muted Olive Stone',
      fabric: '70% Tencel Lyocell, 28% High-Twist Cotton, 2% Elastane (240 GSM)',
      weight: '320g',
      features: ['Wrinkle recovery drape', 'Hidden passport security zip', 'Relaxed tapered leg'],
      versatility: 'Palace walks, marketplace browsing, and dinner tables',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['hot', 'temperate']
    },
    {
      id: 'hot_bottom_2',
      name: 'Japanese Washed Selvedge Denim',
      category: 'Trousers',
      role: 'Jeans 01',
      color: 'Raw Indigo Rinse',
      fabric: '12.5oz Kurabo Mills Lightweight Stretch Denim (350 GSM)',
      weight: '440g',
      features: ['Breathable summer weight', 'Structured silhouette', 'Resists dust & transit wear'],
      versatility: 'Evening dining and casual transit flights',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['hot', 'temperate', 'all']
    },
    {
      id: 'hot_outer_1',
      name: 'Unconstructed Field Overshirt',
      category: 'Outerwear',
      role: 'Overshirt 01',
      color: 'Deep Graphite',
      fabric: 'High-density Washed Cotton Canvas with Nano DWR Finish (280 GSM)',
      weight: '380g',
      features: ['A/C transit protection', '3 interior security pockets', 'Rollable sleeve tabs'],
      versatility: 'Worn open over shirts or buttoned as lightweight evening jacket',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['hot', 'temperate']
    },
    {
      id: 'hot_shoe_1',
      name: 'Minimalist Nappa Court Sneaker',
      category: 'Footwear',
      role: 'Footwear 01',
      color: 'Chalk White / Charcoal Tab',
      fabric: 'Italian Full-Grain Nappa Leather, OrthoLite Insole, Margom Cupsole',
      weight: '410g',
      features: ['18,000 steps daily ergonomic arch support', 'Wipe-clean finish', 'Zero break-in period'],
      versatility: 'Museums, palace complexes, and candlelit bistros',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['hot', 'temperate', 'all']
    },
    {
      id: 'hot_shoe_2',
      name: 'Unlined Tuscan Suede Penny Loafer',
      category: 'Footwear',
      role: 'Footwear 02',
      color: 'Tobacco Brown',
      fabric: 'Calfskin Suede, Blake Stitched Leather Sole with Rubber Inset',
      weight: '310g',
      features: ['Packs completely flat in shoe pouch', 'Slip-on ease for temple visits', 'Evening elegance'],
      versatility: 'Fine dining, coastal terraces, and cocktail hours',
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['hot', 'temperate']
    }
  ],

  temperate: [
    {
      id: 'temp_top_1',
      name: 'Technical Japanese Poplin Shirt',
      category: 'Shirts',
      role: 'Shirt 01',
      color: 'Crisp Chalk / Sky Stripe',
      fabric: '100% Giza Long-Staple Cotton with Wrinkle-Free Finish (175 GSM)',
      weight: '190g',
      features: ['Crisp architectural collar', 'Natural body moisture wicking', 'Overnight drip-dry'],
      versatility: 'Effortlessly transitions from architectural tours to private dining',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['temperate', 'hot']
    },
    {
      id: 'temp_top_2',
      name: 'Fine-Gauge 18.5u Merino Crewneck',
      category: 'Shirts',
      role: 'Shirt 02',
      color: 'Obsidian Charcoal',
      fabric: '100% New Zealand Fine Merino Knit (190 GSM)',
      weight: '210g',
      features: ['Thermal adaptability across 15°C–25°C', 'Odor-free 72-hour wear', 'Silky handfeel'],
      versatility: 'Essential modular core piece for unpredictable city weather',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['temperate', 'cold', 'all']
    },
    {
      id: 'temp_top_3',
      name: 'Selvedge Chambray Overshirt',
      category: 'Shirts',
      role: 'Shirt 03',
      color: 'Washed Slate Blue',
      fabric: '100% Okayama Loomed Cotton Chambray (180 GSM)',
      weight: '220g',
      features: ['Reinforced triple-needle stitch', 'Breathable open weave', 'Subtle character patina'],
      versatility: 'Worn buttoned as casual shirt or open as midday layer',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['temperate', 'hot']
    },
    {
      id: 'temp_bottom_1',
      name: 'Technical Twill Commuter Trouser',
      category: 'Trousers',
      role: 'Trouser 01',
      color: 'Midnight Navy',
      fabric: 'Swiss Schoeller Stretch Twill with NanoSphere DWR (260 GSM)',
      weight: '340g',
      features: ['4-way stretch mobility', 'Repels rain showers and subway dirt', 'Refined tailored drape'],
      versatility: '15,000+ daily steps across metro stairs and gallery floors',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['temperate', 'cold', 'all']
    },
    {
      id: 'temp_bottom_2',
      name: '13oz Japanese Raw Selvedge Denim',
      category: 'Trousers',
      role: 'Jeans 01',
      color: 'Deep Raw Indigo',
      fabric: '100% Zimbabwe Ring-Spun Cotton, Kurabo Mills (390 GSM)',
      weight: '480g',
      features: ['Structured architectural cut', 'Clean modern silhouette', 'Zero knee bagging'],
      versatility: 'High-durability travel pant bridging casual bistros and evening lounges',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['temperate', 'cold', 'all']
    },
    {
      id: 'temp_outer_1',
      name: 'Unstructured Tropical Wool Travel Blazer',
      category: 'Outerwear',
      role: 'Outerwear 01',
      color: 'Architectural Charcoal',
      fabric: '100% High-Twist Italian Fresco Wool (250 GSM)',
      weight: '420g',
      features: ['Completely unpadded soft shoulders', 'Crease-free pack recovery', 'Breathable mesh weave'],
      versatility: 'Passes strict fine-dining dress codes without sacrificing transit ease',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['temperate', 'all']
    },
    {
      id: 'temp_shoe_1',
      name: 'Ergonomic Technical Walking Runner',
      category: 'Footwear',
      role: 'Footwear 01',
      color: 'Onyx / Bone',
      fabric: 'Engineered Technical Knit, Dual-Density EVA Midsole, Vibram MegaGrip Soling',
      weight: '290g',
      features: ['22,000 steps daily maximum endurance', 'All-weather wet traction', 'Sock-like comfort'],
      versatility: 'High-mileage city expeditions, subway transitions, and stone pavements',
      image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['temperate', 'cold', 'all']
    },
    {
      id: 'temp_shoe_2',
      name: 'Minimalist Nappa Court Sneaker',
      category: 'Footwear',
      role: 'Footwear 02',
      color: 'Chalk White / Charcoal Tab',
      fabric: 'Italian Full-Grain Nappa Leather, Margom Rubber Sole',
      weight: '410g',
      features: ['Wipe-clean leather protection', 'Arch-support insole', 'Clean dress silhouette'],
      versatility: 'Transitions seamlessly into dinner reservations and cocktail bars',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['temperate', 'all']
    }
  ],

  cold: [
    {
      id: 'cold_top_1',
      name: '260 GSM Heavyweight Thermal Merino Baselayer',
      category: 'Shirts',
      role: 'Shirt 01',
      color: 'Heather Charcoal',
      fabric: '100% 21.5u New Zealand Heavyweight Merino Wool (260 GSM)',
      weight: '270g',
      features: ['Maximum thermal insulation', 'Zero itch contact', 'Moisture-buffering core'],
      versatility: 'The thermal anchor for coastal sub-arctic winds and evening chills',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['cold']
    },
    {
      id: 'cold_top_2',
      name: 'High-Density Brushed Flannel Overshirt',
      category: 'Shirts',
      role: 'Shirt 02',
      color: 'Midnight Obsidian',
      fabric: '100% Organic Brushed Portuguese Cotton (280 GSM)',
      weight: '310g',
      features: ['Wind-buffering dense weave', 'Velvety brushed interior', 'Dual buttoned chest pockets'],
      versatility: 'Worn as a warm mid-layer under shells or standalone indoors',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['cold', 'temperate']
    },
    {
      id: 'cold_top_3',
      name: 'Ribbed Merino-Cashmere Rollneck',
      category: 'Shirts',
      role: 'Shirt 03',
      color: 'Chalk Stone',
      fabric: '70% Fine Merino, 30% Mongolian Cashmere (300 GSM)',
      weight: '360g',
      features: ['Neck wind seal', 'Lightweight loft insulation', 'Editorial European tailoring'],
      versatility: 'Evening bistros, gallery openings, and harbor cruises',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['cold']
    },
    {
      id: 'cold_bottom_1',
      name: 'Weatherproof Cordura Commuter Trousers',
      category: 'Trousers',
      role: 'Trouser 01',
      color: 'Graphite Black',
      fabric: 'Cordura Durability Weave with Windproof Fleece Backing (320 GSM)',
      weight: '430g',
      features: ['Wind-chill blocking membrane', 'Water-beading DWR exterior', 'Hidden ankle cuff cinch'],
      versatility: 'Navigating wet basalt rocks, harbor rain, and chilly city avenues',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['cold']
    },
    {
      id: 'cold_bottom_2',
      name: 'Heavyweight Wool-Flannel Pleated Trouser',
      category: 'Trousers',
      role: 'Trouser 02',
      color: 'Deep Charcoal Grey',
      fabric: '100% Italian Worsted Wool Flannel (340 GSM)',
      weight: '460g',
      features: ['Natural thermal retention', 'Sharp crease recovery', 'Curtain waistband for comfort'],
      versatility: 'Structured sophistication for museums, concerts, and fine dining',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['cold', 'temperate']
    },
    {
      id: 'cold_outer_1',
      name: '3-Layer DWR Weather-Defense Field Shell',
      category: 'Outerwear',
      role: 'Outerwear 01',
      color: 'Obsidian Matte',
      fabric: 'Japanese 3-Layer Micro-Ripstop with 20,000mm Hydrostatic Membrane (220 GSM)',
      weight: '450g',
      features: ['100% wind and gale proof', 'Taped waterproof seams', 'Packs into own hood'],
      versatility: 'Ultimate outer storm barrier over merino and flannel layers',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['cold']
    },
    {
      id: 'cold_shoe_1',
      name: 'Weather-Resistant Low Trail Hybrid',
      category: 'Footwear',
      role: 'Footwear 01',
      color: 'Basalt / Dark Slate',
      fabric: 'Cordura Nylon Upper with Waterproof Bootie Membrane, Vibram ArcticGrip Outsole',
      weight: '360g',
      features: ['Wet ice and slick basalt traction', 'Gusseted water-shedding tongue', 'Cushioned trail bed'],
      versatility: 'Unmatched grip for wet cobblestones, volcanic mud, and harbor squalls',
      image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['cold']
    },
    {
      id: 'cold_shoe_2',
      name: 'Minimalist Nappa Court Sneaker',
      category: 'Footwear',
      role: 'Footwear 02',
      color: 'Chalk White / Charcoal Tab',
      fabric: 'Treated Italian Nappa Leather, Water-Resistant Coating, Margom Rubber Sole',
      weight: '410g',
      features: ['Wipe-clean leather protection', 'Arch support insole', 'Clean dress silhouette'],
      versatility: 'Indoor museum visits, dinner tables, and stylish evening gatherings',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85',
      climateSuitable: ['cold', 'temperate', 'all']
    }
  ]
};

export class TripIntelligenceEngine {
  /**
   * Resolve destination metadata from standard 10 network or build empirical fallback
   */
  resolveDestination(destinationInput) {
    if (!destinationInput) return DESTINATIONS[0];

    const searchStr = String(destinationInput).trim().toLowerCase();
    const match = DESTINATIONS.find(d => 
      d.id.toLowerCase() === searchStr || 
      d.city.toLowerCase() === searchStr ||
      searchStr.includes(d.city.toLowerCase()) ||
      d.city.toLowerCase().includes(searchStr)
    );

    if (match) return match;

    // Empirical synthesis for custom user destinations
    return {
      id: 'custom_' + searchStr.replace(/[^a-z0-9]/g, '_'),
      city: destinationInput.charAt(0).toUpperCase() + destinationInput.slice(1),
      country: 'Global Expedition',
      tagline: 'Custom Destination · High-Efficiency Modular Wardrobe',
      avgTemp: '24°C',
      tempNumeric: 24,
      climate: 'Moderate Temperate',
      precipitationRisk: 'Moderate',
      walkingIntensity: '10 KM / Day',
      terrainType: 'Urban Pavement & Historic Stone',
      culturalDressCodes: ['Modesty Check: Carry a lightweight shoulder/knee layer', 'Footwear Traction: Multi-surface rubber sole recommended'],
      recommendedFabrics: ['High-Twist Wool', 'Breathable Linen', 'Merino Knit'],
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=85',
      editorialImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85'
    };
  }

  /**
   * 1. Climate & Weather Calculation Engine
   */
  analyzeClimate(destinationMeta) {
    const tempNum = typeof destinationMeta.tempNumeric === 'number' 
      ? destinationMeta.tempNumeric 
      : parseInt(destinationMeta.avgTemp, 10) || 22;

    let climateBracket = 'temperate';
    let gsmRange = '160–220 GSM';
    let gsmDescription = 'Midweight breathable weaves with high-twist recovery';
    let cloRating = 0.8;
    let breathabilityQuotient = 8.5; // Out of 10

    if (tempNum >= 26) {
      climateBracket = 'hot';
      gsmRange = '130–170 GSM';
      gsmDescription = 'Ultralight open slub linens, airy silks, and micro-merino';
      cloRating = 0.4;
      breathabilityQuotient = 9.8;
    } else if (tempNum <= 15) {
      climateBracket = 'cold';
      gsmRange = '240–340 GSM';
      gsmDescription = 'Dense thermal merino baselayers, brushed flannels, and wind-blocking shells';
      cloRating = 1.4;
      breathabilityQuotient = 7.0;
    }

    const rainRisk = destinationMeta.precipitationRisk || 'Moderate';
    const isWaterproofRequired = rainRisk.toLowerCase() === 'high';

    return {
      tempNumeric: tempNum,
      climateBracket,
      avgTempLabel: destinationMeta.avgTemp || `${tempNum}°C`,
      gsmRange,
      gsmDescription,
      cloRating,
      breathabilityQuotient,
      rainRisk,
      isWaterproofRequired,
      summary: `${destinationMeta.city} averages ${destinationMeta.avgTemp} (${destinationMeta.climate}). Recommended fabric weight: ${gsmRange}.`
    };
  }

  /**
   * 2. Activity Friction & Dress Code Profiling
   */
  analyzeActivities(activities = []) {
    const acts = Array.isArray(activities) ? activities.map(a => a.toLowerCase()) : ['sightseeing'];

    const profiles = {
      hasDining: acts.includes('dining') || acts.includes('events'),
      hasNightlife: acts.includes('nightlife'),
      hasHiking: acts.includes('hiking'),
      hasBeach: acts.includes('beach'),
      hasBusiness: acts.includes('business'),
      hasSightseeing: acts.includes('sightseeing') || acts.includes('shopping')
    };

    const garmentRequirements = [];
    if (profiles.hasDining) {
      garmentRequirements.push('Structured collar shirt and tailored trousers for restaurant dress codes.');
    }
    if (profiles.hasNightlife) {
      garmentRequirements.push('Dark monochromatic silhouette with sleek leather or minimalist sneaker.');
    }
    if (profiles.hasHiking) {
      garmentRequirements.push('High-traction lugged soles and water-repellent outer shell.');
    }
    if (profiles.hasBeach) {
      garmentRequirements.push('Air-permeable open linen and rapid air-dry trousers.');
    }
    if (profiles.hasBusiness) {
      garmentRequirements.push('Unconstructed travel blazer that survives luggage compression.');
    }

    return {
      profiles,
      garmentRequirements,
      totalSelected: acts.length
    };
  }

  /**
   * 3. Duration & Rotation Math
   */
  calculateDurationRotation(durationDays, luggageType = 'carryon') {
    const days = Math.max(1, parseInt(durationDays, 10) || 5);

    // Wear limits before wash/rotation
    // Tops: 1-2 wears (Merino can do 3)
    // Bottoms: 2-3 wears (High-twist wool / denim recover naturally overnight)
    // Outerwear: 1 master piece worn on transit + chilly evenings
    // Footwear: 2 pairs to alternate resting days (preserves leather & cushion foam)
    let topCount = 2;
    let bottomCount = 2;
    let outerCount = 1;
    let shoeCount = 1;
    let totalOutfits = days + 2; // Morning + Evening looks

    if (days <= 2) {
      topCount = 2;
      bottomCount = 1;
      outerCount = 1;
      shoeCount = 1;
      totalOutfits = 3;
    } else if (days <= 4) {
      topCount = 2;
      bottomCount = 2;
      outerCount = 1;
      shoeCount = 2;
      totalOutfits = 5;
    } else if (days <= 6) {
      topCount = 2;
      bottomCount = 2;
      outerCount = 1;
      shoeCount = 2;
      totalOutfits = 7;
    } else if (days <= 9) {
      topCount = 3;
      bottomCount = 2;
      outerCount = 1;
      shoeCount = 2;
      totalOutfits = 10;
    } else {
      // 10+ Days
      topCount = 4;
      bottomCount = 3;
      outerCount = 1;
      shoeCount = 2;
      totalOutfits = 14;
    }

    // Adjust for luggage volume boundaries
    if (luggageType === 'personal') {
      topCount = Math.min(topCount, 2);
      bottomCount = 1;
      outerCount = 1;
      shoeCount = 1;
    }

    const totalPieces = topCount + bottomCount + outerCount + shoeCount;
    const estWeightGrams = (topCount * 180) + (bottomCount * 360) + (outerCount * 420) + (shoeCount * 380);
    const estVolumeLiters = ((topCount * 0.4) + (bottomCount * 0.7) + (outerCount * 0.9) + (shoeCount * 2.2)).toFixed(1);

    const laundrySchedule = days > 6 
      ? `Midway sink rinse suggested on Day ${Math.ceil(days / 2)} for base merino tees (hang dry in 45 min).` 
      : 'Zero laundry required. High-twist fabrics and antimicrobial merino guarantee odor immunity across all days.';

    return {
      durationDays: days,
      topCount,
      bottomCount,
      outerCount,
      shoeCount,
      totalPieces,
      totalOutfits,
      estWeightGrams,
      estVolumeLiters,
      laundrySchedule
    };
  }

  /**
   * 4. Cultural Dress Requirements & Advisories
   */
  getCulturalAdvisories(destinationMeta, activities = []) {
    const advisories = [];
    const destCodes = destinationMeta.culturalDressCodes || [];

    // Inject destination-specific cultural codes
    destCodes.forEach(code => advisories.push(code));

    // Dynamic terrain and activity advisories
    if (destinationMeta.terrainType) {
      advisories.push(`Terrain Profile: ${destinationMeta.terrainType} (${destinationMeta.walkingIntensity || '10 KM/day'}). Ergonomic footbed required.`);
    }

    if (activities.includes('dining')) {
      advisories.push('Fine Dining Protocol: Collared shirts and covered ankles required in upscale evening venues.');
    }

    if (destinationMeta.tempNumeric >= 30) {
      advisories.push('Intense Solar Exposure: Pure natural fibers (linen/merino) prevent heat trapping during midday sun.');
    }

    return advisories;
  }

  /**
   * 5. Dynamic Wardrobe Synthesis
   * Merges user's personal closet archive (Phase 17) with curated catalog pieces
   */
  synthesizeCapsule({ destination, duration, activities, style, luggage, userWardrobe = [] }) {
    const destMeta = this.resolveDestination(destination);
    const climateAnalysis = this.analyzeClimate(destMeta);
    const activityAnalysis = this.analyzeActivities(activities);
    const durationRotation = this.calculateDurationRotation(duration, luggage);
    const culturalAdvisories = this.getCulturalAdvisories(destMeta, activities);

    // Garment pool based on climate bracket ('hot' | 'temperate' | 'cold')
    const catalogPool = CLIMATE_CATALOG[climateAnalysis.climateBracket] || CLIMATE_CATALOG.temperate;

    // Filter user's personal wardrobe for compatible items
    const compatibleUserItems = (userWardrobe || []).filter(item => {
      if (!item) return false;
      const itemClimate = item.climate ? item.climate.toLowerCase() : 'all';
      return itemClimate === 'all' || itemClimate === climateAnalysis.climateBracket;
    });

    // Prioritize pinned user items
    compatibleUserItems.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

    const synthesizedPieces = [];
    let userPiecesUsedCount = 0;

    // --- Select Tops ---
    const userTops = compatibleUserItems.filter(i => i.category === 'tops');
    let neededTops = durationRotation.topCount;
    let topRoleIdx = 1;

    userTops.forEach(uTop => {
      if (neededTops > 0) {
        synthesizedPieces.push({
          id: uTop.id,
          name: uTop.name,
          category: 'Shirts',
          role: `Shirt 0${topRoleIdx++}`,
          color: uTop.color || 'Obsidian',
          fabric: uTop.fabric || 'Personal Wardrobe Selection',
          weight: uTop.weight || '170g',
          features: ['Sourced from your personal archive', ...(uTop.tags || ['Breathable', 'Wrinkle-Free'])],
          versatility: 'High rotation versatility across trip outfits',
          image: uTop.image || 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85',
          isFromUserWardrobe: true
        });
        neededTops--;
        userPiecesUsedCount++;
      }
    });

    // Fill remaining tops from catalog
    const catalogTops = catalogPool.filter(p => p.category === 'Shirts');
    catalogTops.forEach(cTop => {
      if (neededTops > 0) {
        synthesizedPieces.push({
          ...cTop,
          role: `Shirt 0${topRoleIdx++}`,
          isFromUserWardrobe: false
        });
        neededTops--;
      }
    });

    // --- Select Bottoms ---
    const userBottoms = compatibleUserItems.filter(i => i.category === 'bottoms');
    let neededBottoms = durationRotation.bottomCount;
    let bottomRoleIdx = 1;

    userBottoms.forEach(uBottom => {
      if (neededBottoms > 0) {
        synthesizedPieces.push({
          id: uBottom.id,
          name: uBottom.name,
          category: 'Trousers',
          role: `Trouser 0${bottomRoleIdx++}`,
          color: uBottom.color || 'Charcoal Stone',
          fabric: uBottom.fabric || 'Personal Wardrobe Selection',
          weight: uBottom.weight || '330g',
          features: ['Sourced from your personal archive', ...(uBottom.tags || ['High-Mobility', 'Crease-Resistant'])],
          versatility: 'Recovers overnight when hung; pairs with all shirts',
          image: uBottom.image || 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85',
          isFromUserWardrobe: true
        });
        neededBottoms--;
        userPiecesUsedCount++;
      }
    });

    // Fill remaining bottoms from catalog
    const catalogBottoms = catalogPool.filter(p => p.category === 'Trousers');
    catalogBottoms.forEach(cBottom => {
      if (neededBottoms > 0) {
        synthesizedPieces.push({
          ...cBottom,
          role: `Trouser 0${bottomRoleIdx++}`,
          isFromUserWardrobe: false
        });
        neededBottoms--;
      }
    });

    // --- Select Outerwear ---
    const userOuter = compatibleUserItems.find(i => i.category === 'outerwear');
    if (userOuter) {
      synthesizedPieces.push({
        id: userOuter.id,
        name: userOuter.name,
        category: 'Outerwear',
        role: 'Outerwear 01',
        color: userOuter.color || 'Deep Graphite',
        fabric: userOuter.fabric || 'Personal Wardrobe Selection',
        weight: userOuter.weight || '390g',
        features: ['Sourced from your personal archive', ...(userOuter.tags || ['Weather-Defense', 'Security-Pockets'])],
        versatility: 'Transit layer and evening thermal insurance',
        image: userOuter.image || 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85',
        isFromUserWardrobe: true
      });
      userPiecesUsedCount++;
    } else {
      const catalogOuter = catalogPool.find(p => p.category === 'Outerwear') || CLIMATE_CATALOG.hot[5];
      synthesizedPieces.push({
        ...catalogOuter,
        role: 'Outerwear 01',
        isFromUserWardrobe: false
      });
    }

    // --- Select Footwear ---
    const userShoes = compatibleUserItems.filter(i => i.category === 'footwear');
    let neededShoes = durationRotation.shoeCount;
    let shoeRoleIdx = 1;

    userShoes.forEach(uShoe => {
      if (neededShoes > 0) {
        synthesizedPieces.push({
          id: uShoe.id,
          name: uShoe.name,
          category: 'Footwear',
          role: `Footwear 0${shoeRoleIdx++}`,
          color: uShoe.color || 'Chalk / Charcoal',
          fabric: uShoe.fabric || 'Personal Footwear Archive',
          weight: uShoe.weight || '380g',
          features: ['Sourced from your personal archive', ...(uShoe.tags || ['Ergonomic Arch', 'Wipe-Clean'])],
          versatility: 'High mileage city walking and bistro evenings',
          image: uShoe.image || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85',
          isFromUserWardrobe: true
        });
        neededShoes--;
        userPiecesUsedCount++;
      }
    });

    const catalogShoes = catalogPool.filter(p => p.category === 'Footwear');
    catalogShoes.forEach(cShoe => {
      if (neededShoes > 0) {
        synthesizedPieces.push({
          ...cShoe,
          role: `Footwear 0${shoeRoleIdx++}`,
          isFromUserWardrobe: false
        });
        neededShoes--;
      }
    });

    // --- Generate Day-by-Day Dynamic Outfits Matrix ---
    const generatedOutfits = this.generateOutfitsMatrix({
      pieces: synthesizedPieces,
      duration: durationRotation.durationDays,
      destMeta,
      climateAnalysis,
      activityAnalysis
    });

    return {
      destination: destMeta,
      climate: climateAnalysis,
      activities: activityAnalysis,
      rotation: durationRotation,
      culturalAdvisories,
      pieces: synthesizedPieces,
      outfits: generatedOutfits,
      userPiecesUsedCount,
      stats: {
        totalOutfits: generatedOutfits.length,
        totalPieces: synthesizedPieces.length,
        footwearCount: synthesizedPieces.filter(p => p.category === 'Footwear').length,
        cabinBags: 1,
        totalWeightGrams: synthesizedPieces.reduce((acc, p) => acc + (parseInt(p.weight, 10) || 250), 0),
        luggageCompliance: `${durationRotation.estVolumeLiters}L / 40L Cabin Capacity`
      }
    };
  }

  /**
   * Generates deterministic day-by-day outfits matching trip duration and itinerary
   */
  generateOutfitsMatrix({ pieces, duration, destMeta, climateAnalysis, activityAnalysis }) {
    const shirts = pieces.filter(p => p.category === 'Shirts');
    const bottoms = pieces.filter(p => p.category === 'Trousers');
    const outer = pieces.find(p => p.category === 'Outerwear') || pieces[0];
    const shoes = pieces.filter(p => p.category === 'Footwear');

    const outfits = [];
    const numDays = Math.min(duration, 14);

    const editorialImages = [
      destMeta.editorialImage || destMeta.image,
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1000&q=85'
    ];

    for (let day = 1; day <= numDays; day++) {
      // Day Look
      const dayShirt = shirts[(day - 1) % shirts.length] || shirts[0];
      const dayBottom = bottoms[(day - 1) % bottoms.length] || bottoms[0];
      const dayShoe = shoes[(day - 1) % shoes.length] || shoes[0];

      const dayPieces = [dayShirt, dayBottom, dayShoe].filter(Boolean);

      outfits.push({
        id: `outfit_day_${day}`,
        day: `DAY 0${day} · DAYTIME EXPLORATION`,
        title: `${destMeta.city} Itinerary & Architecture`,
        time: 'Morning / Afternoon',
        pieces: dayPieces.map(p => p.id),
        pieceNames: dayPieces.map(p => p.name),
        description: `Calibrated for ${destMeta.city}'s daytime microclimate (${climateAnalysis.avgTempLabel}). ${dayShirt.name} ensures continuous breathability, paired with ${dayBottom.name} for frictionless walking.`,
        tempBadge: `${climateAnalysis.avgTempLabel} · ${destMeta.climate}`,
        stepsEst: `${10000 + (day * 800)} Steps`,
        image: editorialImages[(day - 1) % editorialImages.length]
      });

      // Evening Look for Days 1, 2, 3, etc. (up to 7 max outfits to keep clean)
      if (outfits.length < 8 && (day <= 3 || day === numDays)) {
        const eveShirt = shirts[day % shirts.length] || shirts[0];
        const eveBottom = bottoms[day % bottoms.length] || bottoms[0];
        const eveShoe = shoes.length > 1 ? shoes[1] : shoes[0];
        const evePieces = [eveShirt, eveBottom, outer, eveShoe].filter(Boolean);

        outfits.push({
          id: `outfit_night_${day}`,
          day: `NIGHT 0${day} · EVENING ELEVATION`,
          title: activityAnalysis.profiles.hasDining ? `${destMeta.city} Bistro & Fine Dining` : `${destMeta.city} Twilight Gathering`,
          time: 'Evening',
          pieces: evePieces.map(p => p.id),
          pieceNames: evePieces.map(p => p.name),
          description: `Sharpened silhouette layering ${outer.name} over ${eveShirt.name}. Formally compliant with ${destMeta.city}'s dining protocols while adapting to cool evening breezes.`,
          tempBadge: `${Math.max(12, climateAnalysis.tempNumeric - 6)}°C · Cool Twilight`,
          stepsEst: '4,200 Steps',
          image: editorialImages[day % editorialImages.length]
        });
      }
    }

    return outfits;
  }
}

export const tripIntelligenceEngine = new TripIntelligenceEngine();
