/**
 * AURA LUNA LUXURY SLEEP STUDIO - GLOBAL SCRIPTS & INTERACTION ENGINE
 */

/* 1. Theme & RTL Controller Engine */
window.AuraTheme = (function () {
  const THEME_KEY = "auraluna_theme_v1";
  const DIR_KEY = "auraluna_dir_v1";

  function init() {
    // 1. Load persisted theme
    const savedTheme = localStorage.getItem(THEME_KEY) || "light";
    setTheme(savedTheme, false);

    // 2. Load persisted direction
    const savedDir = localStorage.getItem(DIR_KEY) || "ltr";
    setDirection(savedDir, false);

    // 3. Remove any existing floating toolbar if present
    const existingToolbar = document.querySelector(".aura-floating-toolbar");
    if (existingToolbar) existingToolbar.remove();

    // 4. Update icons/text
    updateToggleUI();
  }

  function setTheme(theme, notify = true) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleUI();
    if (notify && window.AuraCart) {
      window.AuraCart.showToast(
        theme === "dark" ? "Dark Mode Active" : "Light Mode Active",
        `Switched to ${theme} ambiance.`,
        "info"
      );
    }
  }

  function toggleTheme(e) {
    if (e && e.preventDefault) e.preventDefault();
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next, true);
  }

  function setDirection(dir, notify = true) {
    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem(DIR_KEY, dir);
    updateToggleUI();
    if (notify && window.AuraCart) {
      window.AuraCart.showToast(
        dir === "rtl" ? "RTL Layout Active" : "LTR Layout Active",
        `Layout aligned for ${dir.toUpperCase()} reading.`,
        "info"
      );
    }
  }

  function toggleRTL(e) {
    if (e && e.preventDefault) e.preventDefault();
    const current = document.documentElement.getAttribute("dir") || "ltr";
    const next = current === "rtl" ? "ltr" : "rtl";
    setDirection(next, true);
  }

  function updateToggleUI() {
    const theme = document.documentElement.getAttribute("data-theme") || "light";
    const dir = document.documentElement.getAttribute("dir") || "ltr";

    // Update header toggle buttons
    document.querySelectorAll(".header-theme-toggle").forEach(btn => {
      btn.innerHTML = theme === "dark"
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
      btn.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
    });

    document.querySelectorAll(".header-rtl-toggle").forEach(btn => {
      btn.textContent = dir === "rtl" ? "LTR" : "RTL";
      btn.setAttribute("title", dir === "rtl" ? "Switch to LTR" : "Switch to RTL");
    });
  }

  return {
    init,
    toggleTheme,
    toggleRTL,
    setTheme,
    setDirection
  };
})();

// Immediately apply theme & direction to prevent screen flash
(function() {
  const t = localStorage.getItem("auraluna_theme_v1") || "light";
  const d = localStorage.getItem("auraluna_dir_v1") || "ltr";
  document.documentElement.setAttribute("data-theme", t);
  document.documentElement.setAttribute("dir", d);
})();

/* 2. Sleep Health Science Interactive Controller */
window.AuraScience = (function () {
  const modes = {
    spine: {
      modeText: "Mode: 7-Zone Spine Decompression",
      focusMarker: "marker-lumbar"
    },
    thermal: {
      modeText: "Mode: 18.5°C Graphitic Microclimate",
      focusMarker: "marker-cervical"
    },
    motion: {
      modeText: "Mode: Titanium Pocket Dampening",
      focusMarker: "marker-coils"
    },
    purity: {
      modeText: "Mode: 100% Bio-Certified Purity",
      focusMarker: null
    }
  };

  function selectCard(cardElement, key) {
    if (!cardElement) return;

    // Toggle active card
    document.querySelectorAll(".science-feature-card").forEach(card => {
      card.classList.remove("active");
      const indicator = card.querySelector(".science-status-indicator");
      if (indicator) indicator.textContent = "Explore ➔";
    });

    cardElement.classList.add("active");
    const activeIndicator = cardElement.querySelector(".science-status-indicator");
    if (activeIndicator) activeIndicator.textContent = "Active Focus ➔";

    // Update telemetry mode text
    const modeTextEl = document.getElementById("scienceCurrentModeText");
    const data = modes[key] || modes.spine;
    if (modeTextEl) {
      modeTextEl.textContent = data.modeText;
    }

    // Highlight marker
    document.querySelectorAll(".science-marker").forEach(m => m.classList.remove("highlighted"));
    if (data.focusMarker) {
      const marker = document.querySelector(`.${data.focusMarker}`);
      if (marker) marker.classList.add("highlighted");
    }
  }

  return {
    selectCard
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  AuraTheme.init();
  initStickyHeader();
  initMobileDrawer();
  initGlobalSearchModal();
  initMattressAnatomyExplorer();
  initFaqAccordions();
  initCountdownTimer();
  initShowroomExplorer();
});

/* 1. Header (Static Positioning) */
function initStickyHeader() {
  // Static navbar: stays at top without scrolling or jumping
}

/* 2. Mobile Drawer Navigation */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileDrawer = document.getElementById("mobileNavDrawer");
  const mobileBackdrop = document.getElementById("mobileNavBackdrop");
  const closeBtn = document.getElementById("mobileNavClose");

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add("open");
    if (mobileBackdrop) mobileBackdrop.classList.add("open");
    if (hamburgerBtn) hamburgerBtn.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove("open");
    if (mobileBackdrop) mobileBackdrop.classList.remove("open");
    if (hamburgerBtn) hamburgerBtn.classList.remove("active");
    document.body.style.overflow = "";
  }

  function toggleDrawer(e) {
    if (e) e.preventDefault();
    if (mobileDrawer && mobileDrawer.classList.contains("open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", toggleDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener("click", closeDrawer);

  // Close drawer when clicking nav links that jump to anchors
  document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });
}

/* 3. Global Quick Search Modal */
function initGlobalSearchModal() {
  const modal = document.getElementById("searchModal");
  const searchTriggers = document.querySelectorAll(".open-search-modal");
  const closeBtn = document.getElementById("searchModalClose");
  const searchInput = document.getElementById("globalSearchInput");
  const resultsContainer = document.getElementById("globalSearchResults");

  if (!modal) return;

  function openModal() {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 150);
    }
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  searchTriggers.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (searchInput && resultsContainer) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length === 0) {
        resultsContainer.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.9rem;">
            Search for mattresses (e.g. "Hybrid", "Latex", "Orthopaedic") or bedding (e.g. "Silk", "Pillows").
          </div>
        `;
        return;
      }

      const matchingProducts = (AURA_DATA.products || []).filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );

      const matchingArticles = (AURA_DATA.articles || []).filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.category.toLowerCase().includes(q)
      );

      if (matchingProducts.length === 0 && matchingArticles.length === 0) {
        resultsContainer.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.9rem;">
            No results found for "<strong>${q}</strong>".
          </div>
        `;
        return;
      }

      let html = "";
      if (matchingProducts.length > 0) {
        html += `<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-bronze); margin-bottom: 0.5rem;">Products & Mattresses (${matchingProducts.length})</div>`;
        html += matchingProducts.map(p => `
          <div class="search-result-item" onclick="if(window.AuraProducts){AuraProducts.openQuickView('${p.id}');} else {window.location.href='products.html';}">
            <img src="${p.image}" alt="${p.name}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;">
            <div style="flex-grow: 1;">
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); font-family: var(--font-serif);">${p.name}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${p.category} • $${p.price.toLocaleString()}</div>
            </div>
            <span class="btn btn-primary btn-sm" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;">View</span>
          </div>
        `).join("");
      }

      if (matchingArticles.length > 0) {
        html += `<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-bronze); margin-top: 1rem; margin-bottom: 0.5rem;">Sleep Journal Articles (${matchingArticles.length})</div>`;
        html += matchingArticles.map(a => `
          <a href="blog.html" class="search-result-item">
            <div style="flex-grow: 1;">
              <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary);">${a.title}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${a.category} • ${a.readTime}</div>
            </div>
            <span style="color: var(--accent-gold); font-size: 0.8rem;">Read →</span>
          </a>
        `).join("");
      }

      resultsContainer.innerHTML = html;
    });
  }
}

/* 4. 5-Layer Interactive Mattress Anatomy Explorer */
const AuraAnatomy = (function () {
  const layersData = [
    {
      num: "01",
      badge: "Layer 1 of 5 • Surface Comfort",
      title: "Organic Cashmere & Belgian Damask Top",
      desc: "Hand-quilted with pure organic wool and natural cashmere rosettes. Naturally wicks moisture, dissipates heat, and creates a soft, cloud-like initial touch with zero synthetic chemicals.",
      spec1: "1.5 Inches", label1: "Thickness",
      spec2: "OEKO-TEX", label2: "Certified",
      spec3: "100% Organic", label3: "Material"
    },
    {
      num: "02",
      badge: "Layer 2 of 5 • Thermoregulation",
      title: "Ventilated Gel Memory Cooling Foam",
      desc: "Engineered with open-cell memory foam infused with liquid gel beads and phase-change graphite. Absorbs and redirects excess thermal body heat away from the body 3x faster than standard memory foam.",
      spec1: "2.0 Inches", label1: "Thickness",
      spec2: "CertiPUR-US", label2: "Standard",
      spec3: "Phase Change", label3: "Cooling Tech"
    },
    {
      num: "03",
      badge: "Layer 3 of 5 • Pressure Relief",
      title: "Natural Botanical Latex Transition",
      desc: "100% GOLS-certified organic latex sustainably harvested from Hevea Brasiliensis rubber trees. Offers resilient, responsive bounce that gently cradles pressure points at the shoulders and hips.",
      spec1: "2.5 Inches", label1: "Thickness",
      spec2: "GOLS Certified", label2: "Latex Core",
      spec3: "Hypoallergenic", label3: "Purity"
    },
    {
      num: "04",
      badge: "Layer 4 of 5 • Dynamic Spinal Support",
      title: "1,600 Pocketed Titanium Micro-Coils",
      desc: "7-Zone individually encased tempered titanium coils that articulate independently to contour to your spine's natural curve while isolating 99.8% of partner motion transfer.",
      spec1: "8.0 Inches", label1: "Coil Height",
      spec2: "1,600 Coils", label2: "Nested Count",
      spec3: "7 Ergonomic", label3: "Support Zones"
    },
    {
      num: "05",
      badge: "Layer 5 of 5 • Structural Foundation",
      title: "High-Density Ortho-Base Foundation",
      desc: "Reinforced high-resilience base foam provides structural integrity, edge-to-edge support perimeter reinforcement, and guarantees no sagging over 15 to 20 years of daily use.",
      spec1: "2.5 Inches", label1: "Base Density",
      spec2: "Non-Sagging", label2: "Core Guarantee",
      spec3: "15-Yr Non-Prorated", label3: "Warranty"
    }
  ];

  let currentIdx = 0;

  function selectLayer(idx) {
    if (idx < 0) idx = layersData.length - 1;
    if (idx >= layersData.length) idx = 0;
    currentIdx = idx;

    const data = layersData[currentIdx];

    // Update active tab buttons
    document.querySelectorAll(".anatomy-tab-btn").forEach((btn, i) => {
      if (i === currentIdx) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update Spotlight content
    const numEl = document.getElementById("spotlightNum");
    const badgeEl = document.getElementById("spotlightBadge");
    const titleEl = document.getElementById("spotlightTitle");
    const descEl = document.getElementById("spotlightDesc");
    const s1 = document.getElementById("spotlightSpec1");
    const l1 = document.getElementById("spotlightLabel1");
    const s2 = document.getElementById("spotlightSpec2");
    const l2 = document.getElementById("spotlightLabel2");
    const s3 = document.getElementById("spotlightSpec3");
    const l3 = document.getElementById("spotlightLabel3");

    if (numEl) numEl.textContent = data.num;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (s1) s1.textContent = data.spec1;
    if (l1) l1.textContent = data.label1;
    if (s2) s2.textContent = data.spec2;
    if (l2) l2.textContent = data.label2;
    if (s3) s3.textContent = data.spec3;
    if (l3) l3.textContent = data.label3;
  }

  function nextLayer() {
    selectLayer(currentIdx + 1);
  }

  function prevLayer() {
    selectLayer(currentIdx - 1);
  }

  return {
    selectLayer,
    nextLayer,
    prevLayer
  };
})();

function initMattressAnatomyExplorer() {
  // Initialized with AuraAnatomy
}

/* 5. FAQ Accordions */
function initFaqAccordions() {
  const accordionItems = document.querySelectorAll(".accordion-item");
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector(".accordion-header");
    const body = item.querySelector(".accordion-body");

    if (header && body) {
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close other items in the same container
        const parent = item.closest(".accordion-list");
        if (parent) {
          parent.querySelectorAll(".accordion-item").forEach(other => {
            other.classList.remove("active");
            const otherBody = other.querySelector(".accordion-body");
            if (otherBody) otherBody.style.maxHeight = null;
          });
        }

        if (!isActive) {
          item.classList.add("active");
          body.style.maxHeight = body.scrollHeight + "px";
        } else {
          item.classList.remove("active");
          body.style.maxHeight = null;
        }
      });
    }
  });

  // Open the first FAQ by default if exists
  const firstItem = document.querySelector(".accordion-item");
  if (firstItem) {
    const firstHeader = firstItem.querySelector(".accordion-header");
    if (firstHeader) firstHeader.click();
  }
}

/* 6. Promotional Countdown Timer */
function initCountdownTimer() {
  const daysEl = document.getElementById("promoDays");
  const hoursEl = document.getElementById("promoHours");
  const minsEl = document.getElementById("promoMins");
  const secsEl = document.getElementById("promoSecs");

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Set target date 4 days from now
  const targetDate = new Date().getTime() + (4 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* 7. Flagship Showroom Explorer */
function initShowroomExplorer() {
  const wrapper = document.getElementById("showroomExplorer");
  if (!wrapper) return;

  const showrooms = {
    "soho": {
      tag: "Flagship Sanctuary • North America",
      title: "SoHo Flagship Studio",
      desc: "Located in the heart of Manhattan's Cast Iron Historic District, featuring four soundproof private sleep suites, our master silk & cashmere bedding atelier, and tailored spinal ergonomics consultations.",
      status: "Open Today • 10:00 AM – 7:00 PM",
      image: "assets/images/showroom_soho.jpg",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.630985223393!2d-74.00331008459461!3d40.72398597933018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598ea06225e3%3A0x7d6a50613dc033f7!2s482%20W%20Broadway%2C%20New%20York%2C%20NY%2010012!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
      mapUrl: "https://maps.google.com/?q=482+West+Broadway+New+York+NY+10012",
      address: "482 West Broadway, New York, NY 10012",
      transit: "Spring St (C, E) or Prince St (N, R, W) — 2 min walk",
      parking: "Complimentary Valet Parking on West Broadway",
      phone: "+1 (212) 555-8920",
      bookingVal: "ny-soho",
      amenities: [
        { icon: "suite", label: "4 Soundproof Sleep Suites" },
        { icon: "drink", label: "Champagne & Tea Lounge" },
        { icon: "spine", label: "Spinal Ergonomics Fitting" },
        { icon: "car", label: "Valet Parking on Arrival" }
      ],
      hotspots: [
        { top: "35%", left: "22%", title: "Acoustic Isolation Suite", desc: "Whisper-quiet room with precision climate control" },
        { top: "68%", left: "55%", title: "Hand-Tufted Master Bed", desc: "7-zone pocket spring & botanical latex system" },
        { top: "42%", left: "82%", title: "Cashmere & Silk Library", desc: "Touch organic mulberry silk & linen textiles" }
      ]
    },
    "london": {
      tag: "European Sanctuary • United Kingdom",
      title: "London Mayfair Sanctuary",
      desc: "Set within a historic Georgian townhouse on Mount Street, featuring our European sleep laboratory, private four-poster botanical suites, and bespoke cashmere tailoring atelier.",
      status: "Open Today • 10:00 AM – 6:30 PM",
      image: "assets/images/showroom_london.jpg",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.218520846288!2d-0.15347628422995393!3d51.50920477963574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876052dc98efb8b%3A0xb35a09e083c66f7f!2s14%20Mount%20St%2C%20London%20W1K%202RF!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk",
      mapUrl: "https://maps.google.com/?q=14+Mount+Street+Mayfair+London+W1K+2RF",
      address: "14 Mount Street, Mayfair, London W1K 2RF",
      transit: "Bond Street (Elizabeth, Jubilee, Central) — 5 min walk",
      parking: "Private Chauffeur Service on Request",
      phone: "+44 20 7946 0831",
      bookingVal: "london-mayfair",
      amenities: [
        { icon: "suite", label: "Georgian Sleep Chamber" },
        { icon: "drink", label: "Rare Herbal Infusion Bar" },
        { icon: "spine", label: "Master Tailoring Consultation" },
        { icon: "car", label: "Mayfair Chauffeur Service" }
      ],
      hotspots: [
        { top: "32%", left: "48%", title: "Four-Poster Sovereign Bed", desc: "Solid English oak bespoke canopy frame" },
        { top: "64%", left: "58%", title: "Organic Wool & Cashmere", desc: "Handcrafted natural thermal regulation layer" },
        { top: "48%", left: "18%", title: "Historic Fireplace Lounge", desc: "Private seating for unhurried sleep consultation" }
      ]
    },
    "sydney": {
      tag: "Pacific Sanctuary • Australia",
      title: "Paddington Sunlit Studio",
      desc: "Designed around natural coastal light and travertine architecture, showcasing our breathable botanical latex sleep systems, cooling gel matrices, and organic linen bedding collection.",
      status: "Open Today • 9:30 AM – 5:30 PM",
      image: "assets/images/showroom_sydney.jpg",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.392945207908!2d151.2223846763445!3d-33.88206197322116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae1e75525997%3A0xbca12a878931168f!2s128%20Oxford%20St%2C%20Paddington%20NSW%202021!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau",
      mapUrl: "https://maps.google.com/?q=128+Oxford+Street+Paddington+NSW+2021",
      address: "128 Oxford Street, Paddington NSW 2021",
      transit: "Edgecliff Station (T4 Line) — 7 min walk / Oxford St Buses",
      parking: "Reserved On-Site Customer Parking",
      phone: "+61 2 9380 4410",
      bookingVal: "sydney-paddington",
      amenities: [
        { icon: "suite", label: "Sunlit Travertine Suite" },
        { icon: "drink", label: "Botanical Tea & Refreshments" },
        { icon: "spine", label: "Zero-Pressure Latex Fitting" },
        { icon: "car", label: "Reserved On-Site Parking" }
      ],
      hotspots: [
        { top: "30%", left: "20%", title: "Botanical Courtyard", desc: "Open-air relaxation terrace with olive trees" },
        { top: "65%", left: "60%", title: "Botanical Latex Core", desc: "100% breathable organic sap cushioning" },
        { top: "45%", left: "82%", title: "Travertine Linen Gallery", desc: "Sensory touch display of pure washed linens" }
      ]
    }
  };

  const tabBtns = wrapper.querySelectorAll(".showroom-tab-btn");
  const mediaContainer = wrapper.querySelector(".showroom-media-container");
  const imgEl = wrapper.querySelector(".showroom-media-img");
  const mapFrame = wrapper.querySelector(".showroom-map-frame");
  const statusText = wrapper.querySelector(".showroom-status-text");
  const tagEl = wrapper.querySelector(".showroom-badge-tag-text");
  const titleEl = wrapper.querySelector(".showroom-title");
  const descEl = wrapper.querySelector(".showroom-description");
  const amenitiesList = wrapper.querySelector(".showroom-amenities-grid");
  const addressEl = wrapper.querySelector(".showroom-meta-address");
  const transitEl = wrapper.querySelector(".showroom-meta-transit");
  const parkingEl = wrapper.querySelector(".showroom-meta-parking");
  const phoneEl = wrapper.querySelector(".showroom-meta-phone");
  const phoneLink = wrapper.querySelector(".showroom-meta-phone-link");
  const gmapLink = wrapper.querySelector(".showroom-gmap-link");
  const bookBtn = wrapper.querySelector(".showroom-book-trigger");
  const hotspotLayer = wrapper.querySelector(".showroom-hotspot-layer");
  const modePhotoBtn = wrapper.querySelector(".showroom-mode-photo");
  const modeMapBtn = wrapper.querySelector(".showroom-mode-map");

  let currentKey = "soho";

  function getAmenityIconSvg(type) {
    if (type === "suite") {
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`;
    } else if (type === "drink") {
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></svg>`;
    } else if (type === "spine") {
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
    } else {
      return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`;
    }
  }

  function renderShowroom(key) {
    const data = showrooms[key];
    if (!data) return;
    currentKey = key;

    // Update active tab button
    tabBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.city === key);
    });

    // Crossfade image & map
    if (imgEl) {
      imgEl.style.opacity = "0.2";
      setTimeout(() => {
        imgEl.src = data.image;
        imgEl.alt = `${data.title} Interior`;
        imgEl.style.opacity = "1";
      }, 150);
    }

    if (mapFrame) {
      mapFrame.src = data.mapSrc;
    }

    if (statusText) statusText.textContent = data.status;
    if (tagEl) tagEl.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (addressEl) addressEl.textContent = data.address;
    if (transitEl) transitEl.textContent = data.transit;
    if (parkingEl) parkingEl.textContent = data.parking;
    if (phoneEl) phoneEl.textContent = data.phone;
    if (phoneLink) phoneLink.href = `tel:${data.phone.replace(/[\s()-]/g, "")}`;
    if (gmapLink) gmapLink.href = data.mapUrl;

    // Render amenities
    if (amenitiesList) {
      amenitiesList.innerHTML = data.amenities.map(a => `
        <div class="showroom-amenity-item">
          <div class="showroom-amenity-icon">${getAmenityIconSvg(a.icon)}</div>
          <span>${a.label}</span>
        </div>
      `).join("");
    }

    // Render hotspots
    if (hotspotLayer) {
      hotspotLayer.innerHTML = data.hotspots.map(h => `
        <div class="showroom-hotspot" style="top: ${h.top}; left: ${h.left};" tabindex="0">
          <div class="hotspot-beacon">
            <div class="hotspot-core"></div>
          </div>
          <div class="hotspot-tooltip">
            <div class="hotspot-tooltip-title">${h.title}</div>
            <div class="hotspot-tooltip-desc">${h.desc}</div>
          </div>
        </div>
      `).join("");
    }
  }

  // Bind tab clicks
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      renderShowroom(btn.dataset.city);
    });
  });

  // Photo / Map Mode Switcher
  if (modePhotoBtn && modeMapBtn && mediaContainer) {
    modePhotoBtn.addEventListener("click", () => {
      modePhotoBtn.classList.add("active");
      modeMapBtn.classList.remove("active");
      mediaContainer.classList.remove("map-mode-active");
    });

    modeMapBtn.addEventListener("click", () => {
      modeMapBtn.classList.add("active");
      modePhotoBtn.classList.remove("active");
      mediaContainer.classList.add("map-mode-active");
    });
  }

  // Preselect showroom in booking form on click
  if (bookBtn) {
    bookBtn.addEventListener("click", (e) => {
      const showroomSelect = document.getElementById("bookingShowroom");
      const data = showrooms[currentKey];
      if (showroomSelect && data) {
        showroomSelect.value = data.bookingVal;
      }
    });
  }

  // Global links with href="#showroomBookingSection" with specific buttons
  document.querySelectorAll('a[href="#showroomBookingSection"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const text = link.textContent.toLowerCase();
      const showroomSelect = document.getElementById("bookingShowroom");
      if (!showroomSelect) return;
      if (text.includes("soho") || text.includes("new york")) {
        showroomSelect.value = "ny-soho";
      } else if (text.includes("mayfair") || text.includes("london")) {
        showroomSelect.value = "london-mayfair";
      } else if (text.includes("sydney") || text.includes("paddington")) {
        showroomSelect.value = "sydney-paddington";
      }
    });
  });

  // Initial render
  renderShowroom("soho");
}



