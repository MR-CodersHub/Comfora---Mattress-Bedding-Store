/**
 * AURA LUNA LUXURY SLEEP STUDIO - COMPLETE PRODUCT & CONTENT DATABASE
 */

const AURA_DATA = {
  // Mattress Categories & Products
  products: [
    {
      id: "mat-1",
      name: "The Celestial Grand Hybrid",
      category: "Spring",
      type: "Mattress",
      price: 1850,
      originalPrice: 2200,
      rating: 4.9,
      reviewCount: 342,
      badge: "Best Seller",
      badgeClass: "badge-gold",
      firmnessScore: 6.5,
      firmnessLabel: "Medium Luxury (6.5/10)",
      sizes: ["Single", "Double", "Queen", "King"],
      defaultSize: "Queen",
      image: "assets/images/The Celestial Grand Hybrid.jpg",
      gallery: [
        "assets/images/The Celestial Grand Hybrid.jpg",
        "assets/images/hero_main.jpg",
        "assets/images/anatomy_cutaway.jpg"
      ],
      tagline: "7-Zone Ergonomic Pocket Springs with Cashmere Quilt",
      description: "Our flagship hybrid mattress combines individually pocketed titanium coils with cloud-like Belgian organic latex and micro-quilted cashmere for pressure-free restorative sleep.",
      specifications: {
        "Core Support": "1,600 Hand-Nested Pocket Coils",
        "Comfort Layer": "Natural GOLS-Certified Organic Latex",
        "Cover Fabric": "Organic Cashmere & Belgian Damask",
        "Total Height": "14.5 Inches (37 cm)",
        "Trial Period": "100 Nights Risk-Free",
        "Warranty": "15-Year Non-Prorated Guarantee"
      }
    },
    {
      id: "mat-2",
      name: "Serenity Organic Natural Latex",
      category: "Latex",
      type: "Mattress",
      price: 2150,
      originalPrice: 2490,
      rating: 5.0,
      reviewCount: 188,
      badge: "100% Organic",
      badgeClass: "badge-trial",
      firmnessScore: 5.5,
      firmnessLabel: "Gentle Plush (5.5/10)",
      sizes: ["Single", "Double", "Queen", "King"],
      defaultSize: "King",
      image: "assets/images/hero_editorial.jpg",
      gallery: [
        "assets/images/hero_editorial.jpg",
        "assets/images/hero_main.jpg",
        "assets/images/anatomy_cutaway.jpg"
      ],
      tagline: "Eco-Harvested Dunlop & Talalay Botanical Latex",
      description: "Crafted entirely from sustainably tapped rubber trees, this 100% natural latex mattress offers buoyancy, natural temperature regulation, and zero chemical off-gassing.",
      specifications: {
        "Core Support": "7-Zone Botanical Dunlop Latex Core",
        "Comfort Layer": "Ultra-Breathable Talalay Cushion Top",
        "Cover Fabric": "GOTS-Certified Organic Cotton & Wool",
        "Total Height": "13 Inches (33 cm)",
        "Trial Period": "100 Nights Risk-Free",
        "Warranty": "20-Year Lifetime Guarantee"
      }
    },
    {
      id: "mat-3",
      name: "Somnum Zero-Gravity Memory Foam",
      category: "Memory Foam",
      type: "Mattress",
      price: 1490,
      originalPrice: 1750,
      rating: 4.8,
      reviewCount: 275,
      badge: "Cooling Gel",
      badgeClass: "badge-gold",
      firmnessScore: 6.0,
      firmnessLabel: "Adaptive Contour (6.0/10)",
      sizes: ["Single", "Double", "Queen", "King"],
      defaultSize: "Queen",
      image: "assets/images/hero_main.jpg",
      gallery: [
        "assets/images/hero_main.jpg",
        "assets/images/hero_editorial.jpg",
        "assets/images/anatomy_cutaway.jpg"
      ],
      tagline: "Phase-Change Graphite & Gel Cooling Foam",
      description: "Engineered with open-cell memory foam infused with cooling graphite crystals to absorb excess body heat while delivering deep contouring pressure relief.",
      specifications: {
        "Core Support": "High-Density Ortho-Base Foam",
        "Comfort Layer": "Open-Cell Graphite Cooling Gel Foam",
        "Cover Fabric": "Hydro-Cool Phase Change Knit",
        "Total Height": "12 Inches (30 cm)",
        "Trial Period": "100 Nights Risk-Free",
        "Warranty": "10-Year Full Warranty"
      }
    },
    {
      id: "mat-4",
      name: "Orthocare Spinal Rest Luxe",
      category: "Orthopaedic",
      type: "Mattress",
      price: 1980,
      originalPrice: 2350,
      rating: 4.9,
      reviewCount: 410,
      badge: "Doctor Approved",
      badgeClass: "badge-gold",
      firmnessScore: 8.0,
      firmnessLabel: "Firm Ergonomic Support (8.0/10)",
      sizes: ["Single", "Double", "Queen", "King"],
      defaultSize: "King",
      image: "assets/images/Orthocare Spinal Rest Luxe.jpg",
      gallery: [
        "assets/images/Orthocare Spinal Rest Luxe.jpg",
        "assets/images/anatomy_cutaway.jpg",
        "assets/images/hero_editorial.jpg"
      ],
      tagline: "Clinical Lumbar Alignment & Reinforced Edge",
      description: "Designed in collaboration with orthopaedic chiropractors to alleviate lower back stiffness by providing calibrated spinal realignment and reinforced lumbar zones.",
      specifications: {
        "Core Support": "Reinforced 5-Zone Posture Spring System",
        "Comfort Layer": "High-Resilience Orthopaedic Transition Layer",
        "Cover Fabric": "Silver-Ion Antibacterial Bamboo Jacquard",
        "Total Height": "13.5 Inches (34 cm)",
        "Trial Period": "100 Nights Risk-Free",
        "Warranty": "15-Year Clinical Guarantee"
      }
    },
    // Pillows, Quilts, Bedding, Protectors & Accessories
    {
      id: "bed-1",
      name: "Royal Hungarian Goose Down Pillow",
      category: "Pillows",
      type: "Bedding",
      price: 165,
      originalPrice: 195,
      rating: 4.9,
      reviewCount: 154,
      badge: "800 Fill Power",
      badgeClass: "badge-gold",
      firmnessScore: 4.0,
      firmnessLabel: "Plush Loft (4.0/10)",
      sizes: ["Standard", "Queen", "King"],
      defaultSize: "Queen",
      image: "assets/images/Royal Hungarian Goose Down Pillow.jpg",
      gallery: ["assets/images/Royal Hungarian Goose Down Pillow.jpg"],
      tagline: "Triple-Chamber Hypoallergenic White Goose Down",
      description: "Indulge in ultra-lofty 800 fill power Hungarian white goose down surrounded by a 400 thread count organic sateen shell for weightless neck alignment.",
      specifications: {
        "Fill": "90% White Goose Down, 10% Micro-Feather",
        "Shell": "400 TC GOTS Organic Cotton Sateen",
        "Care": "Dry Clean or Gentle Machine Wash",
        "Warranty": "5-Year Guarantee"
      }
    },
    {
      id: "bed-2",
      name: "Champagne Mulberry Silk Duvet & Quilt",
      category: "Quilts & Comforters",
      type: "Bedding",
      price: 380,
      originalPrice: 450,
      rating: 5.0,
      reviewCount: 92,
      badge: "Grade 6A Silk",
      badgeClass: "badge-gold",
      firmnessScore: 5.0,
      firmnessLabel: "All-Season Weight",
      sizes: ["Single", "Double", "Queen", "King"],
      defaultSize: "King",
      image: "assets/images/bedding_pillows.jpg",
      gallery: ["assets/images/bedding_pillows.jpg"],
      tagline: "100% Long-Strand Mulberry Silk Infill",
      description: "Naturally hypoallergenic and breathable silk duvet that thermoregulates throughout all four seasons, wrapped in a champagne luster weave.",
      specifications: {
        "Fill": "100% Pure Long-Strand Grade 6A Silk",
        "Shell": "100% Long-Staple Egyptian Cotton Jacquard",
        "Weight": "All-Season 350 GSM",
        "Warranty": "10-Year Guarantee"
      }
    },
    {
      id: "bed-3",
      name: "Heritage French Flax Linen Bedding Set",
      category: "Bedding Sets",
      type: "Bedding",
      price: 290,
      originalPrice: 340,
      rating: 4.8,
      reviewCount: 204,
      badge: "Stone Washed",
      badgeClass: "badge-trial",
      firmnessScore: 5.0,
      firmnessLabel: "Soft Muted Texture",
      sizes: ["Double", "Queen", "King"],
      defaultSize: "Queen",
      image: "assets/images/Heritage French Flax Linen Bedding Set.jpg",
      gallery: ["assets/images/Heritage French Flax Linen Bedding Set.jpg"],
      tagline: "Pre-Washed Normandy Flax Linen 4-Piece Suite",
      description: "Woven from authentic French flax and garment-washed for supreme lived-in softness that grows softer with every wash. Includes duvet cover, fitted sheet, and 2 pillowcases.",
      specifications: {
        "Material": "100% Normandy Flax Linen (175 GSM)",
        "Includes": "1 Duvet Cover, 1 Fitted Sheet, 2 Shams",
        "Features": "Breathable, Anti-Static, Moisture-Wicking",
        "Warranty": "Lifetime Quality Promise"
      }
    },
    {
      id: "bed-4",
      name: "Cloud-Comfort Botanical Mattress Topper",
      category: "Protectors & Toppers",
      type: "Bedding",
      price: 240,
      originalPrice: 290,
      rating: 4.9,
      reviewCount: 178,
      badge: "3-Inch Plush",
      badgeClass: "badge-gold",
      firmnessScore: 4.5,
      firmnessLabel: "Plush Softener (4.5/10)",
      sizes: ["Single", "Double", "Queen", "King"],
      defaultSize: "Queen",
      image: "assets/images/Cloud-Comfort Botanical Mattress Topper.jpg",
      gallery: ["assets/images/Cloud-Comfort Botanical Mattress Topper.jpg"],
      tagline: "Instant Luxury Mattress Rejuvenation",
      description: "Transform any mattress into a 5-star hotel cloud with 3 inches of aerated natural latex micro-cushions and organic wool lining.",
      specifications: {
        "Thickness": "3.0 Inches (7.6 cm)",
        "Fill": "100% Aerated Natural Latex",
        "Cover": "Removable Washable Organic Cotton Cover",
        "Warranty": "5-Year Guarantee"
      }
    },
    {
      id: "bed-5",
      name: "Aroma Silk Sleep Mask & Lavender Mist",
      category: "Bedding Accessories",
      type: "Bedding",
      price: 65,
      originalPrice: 85,
      rating: 4.9,
      reviewCount: 88,
      badge: "Gift Set",
      badgeClass: "badge-gold",
      firmnessScore: 5.0,
      firmnessLabel: "Sleep Ritual",
      sizes: ["One Size"],
      defaultSize: "One Size",
      image: "assets/images/Aroma Silk Sleep Mask & Lavender Mist.jpg",
      gallery: ["assets/images/Aroma Silk Sleep Mask & Lavender Mist.jpg"],
      tagline: "22 Momme Silk Mask with French Lavender Pillow Mist",
      description: "The quintessential bedtime ritual gift set designed to block 100% of light while soothing sensory pathways into deep alpha-wave sleep.",
      specifications: {
        "Mask": "100% 22 Momme Pure Mulberry Silk",
        "Mist": "50ml Organic French Lavender & Roman Chamomile",
        "Certification": "OEKO-TEX Standard 100 Certified"
      }
    }
  ],

  // Blog / Sleep Journal Articles
  articles: [
    {
      id: "post-1",
      title: "The Biomechanics of Restorative Sleep: How Spine Alignment Impacts REM Cycles",
      category: "Sleep Science",
      readTime: "6 min read",
      date: "August 24, 2026",
      image: "assets/images/hero_main.jpg",
      author: "Dr. Alistair Vance",
      authorRole: "Director of Biomechanics & Ergonomics • COMFORA",
      authorAvatar: "assets/images/craftsmanship.jpg",
      authorBio: "Dr. Vance is a clinical ergonomics researcher and consultant to European sleep laboratories, authoring over 20 peer-reviewed papers on nocturnal spinal biomechanics.",
      snippet: "Discover why neutral spine alignment during sleep prevents micro-awakenings and allows the nervous system to achieve prolonged restorative deep sleep phases.",
      lead: "Human sleep architecture is intrinsically tethered to physical ergonomics. Recent polysomnography trials demonstrate that maintaining true vertebral decompression directly reduces nocturnal micro-arousals by up to 38%, fundamentally transforming restorative delta-wave sleep.",
      sections: [
        {
          heading: "1. The Lumbar Lordosis Equilibrium",
          body: "When recumbent, the human spine does not naturally form a flat plane. The lumbar lordosis curve demands gentle upward buoyant resistance, while the broader thoracic cage and pelvis require progressive sinkage to prevent rotational torque on intervertebral discs. Traditional single-density mattresses force the heavier pelvis upward or let the lumbar arch hammock unsupported, inducing muscular guarding that prevents stage-4 slow-wave sleep."
        },
        {
          heading: "2. Capillary Occlusion & Micro-Awakenings",
          body: "When mattress surface pressure exceeds 32 mmHg (the standard capillary closing pressure of human dermis), local blood perfusion is restricted at bony landmarks. The brain responds to ischemic tissue discomfort by triggering subconscious positional shifts 40 to 60 times each night. By contrast, a zoned botanical latex and pocket coil mattress distributes contact pressure below 22 mmHg, reducing toss-and-turn frequency to fewer than 12 times per sleep cycle."
        },
        {
          heading: "3. Nocturnal Thermoregulation & Microclimate",
          body: "Sleep onset is biologically triggered by a 1.0°C drop in core body temperature. Closed-cell synthetic memory foams often trap conductive heat, elevating skin temperature and causing nocturnal sleep fragmentation. Utilizing open-cell botanical latex with natural French flax linen and long-strand mulberry silk covers wicks humidity away, maintaining an optimal 18.5°C skin boundary."
        }
      ],
      callout: {
        title: "Clinical Observation: The 0° Vertebral Neutrality",
        text: "Biomechanical sensors demonstrate that a 7-zone progressive support core maintains 0° cervical-thoracic deviation across both lateral and supine sleeping postures, preventing morning stiffness and occipital tension."
      },
      quote: "A truly restorative mattress should be imperceptible beneath you. You should feel neither hard resistance nor suffocating sinkage—only a buoyant, weightless equilibrium."
    },
    {
      id: "post-2",
      title: "Hybrid vs Natural Latex vs Memory Foam: The Connoisseur's Buying Guide",
      category: "Buying Guide",
      readTime: "8 min read",
      date: "August 18, 2026",
      image: "assets/images/hero_editorial.jpg",
      author: "Elena Rostova",
      authorRole: "Master Bedding Artisan & Materials Director",
      authorAvatar: "assets/images/craftsmanship.jpg",
      authorBio: "Elena has spent over 22 years specializing in natural latex vulcanization, pocket coil heat treatment, and organic textile weaving across Europe.",
      snippet: "An exhaustive comparison analyzing heat dissipation, motion isolation, pressure mapping, and organic longevity across all 3 luxury mattress builds.",
      lead: "Selecting a bespoke mattress is an investment in human health. Understanding the physics, thermal dynamics, and mechanical lifespans of modern hybrid springs, botanical latex, and contouring memory foam empowers you to curate your ideal sleep sanctuary.",
      sections: [
        {
          heading: "1. The Dynamic Buoyancy of Pocket Spring Hybrids",
          body: "Individually nested titanium pocket coils offer dynamic pushback that responds instantaneously to body movement. Because each spring acts as an autonomous damper, airflow through the mattress core remains uninhibited, ensuring superior thermal dissipation for warm sleepers."
        },
        {
          heading: "2. The Pure Provenance of Botanical Dunlop Latex",
          body: "Harvested from organic rubber trees, botanical latex delivers a distinctive floating sensation with natural antimicrobial, dust-mite resistant, and hypoallergenic properties. Unlike petroleum-derived foams that degrade after 5 to 7 years, vulcanized latex retains 96% of its tensile elasticity for over two decades."
        },
        {
          heading: "3. Pressure-Relieving Visco-Elastic Memory Foam",
          body: "For individuals suffering from acute joint stiffness or chronic sciatica, open-cell memory foam yields zero-point motion transfer and deep contouring around delicate pressure points, eliminating partner disturbance entirely."
        }
      ],
      callout: {
        title: "Studio Recommendation: Match Your Primary Need",
        text: "Choose Pocket Spring Hybrids for active buoyancy and maximum cooling, Botanical Latex for pure eco-longevity and buoyant bounce, and Memory Foam for total motion isolation and joint envelopment."
      },
      quote: "The mattress is the single piece of furniture that shapes one-third of your entire life. Never settle for synthetic compromises when natural purity exists."
    },
    {
      id: "post-3",
      title: "The Definitive Firmness Scale: Choosing the Ideal Support for Side, Back & Stomach Sleepers",
      category: "Firmness Guide",
      readTime: "5 min read",
      date: "August 12, 2026",
      image: "assets/images/anatomy_cutaway.jpg",
      author: "Marcus Chen, D.C.",
      authorRole: "Senior Chiropractic Consultant",
      authorAvatar: "assets/images/craftsmanship.jpg",
      authorBio: "Marcus is an orthopaedic posture specialist who works closely with our workshop to calibrate multi-zoned firmness gradations for optimal spinal recovery.",
      snippet: "Understand the universal 1-to-10 firmness index and determine exactly which firmness index matches your anatomical posture and body weight.",
      lead: "Firmness is not a measure of support; it is a measure of surface compliance. A mattress can be plush on top while providing rigorous underlying orthopaedic support.",
      sections: [
        {
          heading: "1. Side Sleepers (Firmness Index 4.5 – 6.0)",
          body: "Side sleepers require deeper contouring under the prominent hips and shoulders. A medium-plush firmness allows these wider points to sink comfortably, ensuring the spine remains completely straight from neck to tailbone."
        },
        {
          heading: "2. Back Sleepers (Firmness Index 6.0 – 7.5)",
          body: "Back sleepers need balanced support that prevents the pelvis from dipping too far into the mattress, which can cause painful lumbar hyperextension during 8 hours of sleep."
        },
        {
          heading: "3. Stomach & Combination Sleepers (Firmness Index 7.5 – 8.5)",
          body: "Stomach sleepers require a firmer planar surface to keep the hips level with the chest, protecting the cervical vertebrae and lower lumbar spine from unnatural curvature."
        }
      ],
      callout: {
        title: "The 100-Night Break-In Period",
        text: "Your postural muscles take approximately 3 to 4 weeks to unlearn compensatory habits from an old sagging mattress. Our 100-night trial ensures you have ample time to experience true adaptation."
      },
      quote: "Proper mattress firmness is the difference between waking with restorative energy or battling morning lumbar rigidity."
    },
    {
      id: "post-4",
      title: "Caring for French Flax Linen & Mulberry Silk: Washing, Drying & Longevity Secrets",
      category: "Bedding Care",
      readTime: "4 min read",
      date: "August 05, 2026",
      image: "assets/images/bedding_pillows.jpg",
      author: "Sophie Laurent",
      authorRole: "Textile Curator & Master Weaver",
      authorAvatar: "assets/images/craftsmanship.jpg",
      authorBio: "Sophie oversees COMFORA's bespoke textile sourcing in Normandy and Lyon, specializing in heirloom grade 6A silk and flax linen.",
      snippet: "Learn the proper pH-neutral detergents, temperature thresholds, and seasonal rotation methods to keep your luxury bedding silky for decades.",
      lead: "Heirloom natural bedding becomes softer and more luxurious with age when cared for properly. Discover the timeless methods to maintain your silk and linen investments.",
      sections: [
        {
          heading: "1. The Natural Breathability of French Flax Linen",
          body: "Flax fibers contain natural pectins that soften with every wash. Always launder linen in cool or lukewarm water with mild liquid detergent. Tumble dry on low heat or hang outdoors in gentle breeze."
        },
        {
          heading: "2. Preserving Mulberry Silk Fibers",
          body: "Mulberry silk is composed of protein fibers similar to human hair. Never expose silk to harsh bleaches, enzyme-based detergents, or direct high-heat dryers. Spot clean or hand wash with pH-neutral silk wash."
        },
        {
          heading: "3. Seasonal Airing for Down Pillows & Duvets",
          body: "Air your Hungarian down duvet outdoors in indirect morning sunlight once per season. The fresh breeze naturally restores cluster loft and dissipates nocturnal humidity without dry cleaning chemicals."
        }
      ],
      callout: {
        title: "Pro Care Rule: Avoid Chemical Fabric Softeners",
        text: "Synthetic fabric softeners deposit a waxy silicone coating on natural fibers, destroying their inherent moisture-wicking and thermoregulating properties."
      },
      quote: "True luxury is tactile. When treated with respect, organic bedding endures as an heirloom for generations."
    },
    {
      id: "post-5",
      title: "Why Hand-Tufted Rosettes Outperform Modern Glued Assembly in Mattress Longevity",
      category: "Craftsmanship",
      readTime: "7 min read",
      date: "July 28, 2026",
      image: "assets/images/craftsmanship.jpg",
      author: "Henri Dubois",
      authorRole: "Head Studio Craftsman",
      authorAvatar: "assets/images/craftsmanship.jpg",
      authorBio: "Henri represents the third generation of master mattress builders, handcrafting bespoke luxury sleep systems for over three decades.",
      snippet: "Step inside our European workshop to explore the century-old discipline of internal wool rosettes that prevent sagging without toxic chemical adhesives.",
      lead: "Modern industrial mattress factories rely on synthetic chemical spray glues to bind layers. At COMFORA, we preserve the traditional artisanal craft of hand-tufting.",
      sections: [
        {
          heading: "1. The Physical Compression of Tufting Needles",
          body: "Hand-tufting involves driving 14-inch steel needles straight through the entire mattress sandwich, compressing natural latex, cashmere, and pocket coils under thousands of pounds of pressure before securing with pure wool rosettes."
        },
        {
          heading: "2. Zero VOC Off-Gassing Purity",
          body: "Because we use no adhesives between our upholstery layers, your bedroom air remains completely free of volatile organic compounds, formaldehyde, and chemical odors."
        },
        {
          heading: "3. Preventing Layer Shifting & Premature Sagging",
          body: "Glued foams inevitably shear and delaminate over years of mechanical compression. Hand-tufting locks all components in permanent tension, guaranteeing that your mattress retains its tailored shape for decades."
        }
      ],
      callout: {
        title: "The Artisanal Signature",
        text: "Each COMFORA mattress requires over 4 hours of individual hand craftsmanship by a certified master tufter, verified by an individual numbered workshop certificate."
      },
      quote: "Craftsmanship cannot be rushed on an automated assembly line. Real comfort is built stitch by stitch with human hands."
    },
    {
      id: "post-6",
      title: "Optimizing Your Bedroom Microclimate: Temperature, Humidity & Airflow for Deep Sleep",
      category: "Sleep Health",
      readTime: "5 min read",
      date: "July 20, 2026",
      image: "assets/images/hero_main.jpg",
      author: "Dr. Alistair Vance",
      authorRole: "Director of Biomechanics & Ergonomics • COMFORA",
      authorAvatar: "assets/images/craftsmanship.jpg",
      authorBio: "Dr. Vance is a clinical ergonomics researcher and consultant to European sleep laboratories, authoring over 20 peer-reviewed papers on nocturnal spinal biomechanics.",
      snippet: "Science proves that keeping bedroom ambient temperature at 18.5°C with natural breathable fabrics boosts human growth hormone release by 24%.",
      lead: "Your bedroom is an environmental sanctuary. Optimizing atmospheric temperature, humidity levels, and air purity is the cornerstone of uninterrupted delta-wave sleep.",
      sections: [
        {
          heading: "1. The 18.5°C (65°F) Thermal Threshold",
          body: "The human circadian clock relies on nocturnal vasodilation to lower core temperature by 1°C. An ambient bedroom temperature of 18.5°C facilitates this thermal drop without causing cold shivering."
        },
        {
          heading: "2. Relative Humidity & Respiratory Ease",
          body: "Maintaining bedroom humidity between 40% and 50% prevents nocturnal airway dehydration. Pairing breathable wool and linen prevents clamminess during summer and retains dry insulation during winter."
        },
        {
          heading: "3. Non-Toxic Air Quality & Zero VOCs",
          body: "Volatile organic compounds from synthetic mattresses irritate nasal passages and induce micro-awakenings. OEKO-TEX Class 1 certified botanical materials ensure pristine nocturnal breathing."
        }
      ],
      callout: {
        title: "Nightly Routine Protocol",
        text: "Dim bedroom lighting 60 minutes before bedtime, ventilate room with fresh air, and ensure your sleep surface utilizes 100% natural breathable fibers."
      },
      quote: "Deep sleep is a biological ceremony. When you harmonize your physical environment with human physiology, rejuvenation becomes effortless."
    }
  ],

  // Showrooms & Contact Locations
  showrooms: [
    {
      id: "ny-soho",
      city: "New York",
      name: "SoHo Flagship Showroom",
      address: "482 West Broadway, SoHo, NY 10012",
      phone: "+1 (212) 555-8920",
      email: "soho@auraluna-sleep.com",
      hours: "Mon - Sat: 10:00 AM - 7:00 PM | Sun: 11:00 AM - 6:00 PM",
      features: "Private Sleep Suites, Champagne Bar, Ergonomic Analysis"
    },
    {
      id: "london-mayfair",
      city: "London",
      name: "Mayfair Sanctuary Showroom",
      address: "14 Mount Street, Mayfair, London W1K 2RF",
      phone: "+44 (0) 20 7946 0912",
      email: "mayfair@auraluna-sleep.com",
      hours: "Mon - Sat: 10:00 AM - 6:30 PM | Sun: 12:00 PM - 5:00 PM",
      features: "Bespoke Mattress Tailoring, Silk Loom Gallery, Concierge"
    },
    {
      id: "sydney-paddington",
      city: "Sydney",
      name: "Paddington Studio",
      address: "128 Oxford Street, Paddington NSW 2021",
      phone: "+61 (2) 9331 4450",
      email: "sydney@auraluna-sleep.com",
      hours: "Mon - Sat: 9:30 AM - 5:30 PM | Sun: 11:00 AM - 4:00 PM",
      features: "Natural Latex Testing Room, Linen Studio"
    }
  ]
};
