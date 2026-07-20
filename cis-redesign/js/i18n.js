/**
 * CIS Website — i18n Translation Engine
 * =======================================
 * Loads locale JSON files and applies translations across all pages.
 *
 * Usage in HTML:
 *   <span data-i18n="key">Fallback text</span>
 *   <input data-i18n-placeholder="key" placeholder="Fallback">
 *   <a data-i18n-title="key" title="Fallback">...</a>
 *
 * Language is stored in localStorage under "cis_lang".
 * Default language is Arabic (ar).
 */

const I18n = (() => {
  const STORAGE_KEY = 'cis_lang';
  const SUPPORTED = ['ar', 'en'];
  const DEFAULT_LANG = 'ar';

  let currentLang = DEFAULT_LANG;
  let strings = {};

  /**
   * Load a locale JSON file and cache its strings.
   * @param {string} lang - Language code ('ar' | 'en')
   * @returns {Promise<object>} - Resolved locale strings
   */
  async function loadLocale(lang) {
    const url = `locales/${lang}.json`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Locale ${lang} not found (${res.status})`);
      return await res.json();
    } catch (err) {
      console.warn(`[i18n] Failed to load locale "${lang}":`, err);
      return {};
    }
  }

  /**
   * Apply loaded strings to all elements with data-i18n attributes.
   */
  function applyTranslations() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (strings[key] !== undefined) {
        el.innerHTML = strings[key];
      }
    });

    // Input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (strings[key] !== undefined) {
        el.setAttribute('placeholder', strings[key]);
      }
    });

    // Input default values (e.g. pre-filled demo fields)
    document.querySelectorAll('[data-i18n-value]').forEach(el => {
      const key = el.dataset.i18nValue;
      if (strings[key] !== undefined) {
        el.value = strings[key];
      }
    });

    // Title attributes (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      if (strings[key] !== undefined) {
        el.setAttribute('title', strings[key]);
      }
    });

    // Aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      if (strings[key] !== undefined) {
        el.setAttribute('aria-label', strings[key]);
      }
    });

    // Update Google Maps embed language if iframe exists
    const mapEmbed = document.getElementById('google-map-embed');
    if (mapEmbed) {
      try {
        const url = new URL(mapEmbed.src);
        const isEn = currentLang === 'en';
        const lang = isEn ? 'en' : 'ar';
        const region = isEn ? 'us' : 'eg';
        
        // Dynamically encode place query based on language to force English/Arabic place info card
        const label = isEn ? 'New Cairo Academy' : 'أكاديمية القاهرة الجديدة';
        const base64Label = btoa(unescape(encodeURIComponent(label))).replace(/=+$/, '');
        
        let pb = url.searchParams.get('pb') || '';
        const originalPb = pb;
        
        // Dynamically replace standard language and region code inside the 'pb' param
        pb = pb.replace(/(!3m2!1s)[a-zA-Z]{2}(!2s)[a-zA-Z]{2}/g, `$1${lang}$2${region}`);
        pb = pb.replace(/(!5m2!1s)[a-zA-Z]{2}(!2s)[a-zA-Z]{2}/g, `$1${lang}$2${region}`);
        
        // Dynamically replace the query label (!2z) inside the 'pb' param
        pb = pb.replace(/(!2z)[^!]*/g, `$1${base64Label}`);
        
        const currentGl = url.searchParams.get('gl');
        const currentHl = url.searchParams.get('hl');
        const targetGl = isEn ? 'US' : 'EG';
        
        // Only update map src if any parameter changed to avoid infinite reloading loops
        if (pb !== originalPb || currentHl !== lang || currentGl !== targetGl) {
          url.searchParams.set('pb', pb);
          url.searchParams.set('hl', lang);
          url.searchParams.set('gl', targetGl);
          mapEmbed.src = url.toString();
        }
      } catch (e) {
        console.warn('[i18n] Failed to update map language:', e);
      }
    }

    // Update all maps links
    document.querySelectorAll('a[href*="maps.app.goo.gl"]').forEach(link => {
      try {
        const url = new URL(link.href);
        const isEn = currentLang === 'en';
        url.searchParams.set('hl', isEn ? 'en' : 'ar');
        url.searchParams.set('gl', isEn ? 'US' : 'EG');
        link.href = url.toString();
      } catch (e) {}
    });
  }

  /**
   * Update the <html> element's lang and dir attributes and set body styles.
   */
  function applyDocumentAttributes() {
    const isEn = (strings.lang_code || currentLang) === 'en';
    document.documentElement.setAttribute('lang', strings.lang_code || currentLang);
    document.documentElement.setAttribute('dir', strings.dir || 'rtl');
    
    if (isEn) {
      document.body.style.fontFamily = "'Inter', sans-serif";
      document.body.style.textAlign = "left";
      document.body.classList.add("ltr-mode");
    } else {
      document.body.style.fontFamily = "var(--font-body)";
      document.body.style.textAlign = "right";
      document.body.classList.remove("ltr-mode");
    }
  }

  /**
   * Update the language toggle button text.
   */
  function updateLangButton() {
    const btn = document.getElementById('lang-btn');
    if (btn) {
      const span = btn.querySelector('span');
      if (span && strings.lang_toggle) {
        span.textContent = strings.lang_toggle;
      }
    }
  }

  /**
   * Switch to the given language.
   * @param {string} lang
   */
  async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) {
      console.warn(`[i18n] Unsupported language: ${lang}. Using default.`);
      lang = DEFAULT_LANG;
    }

    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    strings = await loadLocale(lang);

    applyDocumentAttributes();
    applyTranslations();
    updateLangButton();

    // Dispatch custom event so other scripts can react to language change
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  /**
   * Toggle between ar and en.
   *
   * The dynamic content on each page (news, events, testimonials, faculty,
   * courses, etc.) is rendered once by main.js on page load from the
   * language-aware CIS_DATA store. Those renderers are not re-run on an
   * in-place language swap and are wrapped in closures that also bind click
   * handlers (tabs, sliders, wizards), so re-invoking them here would leave
   * dynamic sections in the old language or double-bind their listeners.
   *
   * Persisting the choice and reloading guarantees every page and every widget
   * re-renders correctly in the selected language with no duplicate handlers.
   * On the fresh load, main.js renders against the stored language and this
   * engine re-applies the static translations, so there is no flash of the
   * previous language.
   */
  function toggle() {
    const next = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(next);
  }

  // Set up MutationObserver to automatically translate dynamically injected elements
  const observer = new MutationObserver((mutations) => {
    observer.disconnect();
    applyTranslations();
    observer.observe(document.body, { childList: true, subtree: true });
  });

  /**
   * Initialize: read stored preference, load locale, apply.
   */
  async function init() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const lang = SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
    await setLanguage(lang);

    // Wire up the toggle button
    const btn = document.getElementById('lang-btn');
    if (btn) {
      btn.addEventListener('click', toggle);
    }

    // Start observing DOM changes for dynamic translations
    observer.observe(document.body, { childList: true, subtree: true });
  }

  return { init, setLanguage, toggle, get current() { return currentLang; }, get t() { return strings; } };
})();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', I18n.init);
} else {
  I18n.init();
}
