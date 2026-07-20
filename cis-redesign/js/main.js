// CIS Redesign Core Logic & Micro-interactions
// File: main.js
// Purpose: Interactive UI components, animations, counters, slider rendering, admissions wizard, courses search, faculty directory, and student services dashboard.

window.translateJS = function(key, fallback) {
  if (typeof I18n !== 'undefined' && I18n.t && I18n.t[key] !== undefined) {
    let str = I18n.t[key];
    if (typeof str === 'string') {
      return str.trim()
        .replace(/^[(\s"'\\]+/, '')
        .replace(/[)\s"':,\\/]+$/, '');
    }
  }
  return fallback;
};

let activeTestimonialIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  // 1. RTL & Language Switcher Concept
  initLanguageSwitcher();

  // 2. Mobile Menu Drawer Toggle
  initMobileMenu();

  // 3. Sticky Navigation Header Effect
  initStickyHeader();

  // 3b. Animated sliding pill for active nav item
  initNavPill();

  // 4. Custom Ripple Effect for Buttons
  initButtonRipple();

  // 5. Scroll-Triggered Animated Counters (Statistics)
  initAnimatedCounters();

  // 6. Dynamic Content Rendering (Homepage & About)
  renderNews();
  renderEvents();
  renderTestimonials();
  renderTimeline();

  // 7. Admissions Dynamic Content & Multi-Step Wizard
  initAdmissionsPage();

  // 8. Department Specific Dynamic Layout Renderers
  initDepartmentPages();

  // 9. Faculty Directory Page: Search, Filter, and Modals
  initFacultyDirectory();

  // 10. Student Services Interactive Dashboard
  initStudentServicesPortal();

  // 11. Video Lightbox Overlay
  initVideoLightbox();

  // 12. General Interactive Toggles & Tabs
  initTabsAndAccordions();
  
  // 13. Smooth Scroll Back to Top Button
  initScrollTop();

  // 14. News Center Page Logic
  initNewsPage();

  // 15. Events Hub Page Logic
  initEventsPage();

  // 16. Media Center Page Logic
  initMediaPage();

  // 17. Contact Page Logic
  initContactPage();
  initHomepageContactForm();

  // 18. Quality Assurance Page Logic
  initQualityPage();

  // 19. IT Unit Page Logic
  initItUnitPage();

  // 20. Research Page Logic
  initResearchPage();

  // 21. Alumni Page Logic
  initAlumniPage();

  // 22. Career Page Logic
  initCareerPage();

  // 23. FAQ Page Categories & Accordions
  initFaqPage();
});

/* ==========================================
   1. LANGUAGE SWITCHER CONCEPT
   ========================================== */
function initLanguageSwitcher() {
  // Prototype switcher deactivated to allow full integration with the real i18n.js engine.
  // Language initialization and body styling overrides are executed by I18n in js/i18n.js.
}

/* ==========================================
   2. MOBILE MENU DRAWER TOGGLE
   ========================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const navDrawer = document.getElementById("nav-drawer");
  const drawerClose = document.getElementById("drawer-close");
  const overlay = document.getElementById("drawer-overlay");
  
  if (!menuToggle || !navDrawer) return;

  function openDrawer() {
    navDrawer.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    
    // Add ESC key listener when opened
    document.addEventListener("keydown", handleEscape);
  }

  function closeDrawer() {
    navDrawer.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
    
    // Clean up ESC key listener
    document.removeEventListener("keydown", handleEscape);
  }
  
  function handleEscape(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeDrawer();
    }
  }

  menuToggle.addEventListener("click", openDrawer);
  if (drawerClose) drawerClose.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
  
  // Close drawer when any menu link is clicked
  const drawerLinks = navDrawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

/* ==========================================
   3. STICKY NAVIGATION HEADER
   ========================================== */
function initStickyHeader() {
  const header = document.querySelector(".main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* ==========================================
   3b. ANIMATED SLIDING NAV PILL
   ========================================== */
function initNavPill() {
  const navMenu = document.querySelector(".nav-menu");
  if (!navMenu) return;

  // Inject the pill element as the first child of the nav menu
  const pill = document.createElement("li");
  pill.setAttribute("aria-hidden", "true");
  pill.className = "nav-pill";
  navMenu.insertBefore(pill, navMenu.firstChild);

  // Determine the active item on page load by matching the current page URL
  const navLinks = navMenu.querySelectorAll(".nav-item > .nav-link");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Reduce an href to its page file name, ignoring any directory or #hash part,
  // so "about.html#dean" and "about.html" both resolve to "about.html".
  function pageOf(link) {
    return (link.getAttribute("href") || "").split("/").pop().split("#")[0];
  }

  // Find and mark the correct item as active based on current page
  navMenu.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
  let activeItem = null;

  // A top-level link wins first (index.html, about.html, media.html ...).
  navLinks.forEach(link => {
    if (!activeItem && pageOf(link) === currentPage) {
      activeItem = link.closest(".nav-item");
    }
  });

  // Otherwise the page may exist only as a dropdown entry — quality.html and faq.html
  // under "About", dept-*.html under "Departments" (whose parent is a bare href="#"),
  // career.html and it-unit.html under "Services". Highlight the parent that owns the
  // page instead of leaving it unmatched.
  if (!activeItem) {
    navMenu.querySelectorAll(".nav-item .dropdown-item").forEach(item => {
      if (!activeItem && pageOf(item) === currentPage) {
        activeItem = item.closest(".nav-item");
      }
    });
  }

  if (activeItem) activeItem.classList.add("active");

  // Position the pill under an element (measured relative to navMenu)
  function movePillTo(item) {
    if (!item) return;
    const menuRect = navMenu.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const isRTL = document.documentElement.dir === "rtl";

    if (isRTL) {
      // In RTL, "left" in CSS is measured from left edge of the container
      // We calculate the item's left edge relative to the menu's left edge
      const leftOffset = itemRect.left - menuRect.left;
      pill.style.left = leftOffset + "px";
    } else {
      pill.style.left = (itemRect.left - menuRect.left) + "px";
    }
    pill.style.width = itemRect.width + "px";
  }

  // Snap the pill back to the active item, or collapse it on pages that have no nav
  // entry at all (news.html, events.html) so it never lingers on a stale item.
  function resetPill() {
    const current = navMenu.querySelector(".nav-item.active");
    if (current) {
      movePillTo(current);
    } else {
      pill.style.width = "0px";
    }
  }

  // Initial position (no animation on load)
  // Disable transition briefly so the pill snaps to position on load
  pill.style.transition = "none";
  resetPill();
  // Force reflow, then re-enable transition
  pill.getBoundingClientRect();
  pill.style.transition = "";
  navMenu.classList.add("pill-ready");

  // On click: move pill and update active class
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const clickedItem = this.closest(".nav-item");
      // Don't prevent navigation — just move the pill visually first
      navMenu.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
      clickedItem.classList.add("active");
      movePillTo(clickedItem);
    });
  });

  // On hover: preview pill position while hovering
  navMenu.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("mouseenter", function () {
      movePillTo(this);
    });
    item.addEventListener("mouseleave", function () {
      // Snap back to current active item
      resetPill();
    });
  });

  // Recalculate on window resize (handles responsive reflows)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      pill.style.transition = "none";
      resetPill();
      pill.getBoundingClientRect();
      pill.style.transition = "";
    }, 150);
  });
}

/* ==========================================
   4. BUTTON RIPPLE EFFECT
   ========================================== */
function initButtonRipple() {
  // Use event delegation to support dynamically rendered buttons!
  document.body.addEventListener("click", function(e) {
    const button = e.target.closest(".btn");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

/* ==========================================
   5. SCROLL-TRIGGERED ANIMATED COUNTERS
   ========================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter');
  
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    
    const duration = 2000; // ~2 seconds
    let startTime = null;
    
    function easeOutQuad(t) {
      return t * (2 - t);
    }
    
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentValue = Math.round(easeOutQuad(progress) * target);
      
      el.textContent = String(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = String(target);
      }
    }
    
    requestAnimationFrame(step);
  }

  const statsSection = document.getElementById('cis-stats-section') || document.querySelector('.hero-stats-bar');
  
  if (statsSection && counters.length > 0) {
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            counters.forEach(counter => animateCounter(counter));
            obs.disconnect(); // Disconnect after animation starts
          }
        });
      }, {
        root: null,
        threshold: 0.3 // Trigger when 30% of the section is visible
      });
      observer.observe(statsSection);
    } else {
      counters.forEach(counter => animateCounter(counter));
    }
  }

  // Legacy fallback support for [data-counter-target] counters on other pages
  const legacyCounters = document.querySelectorAll("[data-counter-target]:not(.counter)");
  if (legacyCounters.length > 0) {
    function formatLegacyValue(counter, value) {
      const prefix = counter.getAttribute("data-counter-prefix");
      const suffix = counter.getAttribute("data-counter-suffix");
      if (prefix !== null || suffix !== null) {
        return (prefix || "") + String(value) + (suffix || "");
      }
      if (counter.getAttribute("data-counter-target") === "98") {
        return String(value) + '%';
      }
      return '+' + String(value);
    }

    function animateLegacy(counter) {
      if (counter.classList.contains("animated")) return;
      counter.classList.add("animated");

      const targetValue = parseInt(counter.getAttribute("data-counter-target"), 10);
      const duration = 1500;
      let startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * targetValue);

        counter.textContent = formatLegacyValue(counter, currentValue);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = formatLegacyValue(counter, targetValue);
        }
      }
      requestAnimationFrame(step);
    }

    if (window.IntersectionObserver) {
      const legacyObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateLegacy(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.4
      });
      legacyCounters.forEach(counter => legacyObserver.observe(counter));
    } else {
      legacyCounters.forEach(counter => animateLegacy(counter));
    }
  }

  document.addEventListener('langchange', () => {
    document.querySelectorAll('.counter').forEach(counter => {
      const targetValue = parseInt(counter.getAttribute('data-target'), 10);
      if (!isNaN(targetValue)) {
        counter.textContent = String(targetValue);
      }
    });

    document.querySelectorAll('[data-counter-target]').forEach(counter => {
      const targetValue = parseInt(counter.getAttribute('data-counter-target'), 10);
      if (!isNaN(targetValue) && typeof formatLegacyValue === 'function') {
        counter.textContent = formatLegacyValue(counter, targetValue);
      }
    });
  });
}

/* ==========================================
   6. DYNAMIC CONTENT RENDERING (HOMEPAGE & ABOUT)
   ========================================== */
function renderNews() {
  const container = document.getElementById("news-grid");
  if (!container || !window.CIS_DATA || !CIS_DATA.news) return;

  container.innerHTML = CIS_DATA.news.map(item => `
    <article class="card news-card">
      <div class="news-img-wrapper" style="background-image: url('${item.image}'); height: 200px; background-size: cover; background-position: center; border-radius: var(--radius-md) var(--radius-md) 0 0;"></div>
      <div class="news-content" style="padding-top: var(--space-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-xs);">
          <span class="badge badge-primary">${item.category}</span>
          <span style="font-size:var(--font-size-xs); color:var(--text-muted);">${item.date}</span>
        </div>
        <h3 style="font-size:var(--font-size-md); margin-bottom:var(--space-xs); line-height:1.4;">${item.title}</h3>
        <p style="font-size:var(--font-size-sm); color:var(--text-muted); margin-bottom:var(--space-sm);">${item.summary}</p>
        <a href="${item.link}" class="btn-text" style="color:var(--color-primary); font-weight:600; display:inline-flex; align-items:center; gap:4px; font-size:var(--font-size-sm);">
          <span data-i18n="js_str_119">اقرأ المزيد</span> 
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7 7l-7-7 7-7"/></svg>
        </a>
      </div>
    </article>
  `).join("");
}

function renderEvents() {
  const container = document.getElementById("events-stack");
  if (!container || !window.CIS_DATA || !CIS_DATA.events) return;

  container.innerHTML = CIS_DATA.events.map(item => `
    <div class="card event-card" style="display:flex; gap:var(--space-md); align-items:center; padding:var(--space-sm) var(--space-md);">
      <div class="event-date-badge" style="background:var(--gradient-primary); color:white; min-width:80px; height:80px; border-radius:var(--radius-md); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
        <span style="font-size:1.6rem; font-weight:800; font-family:var(--font-headings); line-height:1;">${item.day}</span>
        <span style="font-size:var(--font-size-xs); font-weight:600;">${item.month}</span>
      </div>
      <div class="event-details" style="flex:1;">
        <span class="badge badge-gold" style="margin-bottom:6px;">${item.tag}</span>
        <h3 style="font-size:var(--font-size-md); line-height:1.3; margin-bottom:4px;">${item.title}</h3>
        <div style="display:flex; flex-wrap:wrap; gap:var(--space-sm); font-size:var(--font-size-xs); color:var(--text-muted);">
          <span style="display:inline-flex; align-items:center; gap:4px;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            ${item.time}
          </span>
          <span style="display:inline-flex; align-items:center; gap:4px;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            ${item.location}
          </span>
        </div>
      </div>
      <a href="#" class="btn btn-outline" style="padding:8px 16px; font-size:var(--font-size-xs); border-radius:6px;"><span data-i18n="js_str_8">حضور</span></a>
    </div>
  `).join("");
}

function renderTestimonials() {
  const container = document.getElementById("testimonials-slider-content");
  if (!container || !window.CIS_DATA || !CIS_DATA.testimonials) return;

  const items = CIS_DATA.testimonials;
  
  function updateSlider() {
    const slide = items[activeTestimonialIndex];
    container.style.opacity = 0;
    setTimeout(() => {
      container.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
          <svg style="color:rgba(230, 95, 43, 0.2); width:64px; height:64px; margin-bottom:var(--space-sm);" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <p style="font-size:var(--font-size-md); font-style:italic; line-height:1.7; max-width:800px; margin-bottom:var(--space-md); font-weight:500;">"${slide.quote}"</p>
          <img src="${slide.avatar}" alt="${slide.name}" style="width:70px; height:70px; border-radius:50%; border:3px solid var(--color-primary); box-shadow:var(--shadow-sm); object-fit:cover; margin-bottom:var(--space-xs);">
          <h4 style="font-size:var(--font-size-base); margin-bottom:2px;">${slide.name}</h4>
          <span style="font-size:var(--font-size-xs); color:var(--text-muted);">${slide.role}</span>
        </div>
      `;
      container.style.opacity = 1;
    }, 250);
  }

  updateSlider();

  const prevBtn = document.getElementById("slide-prev");
  const nextBtn = document.getElementById("slide-next");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      activeTestimonialIndex = (activeTestimonialIndex - 1 + items.length) % items.length;
      updateSlider();
    });
    nextBtn.addEventListener("click", () => {
      activeTestimonialIndex = (activeTestimonialIndex + 1) % items.length;
      updateSlider();
    });
  }
}

function renderTimeline() {
  const container = document.getElementById("timeline-wrapper");
  if (!container || !window.CIS_DATA || !CIS_DATA.timeline) return;

  container.innerHTML = CIS_DATA.timeline.map((item, index) => `
    <div class="timeline-item" style="position:relative; margin-bottom:var(--space-xl); display:flex; gap:var(--space-md); width:100%; align-items:flex-start;">
      <div class="timeline-marker" style="width:40px; height:40px; border-radius:50%; background:white; border:4px solid var(--color-primary); display:flex; align-items:center; justify-content:center; z-index:2; position:relative; box-shadow:var(--shadow-sm);">
        <div style="width:12px; height:12px; background:var(--color-primary); border-radius:50%;"></div>
      </div>
      <div class="card timeline-card" style="flex:1; padding:var(--space-md); border-right: 4px solid var(--color-primary);">
        <span style="font-family:var(--font-headings); font-weight:800; font-size:1.5rem; color:var(--color-primary); display:block; margin-bottom:4px;">${item.year}</span>
        <h3 style="font-size:var(--font-size-md); margin-bottom:var(--space-xs);">${item.title}</h3>
        <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5;">${item.description}</p>
      </div>
    </div>
  `).join("");
}

/* ==========================================
   7. ADMISSIONS DYNAMIC CONTENT & WIZARD
   ========================================== */
function initAdmissionsPage() {
  const admissions = window.CIS_DATA ? CIS_DATA.admissions : null;
  if (!admissions) return;

  const reqList = document.getElementById("admissions-req-list");
  if (reqList) {
    reqList.innerHTML = admissions.requirements.map(req => `
      <li style="font-size:var(--font-size-sm); color:var(--text-muted); margin-bottom:var(--space-sm); display:flex; gap:10px; align-items:flex-start;">
        <svg width="20" height="20" fill="none" stroke="var(--color-primary)" stroke-width="3" viewBox="0 0 24 24" style="min-width:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        ${req}
      </li>
    `).join("");
  }

  const docList = document.getElementById("admissions-doc-list");
  if (docList) {
    docList.innerHTML = admissions.documents.map(doc => `
      <div class="card" style="padding:var(--space-sm); display:flex; gap:12px; align-items:center;">
        <div style="background-color:var(--color-primary-light); color:var(--color-primary); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; min-width:36px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        </div>
        <span style="font-size:var(--font-size-sm); font-weight:500;">${doc}</span>
      </div>
    `).join("");
  }

  const feesTable = document.getElementById("admissions-fees-table");
  if (feesTable) {
    feesTable.innerHTML = admissions.fees.map(fee => `
      <tr>
        <td style="padding:var(--space-sm); font-weight:700;">${fee.dept}</td>
        <td style="padding:var(--space-sm); color:var(--color-primary); font-weight:800;">${fee.tuition}</td>
        <td style="padding:var(--space-sm); color:var(--text-muted); font-size:var(--font-size-xs);">${fee.duration}</td>
      </tr>
    `).join("");
  }

  const schTable = document.getElementById("admissions-scholarships-table");
  if (schTable) {
    schTable.innerHTML = admissions.scholarships.map(sch => `
      <tr>
        <td style="padding:var(--space-sm); font-weight:700; width:35%;">${sch.name}</td>
        <td style="padding:var(--space-sm); color:var(--text-muted); font-size:var(--font-size-sm);">${sch.detail}</td>
      </tr>
    `).join("");
  }

  const faqAccordion = document.getElementById("admissions-faqs");
  if (faqAccordion) {
    faqAccordion.innerHTML = admissions.faqs.map(faq => `
      <div class="accordion-item">
        <div class="accordion-header">${faq.q}</div>
        <div class="accordion-content">
          <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.6;">${faq.a}</p>
        </div>
      </div>
    `).join("");
  }

  initAdmissionsFormWizard();
}

function initAdmissionsUploads() {
  const zones = document.querySelectorAll(".file-upload-zone");
  if (!zones.length) return;

  const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
  const ACCEPTED_EXT = ["pdf", "jpg", "jpeg", "png"];
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  zones.forEach(zone => {
    const input = zone.querySelector(".file-upload-input");
    if (!input) return;
    const hint = zone.querySelector(".upload-hint");
    const info = zone.querySelector(".upload-file-info");
    const nameEl = zone.querySelector(".upload-file-name");
    const removeBtn = zone.querySelector(".upload-file-remove");

    function isValid(file) {
      const ext = (file.name.split(".").pop() || "").toLowerCase();
      if (!ACCEPTED_TYPES.includes(file.type) && !ACCEPTED_EXT.includes(ext)) {
        alert(window.translateJS("admissions_upload_filetype", "نوع الملف غير مدعوم. يُسمح بملفات PDF أو الصور فقط."));
        return false;
      }
      if (file.size > MAX_SIZE) {
        alert(window.translateJS("admissions_upload_filesize", "حجم الملف كبير جداً. الحد الأقصى ٥ ميجابايت."));
        return false;
      }
      return true;
    }

    function showFile(file) {
      if (nameEl) nameEl.textContent = file.name;
      if (info) info.hidden = false;
      if (hint) hint.style.display = "none";
      zone.classList.add("has-file");
    }

    function clearFile() {
      input.value = "";
      if (info) info.hidden = true;
      if (hint) hint.style.display = "";
      zone.classList.remove("has-file");
    }

    zone.addEventListener("click", (e) => {
      if (e.target.closest(".upload-file-remove")) return;
      input.click();
    });

    zone.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        input.click();
      }
    });

    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      if (!file) return;
      if (!isValid(file)) { clearFile(); return; }
      showFile(file);
    });

    if (removeBtn) {
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        clearFile();
      });
    }

    ["dragenter", "dragover"].forEach(evt => {
      zone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.add("dragover");
      });
    });
    ["dragleave", "dragend"].forEach(evt => {
      zone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.remove("dragover");
      });
    });
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      zone.classList.remove("dragover");
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (!file) return;
      if (!isValid(file)) return;
      // Attach the dropped file to the real input so it participates in the form submission.
      try {
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;
      } catch (err) {
        // Older browsers block programmatic FileList assignment; keep the visual state at minimum.
      }
      showFile(file);
    });
  });
}

function initAdmissionsFormWizard() {
  const wizardForm = document.getElementById("apply-wizard-form");
  if (!wizardForm) return;

  initAdmissionsUploads();

  const steps = Array.from(wizardForm.querySelectorAll(".wizard-step"));
  const stepIndicators = Array.from(document.querySelectorAll(".step-indicator .step"));
  const progressLine = document.querySelector(".step-indicator .progress-line-fill");
  const nextBtn = document.getElementById("wizard-next-btn");
  const prevBtn = document.getElementById("wizard-prev-btn");
  let currentStepIndex = 0;

  // Custom validation helper
  function setValidationState(input, isValid, errorMessage) {
    const formGroup = input.closest(".form-group");
    if (!formGroup) return;

    let feedback = formGroup.querySelector(".invalid-feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      formGroup.appendChild(feedback);
    }

    if (isValid) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      feedback.textContent = "";
      feedback.style.display = "none";
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      feedback.textContent = errorMessage;
      feedback.style.display = "block";
    }
  }

  // Define custom validation rules for step 1
  const validations = {
    "student-fullname": {
      element: document.getElementById("student-fullname"),
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        // Accept only English or Arabic letters and spaces. Do not allow numbers or special characters.
        const nameRegex = /^[a-zA-Z\u0621-\u064A\u0671-\u06D3\u06D5\s]+$/;
        if (!nameRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_name_invalid", "يجب أن يحتوي الاسم على حروف ومسافات فقط ولا يحتوي على أرقام أو رموز.") };
        }
        return { isValid: true };
      }
    },
    "student-phone": {
      element: document.getElementById("student-phone"),
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        // Must contain exactly 11 digits and start with "01"
        const phoneRegex = /^01\d{9}$/;
        if (!phoneRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_phone_invalid", "يجب أن يكون رقم الهاتف مكوناً من 11 رقماً ويبدأ بـ 01.") };
        }
        return { isValid: true };
      }
    },
    "student-email": {
      element: document.getElementById("student-email"),
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        // Must be a valid email containing "@" and a valid domain
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_email_invalid", "يرجى إدخال بريد إلكتروني صحيح (مثال: student@gmail.com).") };
        }
        return { isValid: true };
      }
    },
    "student-nat": {
      element: document.getElementById("student-nat"),
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        // Accept only letters (English or Arabic) and spaces.
        const natRegex = /^[a-zA-Z\u0621-\u064A\u0671-\u06D3\u06D5\s]+$/;
        if (!natRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_nat_invalid", "يجب أن تحتوي الجنسية على حروف ومسافات فقط ولا تحتوي على أرقام أو رموز.") };
        }
        return { isValid: true };
      }
    }
  };

  // Wire up real-time inputs
  Object.keys(validations).forEach(key => {
    const item = validations[key];
    if (item.element) {
      // Prevent letters and special chars in Mobile Phone in real-time
      if (key === "student-phone") {
        item.element.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/\D/g, "");
        });
      }

      const validateAndSetState = () => {
        const result = item.validate(item.element.value);
        setValidationState(item.element, result.isValid, result.msg);
        return result.isValid;
      };

      // Validate in real time while typing and on blur
      item.element.addEventListener("input", validateAndSetState);
      item.element.addEventListener("blur", validateAndSetState);

      // Attach custom validation function to element
      item.element.runCustomValidation = validateAndSetState;
    }
  });

  // Clean validation states on wizard reset
  wizardForm.addEventListener("reset", () => {
    wizardForm.querySelectorAll(".form-control").forEach(field => {
      field.classList.remove("is-valid", "is-invalid");
      field.style.borderColor = "";
      const formGroup = field.closest(".form-group");
      if (formGroup) {
        const feedback = formGroup.querySelector(".invalid-feedback");
        if (feedback) {
          feedback.textContent = "";
          feedback.style.display = "none";
        }
      }
    });
  });

  function updateWizardUI() {
    steps.forEach((step, idx) => {
      if (idx === currentStepIndex) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    stepIndicators.forEach((ind, idx) => {
      if (idx <= currentStepIndex) {
        ind.classList.add("active");
      } else {
        ind.classList.remove("active");
      }
    });

    if (progressLine) {
      const percentage = (currentStepIndex / (steps.length - 1)) * 100;
      progressLine.style.width = `${percentage}%`;
    }

    if (currentStepIndex === 0) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "inline-flex";
    }

    if (currentStepIndex === steps.length - 1) {
      nextBtn.textContent = window.translateJS("js_str_88", "تأكيد وإرسال الطلب");
      nextBtn.classList.add("btn-gradient");
      
      const rName = document.getElementById("rev-name");
      const rPhone = document.getElementById("rev-phone");
      const rDept = document.getElementById("rev-dept");
      const fName = document.getElementById("student-fullname");
      const fPhone = document.getElementById("student-phone");
      const fDept = document.getElementById("student-dept-select");

      if (rName && fName) rName.textContent = fName.value || "-";
      if (rPhone && fPhone) rPhone.textContent = fPhone.value || "-";
      if (rDept && fDept) rDept.textContent = fDept.options[fDept.selectedIndex]?.text || "-";
    } else {
      nextBtn.textContent = window.translateJS("js_str_114", "الخطوة التالية");
      nextBtn.classList.remove("btn-gradient");
    }
  }

  nextBtn.addEventListener("click", () => {
    let allValid = true;

    if (currentStepIndex === 0) {
      // Step 1: Run custom validation rules
      Object.keys(validations).forEach(key => {
        const item = validations[key];
        if (item.element) {
          const isValid = item.element.runCustomValidation();
          if (!isValid) {
            allValid = false;
          }
        }
      });
    } else {
      // General required check for other steps
      const currentFields = steps[currentStepIndex].querySelectorAll("[required]");
      currentFields.forEach(field => {
        if (!field.value.trim() || (field.type === "checkbox" && !field.checked)) {
          allValid = false;
          field.style.borderColor = "red";
        } else {
          field.style.borderColor = "";
        }
      });
    }

    if (!allValid) {
      alert(window.translateJS("js_str_89", "يرجى ملء جميع الحقول المطلوبة بشكل صحيح للاستمرار."));
      return;
    }

    // Documents step: require at least one uploaded file before advancing.
    const uploadZones = steps[currentStepIndex].querySelectorAll(".file-upload-zone");
    if (uploadZones.length) {
      const anyUploaded = Array.from(uploadZones).some(zone => {
        const inp = zone.querySelector(".file-upload-input");
        return inp && inp.files && inp.files.length > 0;
      });
      if (!anyUploaded) {
        alert(window.translateJS("admissions_upload_required", "يرجى رفع مستند واحد على الأقل للمتابعة."));
        return;
      }
    }

    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      updateWizardUI();
    } else {
      alert(window.translateJS("js_str_129", "تم إرسال طلب التقديم المبدئي بنجاح! سيقوم مسؤول القبول بالتواصل معك عبر الهاتف والبريد لمطابقة المستندات."));
      wizardForm.reset();
      // Reset the custom upload zone visuals, which form.reset() does not touch.
      wizardForm.querySelectorAll(".file-upload-zone").forEach(zone => {
        zone.classList.remove("has-file", "dragover");
        const info = zone.querySelector(".upload-file-info");
        const hint = zone.querySelector(".upload-hint");
        if (info) info.hidden = true;
        if (hint) hint.style.display = "";
      });
      currentStepIndex = 0;
      updateWizardUI();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      updateWizardUI();
    }
  });

  updateWizardUI();
}

/* ==========================================
   8. DEPARTMENT SPECIFIC DYNAMIC LAYOUT
   ========================================== */
function initDepartmentPages() {
  const deptCode = document.body.getAttribute("data-dept");
  if (!deptCode || !window.CIS_DATA || !CIS_DATA.departments) return;

  const deptData = CIS_DATA.departments[deptCode];
  if (!deptData) return;

  const deptTitle = document.getElementById("dept-title");
  const deptDesc = document.getElementById("dept-overview-desc");
  const deptHeadName = document.getElementById("dept-head-name");
  const deptHeadRole = document.getElementById("dept-head-role");

  if (deptTitle) deptTitle.textContent = `<span data-i18n="js_str_2">قسم</span> ${deptData.name}`;
  if (deptDesc) deptDesc.textContent = deptData.overview;
  if (deptHeadName) deptHeadName.textContent = deptData.head;
  if (deptHeadRole) deptHeadRole.textContent = deptData.headRole;

  const yearsStat = document.getElementById("struct-years");
  const creditsStat = document.getElementById("struct-credits");
  const semestersStat = document.getElementById("struct-semesters");
  const degreeStat = document.getElementById("struct-degree");

  if (yearsStat) yearsStat.textContent = deptData.structure.years;
  if (creditsStat) creditsStat.textContent = deptData.structure.credits;
  if (semestersStat) semestersStat.textContent = deptData.structure.semesters;
  if (degreeStat) degreeStat.textContent = deptData.structure.degree;

  const careersGrid = document.getElementById("dept-careers-grid");
  if (careersGrid) {
    careersGrid.innerHTML = deptData.careers.map(car => `
      <div class="card career-card">
        <div class="career-icon">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <h4 class="career-title">${car.title}</h4>
        <p class="career-desc">${car.desc}</p>
      </div>
    `).join("");
  }

  renderDeptCourses(deptData.courses);
  initCoursesSearch(deptData.courses);

  const facultyGrid = document.getElementById("dept-faculty-grid");
  if (facultyGrid) {
    facultyGrid.innerHTML = deptData.faculty.map(fac => `
      <div class="card" style="text-align:center; padding:var(--space-md);">
        <img src="${fac.img}" alt="${fac.name}" style="width:90px; height:90px; border-radius:50%; object-fit:cover; margin-bottom:var(--space-xs); border: 2px solid var(--color-primary);">
        <h4 style="font-size:var(--font-size-base); margin-bottom:2px;">${fac.name}</h4>
        <span style="font-size:var(--font-size-xs); color:var(--text-muted); display:block; height:32px; line-height:1.3;">${fac.role}</span>
        <a href="faculty.html" class="btn btn-outline" style="padding:6px 12px; font-size:var(--font-size-xs); border-radius:6px; margin-top:8px; display:inline-flex;"><span data-i18n="js_str_32">السيرة الأكاديمية</span></a>
      </div>
    `).join("");
  }

  const labsStack = document.getElementById("dept-labs-stack");
  if (labsStack) {
    labsStack.innerHTML = deptData.labs.map((lab, index) => `
      <div class="card" style="display:flex; flex-direction:column; gap:8px;">
        <h4 style="font-size:var(--font-size-md); color:var(--color-primary);">${lab.name}</h4>
        <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5;">${lab.desc}</p>
      </div>
    `).join("");
  }

  const researchStack = document.getElementById("dept-research-stack");
  if (researchStack) {
    researchStack.innerHTML = deptData.research.map(res => `
      <div class="card" style="padding:var(--space-md); border-right:4px solid var(--color-accent-gold);">
        <h4 style="font-size:var(--font-size-base); margin-bottom:4px;">${res.title}</h4>
        <p style="font-size:var(--font-size-xs); color:var(--text-muted); line-height:1.5;">${res.desc}</p>
      </div>
    `).join("");
  }

  const deptFaqs = document.getElementById("dept-faqs-accordion");
  if (deptFaqs) {
    deptFaqs.innerHTML = deptData.faqs.map(faq => `
      <div class="accordion-item">
        <div class="accordion-header">${faq.q}</div>
        <div class="accordion-content">
          <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5;">${faq.a}</p>
        </div>
      </div>
    `).join("");
  }
}

function renderDeptCourses(courses) {
  const container = document.getElementById("dept-courses-table");
  if (!container) return;

  if (courses.length === 0) {
    container.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:var(--space-md); color:var(--text-muted);"><span data-i18n="js_str_7">لا توجد نتائج مطابقة لمصطلح البحث.</span></td></tr>`;
    return;
  }

  container.innerHTML = courses.map(course => `
    <tr>
      <td style="padding:var(--space-sm); font-weight:700; color:var(--color-primary);">${course.code}</td>
      <td style="padding:var(--space-sm); font-weight:600;">${course.name}</td>
      <td style="padding:var(--space-sm); font-size:var(--font-size-sm); color:var(--text-muted);">${course.term}</td>
      <td style="padding:var(--space-sm); font-size:var(--font-size-sm); color:var(--color-primary); font-weight:700;">${course.credits}</td>
    </tr>
  `).join("");
}

function initCoursesSearch(courses) {
  const searchInput = document.getElementById("course-search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filtered = courses.filter(course => 
      course.name.toLowerCase().includes(term) || 
      course.code.toLowerCase().includes(term) || 
      course.term.toLowerCase().includes(term)
    );
    renderDeptCourses(filtered);
  });
}

/* ==========================================
   9. FACULTY DIRECTORY LOGIC
   ========================================== */
function initFacultyDirectory() {
  const facultyGrid = document.getElementById("faculty-directory-grid");
  if (!facultyGrid || !window.CIS_DATA || !CIS_DATA.facultyList) return;

  const searchInput = document.getElementById("faculty-search-input");
  const filterSelect = document.getElementById("faculty-dept-filter");
  const items = CIS_DATA.facultyList;

  function renderList(list) {
    if (list.length === 0) {
      facultyGrid.innerHTML = `
        <div style="grid-column:span 12; text-align:center; padding:var(--space-xl); color:var(--text-muted);">
          <h3><span data-i18n="js_str_6">لا توجد نتائج مطابقة لمصطلح البحث أو ال<span data-i18n="js_str_2">قسم</span> المختار.</span></h3>
        </div>
      `;
      return;
    }

    facultyGrid.innerHTML = list.map(fac => `
      <div class="card faculty-card">
        <img src="${fac.img}" alt="${fac.name}" class="faculty-avatar">
        <span class="faculty-dept-badge">${fac.deptName}</span>
        <h3>${fac.name}</h3>
        <p class="faculty-role-text">${fac.role}</p>
        <div class="faculty-contact-strip">
          <span class="faculty-contact-chip">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"/></svg>
            ${fac.email}
          </span>
        </div>
        <button class="btn-profile" onclick="openFacultyModal('${fac.id}')"><span data-i18n="js_str_5">عرض <span data-i18n="js_str_32">السيرة الأكاديمية</span> الكاملة</span></button>
      </div>
    `).join("");
  }

  function filterList() {
    const term = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const dept = filterSelect ? filterSelect.value : "all";

    const filtered = items.filter(fac => {
      const matchSearch = fac.name.toLowerCase().includes(term) || 
                          fac.role.toLowerCase().includes(term) || 
                          fac.bio.toLowerCase().includes(term);
      const matchDept = (dept === "all") || (fac.deptId === dept);
      return matchSearch && matchDept;
    });

    renderList(filtered);
  }

  if (searchInput) searchInput.addEventListener("input", filterList);
  if (filterSelect) filterSelect.addEventListener("change", filterList);

  renderList(items);

  // Close modal when close button or backdrop is clicked
  const closeModalBtn = document.getElementById("faculty-modal-close");
  const modalOverlay = document.getElementById("faculty-details-modal");
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeFacultyModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeFacultyModal();
    });
  }
}

function openFacultyModal(id) {
  const modal = document.getElementById("faculty-details-modal");
  if (!modal || !window.CIS_DATA || !CIS_DATA.facultyList) return;

  const fac = CIS_DATA.facultyList.find(f => f.id === id);
  if (!fac) return;

  // Populate modal data
  document.getElementById("modal-fac-img").src = fac.img;
  document.getElementById("modal-fac-name").textContent = fac.name;
  document.getElementById("modal-fac-role").textContent = fac.role;
  document.getElementById("modal-fac-dept").textContent = fac.deptName;
  // The email chip contains an icon + inner <span>; write into the span so the
  // icon markup survives (faculty.html's modal override also relies on it).
  const emailEl = document.getElementById("modal-fac-email");
  const emailSpan = emailEl.querySelector("span");
  if (emailSpan) {
    emailSpan.textContent = fac.email;
  } else {
    emailEl.textContent = fac.email;
  }
  emailEl.href = `mailto:${fac.email}`;
  document.getElementById("modal-fac-office").textContent = fac.office;
  document.getElementById("modal-fac-bio").textContent = fac.bio;

  // Populate research interests
  const resContainer = document.getElementById("modal-fac-research");
  resContainer.innerHTML = fac.research.map(res => `<li>${res}</li>`).join("");

  // Populate courses
  const courseContainer = document.getElementById("modal-fac-courses");
  courseContainer.innerHTML = fac.courses.map(crs => `<li>${crs}</li>`).join("");

  // Populate publications
  const pubContainer = document.getElementById("modal-fac-pubs");
  pubContainer.innerHTML = fac.publications.map(pub => `<li style="margin-bottom:8px;">${pub}</li>`).join("");

  // Display modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeFacultyModal() {
  const modal = document.getElementById("faculty-details-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Attach openFacultyModal to window to allow inline onclick bindings
window.openFacultyModal = openFacultyModal;
window.closeFacultyModal = closeFacultyModal;

/* ==========================================
   10. STUDENT SERVICES HUB LOGIC
   ========================================== */
function initStudentServicesPortal() {
  const servicesPortal = document.querySelector("[data-portal-hub]");
  if (!servicesPortal || !window.CIS_DATA) return;

  // 1. Render LMS Courses
  const lmsList = document.getElementById("portal-lms-list");
  if (lmsList && CIS_DATA.lmsCourses) {
    lmsList.innerHTML = CIS_DATA.lmsCourses.map(crs => `
      <div class="lms-row">
        <div style="flex:1;">
          <span class="badge badge-primary" style="margin-bottom:4px; display:inline-block;">${crs.code}</span>
          <h4 style="font-size:var(--font-size-base); margin-bottom:2px; font-weight:700;">${crs.name}</h4>
          <span style="font-size:var(--font-size-xs); color:var(--text-muted);"><span data-i18n="js_str_67">أستاذ المادة:</span> ${crs.prof}</span>
        </div>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <span style="font-size:var(--font-size-xs); color:var(--text-muted); display:inline-flex; align-items:center; gap:4px;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
            ${crs.lectures} <span data-i18n="js_str_110">محاضرات</span>
          </span>
          <a class="btn btn-outline" style="padding:6px 14px; font-size:var(--font-size-xs); border-radius:var(--radius-full);" href="lectures.html?course=${crs.code}"><span data-i18n="js_str_66">تحميل المحاضرات</span></a>
        </div>
      </div>
    `).join("");
  }

  // 2. Render Internships Opportunities
  const internGrid = document.getElementById("portal-internships-grid");
  if (internGrid && CIS_DATA.internships) {
    internGrid.innerHTML = CIS_DATA.internships.map(intern => {
      // Detect "closed" state across both languages (data may be Arabic or English).
      const isClosed = /مغلق|closed/i.test(intern.status) || /انتهى|ended/i.test(intern.deadline);
      // Resolve button labels from the stored language directly, since this renders
      // before i18n.js has populated I18n.t on initial load.
      const isEn = (localStorage.getItem('cis_lang') || 'ar') === 'en';
      const closedText = isEn ? "Closed" : "مغلق";
      const registerText = isEn ? "Register Interest" : "سجّل اهتمامك";

      return `
        <div class="intern-card ${isClosed ? 'closed' : ''}">
          <div>
            <h4 style="font-size:var(--font-size-base); margin-bottom:6px; font-weight:700;">${intern.title}</h4>
            <span class="badge badge-gold" style="margin-bottom:10px; display:inline-block;">${intern.type}</span>
            <p style="font-size:var(--font-size-xs); color:var(--text-muted); display:flex; align-items:center; gap:4px;">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span data-i18n="js_str_21">آخر تقديم:</span> ${intern.deadline}
            </p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px solid rgba(15,15,16,0.06);">
            <span style="font-size:var(--font-size-xs); font-weight:700; color:${isClosed ? 'var(--text-muted)' : 'var(--color-primary)'}; display:inline-flex; align-items:center; gap:4px;">
              <span style="width:8px; height:8px; border-radius:50%; background:${isClosed ? '#9ca3af' : '#10b981'}; display:inline-block;"></span>
              ${intern.status}
            </span>
            ${isClosed
              ? `<button class="btn btn-outline" style="padding:6px 14px; font-size:var(--font-size-xs); border-radius:var(--radius-full); opacity:0.5;cursor:not-allowed;" disabled>${closedText}</button>`
              : `<a class="btn btn-primary" style="padding:6px 14px; font-size:var(--font-size-xs); border-radius:var(--radius-full);" href="apply-internship.html?opportunity=${encodeURIComponent(intern.id)}">${registerText}</a>`
            }
          </div>
        </div>
      `;
    }).join("");
  }

  // 3. Results Lookup Checker
  const resultsBtn = document.getElementById("portal-results-btn");
  const studentIdInput = document.getElementById("student-id-input");
  const resultsOutput = document.getElementById("student-results-output");

  if (resultsBtn && studentIdInput && resultsOutput) {
    resultsBtn.addEventListener("click", () => {
      const code = studentIdInput.value.trim();
      const studentData = CIS_DATA.studentResults[code];

      if (!studentData) {
        resultsOutput.innerHTML = `
          <div class="alert alert-info" style="margin-top:var(--space-md);">
            <span><span data-i18n="js_str_23">عذراً، لم نجد رقم أكاديمي مطابق. يرجى إدخال أرقام صحيحة (أرقام التجربة المتوفرة: 202601 أو 202602).</span></span>
          </div>
        `;
        return;
      }

      resultsOutput.innerHTML = `
        <div style="margin-top:var(--space-md); border-top:1px solid rgba(15,15,16,0.08); padding-top:var(--space-md);">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-sm); margin-bottom:var(--space-sm);">
            <div><strong><span data-i18n="js_str_26">اسم الطالب:</span></strong> ${studentData.name}</div>
            <div><strong><span data-i18n="js_str_61">الشعبة الدراسية:</span></strong> ${studentData.dept}</div>
            <div><strong><span data-i18n="js_str_106">الفصل الدراسي:</span></strong> ${studentData.term}</div>
            <div><strong><span data-i18n="js_str_60">المعدل التراكمي الفصل (</span>GPA):</strong> <span style="color:var(--color-primary); font-weight:800;">${studentData.gpa}</span></div>
          </div>
          
          <table class="custom-table" style="margin-top:var(--space-sm);">
            <thead>
              <tr>
                <th><span data-i18n="js_str_13">رمز المادة</span></th>
                <th><span data-i18n="js_str_77">اسم المقرر الدراسي</span></th>
                <th><span data-i18n="js_str_100">ال<span data-i18n="js_str_48">ساعات</span></span></th>
                <th><span data-i18n="js_str_80">التقدير الحاصل عليه</span></th>
              </tr>
            </thead>
            <tbody>
              ${studentData.grades.map(grade => `
                <tr>
                  <td style="padding:8px 12px; font-weight:700;">${grade.code}</td>
                  <td style="padding:8px 12px;">${grade.name}</td>
                  <td style="padding:8px 12px;">${grade.credits} <span data-i18n="js_str_48">ساعات</span></td>
                  <td style="padding:8px 12px; color:var(--color-primary); font-weight:700;">${grade.grade}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    });
  }

  // 4. Complaints System (Using State & DOM logs)
  const complaintsForm = document.getElementById("portal-complaints-form");
  const complaintsList = document.getElementById("portal-complaints-list");
  let userComplaints = [];

  function renderComplaints() {
    if (!complaintsList) return;
    if (userComplaints.length === 0) {
      complaintsList.innerHTML = `<p style="font-size:var(--font-size-xs); color:var(--text-muted); text-align:center; padding:12px;"><span data-i18n="js_str_125">لا توجد شكاوى أو استفسارات مسجلة باسمك حالياً.</span></p>`;
      return;
    }

    complaintsList.innerHTML = userComplaints.map(comp => `
      <div style="border-bottom:1px solid rgba(15,15,16,0.06); padding:10px 0; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:10px; color:var(--text-muted); display:block;"><span data-i18n="js_str_19">الرقم المرجعي:</span> #${comp.id} | ${comp.date}</span>
          <span style="font-size:var(--font-size-sm); font-weight:600; display:block;"><span data-i18n="js_str_126"><span data-i18n="js_str_2">قسم</span>:</span> ${comp.category}</span>
          <span style="font-size:11px; color:var(--text-muted); display:block;"><span data-i18n="services_identity_log_label">صفة مقدّم الشكوى</span>: ${comp.identity}</span>
          <p style="font-size:var(--font-size-xs); color:var(--text-muted);">${comp.text}</p>
        </div>
        <span class="badge badge-gold" style="font-size:10px;">${comp.status}</span>
      </div>
    `).join("");
  }

  if (complaintsForm) {
    complaintsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const compText = document.getElementById("complaint-text").value.trim();
      const compCat = document.getElementById("complaint-category").value;
      const identitySelect = document.getElementById("complaint-identity");
      const identityText = identitySelect
        ? (identitySelect.options[identitySelect.selectedIndex]?.text || "")
        : "";

      if (!compText) return;

      let catText = "";
      if (compCat === "portal") {
        catText = window.translateJS("js_str_38", "بوابة الخدمات");
      } else {
        const parts = (I18n.t && I18n.t["js_str_118"]) 
          ? I18n.t["js_str_118"].split(":") 
          : ["الامتحانات والكنترول", "أعضاء التدريس وشؤون دراسية"];
        const examsText = parts[0] ? parts[0].replace(/^[(\s"']+|[)\s"':,]+$/g, '') : "الامتحانات والكنترول";
        const academicText = parts[1] ? parts[1].replace(/^[(\s"']+|[)\s"':,]+$/g, '') : "أعضاء التدريس وشؤون دراسية";
        catText = compCat === "exams" ? examsText : academicText;
      }

      const newComplaint = {
        id: Math.floor(1000 + Math.random() * 9000),
        category: catText,
        identity: identityText,
        text: compText,
        date: new Date().toLocaleDateString("ar-EG"),
        status: window.translateJS("js_str_92", "قيد المراجعة الفورية")
      };

      userComplaints.push(newComplaint);
      complaintsForm.reset();
      renderComplaints();

      const part1 = window.translateJS("js_str_94", "تم إرسال الشكوى");
      const part2 = window.translateJS("js_str_105", "الاستفسار بنجاح! تم تعيين الرقم المرجعي");
      const part3 = window.translateJS("js_str_45", "للمتابعة.");
      alert(`${part1}/${part2} #${newComplaint.id} ${part3}`);
    });

    renderComplaints();
  }

  // 5. Certificates Form Application Request
  const certForm = document.getElementById("portal-cert-form");
  if (certForm) {
    certForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(window.translateJS("js_str_56", "تم استلام طلب استخراج الشهادة بنجاح! جاري تحضير الوثيقة وسنتواصل معك فور تجهيزها لدفع رسوم التمغات واستلامها من مكتب الشؤون."));
      certForm.reset();
    });
  }
}

/* ==========================================
   11. VIDEO LIGHTBOX OVERLAY
   ========================================== */
function initVideoLightbox() {
  const playBtn = document.getElementById("video-play-btn");
  if (!playBtn) return;

  playBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const lightbox = document.createElement("div");
    lightbox.id = "video-lightbox";
    lightbox.style.position = "fixed";
    lightbox.style.top = "0";
    lightbox.style.left = "0";
    lightbox.style.width = "100%";
    lightbox.style.height = "100%";
    lightbox.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    lightbox.style.display = "flex";
    lightbox.style.alignItems = "center";
    lightbox.style.justifyContent = "center";
    lightbox.style.zIndex = "99999";
    lightbox.style.opacity = "0";
    lightbox.style.transition = "opacity 0.3s ease";
    
    lightbox.innerHTML = `
      <div style="position:relative; width:90%; max-width:800px; aspect-ratio:16/9; background:#000; border-radius:var(--radius-md); overflow:hidden; box-shadow:var(--shadow-lg);">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/3i0edKWPjAs?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border:0;"></iframe>
        <button id="lightbox-close" style="position:absolute; top:12px; left:12px; background:rgba(255,255,255,0.2); color:#fff; border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; font-size:18px;">&times;</button>
      </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = "hidden";
    
    setTimeout(() => {
      lightbox.style.opacity = "1";
    }, 50);

    const closeBtn = lightbox.querySelector("#lightbox-close");
    
    function closeLightbox() {
      lightbox.style.opacity = "0";
      setTimeout(() => {
        lightbox.remove();
        document.body.style.overflow = "";
      }, 300);
    }
    
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (evt) => {
      if (evt.target === lightbox) closeLightbox();
    });
  });
}

/* ==========================================
   12. TABS AND ACCORDIONS
   ========================================== */
function initTabsAndAccordions() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.getAttribute("data-tab-target");
      const targetPanel = document.querySelector(targetSelector);
      if (!targetPanel) return;

      const siblingButtons = btn.parentElement.querySelectorAll("[data-tab-target]");
      siblingButtons.forEach(sib => sib.classList.remove("active"));
      
      const siblingPanels = targetPanel.parentElement.children;
      Array.from(siblingPanels).forEach(pane => pane.classList.remove("active"));

      btn.classList.add("active");
      targetPanel.classList.add("active");
    });
  });

  document.body.addEventListener("click", (e) => {
    const header = e.target.closest(".accordion-header");
    if (!header) return;

    const item = header.parentElement;
    const content = header.nextElementSibling;
    const isOpen = item.classList.contains("active");

    const parentGroup = item.parentElement;
    const allItems = parentGroup.querySelectorAll(".accordion-item");
    allItems.forEach(i => {
      i.classList.remove("active");
      const childContent = i.querySelector(".accordion-content");
      if (childContent) childContent.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/* ==========================================
   13. SCROLL TOP BUTTON
   ========================================== */
function initScrollTop() {
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================
   14. NEWS CENTER PAGE LOGIC
   ========================================== */
function initNewsPage() {
  const newsContainer = document.getElementById("news-page-grid");
  if (!newsContainer || !window.CIS_DATA || !CIS_DATA.news) return;

  const searchInput = document.getElementById("news-search-input");
  const categoryPills = document.querySelectorAll(".news-pill");
  const featuredWrapper = document.getElementById("featured-news-wrapper");
  const trendingContainer = document.getElementById("trending-news-list");

  let activeCategory = "all";
  let searchWord = "";

  // 1. Render Featured News Spotlight
  function renderFeatured() {
    if (!featuredWrapper) return;
    const featuredItem = CIS_DATA.news.find(item => item.featured) || CIS_DATA.news[0];
    if (!featuredItem) return;

    featuredWrapper.innerHTML = `
      <div class="card featured-news-card" style="display:grid; grid-template-columns:1.2fr 1fr; gap:var(--space-md); padding:0; overflow:hidden; border:none; box-shadow:var(--shadow-lg);">
        <div class="featured-img" style="background-image: url('${featuredItem.image}'); background-size:cover; background-position:center; min-height:300px;"></div>
        <div class="featured-content" style="padding:var(--space-lg); display:flex; flex-direction:column; justify-content:center;">
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span class="badge badge-primary">${featuredItem.category}</span>
            <span style="font-size:var(--font-size-xs); color:var(--text-muted);">${featuredItem.date}</span>
          </div>
          <h2 style="font-family:var(--font-headings); font-size:var(--font-size-xl); line-height:1.4; margin-bottom:12px; font-weight:800; color:var(--text-dark);">${featuredItem.title}</h2>
          <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.6; margin-bottom:var(--space-md);">${featuredItem.summary}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <span style="font-size:var(--font-size-xs); color:var(--text-muted); display:flex; align-items:center; gap:4px;">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              ${featuredItem.views} <span data-i18n="js_str_65">مشاهدة</span>
            </span>
            <button class="btn btn-primary" onclick="openNewsDetail(${featuredItem.id})" style="padding:8px 20px; font-size:var(--font-size-xs);"><span data-i18n="js_str_10"><span data-i18n="js_str_55">اقرأ الخبر</span> كاملاً</span></button>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Render Trending List (Sidebar)
  function renderTrending() {
    if (!trendingContainer) return;
    const trendingItems = CIS_DATA.news.filter(item => item.trending).slice(0, 4);

    trendingContainer.innerHTML = trendingItems.map((item, idx) => `
      <div class="trending-item" style="display:flex; gap:12px; padding:12px 0; border-bottom:1px solid rgba(15,15,16,0.06); cursor:pointer;" onclick="openNewsDetail(${item.id})">
        <span style="font-family:var(--font-headings); font-weight:800; font-size:1.8rem; color:var(--color-primary); line-height:1; min-width:30px;">٠${idx + 1}</span>
        <div>
          <span class="badge" style="background:var(--color-primary-light); color:var(--color-primary); font-size:9px; padding:2px 6px; margin-bottom:4px; display:inline-block;">${item.category}</span>
          <h4 style="font-size:var(--font-size-sm); line-height:1.4; font-weight:700; margin-bottom:4px;">${item.title}</h4>
          <span style="font-size:10px; color:var(--text-muted);">${item.date}</span>
        </div>
      </div>
    `).join("");
  }

  // 3. Render General News Grid (Filtered)
  function renderNewsGrid() {
    const filtered = CIS_DATA.news.filter(item => {
      const matchCat = (activeCategory === "all") || (item.category === activeCategory);
      const matchSearch = item.title.toLowerCase().includes(searchWord) ||
                          item.summary.toLowerCase().includes(searchWord) ||
                          item.body.toLowerCase().includes(searchWord);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      newsContainer.innerHTML = `
        <div style="grid-column:span 12; text-align:center; padding:var(--space-xl); color:var(--text-muted);">
          <h3><span data-i18n="js_str_3">لا توجد أخبار مطابقة لبحثك في هذا ال<span data-i18n="js_str_2">قسم</span>.</span></h3>
        </div>
      `;
      return;
    }

    newsContainer.innerHTML = filtered.map(item => `
      <article class="card news-card" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div>
          <div class="news-img-wrapper" style="background-image: url('${item.image}'); height:180px; background-size:cover; background-position:center; border-radius:var(--radius-md) var(--radius-md) 0 0; position:relative;">
            ${item.trending ? `<span class="badge badge-gold" style="position:absolute; top:10px; right:10px;"><span data-i18n="js_str_73">عاجل</span> / <span data-i18n="js_str_104">رائج</span></span>` : ""}
          </div>
          <div class="news-content" style="padding:var(--space-sm) var(--space-sm) 0 var(--space-sm);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span class="badge badge-primary">${item.category}</span>
              <span style="font-size:10px; color:var(--text-muted);">${item.date}</span>
            </div>
            <h3 style="font-size:var(--font-size-base); font-weight:700; line-height:1.4; margin-bottom:8px; color:var(--text-dark);">${item.title}</h3>
            <p style="font-size:var(--font-size-xs); color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${item.summary}</p>
          </div>
        </div>
        <div style="padding:0 var(--space-sm) var(--space-sm) var(--space-sm); display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(15,15,16,0.05); pt:8px; margin-top:8px;">
          <span style="font-size:10px; color:var(--text-muted); display:inline-flex; align-items:center; gap:2px;">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            ${item.views}
          </span>
          <button class="btn btn-outline" onclick="openNewsDetail(${item.id})" style="padding:4px 12px; font-size:10px; border-radius:var(--radius-full);"><span data-i18n="js_str_55">اقرأ الخبر</span></button>
        </div>
      </article>
    `).join("");
  }

  // Bind news category pill buttons
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category");
      renderNewsGrid();
    });
  });

  // Bind search box
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchWord = e.target.value.toLowerCase().trim();
      renderNewsGrid();
    });
  }

  // Initial loads
  renderFeatured();
  renderTrending();
  renderNewsGrid();

  // News detail modal overlay close wiring
  const closeNewsBtn = document.getElementById("news-modal-close");
  const newsModal = document.getElementById("news-detail-modal");
  if (closeNewsBtn) closeNewsBtn.addEventListener("click", closeNewsDetail);
  if (newsModal) {
    newsModal.addEventListener("click", (e) => {
      if (e.target === newsModal) closeNewsDetail();
    });
  }
}

// News detail modal actions
function openNewsDetail(id) {
  const modal = document.getElementById("news-detail-modal");
  if (!modal || !window.CIS_DATA || !CIS_DATA.news) return;

  const item = CIS_DATA.news.find(n => n.id === id);
  if (!item) return;

  // Increment views count mock
  item.views = (item.views || 0) + 1;

  // Populate modal data
  document.getElementById("modal-news-title").textContent = item.title;
  document.getElementById("modal-news-category").textContent = item.category;
  document.getElementById("modal-news-date").textContent = item.date;
  document.getElementById("modal-news-views").textContent = `${item.views} <span data-i18n="js_str_65">مشاهدة</span>`;
  document.getElementById("modal-news-readtime").textContent = `<span data-i18n="js_str_111">وقت القراءة:</span> ${item.readTime}`;
  document.getElementById("modal-news-img").src = item.image;
  document.getElementById("modal-news-body").innerHTML = `<p>${item.body}</p><p style="margin-top:12px;"><span data-i18n="js_str_107">نحث جميع طلابنا وهيئتنا الأكاديمية على البقاء مطلعين على آخر مستجدات المعهد والتعليمات الرسمية الصادرة من قطاعات شؤون الطلاب، رعاية الشباب، وأقسام التدريب والتوظيف المختلفة.</span></p>`;

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  // Re-render other lists to update views count in real time
  const searchInput = document.getElementById("news-search-input");
  if (searchInput) {
    // If we are on the news page, trigger updates
    const featuredWrapper = document.getElementById("featured-news-wrapper");
    if (featuredWrapper) {
      // Re-trigger rendering
      const activePill = document.querySelector(".news-pill.active");
      const activeCategory = activePill ? activePill.getAttribute("data-category") : "all";
      const trendingContainer = document.getElementById("trending-news-list");
      const newsContainer = document.getElementById("news-page-grid");
      
      // spotlight featured update
      const featuredItem = CIS_DATA.news.find(item => item.featured) || CIS_DATA.news[0];
      const viewsSpotlight = featuredWrapper.querySelector(".featured-content span");
      if (viewsSpotlight && featuredItem.id === id) {
        viewsSpotlight.innerHTML = `<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> ${item.views} <span data-i18n="js_str_65">مشاهدة</span>`;
      }
      
      // grid update
      const allNewsCards = newsContainer.querySelectorAll(".news-card");
      allNewsCards.forEach(card => {
        const btn = card.querySelector("button");
        if (btn && btn.getAttribute("onclick") === `openNewsDetail(${id})`) {
          const viewsSpan = card.querySelector("span");
          if (viewsSpan) viewsSpan.innerHTML = `<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> ${item.views}`;
        }
      });
    }
  }
}

function closeNewsDetail() {
  const modal = document.getElementById("news-detail-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Bind news details globally
window.openNewsDetail = openNewsDetail;
window.closeNewsDetail = closeNewsDetail;


/* ==========================================
   15. EVENTS HUB PAGE LOGIC
   ========================================== */
function initEventsPage() {
  const upcomingGrid = document.getElementById("upcoming-events-list");
  const pastGrid = document.getElementById("past-events-list");
  if (!upcomingGrid && !pastGrid) return; // Not on events page

  const events = window.CIS_DATA ? CIS_DATA.events : [];

  // 1. Render List Views (Upcoming vs Past)
  function renderUpcoming() {
    if (!upcomingGrid) return;
    const list = events.filter(e => e.type === "upcoming");

    upcomingGrid.innerHTML = list.map(item => `
      <div class="card event-card" style="display:grid; grid-template-columns: 200px 1fr; gap:var(--space-md); padding:0; overflow:hidden;">
        <div style="background-image:url('${item.image}'); background-size:cover; background-position:center; min-height:180px;"></div>
        <div style="padding:var(--space-md); display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span class="badge badge-primary">${item.tag}</span>
              <span style="font-size:var(--font-size-xs); color:var(--color-primary); font-weight:700;">${item.day} ${item.month} ${item.year}</span>
            </div>
            <h3 style="font-family:var(--font-headings); font-size:var(--font-size-md); font-weight:800; margin-bottom:6px; color:var(--text-dark);">${item.title}</h3>
            <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${item.desc}</p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(15,15,16,0.06); pt:10px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; gap:12px; font-size:var(--font-size-xs); color:var(--text-muted);">
              <span style="display:inline-flex; align-items:center; gap:3px;">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                ${item.time}
              </span>
              <span style="display:inline-flex; align-items:center; gap:3px;">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                ${item.location}
              </span>
            </div>
            <button class="btn btn-primary" onclick="openRsvpModal(${item.id}, '${item.title}')" style="padding:6px 16px; font-size:var(--font-size-xs);"><span data-i18n="js_str_116">حجز مقعد مجاناً</span></button>
          </div>
        </div>
      </div>
    `).join("");
  }

  function renderPast() {
    if (!pastGrid) return;
    const list = events.filter(e => e.type === "past");

    pastGrid.innerHTML = list.map(item => `
      <div class="card event-card" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div>
          <div style="background-image:url('${item.image}'); height:160px; background-size:cover; background-position:center; border-radius:var(--radius-md) var(--radius-md) 0 0; position:relative;">
            <span class="badge" style="background:rgba(15,15,16,0.8); color:white; position:absolute; top:10px; right:10px;">${item.day} ${item.month}</span>
          </div>
          <div style="padding:var(--space-sm);">
            <span class="badge" style="background:var(--color-primary-light); color:var(--color-primary); margin-bottom:6px; font-size:10px;">${item.tag}</span>
            <h3 style="font-size:var(--font-size-base); font-weight:700; margin-bottom:6px; line-height:1.4;">${item.title}</h3>
            <p style="font-size:var(--font-size-xs); color:var(--text-muted); line-height:1.5;">${item.desc}</p>
          </div>
        </div>
        <div style="padding:var(--space-sm); border-top:1px solid rgba(15,15,16,0.06);">
          <h4 style="font-size:11px; font-family:var(--font-headings); margin-bottom:6px; color:var(--text-dark);"><span data-i18n="js_str_78">معرض الصور الخاص بالحدث:</span></h4>
          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px;">
            ${item.gallery.map((img, idx) => `
              <div onclick="openEventLightbox('${img}', '${item.title}')" style="background-image:url('${img}'); background-size:cover; background-position:center; aspect-ratio:4/3; border-radius:4px; cursor:zoom-in; border:1px solid rgba(0,0,0,0.08); transition:var(--transition-fast);" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1"></div>
            `).join("")}
          </div>
        </div>
      </div>
    `).join("");
  }

  // 2. Render Calendar Interactive Layout
  function renderCalendar() {
    const calendarGrid = document.getElementById("calendar-grid-days");
    if (!calendarGrid) return;

    // We will build a calendar mock grid for July 2026.
    // July 2026 starts on a Wednesday <span data-i18n="js_str_36">(الأربعاء).</span>
    // Let's create an offset of 3 blank days <span data-i18n="js_str_79">(الأحد، الإثنين، الثلاثاء).</span>
    const startOffset = 3;
    const totalDays = 31;
    let gridHtml = "";

    // Blank slots
    for (let i = 0; i < startOffset; i++) {
      gridHtml += `<div class="cal-day-slot blank"></div>`;
    }

    // Days slots
    for (let d = 1; d <= totalDays; d++) {
      // Check if this day has an event in July 2026.
      // Day 25 has <span data-i18n="js_str_53">"يوم الإرشاد الأكاديمي للطلاب المستجدين"</span>
      const eventOnThisDay = events.find(e => parseInt(e.day, 10) === d && e.month === window.translateJS("js_str_46", "يوليو") && e.year === "2026");

      gridHtml += `
        <div class="cal-day-slot ${eventOnThisDay ? 'has-event' : ''}" ${eventOnThisDay ? `onclick="showCalendarDayEvent(${eventOnThisDay.id})"` : ""}>
          <span class="day-number">${d}</span>
          ${eventOnThisDay ? `<span class="event-dot"></span>` : ""}
        </div>
      `;
    }

    calendarGrid.innerHTML = gridHtml;

    // Show initial highlight for July 25th event
    showCalendarDayEvent(1);
  }

  // Init page components
  renderUpcoming();
  renderPast();
  renderCalendar();

  // RSVP Form submit handling
  const rsvpForm = document.getElementById("rsvp-form");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const sName = document.getElementById("rsvp-student-name").value.trim();
      const sId = document.getElementById("rsvp-student-id").value.trim();
      const sEmail = document.getElementById("rsvp-student-email").value.trim();

      if (!sName || !sId || !sEmail) {
        alert(window.translateJS("js_str_102", "يرجى ملء جميع الحقول المطلوبة للتسجيل."));
        return;
      }

      const title = document.getElementById('rsvp-event-title').textContent;
      const rsvpMsg1 = window.translateJS("js_str_33", "تم حجز مقعدك بنجاح في حدث \"");
      const rsvpMsg2 = window.translateJS("js_str_16", "تم إرسال كود الحجز وتذكرة الدخول للبريد الإلكتروني المرفق.");
      alert(`${rsvpMsg1}${title}"!\n${rsvpMsg2}`);
      closeRsvpModal();
      rsvpForm.reset();
    });
  }

  // RSVP close buttons
  const closeRsvpBtn = document.getElementById("rsvp-modal-close");
  const rsvpModal = document.getElementById("rsvp-modal");
  if (closeRsvpBtn) closeRsvpBtn.addEventListener("click", closeRsvpModal);
  if (rsvpModal) {
    rsvpModal.addEventListener("click", (e) => {
      if (e.target === rsvpModal) closeRsvpModal();
    });
  }
}

// Interactive Calendar Click Handler
function showCalendarDayEvent(eventId) {
  const panel = document.getElementById("calendar-event-details");
  if (!panel || !window.CIS_DATA) return;

  const item = CIS_DATA.events.find(e => e.id === eventId);
  if (!item) {
    panel.innerHTML = `<p style="color:var(--text-muted); font-size:var(--font-size-sm); text-align:center;"><span data-i18n="js_str_128">اختر يوماً مميزاً بنقطة برتقالية لعرض تفاصيل الحدث الخاص به.</span></p>`;
    return;
  }

  panel.innerHTML = `
    <div class="card" style="padding:var(--space-md); border-right:4px solid var(--color-primary); box-shadow:var(--shadow-md); animation:fade-in 0.4s ease;">
      <span class="badge badge-primary" style="margin-bottom:6px;">${item.tag}</span>
      <h3 style="font-family:var(--font-headings); font-size:var(--font-size-md); font-weight:800; margin-bottom:8px;">${item.title}</h3>
      <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${item.desc}</p>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:var(--font-size-xs); color:var(--text-muted); border-top:1px solid rgba(15,15,16,0.06); padding-top:8px; margin-bottom:12px;">
        <span>📅 <span data-i18n="js_str_20">التاريخ:</span> ${item.day} ${item.month} ${item.year}</span>
        <span>⏰ <span data-i18n="js_str_127">الوقت:</span> ${item.time}</span>
        <span>📍 <span data-i18n="js_str_68">الموقع:</span> ${item.location}</span>
      </div>
      
      ${item.type === "upcoming" ? `
        <button class="btn btn-primary" style="width:100%; padding:8px;" onclick="openRsvpModal(${item.id}, '${item.title}')"><span data-i18n="js_str_63">حجز تذكرة <span data-i18n="js_str_8">حضور</span> مجانية</span></button>
      ` : `
        <span class="badge badge-gold" style="width:100%; text-align:center; padding:6px; display:block;"><span data-i18n="js_str_86">هذا الحدث قد انتهى بنجاح</span></span>
      `}
    </div>
  `;

  // Highlight active slot in calendar days grid
  const days = document.querySelectorAll(".cal-day-slot");
  days.forEach(day => {
    const num = day.querySelector(".day-number");
    if (num && parseInt(num.textContent, 10) === parseInt(item.day, 10)) {
      day.classList.add("active");
    } else {
      day.classList.remove("active");
    }
  });
}

// RSVP Modal Handlers
function openRsvpModal(id, title) {
  const modal = document.getElementById("rsvp-modal");
  if (!modal) return;

  document.getElementById("rsvp-event-title").textContent = title;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeRsvpModal() {
  const modal = document.getElementById("rsvp-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Past Events Gallery Lightbox
function openEventLightbox(imgUrl, eventTitle) {
  const lightbox = document.createElement("div");
  lightbox.style.position = "fixed";
  lightbox.style.inset = "0";
  lightbox.style.backgroundColor = "rgba(15, 15, 16, 0.9)";
  lightbox.style.backdropFilter = "blur(8px)";
  lightbox.style.display = "flex";
  lightbox.style.flexDirection = "column";
  lightbox.style.alignItems = "center";
  lightbox.style.justifyContent = "center";
  lightbox.style.zIndex = "999999";
  lightbox.style.opacity = "0";
  lightbox.style.transition = "opacity 0.3s ease";
  lightbox.style.padding = "var(--space-md)";

  lightbox.innerHTML = `
    <div style="position:relative; max-width:80%; max-height:80%;">
      <img src="${imgUrl}" alt="${eventTitle}" style="width:100%; height:auto; max-height:75vh; border-radius:var(--radius-md); box-shadow:var(--shadow-lg); object-fit:contain; border:4px solid white;">
      <button id="gallery-lightbox-close" style="position:absolute; top:-40px; left:0; background:rgba(255,255,255,0.2); color:white; border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; font-size:18px; border:none;">&times;</button>
    </div>
    <div style="color:white; margin-top:16px; font-family:var(--font-headings); font-weight:700; font-size:var(--font-size-base); text-shadow:0 2px 4px rgba(0,0,0,0.5);">${eventTitle}</div>
  `;

  document.body.appendChild(lightbox);
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    lightbox.style.opacity = "1";
  }, 50);

  const closeBtn = lightbox.querySelector("#gallery-lightbox-close");
  function closeLbox() {
    lightbox.style.opacity = "0";
    setTimeout(() => {
      lightbox.remove();
      document.body.style.overflow = "";
    }, 300);
  }
  closeBtn.addEventListener("click", closeLbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLbox();
  });
}

function openVideoFrameModal(embedUrl, title) {
  const lightbox = document.createElement("div");
  lightbox.style.position = "fixed";
  lightbox.style.inset = "0";
  lightbox.style.backgroundColor = "rgba(15, 15, 16, 0.9)";
  lightbox.style.backdropFilter = "blur(8px)";
  lightbox.style.display = "flex";
  lightbox.style.flexDirection = "column";
  lightbox.style.alignItems = "center";
  lightbox.style.justifyContent = "center";
  lightbox.style.zIndex = "999999";
  lightbox.style.opacity = "0";
  lightbox.style.transition = "opacity 0.3s ease";
  lightbox.style.padding = "var(--space-md)";

  lightbox.innerHTML = `
    <div style="position:relative; width:90%; max-width:800px; aspect-ratio:16/9; background:#000; border-radius:var(--radius-md); overflow:hidden; box-shadow:var(--shadow-lg);">
      <iframe width="100%" height="100%" src="${embedUrl}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border:0;"></iframe>
      <button id="video-frame-close" style="position:absolute; top:12px; left:12px; background:rgba(255,255,255,0.2); color:#fff; border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; font-size:18px; border:none;">&times;</button>
    </div>
    <div style="color:white; margin-top:16px; font-family:var(--font-headings); font-weight:700; font-size:var(--font-size-base);">${title}</div>
  `;

  document.body.appendChild(lightbox);
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    lightbox.style.opacity = "1";
  }, 50);

  const closeVideoBtn = lightbox.querySelector("#video-frame-close");
  function closeVideoModal() {
    lightbox.style.opacity = "0";
    setTimeout(() => {
      lightbox.remove();
      document.body.style.overflow = "";
    }, 300);
  }
  closeVideoBtn.addEventListener("click", closeVideoModal);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeVideoModal();
  });
}

window.openVideoFrameModal = openVideoFrameModal;


/* ==========================================
   16. MEDIA CENTER PAGE LOGIC
   ========================================== */
function initMediaPage() {
  const gridContainer = document.getElementById("media-grid-container");
  if (!gridContainer || !window.CIS_DATA || !CIS_DATA.media) return;

  const tabBtns = document.querySelectorAll(".media-tab-btn");
  const media = CIS_DATA.media;

  // Render photo album cards
  function renderPhotos() {
    gridContainer.innerHTML = (media.photos || []).map(p => `
      <div class="media-card">
        <div class="media-thumbnail-wrapper" style="background-image:url('${p.image}');"></div>
        <div class="media-info">
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
        </div>
      </div>
    `).join("");
  }

  // Render video cards (click opens the embedded player modal)
  function renderVideos() {
    gridContainer.innerHTML = (media.videos || []).map(v => `
      <div class="media-card" style="cursor:pointer;"
        onclick="openVideoFrameModal('${v.url}', '${(v.title || '').replace(/'/g, "\\'")}')">
        <div class="media-thumbnail-wrapper" style="background-image:url('${v.thumbnail}');">
          <div class="media-overlay-play">
            <div class="media-play-icon">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
        <div class="media-info">
          <h4>${v.title}</h4>
          <p>${v.desc}</p>
        </div>
      </div>
    `).join("");
  }

  function switchTab(tab) {
    const target = tab === "videos" ? "videos" : "photos";
    tabBtns.forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === target));
    if (target === "videos") {
      renderVideos();
    } else {
      renderPhotos();
    }
  }

  // Clicking a tab button switches content and records the choice in the URL hash
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");
      switchTab(tab);
      history.replaceState(null, "", `#${tab === "videos" ? "videos" : "photos"}`);
    });
  });

  // Deep-link support: the nav dropdown links to media.html#photos / media.html#videos.
  // Activate the matching tab on load, and react to later hash changes.
  function tabFromHash() {
    return (window.location.hash || "").replace("#", "") === "videos" ? "videos" : "photos";
  }
  switchTab(tabFromHash());
  window.addEventListener("hashchange", () => switchTab(tabFromHash()));
}
window.initMediaPage = initMediaPage;


/* ==========================================
   17. CONTACT PAGE LOGIC
   ========================================== */
function setupVanillaFormValidation(form, validations) {
  if (!form) return;

  function setValidationState(input, isValid, errorMessage) {
    const parent = input.closest(".form-group") || input.closest(".form-field");
    if (!parent) return;

    let feedback = parent.querySelector(".invalid-feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      parent.appendChild(feedback);
    }

    if (isValid) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      feedback.textContent = "";
      feedback.style.display = "none";
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      feedback.textContent = errorMessage;
      feedback.style.display = "block";
    }
  }

  // Wire up listeners
  Object.keys(validations).forEach(fieldId => {
    const rules = validations[fieldId];
    const input = form.querySelector(`#${fieldId}`);
    if (input) {
      // If it's a mobile phone field, restrict chars in real time
      if (rules.isPhone) {
        input.addEventListener("input", (e) => {
          e.target.value = e.target.value.replace(/\D/g, "");
        });
      }

      const runValidation = () => {
        const result = rules.validate(input.value);
        setValidationState(input, result.isValid, result.msg);
        return result.isValid;
      };

      input.addEventListener("input", runValidation);
      input.addEventListener("blur", runValidation);
      input.runCustomValidation = runValidation;
    }
  });

  form.addEventListener("submit", (e) => {
    let allValid = true;
    Object.keys(validations).forEach(fieldId => {
      const input = form.querySelector(`#${fieldId}`);
      if (input && input.runCustomValidation) {
        const isValid = input.runCustomValidation();
        if (!isValid) {
          allValid = false;
        }
      }
    });

    if (!allValid) {
      e.preventDefault();
      e.stopImmediatePropagation();
      alert(window.translateJS("js_str_89", "يرجى ملء جميع الحقول المطلوبة بشكل صحيح للاستمرار."));
    }
  });

  form.addEventListener("reset", () => {
    form.querySelectorAll("input, textarea, select").forEach(field => {
      field.classList.remove("is-valid", "is-invalid");
      field.style.borderColor = "";
      const parent = field.closest(".form-group") || field.closest(".form-field");
      if (parent) {
        const feedback = parent.querySelector(".invalid-feedback");
        if (feedback) {
          feedback.textContent = "";
          feedback.style.display = "none";
        }
      }
    });
  });
}

function initContactPage() {
  const contactForm = document.getElementById("contact-page-form");
  const deptContainer = document.getElementById("contact-depts-grid");
  const emergencyTable = document.getElementById("contact-emergencies-table");
  if (!contactForm && !deptContainer && !emergencyTable) return;

  // Convert a display phone (possibly with Arabic-Indic digits and dashes)
  // into a dialable ASCII tel: value.
  function toTelHref(phone) {
    const ascii = phone.replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
    return "tel:" + ascii.replace(/[^\d+]/g, "");
  }

  // Render department contacts
  if (deptContainer && window.CIS_DATA && CIS_DATA.contacts) {
    deptContainer.innerHTML = CIS_DATA.contacts.departments.map(dept => `
      <div class="card" style="padding:var(--space-md); border-top: 4px solid var(--color-primary); display:flex; flex-direction:column; gap:10px; margin:0;">
        <h4 style="font-family:var(--font-headings); font-size:var(--font-size-base); font-weight:800; color:var(--text-dark);">${dept.name}</h4>
        <div style="font-size:var(--font-size-xs); color:var(--text-muted); display:flex; flex-direction:column; gap:6px; flex:1;">
          <span>✉️ <a href="mailto:${dept.email}" style="color:var(--color-primary); font-weight:700;">${dept.email}</a></span>
          <span style="font-size:10px; background:var(--color-bg-neutral); padding:6px 8px; border-radius:6px; line-height:1.5;">⏰ ${dept.hours}</span>
        </div>
        <a href="${toTelHref(dept.phone)}" class="btn btn-outline" style="justify-content:center; gap:8px; padding:8px 0; font-weight:800; font-size:var(--font-size-sm); direction:ltr;">📞 ${dept.phone}</a>
      </div>
    `).join("");
  }

  // Render emergency contacts
  if (emergencyTable && window.CIS_DATA && CIS_DATA.contacts) {
    emergencyTable.innerHTML = CIS_DATA.contacts.emergencies.map(e => `
      <tr>
        <td style="padding:var(--space-sm); font-weight:700;">${e.service}</td>
        <td style="padding:var(--space-sm); color:var(--color-primary); font-weight:800;">${e.phone}</td>
      </tr>
    `).join("");
  }

  // Everything below concerns the inquiry form, which was removed from
  // contact.html; keep it guarded in case the form returns on another page.
  if (!contactForm) return;

  const contactValidationSpecs = {
    "contact-name": {
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        const nameRegex = /^[a-zA-Z\u0621-\u064A\u0671-\u06D3\u06D5\s]+$/;
        if (!nameRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_name_invalid", "يجب أن يحتوي الاسم على حروف ومسافات فقط ولا يحتوي على أرقام أو رموز.") };
        }
        return { isValid: true };
      }
    },
    "contact-phone": {
      isPhone: true,
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        const phoneRegex = /^01\d{9}$/;
        if (!phoneRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_phone_invalid", "يجب أن يكون رقم الهاتف مكوناً من 11 رقماً ويبدأ بـ 01.") };
        }
        return { isValid: true };
      }
    },
    "contact-email": {
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_email_invalid", "يرجى إدخال بريد إلكتروني صحيح (مثال: student@gmail.com).") };
        }
        return { isValid: true };
      }
    },
    "contact-message": {
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        return { isValid: true };
      }
    }
  };

  setupVanillaFormValidation(contactForm, contactValidationSpecs);

  // Form submit trigger
  contactForm.addEventListener("submit", (e) => {
    if (!e.defaultPrevented) {
      e.preventDefault();
      alert(window.translateJS("js_str_1", "شكرًا لك! تم إرسال رسالتك وقنوات الدعم الفني أو الإداري ستقوم بالرد عليك في غضون ٢٤ ساعة."));
      contactForm.reset();
    }
  });
}

function initHomepageContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const contactValidationSpecs = {
    "contact-name": {
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        const nameRegex = /^[a-zA-Z\u0621-\u064A\u0671-\u06D3\u06D5\s]+$/;
        if (!nameRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_name_invalid", "يجب أن يحتوي الاسم على حروف ومسافات فقط ولا يحتوي على أرقام أو رموز.") };
        }
        return { isValid: true };
      }
    },
    "contact-phone": {
      isPhone: true,
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        const phoneRegex = /^01\d{9}$/;
        if (!phoneRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_phone_invalid", "يجب أن يكون رقم الهاتف مكوناً من 11 رقماً ويبدأ بـ 01.") };
        }
        return { isValid: true };
      }
    },
    "contact-email": {
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmed)) {
          return { isValid: false, msg: window.translateJS("val_email_invalid", "يرجى إدخال بريد إلكتروني صحيح (مثال: student@gmail.com).") };
        }
        return { isValid: true };
      }
    },
    "contact-msg": {
      validate: (val) => {
        const trimmed = val.trim();
        if (!trimmed) {
          return { isValid: false, msg: window.translateJS("val_required", "هذا الحقل مطلوب.") };
        }
        return { isValid: true };
      }
    }
  };

  setupVanillaFormValidation(form, contactValidationSpecs);

  form.addEventListener("submit", (e) => {
    if (!e.defaultPrevented) {
      e.preventDefault();
      alert(window.translateJS("js_str_1", "شكرًا لك! تم إرسال رسالتك وقنوات الدعم الفني أو الإداري ستقوم بالرد عليك في غضون ٢٤ ساعة."));
      form.reset();
    }
  });
}

// Map Zoom Simulator Controls
let mapScale = 1;
function zoomMockMap(factor) {
  const mapImage = document.getElementById("mock-map-image");
  if (!mapImage) return;
  mapScale = Math.max(0.7, Math.min(3, mapScale + factor));
  mapImage.style.transform = `scale(${mapScale})`;
}
window.zoomMockMap = zoomMockMap;


/* ==========================================
   18. QUALITY ASSURANCE PAGE LOGIC
   ========================================== */
function initQualityPage() {
  const objectivesList = document.getElementById("qa-objectives-list");
  if (!objectivesList || !window.CIS_DATA || !CIS_DATA.qualityAssurance) return;

  // Render objectives
  objectivesList.innerHTML = CIS_DATA.qualityAssurance.objectives.map(obj => `
    <li style="font-size:var(--font-size-sm); color:var(--text-muted); display:flex; gap:10px; align-items:flex-start; margin-bottom:12px;">
      <svg width="18" height="18" fill="none" stroke="var(--color-primary)" stroke-width="3" viewBox="0 0 24 24" style="min-width:18px; margin-top:2px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      ${obj}
    </li>
  `).join("");

  // Render reports list
  const reportsList = document.getElementById("qa-reports-list");
  if (reportsList) {
    reportsList.innerHTML = CIS_DATA.qualityAssurance.reports.map(rep => `
      <div class="qa-doc-row" style="animation: fade-in 0.4s ease;">
        <div>
          <span style="font-size:10px; color:var(--text-muted); display:block;"><span data-i18n="js_str_35">تاريخ التقرير:</span> ${rep.date}</span>
          <span style="font-weight:700; font-size:var(--font-size-sm);">${rep.title}</span>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <span class="badge badge-success" style="font-size:10px;"><span data-i18n="js_str_17">الحالة:</span> ${rep.status}</span>
          <a href="assets/docs/quality-report.pdf" download class="btn btn-outline" style="padding:4px 12px; font-size:10px;"><span data-i18n="js_str_29">تحميل التقرير</span></a>
        </div>
      </div>
    `).join("");
  }

  // Render document checklist
  const docContainer = document.getElementById("qa-documents-list");
  if (docContainer) {
    docContainer.innerHTML = CIS_DATA.qualityAssurance.documents.map(d => `
      <div class="card" style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-sm) var(--space-md); margin-bottom:8px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:1.5rem;">📄</span>
          <div>
            <h4 style="font-size:var(--font-size-sm); font-weight:700; color:var(--text-dark);">${d.name}</h4>
            <span style="font-size:10px; color:var(--text-muted);"><span data-i18n="js_str_132">حجم الملف:</span> ${d.size}</span>
          </div>
        </div>
        <a href="assets/docs/quality-report.pdf" download class="btn btn-primary" style="padding:6px 14px; font-size:var(--font-size-xs);"><span data-i18n="js_str_103">تحميل النموذج</span></a>
      </div>
    `).join("");
  }
}


/* ==========================================
   19. INFORMATION TECHNOLOGY UNIT
   ========================================== */
function initItUnitPage() {
  const servicesList = document.getElementById("it-services-grid");
  if (!servicesList || !window.CIS_DATA || !CIS_DATA.itUnit) return;

  // Render IT Services catalog
  servicesList.innerHTML = CIS_DATA.itUnit.services.map(s => `
    <div class="card" style="padding:var(--space-md); display:flex; flex-direction:column; justify-content:space-between; border-top: 4px solid var(--color-primary);">
      <div>
        <h4 style="font-family:var(--font-headings); font-size:var(--font-size-base); font-weight:800; margin-bottom:6px; color:var(--text-dark);">${s.title}</h4>
        <p style="font-size:var(--font-size-xs); color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${s.desc}</p>
      </div>
      <a href="${s.link}" class="btn btn-outline" style="width:100%; text-align:center; padding:8px 0; font-size:var(--font-size-xs);"><span data-i18n="js_str_82">الدخول للخدمة</span></a>
    </div>
  `).join("");

  // Render FAQs
  const faqList = document.getElementById("it-faqs-accordion");
  if (faqList) {
    faqList.innerHTML = CIS_DATA.itUnit.faqs.map(faq => `
      <div class="accordion-item">
        <div class="accordion-header">${faq.q}</div>
        <div class="accordion-content">
          <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.6;">${faq.a}</p>
        </div>
      </div>
    `).join("");
  }

  // IT Ticket Support Logger Form
  const ticketForm = document.getElementById("it-support-form");
  const ticketList = document.getElementById("it-support-log-list");
  let itTickets = [];

  function renderTickets() {
    if (!ticketList) return;
    if (itTickets.length === 0) {
      ticketList.innerHTML = `<p style="font-size:var(--font-size-xs); color:var(--text-muted); text-align:center; padding:16px;"><span data-i18n="js_str_30">لا توجد طلبات دعم فني مسجلة باسمك حالياً.</span></p>`;
      return;
    }
    ticketList.innerHTML = itTickets.map(t => `
      <div class="card" style="padding:var(--space-sm); border-right:4px solid var(--color-accent-gold); margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; animation: fade-in 0.4s ease;">
        <div>
          <span style="font-size:9px; color:var(--text-muted); display:block;"><span data-i18n="js_str_59">رقم التذكرة:</span> #${t.id} | ${t.date}</span>
          <h4 style="font-size:var(--font-size-sm); font-weight:700; margin-bottom:2px;">${t.subject}</h4>
          <p style="font-size:var(--font-size-xs); color:var(--text-muted);">${t.details}</p>
        </div>
        <span class="badge badge-gold" style="font-size:10px; white-space:nowrap;">${t.status}</span>
      </div>
    `).join("");
  }

  if (ticketForm) {
    ticketForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const subVal = document.getElementById("it-ticket-subject").value.trim();
      const detVal = document.getElementById("it-ticket-details").value.trim();
      const catVal = document.getElementById("it-ticket-category").value;

      if (!subVal || !detVal) return;

      let subPrefix = "";
      if (catVal === 'email') {
        subPrefix = window.translateJS("js_str_11", "البريد الجامعي");
      } else {
        const parts = (I18n.t && I18n.t["js_str_15"]) 
          ? I18n.t["js_str_15"].split(":") 
          : ["البوابة الذكية", "الشبكات والواي فاي"];
        const portalText = parts[0] ? parts[0].replace(/^[(\s"']+|[)\s"':,]+$/g, '') : "البوابة الذكية";
        const networkText = parts[1] ? parts[1].replace(/^[(\s"']+|[)\s"':,]+$/g, '') : "الشبكات والواي فاي";
        subPrefix = catVal === 'portal' ? portalText : networkText;
      }

      const newTicket = {
        id: Math.floor(100000 + Math.random() * 900000),
        subject: `[${subPrefix}] ${subVal}`,
        details: detVal,
        date: new Date().toLocaleDateString("ar-EG"),
        status: window.translateJS("js_str_47", "قيد المراجعة الفنية")
      };

      itTickets.push(newTicket);
      ticketForm.reset();
      renderTickets();

      const ticketMsg1 = window.translateJS("js_str_39", "تم فتح تذكرة دعم فني جديدة برقم");
      const ticketMsg2 = window.translateJS("js_str_87", "سيتصل بك مهندس دعم فني من وحدة تكنولوجيا المعلومات فور مراجعة المشكلة.");
      alert(`${ticketMsg1} #${newTicket.id}!\n${ticketMsg2}`);
    });
    renderTickets();
  }
}

/* ==========================================
   20. RESEARCH & INNOVATION PAGE LOGIC
   ========================================== */
function initResearchPage() {
  const projectGrid = document.getElementById("research-projects-list");
  if (!projectGrid || !window.CIS_DATA || !CIS_DATA.research) return;

  // Render Projects
  projectGrid.innerHTML = CIS_DATA.research.projects.map(p => `
    <div class="card" style="padding:var(--space-md); border-right:4px solid var(--color-primary);">
      <span class="badge badge-primary" style="margin-bottom:6px;">${p.tag}</span>
      <h3 style="font-family:var(--font-headings); font-size:var(--font-size-base); font-weight:800; margin-bottom:4px;">${p.title}</h3>
      <p style="font-size:var(--font-size-xs); color:var(--text-muted); margin-bottom:8px; line-height:1.5;">${p.desc}</p>
      <span style="font-size:10px; font-weight:700; color:var(--color-secondary);"><span data-i18n="js_str_91">الباحث الرئيسي للمشروع:</span> ${p.lead}</span>
    </div>
  `).join("");

  // Render Publications
  const pubList = document.getElementById("research-publications-list");
  if (pubList) {
    pubList.innerHTML = CIS_DATA.research.publications.map(pub => `
      <div class="qa-doc-row" style="animation: fade-in 0.4s ease;">
        <div style="flex:1;">
          <h4 style="font-size:var(--font-size-sm); font-weight:700; color:var(--text-dark); margin-bottom:2px;">"${pub.title}"</h4>
          <span style="font-size:var(--font-size-xs); color:var(--text-muted);">${pub.authors} | ${pub.journal} (${pub.year})</span>
        </div>
        <a href="assets/docs/quality-report.pdf" download class="btn btn-outline" style="padding:4px 12px; font-size:10px;"><span data-i18n="js_str_121">تحميل</span> PDF</a>
      </div>
    `).join("");
  }

  // Render Hackathons & Competitions
  const hackList = document.getElementById("research-hackathons-list");
  if (hackList) {
    hackList.innerHTML = CIS_DATA.research.hackathons.map(h => `
      <div class="card" style="padding:var(--space-sm) var(--space-md); border-top: 4px solid var(--color-accent-gold); margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4 style="font-size:var(--font-size-sm); font-weight:800; margin-bottom:2px;">${h.title}</h4>
          <span style="font-size:10px; color:var(--text-muted);"><span data-i18n="js_str_20">التاريخ:</span> ${h.date}</span>
        </div>
        <span class="badge badge-gold" style="font-size:10px;">${h.rank}</span>
      </div>
    `).join("");
  }
}


/* ==========================================
   21. ALUMNI PORTAL LOGIC
   ========================================== */
function initAlumniPage() {
  const storiesGrid = document.getElementById("alumni-stories-grid");
  if (!storiesGrid || !window.CIS_DATA || !CIS_DATA.alumni) return;

  // Render Success Stories
  storiesGrid.innerHTML = CIS_DATA.alumni.stories.map(story => `
    <div class="card faculty-card" style="text-align:center; padding:var(--space-md); display:flex; flex-direction:column; align-items:center;">
      <img src="${story.avatar}" alt="${story.name}" class="faculty-avatar" style="border-color:var(--color-accent-gold); width:90px; height:90px;">
      <span class="badge badge-gold" style="margin-bottom:8px; font-size:10px;"><span data-i18n="js_str_133">قصة نجاح مميزة</span></span>
      <h3 style="font-size:var(--font-size-base); margin-bottom:2px; font-weight:800;">${story.name}</h3>
      <p style="font-size:11px; color:var(--text-muted); margin-bottom:12px; font-weight:700;">${story.gradYear}</p>
      <div style="background:var(--color-bg-neutral); padding:8px 12px; border-radius:var(--radius-sm); border:1px dashed rgba(15,15,16,0.1); margin-bottom:12px; flex:1;">
        <p style="font-size:var(--font-size-xs); font-style:italic; color:var(--text-muted); line-height:1.5;">"${story.quote}"</p>
      </div>
      <span style="font-size:10px; color:var(--color-primary); font-weight:700;"><span data-i18n="js_str_117">الجهة الحالية:</span> ${story.company}</span>
    </div>
  `).join("");

  // Render Employment Rate Stats
  const statBox = document.getElementById("alumni-employment-rate");
  if (statBox) {
    statBox.innerHTML = `
      <div class="card" style="padding:var(--space-md); text-align:center; border:none; background:var(--gradient-primary); color:white;">
        <div style="font-size:2.5rem; font-weight:900; line-height:1; margin-bottom:4px;">%٩١</div>
        <h4 style="color:white; font-family:var(--font-headings); font-size:var(--font-size-sm); margin-bottom:4px; font-weight:800;"><span data-i18n="js_str_58">معدل توظيف الخريجين</span></h4>
        <p style="font-size:11px; color:rgba(255,255,255,0.9); line-height:1.4;"><span data-i18n="js_str_124">نسبة التحاق خريجي المعهد بسوق العمل في التخصصات التقنية والإدارية خلال الـ ٦ أشهر الأولى من التخرج.</span></p>
      </div>
    `;
  }
}


/* ==========================================
   22. CAREER CENTER PAGE & CV BUILDER LOGIC
   ========================================== */
function initCareerPage() {
  const jobsList = document.getElementById("career-jobs-list");
  if (!jobsList || !window.CIS_DATA || !CIS_DATA.career) return;

  // Render Job Board
  jobsList.innerHTML = CIS_DATA.career.jobs.map(job => `
    <div class="job-card" style="animation: fade-in 0.4s ease;">
      <div>
        <span class="badge badge-primary" style="margin-bottom:4px; font-size:10px;">${job.type}</span>
        <h3 style="font-family:var(--font-headings); font-size:var(--font-size-base); font-weight:800; color:var(--text-dark); margin-bottom:2px;">${job.title}</h3>
        <p style="font-size:var(--font-size-xs); color:var(--text-muted);">${job.company} | 📍 ${job.location}</p>
      </div>
      <div style="text-align:left; display:flex; flex-direction:column; gap:6px;">
        <span style="font-size:var(--font-size-xs); font-weight:800; color:var(--color-primary);">${job.salary}</span>
        <button class="btn btn-primary" style="padding:6px 16px; font-size:var(--font-size-xs);" onclick="alert(window.translateJS('js_str_49', 'تم تقديم طلبك بنجاح! سيقوم مسؤول التوظيف بمراجعة سيرتك المرفقة بملفك الأكاديمي والتواصل معك.'))"><span data-i18n="js_str_50">تقدم الآن</span></button>
      </div>
    </div>
  `).join("");

  // Live CV Builder Tool Logic
  const cvInputName = document.getElementById("cv-in-name");
  const cvInputTitle = document.getElementById("cv-in-title");
  const cvInputEmail = document.getElementById("cv-in-email");
  const cvInputPhone = document.getElementById("cv-in-phone");
  const cvInputBio = document.getElementById("cv-in-bio");
  const cvInputEdu = document.getElementById("cv-in-edu");
  const cvInputExp = document.getElementById("cv-in-exp");
  const cvInputSkills = document.getElementById("cv-in-skills");

  const cvOutName = document.getElementById("cv-out-name");
  const cvOutTitle = document.getElementById("cv-out-title");
  const cvOutEmail = document.getElementById("cv-out-email");
  const cvOutPhone = document.getElementById("cv-out-phone");
  const cvOutBio = document.getElementById("cv-out-bio");
  const cvOutEdu = document.getElementById("cv-out-edu");
  const cvOutExp = document.getElementById("cv-out-exp");
  const cvOutSkills = document.getElementById("cv-out-skills");

  function updateCVPreview() {
    if (cvOutName && cvInputName) cvOutName.textContent = cvInputName.value.trim() || window.translateJS("js_str_85", "اسم الطالب بالكامل");
    if (cvOutTitle && cvInputTitle) cvOutTitle.textContent = cvInputTitle.value.trim() || window.translateJS("js_str_69", "التخصص المهنـي");
    if (cvOutEmail && cvInputEmail) cvOutEmail.textContent = cvInputEmail.value.trim() || window.translateJS("js_str_137", "البريد الإلكتروني");
    if (cvOutPhone && cvInputPhone) cvOutPhone.textContent = cvInputPhone.value.trim() || window.translateJS("js_str_74", "رقم الهاتف للتواصل");
    
    if (cvOutBio && cvInputBio) {
      cvOutBio.textContent = cvInputBio.value.trim() || window.translateJS("js_str_113", "اكتب نبذة مختصرة عن مهاراتك وأهدافك الوظيفية تظهر هنا للشركات.");
    }
    
    if (cvOutEdu && cvInputEdu) {
      cvOutEdu.innerHTML = (cvInputEdu.value.trim() || window.translateJS("js_str_108", "المعهد العالي لعلوم الحاسب ونظم المعلومات - شعبة علوم الحاسب (دفعة ٢٠٢٦)"))
                            .replace(/\n/g, "<br>");
    }
    
    if (cvOutExp && cvInputExp) {
      cvOutExp.innerHTML = (cvInputExp.value.trim() || window.translateJS("js_str_72", "مطور برمجيات متدرب في شركة حلول برمجية (التدريب الصيفي ٢٠٢٥) - العمل على بناء واجهات المستخدم واختبار الأنظمة."))
                            .replace(/\n/g, "<br>");
    }
    
    if (cvOutSkills && cvInputSkills) {
      const skills = cvInputSkills.value.split(",");
      cvOutSkills.innerHTML = skills.map(sk => {
        const clean = sk.trim();
        return clean ? `<span class="badge" style="background:var(--color-bg-neutral); color:var(--text-dark); margin:2px;">${clean}</span>` : "";
      }).join("") || "JavaScript, HTML/CSS, Git, SQL";
    }
  }

  // Bind change listeners to all CV Inputs
  const cvInputs = [cvInputName, cvInputTitle, cvInputEmail, cvInputPhone, cvInputBio, cvInputEdu, cvInputExp, cvInputSkills];
  cvInputs.forEach(input => {
    if (input) {
      input.addEventListener("input", updateCVPreview);
    }
  });

  // Print CV button — relies on the @media print stylesheet to isolate the CV,
  // so the live page and the user's typed data are preserved (no reload needed).
  const printBtn = document.getElementById("cv-print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Re-render the preview after the i18n engine applies translations, so the
  // localized demo values and translated textarea content flow into the CV.
  document.addEventListener("langchange", updateCVPreview);

  // Run initial state update
  updateCVPreview();
}

/* ==========================================
   23. FAQ PAGE CATEGORIES & ACCORDIONS LOGIC
   ========================================== */
function initFaqPage() {
  const faqGrid = document.getElementById("faq-page-accordion-list");
  if (!faqGrid || !window.CIS_DATA || !CIS_DATA.faqsList) return;

  const tabBtns = document.querySelectorAll(".faq-tab-btn");
  const searchInput = document.getElementById("faq-page-search-input");
  let activeCategory = "all";
  let searchWord = "";

  function renderFaqs() {
    faqGrid.innerHTML = "";
    const term = searchWord.toLowerCase();
    const filtered = CIS_DATA.faqsList.filter(item => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchSearch = item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      faqGrid.innerHTML = `<p style="text-align:center; padding:24px; color:var(--text-muted); font-size:var(--font-size-sm);"><span data-i18n="js_str_75">لا توجد أسئلة شائعة مطابقة لبحثك.</span></p>`;
      return;
    }

    const catFallbacks = {
      'admissions': "القبول",
      'academics': "الدراسة",
      'student-life': "الأنشطة",
      'technical': "الخدمات الفنية"
    };

    faqGrid.innerHTML = filtered.map(item => {
      const catKey = 'faq_cat_' + item.category.replace(/-/g, '_');
      const catLabel = window.translateJS(catKey, catFallbacks[item.category] || item.category);

      return `
        <div class="accordion-item" style="animation: fade-in 0.4s ease;">
          <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center;">
            <span>${item.q}</span>
            <span class="badge" data-i18n="${catKey}" style="font-size:9px; background:var(--color-bg-neutral); color:var(--text-muted);">
              ${catLabel}
            </span>
          </div>
          <div class="accordion-content">
            <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.6; margin:0;">${item.a}</p>
          </div>
        </div>
      `;
    }).join("");

    // Accordion toggling is handled by the delegated document.body listener
    // in initTabsAndAccordions(), which also covers these dynamically
    // rendered items. Binding per-header listeners here would double-fire
    // on every click (open then immediately close again).
  }

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      renderFaqs();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchWord = e.target.value.trim();
      renderFaqs();
    });
  }

  renderFaqs();
}


/* ==========================================
   24. GLOBAL SEARCH MODAL & SUGGESTIONS LOGIC
   ========================================== */
function initGlobalSearch() {
  const searchTriggers = document.querySelectorAll(".global-search-trigger-btn");
  const backdrop = document.getElementById("site-search-modal-backdrop");
  
  if (!backdrop) return;

  const closeBtn = backdrop.querySelector(".search-modal-close-btn");
  const searchInput = backdrop.querySelector(".search-modal-input");
  const suggestionsBox = document.getElementById("search-suggestions-box");
  const recentBox = document.getElementById("search-recent-box");

  const searchIndex = [
    { title: window.translateJS("js_str_98", "الصفحة الرئيسية") + " (Homepage)", desc: window.translateJS("js_str_9", "المعهد العالي لعلوم الحاسب ونظم المعلومات الإدارية"), url: "index.html" },
    { title: window.translateJS("js_str_51", "عن معهد") + " CIS (About Institute)", desc: window.translateJS("js_str_130", "تاريخ، رؤية ورسالة، كلمة العميد، والإنجازات"), url: "about.html" },
    { title: window.translateJS("js_str_96", "القبول والتسجيل") + " (Admissions)", desc: window.translateJS("js_str_120", "شروط الالتحاق، المصروفات الدراسية والملفات"), url: "admissions.html" },
    { title: window.translateJS("js_str_37", "دليل أعضاء هيئة التدريس") + " (Faculty)", desc: window.translateJS("js_str_42", "البحث والتواصل مع الهيئة التدريسية والساعات المكتبية"), url: "faculty.html" },
    { title: window.translateJS("js_str_136", "بوابة خدمات الطلاب") + " (Student Services)", desc: window.translateJS("js_str_43", "النتائج، الجداول، تسجيل رغبات التدريب والمكتبة"), url: "services.html" },
    { title: window.translateJS("js_str_115", "أخبار المعهد والبيانات") + " (News Center)", desc: window.translateJS("js_str_25", "تغطية الأحداث والتوجيهات الأكاديمية الرسمية"), url: "news.html" },
    { title: window.translateJS("js_str_70", "الفعاليات والأنشطة") + " (Events Calendar)", desc: window.translateJS("js_str_54", "الأحداث الرياضية والعلمية وحجز المقاعد للفعاليات"), url: "events.html" },
    { title: window.translateJS("js_str_71", "المركز الإعلامي والمطبوعات") + " (Media)", desc: window.translateJS("js_str_18", "معرض الصور، فيديو المعهد، التنزيلات الورقية"), url: "media.html" },
    { title: window.translateJS("js_str_27", "شعبة علوم الحاسب") + " (CS)", desc: window.translateJS("js_str_62", "قسم البرمجة وبحوث الرؤية الحاسوبية والذكاء الاصطناعي"), url: "dept-cs.html" },
    { title: window.translateJS("js_str_138", "شعبة نظم المعلومات") + " (BIS)", desc: window.translateJS("js_str_57", "تطوير تطبيقات الأعمال والأنظمة وتحليل البيانات للمؤسسات"), url: "dept-bis.html" },
    { title: window.translateJS("js_str_31", "وحدة تكنولوجيا المعلومات") + " (IT)", desc: window.translateJS("js_str_28", "البريد الإلكتروني، حسابات الواي فاي، وتذاكر الدعم"), url: "it-unit.html" },
    { title: window.translateJS("js_str_97", "وحدة ضمان الجودة") + " (Quality Assurance)", desc: window.translateJS("js_str_109", "الاعتماد الأكاديمي، النماذج، والتقارير الذاتية"), url: "quality.html" },
    { title: window.translateJS("js_str_64", "البحث العلمي والابتكار") + " (Research)", desc: window.translateJS("js_str_134", "مشاريع الذكاء الاصطناعي والأوراق البحثية المنشورة"), url: "research.html" },
    { title: window.translateJS("js_str_40", "مركز التطوير المهني") + " (Career & CV)", desc: window.translateJS("js_str_12", "وظائف الخريجين وباني السيرة الذاتية التفاعلي المطبوع"), url: "career.html" },
    { title: window.translateJS("js_str_123", "الأسئلة الشائعة العامة") + " (FAQs)", desc: window.translateJS("js_str_99", "شروحات التحويل والمقاصة وسحب الملفات والتقديم"), url: "faq.html" },
    { title: window.translateJS("js_str_84", "تواصل معنا مباشرة") + " (Contact Us)", desc: window.translateJS("js_str_76", "أرقام الهواتف، خريطة الموقع، والواتساب والدعم المباشر"), url: "contact.html" }
  ];

  function openSearch() {
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
    setTimeout(() => searchInput.focus(), 100);
    renderRecent();
    if (suggestionsBox) suggestionsBox.innerHTML = "";
  }

  function closeSearch() {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
    if (searchInput) searchInput.value = "";
  }

  searchTriggers.forEach(t => t.addEventListener("click", openSearch));
  if (closeBtn) closeBtn.addEventListener("click", closeSearch);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeSearch();
  });

  // Recent Searches
  function getRecent() {
    const defaultRecent = (I18n.t && I18n.t["js_str_52"]) 
      ? I18n.t["js_str_52"].split(",").map(s => s.replace(/^[(\s"']+|[)\s"':,]+$/g, '')) 
      : ["تنسيق القبول", "جدول المحاضرات", "نتائج الامتحانات"];
    try {
      return JSON.parse(localStorage.getItem("cis_recent_searches")) || defaultRecent;
    } catch {
      return defaultRecent;
    }
  }

  function addRecent(term) {
    if (!term) return;
    let recent = getRecent().filter(item => item !== term);
    recent.unshift(term);
    recent = recent.slice(0, 5); // Max 5 items
    localStorage.setItem("cis_recent_searches", JSON.stringify(recent));
    renderRecent();
  }

  function renderRecent() {
    if (!recentBox) return;
    const recent = getRecent();
    recentBox.innerHTML = recent.map(r => `
      <span class="search-history-chip" onclick="triggerPresetSearch('${r}')">${r}</span>
    `).join("");
  }

  window.triggerPresetSearch = function(term) {
    if (!searchInput) return;
    searchInput.value = term;
    performSearch(term);
  };

  function performSearch(term) {
    if (!suggestionsBox) return;
    const clean = term.toLowerCase().trim();
    if (!clean) {
      suggestionsBox.innerHTML = "";
      return;
    }

    const hits = searchIndex.filter(item => 
      item.title.toLowerCase().includes(clean) || 
      item.desc.toLowerCase().includes(clean)
    );

    if (hits.length === 0) {
      suggestionsBox.innerHTML = `<p style="font-size:var(--font-size-xs); color:var(--text-muted); text-align:center; padding:16px;"><span data-i18n="js_str_101">لا توجد صفحات مطابقة لمصطلح البحث.</span></p>`;
      return;
    }

    suggestionsBox.innerHTML = hits.map(hit => `
      <div class="search-result-hit" onclick="addRecent('${term}'); window.location.href='${hit.url}';">
        <div>
          <h4>${hit.title}</h4>
          <p>${hit.desc}</p>
        </div>
        <span style="font-size:12px; color:var(--color-primary); font-weight:700;"><span data-i18n="js_str_22">انتقال</span> 🔗</span>
      </div>
    `).join("");
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      performSearch(e.target.value);
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addRecent(searchInput.value);
      }
    });
  }

  renderRecent();
}

// Global binders
window.initFaqPage = initFaqPage;
window.initGlobalSearch = initGlobalSearch;


