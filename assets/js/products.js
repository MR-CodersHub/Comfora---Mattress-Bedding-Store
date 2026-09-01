/**
 * AURA LUNA LUXURY SLEEP STUDIO - PRODUCTS & CATALOG ENGINE
 */

const AuraProducts = (function () {
  let activeCategory = "All";
  let activeSize = "All";
  let activeSort = "featured";
  let searchQuery = "";

  function init() {
    renderProductGrid();
    bindFilters();
    bindQuickViewModal();
    renderComparisonTable();
  }

  function getFilteredProducts() {
    let list = [...AURA_DATA.products];

    // Filter by Category
    if (activeCategory !== "All") {
      list = list.filter(p => p.category === activeCategory);
    }

    // Filter by Size
    if (activeSize !== "All") {
      list = list.filter(p => p.sizes && p.sizes.includes(activeSize));
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (activeSort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (activeSort === "rating-desc") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }

  function renderProductGrid() {
    const grid = document.getElementById("productsCatalogGrid");
    const countEl = document.getElementById("productsCountDisplay");
    if (!grid) return;

    const products = getFilteredProducts();

    if (countEl) {
      countEl.textContent = `Showing ${products.length} luxury item${products.length === 1 ? '' : 's'}`;
    }

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 1rem auto;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 0.5rem;">No Matching Sleep Items Found</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Try adjusting your category or size filters to discover other bespoke mattresses.</p>
          <button class="btn btn-primary btn-sm" onclick="AuraProducts.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-card-media">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          
          <div class="product-badge-group">
            ${product.badge ? `<span class="product-badge ${product.badgeClass || ''}">${product.badge}</span>` : ''}
            ${product.originalPrice ? `<span class="product-badge badge-discount">Save $${product.originalPrice - product.price}</span>` : ''}
          </div>

          <div class="product-card-actions">
            <button class="card-action-btn" data-wishlist-id="${product.id}" onclick="AuraCart.toggleWishlist('${product.id}')" title="Save to Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>

          <div class="quick-view-overlay">
            <button class="btn btn-secondary btn-sm" onclick="AuraProducts.openQuickView('${product.id}')">Quick View</button>
          </div>
        </div>

        <div class="product-card-body">
          <div class="product-category-meta">
            <span>${product.category}</span>
            <div class="product-rating">
              ★ ${product.rating.toFixed(1)} <span>(${product.reviewCount})</span>
            </div>
          </div>

          <h3 class="product-card-title">
            <a href="javascript:void(0)" onclick="AuraProducts.openQuickView('${product.id}')">${product.name}</a>
          </h3>

          <p class="product-card-desc">${product.tagline || product.description}</p>

          ${product.firmnessLabel ? `
            <div class="product-firmness">
              <div class="firmness-header">
                <span>Firmness Profile:</span>
                <span class="firmness-score">${product.firmnessLabel}</span>
              </div>
              <div class="firmness-track">
                <div class="firmness-bar" style="width: ${(product.firmnessScore / 10) * 100}%"></div>
              </div>
            </div>
          ` : ''}

          <div class="product-sizes-picker">
            ${product.sizes.map((s, idx) => `
              <button class="size-pill-btn ${idx === 0 ? 'active' : ''}" onclick="AuraProducts.selectCardSize(this, '${product.id}', '${s}')">${s}</button>
            `).join('')}
          </div>

          <div class="product-card-footer">
            <div class="product-price-box">
              <span class="price-current">$${product.price.toLocaleString()}</span>
              ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toLocaleString()}</span>` : ''}
            </div>
            <button class="btn btn-primary card-add-cart-btn" onclick="AuraProducts.handleCardAddToCart('${product.id}')">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    `).join("");

    if (window.AuraCart) {
      AuraCart.syncWishlistButtons();
    }
  }

  function selectCardSize(btn, productId, size) {
    const card = btn.closest(".product-card");
    if (!card) return;
    card.querySelectorAll(".size-pill-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    card.setAttribute("data-selected-size", size);
  }

  function handleCardAddToCart(productId) {
    const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    const size = card && card.getAttribute("data-selected-size") ? card.getAttribute("data-selected-size") : "Queen";
    AuraCart.addToCart(productId, size, 1);
  }

  function bindFilters() {
    // Category pills
    document.querySelectorAll(".category-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".category-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.getAttribute("data-category");
        renderProductGrid();
      });
    });

    // Bed Size pills
    document.querySelectorAll(".size-filter-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".size-filter-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        activeSize = pill.getAttribute("data-size");
        renderProductGrid();
      });
    });

    // Sorting Dropdown
    const sortSelect = document.getElementById("catalogSortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        activeSort = e.target.value;
        renderProductGrid();
      });
    }

    // Search Input
    const searchInput = document.getElementById("catalogSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderProductGrid();
      });
    }
  }

  function resetFilters() {
    activeCategory = "All";
    activeSize = "All";
    activeSort = "featured";
    searchQuery = "";

    document.querySelectorAll(".category-filter-btn").forEach(b => b.classList.remove("active"));
    const allCatBtn = document.querySelector('.category-filter-btn[data-category="All"]');
    if (allCatBtn) allCatBtn.classList.add("active");

    document.querySelectorAll(".size-filter-pill").forEach(p => p.classList.remove("active"));
    const allSizePill = document.querySelector('.size-filter-pill[data-size="All"]');
    if (allSizePill) allSizePill.classList.add("active");

    const searchInput = document.getElementById("catalogSearchInput");
    if (searchInput) searchInput.value = "";

    const sortSelect = document.getElementById("catalogSortSelect");
    if (sortSelect) sortSelect.value = "featured";

    renderProductGrid();
  }

  function openQuickView(productId) {
    const product = AURA_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("quickViewModal");
    const container = document.getElementById("quickViewModalContent");
    if (!modal || !container) return;

    let selectedSize = product.sizes[0] || "Queen";

    container.innerHTML = `
      <div class="quick-view-grid">
        <div class="quick-view-gallery">
          <div class="qv-main-image">
            <img id="qvMainImg" src="${product.image}" alt="${product.name}">
          </div>
          <div style="display: flex; gap: 0.5rem;">
            ${(product.gallery || [product.image]).map(imgUrl => `
              <div style="width: 60px; height: 60px; border-radius: var(--radius-sm); overflow: hidden; cursor: pointer; border: 2px solid var(--border-subtle);" onclick="document.getElementById('qvMainImg').src='${imgUrl}'">
                <img src="${imgUrl}" alt="Thumbnail" style="width:100%; height:100%; object-fit:cover;">
              </div>
            `).join('')}
          </div>
        </div>

        <div class="qv-details">
          <div class="product-category-meta">
            <span>${product.category}</span>
            <div class="product-rating">★ ${product.rating.toFixed(1)} <span>(${product.reviewCount} reviews)</span></div>
          </div>

          <h2 style="font-family: var(--font-serif); font-size: 1.65rem; margin-bottom: 0.5rem;">${product.name}</h2>
          <p style="font-size: 0.95rem; color: var(--accent-bronze); font-weight: 600; margin-bottom: 1rem;">${product.tagline}</p>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65; margin-bottom: 1.25rem;">${product.description}</p>

          ${product.firmnessLabel ? `
            <div class="product-firmness" style="margin-bottom: 1.25rem;">
              <div class="firmness-header">
                <span>Firmness Index:</span>
                <span class="firmness-score">${product.firmnessLabel}</span>
              </div>
              <div class="firmness-track">
                <div class="firmness-bar" style="width: ${(product.firmnessScore / 10) * 100}%"></div>
              </div>
            </div>
          ` : ''}

          <div style="margin-bottom: 1.25rem;">
            <label style="display: block; font-size: 0.8125rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">Select Bed Size:</label>
            <div class="product-sizes-picker" id="qvSizesContainer">
              ${product.sizes.map((sz, i) => `
                <button class="size-pill-btn ${i === 0 ? 'active' : ''}" onclick="AuraProducts.setQuickViewSize(this, '${sz}')">${sz}</button>
              `).join('')}
            </div>
          </div>

          <table class="qv-specs-table">
            ${Object.entries(product.specifications || {}).map(([key, val]) => `
              <tr>
                <td>${key}</td>
                <td>${val}</td>
              </tr>
            `).join('')}
          </table>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-light);">
            <div class="product-price-box">
              <span class="price-current" style="font-size: 1.5rem;">$${product.price.toLocaleString()}</span>
              ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toLocaleString()}</span>` : ''}
            </div>
            <button class="btn btn-primary" onclick="AuraCart.addToCart('${product.id}', AuraProducts.getQuickViewSelectedSize(), 1); AuraProducts.closeQuickView();">
              Add to Shopping Bag
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  let currentQvSize = "Queen";

  function setQuickViewSize(btn, sz) {
    document.querySelectorAll("#qvSizesContainer .size-pill-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentQvSize = sz;
  }

  function getQuickViewSelectedSize() {
    return currentQvSize;
  }

  function closeQuickView() {
    const modal = document.getElementById("quickViewModal");
    if (modal) {
      modal.classList.remove("open");
    }
    document.body.style.overflow = "";
  }

  function bindQuickViewModal() {
    const modal = document.getElementById("quickViewModal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.closest(".modal-close-btn") || e.target.classList.contains("modal-close-btn")) {
          e.preventDefault();
          e.stopPropagation();
          closeQuickView();
        }
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeQuickView();
      }
    });
  }

  let activeMobileMatrixIndex = 0;

  function selectMobileMatrixModel(index) {
    const mattresses = AURA_DATA.products.filter(p => p.type === "Mattress");
    if (!mattresses[index]) return;
    activeMobileMatrixIndex = index;
    const m = mattresses[index];

    document.querySelectorAll(".mobile-matrix-tab-btn").forEach((btn, i) => {
      if (i === index) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    const stage = document.getElementById("mobileMatrixStage");
    if (!stage) return;

    stage.innerHTML = `
      <div class="mobile-comp-card">
        <div class="mobile-comp-header">
          <div class="mobile-comp-img">
            <img src="${m.image}" alt="${m.name}">
          </div>
          <div class="mobile-comp-intro">
            <span class="comp-header-badge">${m.category}</span>
            <h3 class="mobile-comp-title">${m.name}</h3>
            <div class="mobile-comp-price">$${m.price.toLocaleString()}</div>
          </div>
        </div>

        <div class="mobile-comp-specs-list">
          <div class="mobile-comp-spec-row">
            <span class="spec-label">Core Support</span>
            <span class="spec-val">${m.specifications["Core Support"] || 'Proprietary Core'}</span>
          </div>

          <div class="mobile-comp-spec-row">
            <span class="spec-label">Firmness Feel</span>
            <div class="comp-firmness-meter" style="width: 100%; max-width: 170px;">
              <span style="font-weight: 700; font-size: 0.775rem;">${m.firmnessLabel}</span>
              <div class="comp-meter-bar" style="margin-top: 3px;">
                <div class="comp-meter-fill" style="width: ${(m.firmnessScore / 10) * 100}%;"></div>
              </div>
            </div>
          </div>

          <div class="mobile-comp-spec-row">
            <span class="spec-label">Total Height</span>
            <span class="spec-val">${m.specifications["Total Height"] || '13 Inches'}</span>
          </div>

          <div class="mobile-comp-spec-row">
            <span class="spec-label">Cover Fabric</span>
            <span class="spec-val">${m.specifications["Cover Fabric"] || 'Organic Cashmere'}</span>
          </div>

          <div class="mobile-comp-spec-row">
            <span class="spec-label">In-Home Trial</span>
            <span class="comp-check-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>100 Nights Risk-Free</span>
            </span>
          </div>

          <div class="mobile-comp-spec-row">
            <span class="spec-label">Warranty</span>
            <span class="comp-check-badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${m.specifications["Warranty"] || '15-Year Warranty'}</span>
            </span>
          </div>
        </div>

        <div class="mobile-comp-actions">
          <button class="btn btn-primary btn-sm" onclick="AuraCart.addToCart('${m.id}', 'Queen', 1)">Add Queen to Bag</button>
          <button class="btn btn-secondary btn-sm" onclick="AuraProducts.openQuickView('${m.id}')">Quick View</button>
        </div>

        <div class="mobile-comp-nav-arrows">
          <button class="mobile-comp-nav-btn" onclick="AuraProducts.selectMobileMatrixModel(${(index - 1 + mattresses.length) % mattresses.length})">
            ← Prev Model
          </button>
          <span class="mobile-comp-counter">Model ${index + 1} of ${mattresses.length}</span>
          <button class="mobile-comp-nav-btn" onclick="AuraProducts.selectMobileMatrixModel(${(index + 1) % mattresses.length})">
            Next Model →
          </button>
        </div>
      </div>
    `;
  }

  function renderComparisonTable() {
    const tableContainer = document.getElementById("mattressComparisonTable");
    if (!tableContainer) return;

    const mattresses = AURA_DATA.products.filter(p => p.type === "Mattress");

    tableContainer.innerHTML = `
      <!-- Desktop Comparison Matrix Table -->
      <div class="comparison-table-wrapper desktop-matrix-view">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>
                <div style="font-family: var(--font-serif); font-size: 1.25rem; margin-bottom: 0.25rem;">Matrix Overview</div>
                <div style="font-size: 0.775rem; font-family: var(--font-sans); color: var(--text-muted); font-weight: 500;">4 Master Collections</div>
              </th>
              ${mattresses.map(m => `
                <th>
                  <div class="comp-header-card">
                    <div class="comp-header-img">
                      <img src="${m.image}" alt="${m.name}">
                    </div>
                    <span class="comp-header-badge">${m.category}</span>
                    <h4 class="comp-header-title">${m.name}</h4>
                    <div class="comp-header-price">$${m.price.toLocaleString()}</div>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Category &amp; Core</td>
              ${mattresses.map(m => `<td><strong>${m.category}</strong><br><span style="font-size: 0.8rem; color: var(--text-secondary);">${m.specifications["Core Support"] || 'Proprietary Core'}</span></td>`).join('')}
            </tr>
            <tr>
              <td>Firmness Feel</td>
              ${mattresses.map(m => `
                <td>
                  <div class="comp-firmness-meter">
                    <div style="font-weight: 600; font-size: 0.85rem;">${m.firmnessLabel}</div>
                    <div class="comp-meter-bar">
                      <div class="comp-meter-fill" style="width: ${(m.firmnessScore / 10) * 100}%;"></div>
                    </div>
                  </div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td>Comfort Height</td>
              ${mattresses.map(m => `<td><strong>${m.specifications["Total Height"] || '13 Inches'}</strong></td>`).join('')}
            </tr>
            <tr>
              <td>Cover Fabric</td>
              ${mattresses.map(m => `<td style="font-size: 0.85rem;">${m.specifications["Cover Fabric"] || 'Organic Cashmere'}</td>`).join('')}
            </tr>
            <tr>
              <td>In-Home Trial</td>
              ${mattresses.map(m => `
                <td>
                  <div class="comp-check-badge">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>100 Nights</span>
                  </div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td>Warranty</td>
              ${mattresses.map(m => `
                <td>
                  <div class="comp-check-badge">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>${m.specifications["Warranty"] || '15-Year Warranty'}</span>
                  </div>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td>Action</td>
              ${mattresses.map(m => `
                <td>
                  <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                    <button class="btn btn-primary btn-sm" onclick="AuraCart.addToCart('${m.id}', 'Queen');" style="width: 100%; padding: 0.45rem 0.65rem; font-size: 0.775rem;">Add Queen</button>
                    <button class="btn btn-secondary btn-sm" onclick="AuraProducts.openQuickView('${m.id}')" style="width: 100%; padding: 0.35rem 0.65rem; font-size: 0.75rem;">Quick View</button>
                  </div>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Dedicated Interactive Comparison Card View -->
      <div class="mobile-matrix-view">
        <div class="mobile-matrix-tabs" id="mobileMatrixTabs">
          ${mattresses.map((m, idx) => `
            <button class="mobile-matrix-tab-btn ${idx === 0 ? 'active' : ''}" onclick="AuraProducts.selectMobileMatrixModel(${idx})">
              ${m.category}
            </button>
          `).join('')}
        </div>

        <div class="mobile-matrix-card-stage" id="mobileMatrixStage">
          <!-- Populated by selectMobileMatrixModel -->
        </div>
      </div>
    `;

    selectMobileMatrixModel(0);
  }

  return {
    init,
    renderProductGrid,
    resetFilters,
    selectCardSize,
    handleCardAddToCart,
    openQuickView,
    closeQuickView,
    setQuickViewSize,
    getQuickViewSelectedSize,
    selectMobileMatrixModel
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  AuraProducts.init();
});
