/**
 * SGS ASSOCIATES — BUTTERY CLIENT-SIDE SPA ROUTER & VIEW TRANSITIONS ENGINE
 * Delivers zero-lag, instant page navigation with speculative hover pre-fetching,
 * persistent app shell, native View Transitions API, and luminous top progress bar.
 */

(function () {
  'use strict';

  // In-memory page cache mapping normalized URLs to parsed documents
  const pageCache = new Map();
  let isNavigating = false;
  let progressBar = null;
  let progressTimer = null;

  /**
   * Normalize URL to standard absolute form without trailing hash
   */
  function normalizeUrl(urlStr) {
    try {
      const u = new URL(urlStr, window.location.href);
      return u.origin + u.pathname + (u.search || '');
    } catch (e) {
      return urlStr;
    }
  }

  /**
   * Determine relative root prefix from path depth
   */
  function calculateRoot(pathname) {
    const clean = pathname.replace(/^\/|\/$/g, '');
    if (!clean) return '';
    const segments = clean.split('/');
    if (segments.length === 1) return '../';
    if (segments.length >= 2) return '../../';
    return '';
  }

  /**
   * Initialize or retrieve the top luminous progress bar
   */
  function getProgressBar() {
    if (!progressBar) {
      progressBar = document.getElementById('sgs-router-bar');
      if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'sgs-router-bar';
        document.body.appendChild(progressBar);
      }
    }
    return progressBar;
  }

  function startProgress() {
    const bar = getProgressBar();
    if (!bar) return;
    clearTimeout(progressTimer);
    bar.style.opacity = '1';
    bar.style.width = '28%';
    progressTimer = setTimeout(() => {
      bar.style.width = '72%';
    }, 120);
  }

  function finishProgress() {
    const bar = getProgressBar();
    if (!bar) return;
    clearTimeout(progressTimer);
    bar.style.width = '100%';
    progressTimer = setTimeout(() => {
      bar.style.opacity = '0';
      progressTimer = setTimeout(() => {
        bar.style.width = '0%';
      }, 200);
    }, 180);
  }

  /**
   * Speculative Pre-fetcher
   * Fetches target page into memory ahead of click
   */
  async function prefetch(urlStr) {
    const norm = normalizeUrl(urlStr);
    if (!norm || pageCache.has(norm)) return;

    // Don't prefetch current page
    if (norm === normalizeUrl(window.location.href)) return;

    try {
      const res = await fetch(norm, {
        headers: { 'X-Requested-With': 'SGS-Router' }
      });
      if (!res.ok) return;
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      pageCache.set(norm, doc);
    } catch (err) {
      // Silently fail prefetch; will fall back to live fetch on click
    }
  }

  /**
   * Attach speculative prefetch event listeners to internal links
   */
  function attachPrefetchListeners(container = document) {
    const links = container.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        return;
      }
      try {
        const u = new URL(link.href);
        if (u.origin !== window.location.origin) return;
        if (link.getAttribute('target') === '_blank') return;
      } catch (e) {
        return;
      }

      // Prefetch on pointerenter / mouseenter
      link.addEventListener('pointerenter', () => prefetch(link.href), { passive: true, once: true });
      link.addEventListener('touchstart', () => prefetch(link.href), { passive: true, once: true });
    });
  }

  /**
   * Close open mobile drawers and desktop dropdowns
   */
  function closeMenus() {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');

    document.querySelectorAll('.nav-dropdown').forEach(dd => {
      dd.classList.remove('is-open');
    });
  }

  /**
   * Main Navigation Transition
   */
  async function navigate(targetUrl, isPopState = false) {
    if (isNavigating) return;

    const parsedTarget = new URL(targetUrl, window.location.href);
    const currentNorm = normalizeUrl(window.location.href);
    const targetNorm = normalizeUrl(targetUrl);

    // If identical page with hash anchor, smooth scroll directly without full re-render
    if (currentNorm === targetNorm) {
      closeMenus();
      if (parsedTarget.hash) {
        const el = document.querySelector(parsedTarget.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        if (!isPopState) window.history.pushState(null, '', targetUrl);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    isNavigating = true;
    startProgress();
    closeMenus();

    // 1. Fetch or get from cache
    let targetDoc = pageCache.get(targetNorm);
    if (!targetDoc) {
      try {
        const res = await fetch(targetUrl, {
          headers: { 'X-Requested-With': 'SGS-Router' }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        const parser = new DOMParser();
        targetDoc = parser.parseFromString(html, 'text/html');
        pageCache.set(targetNorm, targetDoc);
      } catch (err) {
        console.warn('[SGS Router] Navigation fetch failed, falling back to browser hard reload:', err);
        finishProgress();
        isNavigating = false;
        window.location.href = targetUrl;
        return;
      }
    }

    const newMain = targetDoc.querySelector('#main-content');
    if (!newMain) {
      window.location.href = targetUrl;
      return;
    }

    const currentMain = document.querySelector('#main-content');
    if (!currentMain) {
      window.location.href = targetUrl;
      return;
    }

    const newTitle = targetDoc.querySelector('title')?.innerText || document.title;
    const newMetaDesc = targetDoc.querySelector('meta[name="description"]')?.getAttribute('content');
    const newPage = targetDoc.body.dataset.page || 'home';
    const newRoot = targetDoc.body.dataset.root !== undefined ? targetDoc.body.dataset.root : calculateRoot(parsedTarget.pathname);
    const currentPage = document.body.dataset.page || 'home';

    // 2. Clean up current page engines
    if (window.SGS_MAIN && typeof window.SGS_MAIN.cleanupPage === 'function') {
      window.SGS_MAIN.cleanupPage(currentPage);
    }

    // 3. Execution function to swap DOM
    const applySwap = () => {
      currentMain.innerHTML = newMain.innerHTML;
      document.title = newTitle;
      if (newMetaDesc) {
        let meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', newMetaDesc);
      }
      document.body.dataset.page = newPage;
      document.body.dataset.root = newRoot;

      // Update active nav indicators & dropdown highlights
      if (window.SGS_COMPONENTS && typeof window.SGS_COMPONENTS.updateActiveNav === 'function') {
        window.SGS_COMPONENTS.updateActiveNav(newPage, newRoot);
      }

      // Re-hydrate pre-footer consultation form section if placeholder exists
      if (window.SGS_COMPONENTS && typeof window.SGS_COMPONENTS.initContact === 'function') {
        window.SGS_COMPONENTS.initContact();
      }

      // Handle scrolling: if target has hash, scroll to target; else top
      if (parsedTarget.hash) {
        const targetEl = document.querySelector(parsedTarget.hash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    // 4. Perform Transition: Native View Transitions or High-Performance CSS Fallback
    if (document.startViewTransition) {
      try {
        const transition = document.startViewTransition(() => {
          applySwap();
        });
        await transition.finished;
      } catch (e) {
        applySwap();
      }
    } else {
      currentMain.classList.add('sgs-transition-out');
      await new Promise(resolve => setTimeout(resolve, 140));
      applySwap();
      currentMain.classList.remove('sgs-transition-out');
      currentMain.classList.add('sgs-transition-in');
      requestAnimationFrame(() => {
        currentMain.classList.add('sgs-transition-active');
        setTimeout(() => {
          currentMain.classList.remove('sgs-transition-in', 'sgs-transition-active');
        }, 240);
      });
    }

    // 5. Update browser history
    if (!isPopState) {
      window.history.pushState({ url: targetUrl }, '', targetUrl);
    }

    // 6. Re-hydrate new page interactive modules
    if (window.SGS_MAIN && typeof window.SGS_MAIN.initPage === 'function') {
      window.SGS_MAIN.initPage(newPage);
    }

    finishProgress();
    isNavigating = false;

    // Attach prefetch listeners to newly mounted content
    attachPrefetchListeners(currentMain);
  }

  /**
   * Router Initialization
   */
  function initRouter() {
    // Cache current initial document
    const currentNorm = normalizeUrl(window.location.href);
    pageCache.set(currentNorm, document.cloneNode(true));

    // Create top loading bar
    getProgressBar();

    // Global click delegation for all navigation links
    document.addEventListener('click', (e) => {
      // Ignore modified clicks (cmd/ctrl/shift/alt/middle)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Handle pure page anchor on current page (e.g. href="#contact")
      if (href.startsWith('#')) {
        e.preventDefault();
        closeMenus();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
        return;
      }

      // Check external or special protocols
      if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        return;
      }
      if (anchor.getAttribute('target') === '_blank' || anchor.hasAttribute('download')) {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href);
        if (targetUrl.origin !== window.location.origin) {
          return; // External domain
        }

        // Intercept internal link!
        e.preventDefault();
        navigate(anchor.href);
      } catch (err) {
        // Fallback to normal click
      }
    });

    // Handle browser Back / Forward history navigation
    window.addEventListener('popstate', () => {
      navigate(window.location.href, true);
    });

    // Attach hover/touch prefetch listeners across the page
    attachPrefetchListeners(document);

    // Idle speculative prefetch of core navigation sections after initial load
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        prefetchIdleRoutes();
      }, { timeout: 2500 });
    } else {
      setTimeout(prefetchIdleRoutes, 1500);
    }
  }

  function prefetchIdleRoutes() {
    const root = document.body.dataset.root || '';
    const coreRoutes = [
      `${root}services-page/`,
      `${root}services-page/due-dates/`,
      `${root}services-page/financial-tools/`,
      `${root}clients/`,
      `${root}firm/about/`,
      `${root}contact/`
    ];
    coreRoutes.forEach(route => {
      try {
        prefetch(new URL(route, window.location.href).href);
      } catch (e) {}
    });
  }

  // Expose router API
  window.SGS_ROUTER = {
    navigate,
    prefetch,
    init: initRouter
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouter);
  } else {
    initRouter();
  }
})();
