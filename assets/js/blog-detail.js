/**
 * AURA LUNA - Blog Detail Controller
 * Dynamically loads and renders any article from AURA_DATA.articles based on URL parameters (?id=...)
 */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id") || "post-1";

  const article = AURA_DATA.articles.find(a => a.id === articleId) || AURA_DATA.articles[0];
  if (!article) return;

  // Update Page Title & Metadata
  document.title = `${article.title} | COMFORA Journal`;

  // Update Breadcrumb & Category Tag
  const categoryTagEl = document.querySelector(".article-header .section-tag");
  if (categoryTagEl) categoryTagEl.textContent = article.category || "Sleep Science";

  const breadcrumbCategoryEl = document.querySelector(".article-breadcrumb span:last-child");
  if (breadcrumbCategoryEl) breadcrumbCategoryEl.textContent = article.category || "Sleep Science";

  // Update Article Title
  const articleTitleEl = document.querySelector(".article-title");
  if (articleTitleEl) articleTitleEl.textContent = article.title;

  // Update Meta Bar
  const metaBarEl = document.querySelector(".article-meta-bar");
  if (metaBarEl) {
    metaBarEl.innerHTML = `
      <div class="article-author-pill">
        <img src="${article.authorAvatar || 'assets/images/craftsmanship.jpg'}" alt="${article.author}" class="article-author-avatar">
        <span>By <strong>${article.author}</strong> (${article.authorRole ? article.authorRole.split('•')[0].trim() : 'Sleep Specialist'})</span>
      </div>
      <span>•</span>
      <span>Published ${article.date}</span>
      <span>•</span>
      <span>${article.readTime}</span>
    `;
  }

  // Update Featured Media
  const featuredMediaImg = document.querySelector(".article-featured-media img");
  if (featuredMediaImg) {
    featuredMediaImg.src = article.image;
    featuredMediaImg.alt = article.title;
  }

  // Update Content Container
  const contentContainer = document.querySelector(".article-content-container");
  if (contentContainer) {
    const sectionsHtml = (article.sections || []).map(sec => `
      <h2>${sec.heading}</h2>
      <p>${sec.body}</p>
    `).join('');

    const calloutHtml = article.callout ? `
      <div class="article-callout-box">
        <h4>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
          ${article.callout.title}
        </h4>
        <p style="margin: 0; font-size: 0.9rem; color: var(--text-secondary);">${article.callout.text}</p>
      </div>
    ` : '';

    const quoteHtml = article.quote ? `
      <blockquote class="article-quote">
        "${article.quote}"
      </blockquote>
    ` : '';

    contentContainer.innerHTML = `
      <p class="article-lead">${article.lead || article.snippet}</p>
      ${sectionsHtml}
      ${calloutHtml}
      ${quoteHtml}

      <!-- Social Share Bar -->
      <div class="article-share-bar">
        <div style="font-weight: 700; font-size: 0.875rem; color: var(--text-primary);">Share this Article:</div>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText(window.location.href); AuraToast.show('Article link copied to clipboard!');" style="padding: 0.35rem 0.85rem; font-size: 0.775rem; display: inline-flex; align-items: center; gap: 0.35rem;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span>Copy Link</span>
          </button>
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title + ' | COMFORA')}" target="_blank" class="btn btn-secondary btn-sm" style="padding: 0.35rem 0.85rem; font-size: 0.775rem;">
            Twitter / X
          </a>
          <a href="https://www.linkedin.com" target="_blank" class="btn btn-secondary btn-sm" style="padding: 0.35rem 0.85rem; font-size: 0.775rem;">
            LinkedIn
          </a>
        </div>
      </div>

      <!-- Author Spotlight Box -->
      <div class="article-author-card">
        <img src="${article.authorAvatar || 'assets/images/craftsmanship.jpg'}" alt="${article.author}" class="author-card-avatar">
        <div>
          <div class="author-card-name">${article.author}</div>
          <div class="author-card-role">${article.authorRole || 'Sleep Ergonomist & Consultant • COMFORA'}</div>
          <p class="author-card-bio">${article.authorBio || 'Dedicated sleep science researcher specializing in non-invasive restorative ergonomics and natural textile provenance.'}</p>
        </div>
      </div>
    `;
  }

  // Render Related Articles (excluding current article)
  const relatedGrid = document.querySelector(".blog-grid");
  if (relatedGrid) {
    const otherArticles = AURA_DATA.articles.filter(a => a.id !== article.id).slice(0, 3);
    relatedGrid.innerHTML = otherArticles.map(rel => `
      <div class="blog-card" onclick="window.location.href='blog-detail.html?id=${rel.id}'" style="cursor: pointer;">
        <div class="blog-media">
          <img src="${rel.image}" alt="${rel.title}">
        </div>
        <div class="blog-body">
          <div class="blog-meta">
            <span class="blog-tag">${rel.category}</span>
            <span>• ${rel.readTime}</span>
          </div>
          <h3 class="blog-title" style="font-size: 1.15rem;">
            <a href="blog-detail.html?id=${rel.id}" style="color: inherit;">${rel.title}</a>
          </h3>
          <p class="blog-desc">${rel.snippet}</p>
          <div class="blog-footer">
            <span>By ${rel.author.split(',')[0]}</span>
            <span style="color: var(--accent-bronze); font-weight: 700;">Read Story →</span>
          </div>
        </div>
      </div>
    `).join('');
  }
});
