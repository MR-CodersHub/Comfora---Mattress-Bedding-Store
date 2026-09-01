/**
 * AURA LUNA LUXURY SLEEP STUDIO - CART & WISHLIST ENGINE & TOAST MANAGER
 */

const AuraCart = (function () {
  const CART_STORAGE_KEY = "auraluna_cart_v1";
  const WISHLIST_STORAGE_KEY = "auraluna_wishlist_v1";
  const FREE_SHIPPING_THRESHOLD = 1000;

  let cart = [];
  let wishlist = [];
  let appliedDiscount = { code: "", discount: 0, type: "none" };

  function init() {
    loadCart();
    loadWishlist();
    bindEvents();
    renderCart();
    renderWishlist();
    updateBadges();
  }

  function loadCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      cart = stored ? JSON.parse(stored) : [];
    } catch (e) {
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
    updateBadges();
    renderCart();
  }

  function loadWishlist() {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      wishlist = stored ? JSON.parse(stored) : [];
    } catch (e) {
      wishlist = [];
    }
  }

  function saveWishlist() {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist", e);
    }
    updateBadges();
    renderWishlist();
  }

  function addToCart(productId, size = "Queen", quantity = 1) {
    const product = (AURA_DATA.products || []).find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        size: size,
        image: product.image,
        quantity: quantity
      });
    }

    saveCart();
    showToast("Added to Shopping Bag", `${product.name} (${size}) has been added.`, "cart");
    openCartDrawer();
  }

  function updateQuantity(productId, size, delta) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    saveCart();
  }

  function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart();
    showToast("Item Removed", "Product removed from shopping bag.", "info");
  }

  function toggleWishlist(productId) {
    const product = (AURA_DATA.products || []).find(p => p.id === productId);
    if (!product) return;

    const exists = wishlist.some(item => item.id === productId);
    if (exists) {
      wishlist = wishlist.filter(item => item.id !== productId);
      showToast("Wishlist Updated", `${product.name} removed from saved items.`, "info");
    } else {
      wishlist.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image
      });
      showToast("Saved to Wishlist", `${product.name} added to your wishlist.`, "heart");
    }
    saveWishlist();
    syncWishlistButtons();
  }

  function syncWishlistButtons() {
    document.querySelectorAll("[data-wishlist-id]").forEach(btn => {
      const id = btn.getAttribute("data-wishlist-id");
      if (wishlist.some(item => item.id === id)) {
        btn.classList.add("active");
        btn.setAttribute("title", "Remove from Wishlist");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("title", "Save to Wishlist");
      }
    });
  }

  function getCartSubtotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function getDiscountAmount(subtotal) {
    if (appliedDiscount.type === "fixed") {
      return Math.min(subtotal, appliedDiscount.discount);
    } else if (appliedDiscount.type === "percent") {
      return Math.round((subtotal * appliedDiscount.discount) / 100);
    }
    return 0;
  }

  function applyPromoCode(code) {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "VIP100") {
      appliedDiscount = { code: "VIP100", discount: 100, type: "fixed" };
      showToast("Promo Code Applied", "$100 VIP Concierge savings applied to your bag.", "success");
    } else if (cleanCode === "AURALUNA10" || cleanCode === "SANCTUARY") {
      appliedDiscount = { code: cleanCode, discount: 10, type: "percent" };
      showToast("Promo Code Applied", "10% bespoke sleep savings applied.", "success");
    } else {
      showToast("Invalid Promo Code", "Please check the code and try again.", "info");
      return;
    }
    renderCart();
  }

  function updateBadges() {
    const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalWishlistCount = wishlist.length;

    document.querySelectorAll(".cart-count-badge").forEach(el => {
      el.textContent = totalCartCount;
    });

    document.querySelectorAll(".wishlist-count-badge").forEach(el => {
      el.textContent = totalWishlistCount;
    });
  }

  function renderCart() {
    const cartBody = document.getElementById("cartDrawerBody");
    const subtotalEl = document.getElementById("cartDrawerSubtotal");
    const progressEl = document.getElementById("cartFreeShippingFill");
    const shippingTextEl = document.getElementById("cartFreeShippingText");
    const footerEl = document.querySelector(".cart-drawer .drawer-footer");

    if (!cartBody) return;

    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div class="drawer-empty-state">
          <div class="drawer-empty-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <h4 style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--text-primary);">Your Shopping Bag is Empty</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Discover our master-crafted mattresses and pure botanical bedding collection.</p>
          <a href="products.html" class="btn btn-primary btn-sm" onclick="AuraCart.closeCartDrawer()">Explore Mattress Collection</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = "$0";
      if (progressEl) progressEl.style.width = "0%";
      if (shippingTextEl) shippingTextEl.innerHTML = `Add <strong>$${FREE_SHIPPING_THRESHOLD.toLocaleString()}</strong> to unlock <strong>Complimentary White-Glove In-Home Setup</strong>.`;
      if (footerEl) footerEl.style.display = "none";
      return;
    }

    if (footerEl) footerEl.style.display = "flex";

    const subtotal = getCartSubtotal();
    const discount = getDiscountAmount(subtotal);
    const finalTotal = Math.max(0, subtotal - discount);

    // Shipping progress
    if (progressEl && shippingTextEl) {
      const percentage = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
      progressEl.style.width = `${percentage}%`;
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingTextEl.innerHTML = `✨ <strong>Complimentary White-Glove In-Home Setup Unlocked!</strong>`;
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        shippingTextEl.innerHTML = `Add <strong>$${remaining.toLocaleString()}</strong> for <strong>Free White-Glove Setup</strong>.`;
      }
    }

    // Upsell items (recommendations not yet in cart)
    const upsellCandidates = [
      { id: "bed-1", name: "Hungarian Goose Down Pillow", price: 165, image: "assets/images/bedding_pillows.jpg" },
      { id: "bed-2", name: "Mulberry Silk Duvet & Quilt", price: 380, image: "assets/images/bedding_pillows.jpg" }
    ].filter(u => !cart.some(item => item.id === u.id));

    let upsellsHtml = "";
    if (upsellCandidates.length > 0) {
      upsellsHtml = `
        <div class="cart-upsells-container">
          <div class="cart-upsells-heading">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <span>Complete Your Sleep Suite</span>
          </div>
          ${upsellCandidates.map(u => `
            <div class="cart-upsell-item">
              <img src="${u.image}" alt="${u.name}" class="cart-upsell-media">
              <div class="cart-upsell-info">
                <div class="cart-upsell-title">${u.name}</div>
                <div class="cart-upsell-price">$${u.price.toLocaleString()}</div>
              </div>
              <button class="cart-upsell-add-btn" onclick="AuraCart.addToCart('${u.id}', 'Queen')">+ Add to Bag</button>
            </div>
          `).join("")}
        </div>
      `;
    }

    // Cart Items
    cartBody.innerHTML = cart.map(item => `
      <div class="cart-item">
        <button class="cart-item-remove-btn" onclick="AuraCart.removeFromCart('${item.id}', '${item.size}')" title="Remove item" aria-label="Remove item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div class="cart-item-media">
          <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="cart-item-info">
          <div>
            <h5 class="cart-item-title">${item.name}</h5>
            <div class="cart-item-meta">
              <span class="cart-item-badge">${item.size}</span>
              <span>${item.category}</span>
            </div>
          </div>

          <div class="cart-item-controls">
            <div class="qty-counter">
              <button class="qty-btn" onclick="AuraCart.updateQuantity('${item.id}', '${item.size}', -1)" aria-label="Decrease quantity">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="AuraCart.updateQuantity('${item.id}', '${item.size}', 1)" aria-label="Increase quantity">+</button>
            </div>
            <span class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        </div>
      </div>
    `).join("") + upsellsHtml;

    // Render footer details & breakdown
    if (footerEl) {
      footerEl.innerHTML = `
        <div class="cart-promo-box">
          <input type="text" id="cartPromoInput" class="cart-promo-input" placeholder="VIP Code (e.g. VIP100)" value="${appliedDiscount.code || ''}">
          <button type="button" class="cart-promo-btn" onclick="AuraCart.handlePromoSubmit()">Apply</button>
        </div>

        <div class="cart-breakdown-row">
          <span>Bag Subtotal:</span>
          <span>$${subtotal.toLocaleString()}</span>
        </div>

        ${discount > 0 ? `
          <div class="cart-breakdown-row discount-row">
            <span>VIP Code Savings (${appliedDiscount.code}):</span>
            <span>-$${discount.toLocaleString()}</span>
          </div>
        ` : ''}

        <div class="cart-breakdown-row">
          <span>White-Glove Setup:</span>
          <span style="color: #27AE60; font-weight: 700;">FREE (Unlocked)</span>
        </div>

        <div class="cart-subtotal-row">
          <span class="cart-subtotal-label">Total Estimated:</span>
          <span class="cart-subtotal-amount">$${finalTotal.toLocaleString()}</span>
        </div>

        <button class="btn btn-primary btn-lg" id="cartCheckoutBtn" style="width: 100%; font-weight: 700; letter-spacing: 0.02em;" onclick="AuraCart.startCheckoutModal()">
          Proceed to Secure Checkout →
        </button>

        <div class="cart-trust-badges">
          <div class="cart-trust-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>100-Night Trial</span>
          </div>
          <div class="cart-trust-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>256-Bit Encrypted</span>
          </div>
          <div class="cart-trust-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18.5" r="2.5"/><circle cx="7" cy="18.5" r="2.5"/></svg>
            <span>White-Glove Setup</span>
          </div>
        </div>
      `;
    }
  }

  function handlePromoSubmit() {
    const input = document.getElementById("cartPromoInput");
    if (input) {
      applyPromoCode(input.value);
    }
  }

  function startCheckoutModal() {
    if (cart.length === 0) return;

    let modal = document.getElementById("cartCheckoutModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "cartCheckoutModal";
      modal.className = "modal-overlay";
      document.body.appendChild(modal);
    }

    const subtotal = getCartSubtotal();
    const discount = getDiscountAmount(subtotal);
    const total = Math.max(0, subtotal - discount);
    const orderRef = "AL-" + Math.floor(100000 + Math.random() * 900000);

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 520px; padding: 2.25rem; text-align: center;">
        <button class="modal-close-btn" onclick="document.getElementById('cartCheckoutModal').classList.remove('open'); document.body.style.overflow='';">✕</button>
        
        <div style="width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #C2A177 0%, #8C6A48 100%); color: #FFFFFF; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem auto; box-shadow: 0 8px 25px rgba(194, 161, 119, 0.4);">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>

        <span class="section-tag no-after">Bespoke Order Confirmed</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.6rem; margin-bottom: 0.5rem;">Thank You for Your Order!</h3>
        <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.25rem;">
          Your master-crafted sleep system is being prepared. Our white-glove logistics team will contact you within 24 hours to schedule room-of-choice installation.
        </p>

        <div style="background-color: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.15rem; text-align: left; margin-bottom: 1.5rem; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.45rem;">
          <div><strong>Order Reference:</strong> <span style="color: var(--accent-bronze); font-weight: 700;">${orderRef}</span></div>
          <div><strong>Items Ordered:</strong> ${cart.map(i => `${i.name} (${i.size}) × ${i.quantity}`).join(", ")}</div>
          <div><strong>Total Paid:</strong> <span style="font-weight: 700; color: var(--text-primary);">$${total.toLocaleString()}</span></div>
          <div><strong>Delivery:</strong> Complimentary White-Glove In-Home Installation</div>
          <div><strong>Assurance:</strong> 100-Night Risk-Free Sleep Trial & 15-Year Warranty</div>
        </div>

        <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="AuraCart.finishCheckout()">
          Done &amp; Return to Boutique
        </button>
      </div>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function finishCheckout() {
    const modal = document.getElementById("cartCheckoutModal");
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
    cart = [];
    appliedDiscount = { code: "", discount: 0, type: "none" };
    saveCart();
    closeCartDrawer();
  }

  function renderWishlist() {
    const wishlistBody = document.getElementById("wishlistDrawerBody");
    if (!wishlistBody) return;

    if (wishlist.length === 0) {
      wishlistBody.innerHTML = `
        <div class="drawer-empty-state">
          <div class="drawer-empty-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h4 style="font-family: var(--font-serif); font-size: 1.15rem;">No Saved Mattresses Yet</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">Click the heart icon on any product to curate your bespoke sleep suite.</p>
        </div>
      `;
      return;
    }

    wishlistBody.innerHTML = wishlist.map(item => `
      <div class="cart-item">
        <button class="cart-item-remove-btn" onclick="AuraCart.toggleWishlist('${item.id}')" title="Remove saved item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div class="cart-item-media">
          <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="cart-item-info">
          <div>
            <h5 class="cart-item-title">${item.name}</h5>
            <div class="cart-item-meta">${item.category} • $${item.price.toLocaleString()}</div>
          </div>
          <div class="cart-item-controls">
            <button class="btn btn-primary btn-sm" onclick="AuraCart.addToCart('${item.id}', 'Queen'); AuraCart.closeWishlistDrawer();">Move to Bag</button>
          </div>
        </div>
      </div>
    `).join("");
  }

  function openCartDrawer() {
    closeWishlistDrawer();
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    if (drawer && backdrop) {
      drawer.classList.add("open");
      backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
      renderCart();
    }
  }

  function closeCartDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    if (drawer && backdrop) {
      drawer.classList.remove("open");
      backdrop.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function openWishlistDrawer() {
    closeCartDrawer();
    const drawer = document.getElementById("wishlistDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    if (drawer && backdrop) {
      drawer.classList.add("open");
      backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
      renderWishlist();
    }
  }

  function closeWishlistDrawer() {
    const drawer = document.getElementById("wishlistDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    if (drawer && backdrop) {
      drawer.classList.remove("open");
      backdrop.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function showToast(title, message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";

    let iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    if (type === "heart") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    } else if (type === "cart") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-leave");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }

  function bindEvents() {
    const backdrop = document.getElementById("drawerBackdrop");
    if (backdrop) {
      backdrop.addEventListener("click", () => {
        closeCartDrawer();
        closeWishlistDrawer();
      });
    }
  }

  return {
    init,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    syncWishlistButtons,
    openCartDrawer,
    closeCartDrawer,
    openWishlistDrawer,
    closeWishlistDrawer,
    showToast,
    handlePromoSubmit,
    startCheckoutModal,
    finishCheckout
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  AuraCart.init();
});

