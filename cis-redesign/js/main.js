window.translateJS=function(e,t){if("undefined"!=typeof I18n&&I18n.t&&void 0!==I18n.t[e]){let a=I18n.t[e];if("string"==typeof a)return a.trim().replace(/^[(\s"'\\]+/,"").replace(/[)\s"':,\\/]+$/,"")}return t};let activeTestimonialIndex=0;function initLanguageSwitcher(){}function initMobileMenu(){let e=document.getElementById("mobile-menu-toggle"),t=document.getElementById("nav-drawer"),a=document.getElementById("drawer-close"),n=document.getElementById("drawer-overlay");if(!e||!t)return;function i(){t.classList.remove("active"),n&&n.classList.remove("active"),document.body.style.overflow="",document.removeEventListener("keydown",s)}function s(e){("Escape"===e.key||"Esc"===e.key)&&i()}e.addEventListener("click",function e(){t.classList.add("active"),n&&n.classList.add("active"),document.body.style.overflow="hidden",document.addEventListener("keydown",s)}),a&&a.addEventListener("click",i),n&&n.addEventListener("click",i);let r=t.querySelectorAll("a");r.forEach(e=>{e.addEventListener("click",i)})}function initStickyHeader(){let e=document.querySelector(".main-header");if(!e)return;let t=!1;window.addEventListener("scroll",()=>{t||(window.requestAnimationFrame(()=>{window.scrollY>40?e.classList.add("scrolled"):e.classList.remove("scrolled"),t=!1}),t=!0)},{passive:!0})}function initNavPill(){let e=document.querySelector(".nav-menu");if(!e)return;let t=document.createElement("li");t.setAttribute("aria-hidden","true"),t.className="nav-pill",e.insertBefore(t,e.firstChild);let a=e.querySelectorAll(".nav-item > .nav-link"),n=window.location.pathname.split("/").pop()||"index.html";function i(e){return(e.getAttribute("href")||"").split("/").pop().split("#")[0]}e.querySelectorAll(".nav-item").forEach(e=>e.classList.remove("active"));let s=null;function r(a){if(!a)return;let n=a.querySelector(".nav-link");if(!n)return;let i=e.getBoundingClientRect(),s=n.getBoundingClientRect();document.documentElement.dir;let r=s.left-i.left,l=s.width;requestAnimationFrame(()=>{t.style.width="1px",t.style.transform=`translate3d(${r}px, -50%, 0) scaleX(${l})`,t.style.transformOrigin="left center"})}function l(){let a=e.querySelector(".nav-item.active");a?r(a):t.style.width="0px"}a.forEach(e=>{s||i(e)!==n||(s=e.closest(".nav-item"))}),s||e.querySelectorAll(".nav-item .dropdown-item").forEach(e=>{s||i(e)!==n||(s=e.closest(".nav-item"))}),s&&s.classList.add("active"),t.style.transition="none",l(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.style.transition="",e.classList.add("pill-ready")})});let o=e.querySelectorAll(".nav-item");a.forEach(e=>{e.addEventListener("click",function(e){let t=this.closest(".nav-item");r(t),requestAnimationFrame(()=>{o.forEach(e=>e.classList.remove("active")),t.classList.add("active")})})}),o.forEach(e=>{e.addEventListener("mouseenter",function(){r(this)}),e.addEventListener("mouseleave",function(){l()})});let d;window.addEventListener("resize",()=>{clearTimeout(d),d=setTimeout(()=>{t.style.transition="none",l(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.style.transition=""})})},150)},{passive:!0})}function initButtonRipple(){document.body.addEventListener("click",function(e){let t=e.target.closest(".btn");if(!t)return;let a=t.getBoundingClientRect(),n=e.clientX-a.left,i=e.clientY-a.top;requestAnimationFrame(()=>{let e=document.createElement("span");e.className="ripple",e.style.left=`${n}px`,e.style.top=`${i}px`,t.appendChild(e),setTimeout(()=>{e.remove()},600)})})}function initAnimatedCounters(){let e=document.querySelectorAll(".counter");function t(e){let t=parseInt(e.getAttribute("data-target"),10);if(isNaN(t))return;let a=null;function n(i){var s;a||(a=i);let r=i-a,l=Math.min(r/2e3,1),o=Math.round((s=l)*(2-s)*t);e.textContent=String(o),l<1?requestAnimationFrame(n):e.textContent=String(t)}requestAnimationFrame(n)}let a=document.getElementById("cis-stats-section")||document.querySelector(".hero-stats-bar");if(a&&e.length>0){if(window.IntersectionObserver){let n=new IntersectionObserver((a,n)=>{a.forEach(a=>{a.isIntersecting&&(e.forEach(e=>t(e)),n.disconnect())})},{root:null,threshold:.3});n.observe(a)}else e.forEach(e=>t(e))}let i=document.querySelectorAll("[data-counter-target]:not(.counter)");if(i.length>0){function s(e,t){let a=e.getAttribute("data-counter-prefix"),n=e.getAttribute("data-counter-suffix");return null!==a||null!==n?(a||"")+String(t)+(n||""):"98"===e.getAttribute("data-counter-target")?String(t)+"%":"+"+String(t)}function r(e){if(e.classList.contains("animated"))return;e.classList.add("animated");let t=parseInt(e.getAttribute("data-counter-target"),10),a=null;function n(i){a||(a=i);let r=Math.min((i-a)/1500,1);e.textContent=s(e,Math.floor(r*(2-r)*t)),r<1?requestAnimationFrame(n):e.textContent=s(e,t)}requestAnimationFrame(n)}if(window.IntersectionObserver){let l=new IntersectionObserver((e,t)=>{e.forEach(e=>{e.isIntersecting&&(r(e.target),t.unobserve(e.target))})},{root:null,threshold:.4});i.forEach(e=>l.observe(e))}else i.forEach(e=>r(e))}document.addEventListener("langchange",()=>{document.querySelectorAll(".counter").forEach(e=>{let t=parseInt(e.getAttribute("data-target"),10);isNaN(t)||(e.textContent=String(t))}),document.querySelectorAll("[data-counter-target]").forEach(e=>{let t=parseInt(e.getAttribute("data-counter-target"),10);isNaN(t)||(e.textContent=s(e,t))})})}function renderNews(){let e=document.getElementById("news-grid");e&&window.CIS_DATA&&CIS_DATA.news&&(e.innerHTML=CIS_DATA.news.map(e=>`
    <article class="card news-card">
      <div class="news-img-wrapper" style="background-image: url('${e.image}'); height: 200px; background-size: cover; background-position: center; border-radius: var(--radius-md) var(--radius-md) 0 0;"></div>
      <div class="news-content" style="padding-top: var(--space-sm);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-xs);">
          <span class="badge badge-primary">${e.category}</span>
          <span style="font-size:var(--font-size-xs); color:var(--text-muted);">${e.date}</span>
        </div>
        <div style="font-size:var(--font-size-md); margin-bottom:var(--space-xs); line-height:1.4;">${e.title}</div>
        <p style="font-size:var(--font-size-sm); color:var(--text-muted); margin-bottom:var(--space-sm);">${e.summary}</p>
        <a href="${e.link}" class="btn-text" style="color:var(--color-primary); font-weight:600; display:inline-flex; align-items:center; gap:4px; font-size:var(--font-size-sm);">
          <span data-i18n="js_str_119">اقرأ المزيد</span> 
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m7 7l-7-7 7-7"/></svg>
        </a>
      </div>
    </article>
  `).join(""))}function renderEvents(){let e=document.getElementById("events-stack");e&&window.CIS_DATA&&CIS_DATA.events&&(e.innerHTML=CIS_DATA.events.map(e=>`
    <div class="card event-card" style="display:flex; gap:var(--space-md); align-items:center; padding:var(--space-sm) var(--space-md);">
      <div class="event-date-badge" style="background:var(--gradient-primary); color:white; min-width:80px; height:80px; border-radius:var(--radius-md); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
        <span style="font-size:1.6rem; font-weight:800; font-family:var(--font-headings); line-height:1;">${e.day}</span>
        <span style="font-size:var(--font-size-xs); font-weight:600;">${e.month}</span>
      </div>
      <div class="event-details" style="flex:1;">
        <span class="badge badge-gold" style="margin-bottom:6px;">${e.tag}</span>
        <div style="font-size:var(--font-size-md); line-height:1.3; margin-bottom:4px;">${e.title}</div>
        <div style="display:flex; flex-wrap:wrap; gap:var(--space-sm); font-size:var(--font-size-xs); color:var(--text-muted);">
          <span style="display:inline-flex; align-items:center; gap:4px;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            ${e.time}
          </span>
          <span style="display:inline-flex; align-items:center; gap:4px;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            ${e.location}
          </span>
        </div>
      </div>
      <a href="#" class="btn btn-outline" style="padding:8px 16px; font-size:var(--font-size-xs); border-radius:6px;"><span data-i18n="js_str_8">حضور</span></a>
    </div>
  `).join(""))}function renderTestimonials(){let e=document.getElementById("testimonials-slider-content");if(!e||!window.CIS_DATA||!CIS_DATA.testimonials)return;let t=CIS_DATA.testimonials;function a(){let a=t[activeTestimonialIndex];e.style.opacity=0,setTimeout(()=>{e.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
          <svg style="color:rgba(230, 95, 43, 0.2); width:64px; height:64px; margin-bottom:var(--space-sm);" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <p style="font-size:var(--font-size-md); font-style:italic; line-height:1.7; max-width:800px; margin-bottom:var(--space-md); font-weight:500;">"${a.quote}"</p>
          <img src="${a.avatar}" alt="${a.name}" style="width:70px; height:70px; border-radius:50%; border:3px solid var(--color-primary); box-shadow:var(--shadow-sm); object-fit:cover; margin-bottom:var(--space-xs);">
          <div style="font-size:var(--font-size-base); margin-bottom:2px;">${a.name}</div>
          <span style="font-size:var(--font-size-xs); color:var(--text-muted);">${a.role}</span>
        </div>
      `,e.style.opacity=1},250)}a();let n=document.getElementById("slide-prev"),i=document.getElementById("slide-next");n&&i&&(n.addEventListener("click",()=>{activeTestimonialIndex=(activeTestimonialIndex-1+t.length)%t.length,a()}),i.addEventListener("click",()=>{activeTestimonialIndex=(activeTestimonialIndex+1)%t.length,a()}))}function renderTimeline(){let e=document.getElementById("timeline-wrapper");e&&window.CIS_DATA&&CIS_DATA.timeline&&(e.innerHTML=CIS_DATA.timeline.map((e,t)=>`
    <div class="timeline-item" style="position:relative; margin-bottom:var(--space-xl); display:flex; gap:var(--space-md); width:100%; align-items:flex-start;">
      <div class="timeline-marker" style="width:40px; height:40px; border-radius:50%; background:white; border:4px solid var(--color-primary); display:flex; align-items:center; justify-content:center; z-index:2; position:relative; box-shadow:var(--shadow-sm);">
        <div style="width:12px; height:12px; background:var(--color-primary); border-radius:50%;"></div>
      </div>
      <div class="card timeline-card" style="flex:1; padding:var(--space-md); border-right: 4px solid var(--color-primary);">
        <span style="font-family:var(--font-headings); font-weight:800; font-size:1.5rem; color:var(--color-primary); display:block; margin-bottom:4px;">${e.year}</span>
        <div style="font-size:var(--font-size-md); margin-bottom:var(--space-xs);">${e.title}</div>
        <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5;">${e.description}</p>
      </div>
    </div>
  `).join(""))}function initAdmissionsPage(){let e=window.CIS_DATA?CIS_DATA.admissions:null;if(!e)return;let t=document.getElementById("admissions-req-list");t&&(t.innerHTML=e.requirements.map(e=>`
      <li style="font-size:var(--font-size-sm); color:var(--text-muted); margin-bottom:var(--space-sm); display:flex; gap:10px; align-items:flex-start;">
        <svg width="20" height="20" fill="none" stroke="var(--color-primary)" stroke-width="3" viewBox="0 0 24 24" style="min-width:20px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
        ${e}
      </li>
    `).join(""));let a=document.getElementById("admissions-doc-list");a&&(a.innerHTML=e.documents.map(e=>`
      <div class="card" style="padding:var(--space-sm); display:flex; gap:12px; align-items:center;">
        <div style="background-color:var(--color-primary-light); color:var(--color-primary); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; min-width:36px;">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        </div>
        <span style="font-size:var(--font-size-sm); font-weight:500;">${e}</span>
      </div>
    `).join(""));let n=document.getElementById("admissions-fees-table");n&&(n.innerHTML=e.fees.map(e=>`
      <tr>
        <td style="padding:var(--space-sm); font-weight:700;">${e.dept}</td>
        <td style="padding:var(--space-sm); color:var(--color-primary); font-weight:800;">${e.tuition}</td>
        <td style="padding:var(--space-sm); color:var(--text-muted); font-size:var(--font-size-xs);">${e.duration}</td>
      </tr>
    `).join(""));let i=document.getElementById("admissions-scholarships-table");i&&(i.innerHTML=e.scholarships.map(e=>`
      <tr>
        <td style="padding:var(--space-sm); font-weight:700; width:35%;">${e.name}</td>
        <td style="padding:var(--space-sm); color:var(--text-muted); font-size:var(--font-size-sm);">${e.detail}</td>
      </tr>
    `).join(""));let s=document.getElementById("admissions-faqs");s&&(s.innerHTML=e.faqs.map(e=>`
      <div class="accordion-item">
        <div class="accordion-header">${e.q}</div>
        <div class="accordion-content">
          <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.6;">${e.a}</p>
        </div>
      </div>
    `).join("")),initAdmissionsFormWizard()}function initAdmissionsUploads(){let e=document.querySelectorAll(".file-upload-zone");if(!e.length)return;let t=["application/pdf","image/jpeg","image/jpg","image/png"],a=["pdf","jpg","jpeg","png"];e.forEach(e=>{let n=e.querySelector(".file-upload-input");if(!n)return;let i=e.querySelector(".upload-hint"),s=e.querySelector(".upload-file-info"),r=e.querySelector(".upload-file-name"),l=e.querySelector(".upload-file-remove");function o(e){let n=(e.name.split(".").pop()||"").toLowerCase();return t.includes(e.type)||a.includes(n)?!(e.size>5242880)||(alert(window.translateJS("admissions_upload_filesize","حجم الملف كبير جداً. الحد الأقصى ٥ ميجابايت.")),!1):(alert(window.translateJS("admissions_upload_filetype","نوع الملف غير مدعوم. يُسمح بملفات PDF أو الصور فقط.")),!1)}function d(t){r&&(r.textContent=t.name),s&&(s.hidden=!1),i&&(i.style.display="none"),e.classList.add("has-file")}function c(){n.value="",s&&(s.hidden=!0),i&&(i.style.display=""),e.classList.remove("has-file")}e.addEventListener("click",e=>{e.target.closest(".upload-file-remove")||n.click()}),e.addEventListener("keydown",e=>{("Enter"===e.key||" "===e.key)&&(e.preventDefault(),n.click())}),n.addEventListener("change",()=>{let e=n.files&&n.files[0];if(e){if(!o(e)){c();return}d(e)}}),l&&l.addEventListener("click",e=>{e.stopPropagation(),c()}),["dragenter","dragover"].forEach(t=>{e.addEventListener(t,t=>{t.preventDefault(),t.stopPropagation(),e.classList.add("dragover")})}),["dragleave","dragend"].forEach(t=>{e.addEventListener(t,t=>{t.preventDefault(),t.stopPropagation(),e.classList.remove("dragover")})}),e.addEventListener("drop",t=>{t.preventDefault(),t.stopPropagation(),e.classList.remove("dragover");let a=t.dataTransfer.files&&t.dataTransfer.files[0];if(a&&o(a)){try{let i=new DataTransfer;i.items.add(a),n.files=i.files}catch(s){}d(a)}})})}function initAdmissionsFormWizard(){let e=document.getElementById("apply-wizard-form");if(!e)return;initAdmissionsUploads();let t=Array.from(e.querySelectorAll(".wizard-step")),a=Array.from(document.querySelectorAll(".step-indicator .step")),n=document.querySelector(".step-indicator .progress-line-fill"),i=document.getElementById("wizard-next-btn"),s=document.getElementById("wizard-prev-btn"),r=0,l={"student-fullname":{element:document.getElementById("student-fullname"),validate(e){let t=e.trim();return t?/^[a-zA-Z\u0621-\u064A\u0671-\u06D3\u06D5\s]+$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_name_invalid","يجب أن يحتوي الاسم على حروف ومسافات فقط ولا يحتوي على أرقام أو رموز.")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}},"student-phone":{element:document.getElementById("student-phone"),validate(e){let t=e.trim();return t?/^01\d{9}$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_phone_invalid","يجب أن يكون رقم الهاتف مكوناً من 11 رقماً ويبدأ بـ 01.")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}},"student-email":{element:document.getElementById("student-email"),validate(e){let t=e.trim();return t?/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_email_invalid","يرجى إدخال بريد إلكتروني صحيح (مثال: student@gmail.com).")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}},"student-nat":{element:document.getElementById("student-nat"),validate(e){let t=e.trim();return t?/^[a-zA-Z\u0621-\u064A\u0671-\u06D3\u06D5\s]+$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_nat_invalid","يجب أن تحتوي الجنسية على حروف ومسافات فقط ولا تحتوي على أرقام أو رموز.")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}}};function o(){if(t.forEach((e,t)=>{t===r?e.classList.add("active"):e.classList.remove("active")}),a.forEach((e,t)=>{t<=r?e.classList.add("active"):e.classList.remove("active")}),n){let e=r/(t.length-1)*100;n.style.width=`${e}%`}if(0===r?s.style.display="none":s.style.display="inline-flex",r===t.length-1){i.textContent=window.translateJS("js_str_88","تأكيد وإرسال الطلب"),i.classList.add("btn-gradient");let l=document.getElementById("rev-name"),o=document.getElementById("rev-phone"),d=document.getElementById("rev-dept"),c=document.getElementById("student-fullname"),p=document.getElementById("student-phone"),m=document.getElementById("student-dept-select");l&&c&&(l.textContent=c.value||"-"),o&&p&&(o.textContent=p.value||"-"),d&&m&&(d.textContent=m.options[m.selectedIndex]?.text||"-")}else i.textContent=window.translateJS("js_str_114","الخطوة التالية"),i.classList.remove("btn-gradient")}Object.keys(l).forEach(e=>{let t=l[e];if(t.element){"student-phone"===e&&t.element.addEventListener("input",e=>{e.target.value=e.target.value.replace(/\D/g,"")});let a=()=>{let e=t.validate(t.element.value);return function e(t,a,n){let i=t.closest(".form-group");if(!i)return;let s=i.querySelector(".invalid-feedback");s||((s=document.createElement("div")).className="invalid-feedback",i.appendChild(s)),a?(t.classList.remove("is-invalid"),t.classList.add("is-valid"),s.textContent="",s.style.display="none"):(t.classList.remove("is-valid"),t.classList.add("is-invalid"),s.textContent=n,s.style.display="block")}(t.element,e.isValid,e.msg),e.isValid};t.element.addEventListener("input",a),t.element.addEventListener("blur",a),t.element.runCustomValidation=a}}),e.addEventListener("reset",()=>{e.querySelectorAll(".form-control").forEach(e=>{e.classList.remove("is-valid","is-invalid"),e.style.borderColor="";let t=e.closest(".form-group");if(t){let a=t.querySelector(".invalid-feedback");a&&(a.textContent="",a.style.display="none")}})}),i.addEventListener("click",()=>{let a=!0;if(0===r)Object.keys(l).forEach(e=>{let t=l[e];if(t.element){let n=t.element.runCustomValidation();n||(a=!1)}});else{let n=t[r].querySelectorAll("[required]");n.forEach(e=>{e.value.trim()&&("checkbox"!==e.type||e.checked)?e.style.borderColor="":(a=!1,e.style.borderColor="red")})}if(!a){alert(window.translateJS("js_str_89","يرجى ملء جميع الحقول المطلوبة بشكل صحيح للاستمرار."));return}let i=t[r].querySelectorAll(".file-upload-zone");if(i.length){let s=Array.from(i).some(e=>{let t=e.querySelector(".file-upload-input");return t&&t.files&&t.files.length>0});if(!s){alert(window.translateJS("admissions_upload_required","يرجى رفع مستند واحد على الأقل للمتابعة."));return}}r<t.length-1?(r++,o()):(alert(window.translateJS("js_str_129","تم إرسال طلب التقديم المبدئي بنجاح! سيقوم مسؤول القبول بالتواصل معك عبر الهاتف والبريد لمطابقة المستندات.")),e.reset(),e.querySelectorAll(".file-upload-zone").forEach(e=>{e.classList.remove("has-file","dragover");let t=e.querySelector(".upload-file-info"),a=e.querySelector(".upload-hint");t&&(t.hidden=!0),a&&(a.style.display="")}),r=0,o())}),s.addEventListener("click",()=>{r>0&&(r--,o())}),o()}function initDepartmentPages(){let e=document.body.getAttribute("data-dept");if(!e||!window.CIS_DATA||!CIS_DATA.departments)return;let t=CIS_DATA.departments[e];if(!t)return;let a=document.getElementById("dept-title"),n=document.getElementById("dept-overview-desc"),i=document.getElementById("dept-head-name"),s=document.getElementById("dept-head-role");a&&(a.textContent=`<span data-i18n="js_str_2">قسم</span> ${t.name}`),n&&(n.textContent=t.overview),i&&(i.textContent=t.head),s&&(s.textContent=t.headRole);let r=document.getElementById("struct-years"),l=document.getElementById("struct-credits"),o=document.getElementById("struct-semesters"),d=document.getElementById("struct-degree");r&&(r.textContent=t.structure.years),l&&(l.textContent=t.structure.credits),o&&(o.textContent=t.structure.semesters),d&&(d.textContent=t.structure.degree);let c=document.getElementById("dept-careers-grid");c&&(c.innerHTML=t.careers.map(e=>`
      <div class="card career-card">
        <div class="career-icon">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <div class="career-title">${e.title}</div>
        <p class="career-desc">${e.desc}</p>
      </div>
    `).join("")),renderDeptCourses(t.courses),initCoursesSearch(t.courses);let p=document.getElementById("dept-faculty-grid");p&&(p.innerHTML=t.faculty.map(e=>`
      <div class="card" style="text-align:center; padding:var(--space-md);">
        <img src="${e.img}" alt="${e.name}" style="width:90px; height:90px; border-radius:50%; object-fit:cover; margin-bottom:var(--space-xs); border: 2px solid var(--color-primary);">
        <div style="font-size:var(--font-size-base); margin-bottom:2px;">${e.name}</div>
        <span style="font-size:var(--font-size-xs); color:var(--text-muted); display:block; height:32px; line-height:1.3;">${e.role}</span>
        <a href="faculty.html" class="btn btn-outline" style="padding:6px 12px; font-size:var(--font-size-xs); border-radius:6px; margin-top:8px; display:inline-flex;"><span data-i18n="js_str_32">السيرة الأكاديمية</span></a>
      </div>
    `).join(""));let m=document.getElementById("dept-labs-stack");m&&(m.innerHTML=t.labs.map((e,t)=>`
      <div class="card" style="display:flex; flex-direction:column; gap:8px;">
        <div style="font-size:var(--font-size-md); color:var(--color-primary);">${e.name}</div>
        <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5;">${e.desc}</p>
      </div>
    `).join(""));let v=document.getElementById("dept-research-stack");v&&(v.innerHTML=t.research.map(e=>`
      <div class="card" style="padding:var(--space-md); border-right:4px solid var(--color-accent-gold);">
        <div style="font-size:var(--font-size-base); margin-bottom:4px;">${e.title}</div>
        <p style="font-size:var(--font-size-xs); color:var(--text-muted); line-height:1.5;">${e.desc}</p>
      </div>
    `).join(""));let g=document.getElementById("dept-faqs-accordion");g&&(g.innerHTML=t.faqs.map(e=>`
      <div class="accordion-item">
        <div class="accordion-header">${e.q}</div>
        <div class="accordion-content">
          <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5;">${e.a}</p>
        </div>
      </div>
    `).join(""))}function renderDeptCourses(e){let t=document.getElementById("dept-courses-table");if(t){if(0===e.length){t.innerHTML=`<tr><td colspan="4" style="text-align:center; padding:var(--space-md); color:var(--text-muted);"><span data-i18n="js_str_7">لا توجد نتائج مطابقة لمصطلح البحث.</span></td></tr>`;return}t.innerHTML=e.map(e=>`
    <tr>
      <td style="padding:var(--space-sm); font-weight:700; color:var(--color-primary);">${e.code}</td>
      <td style="padding:var(--space-sm); font-weight:600;">${e.name}</td>
      <td style="padding:var(--space-sm); font-size:var(--font-size-sm); color:var(--text-muted);">${e.term}</td>
      <td style="padding:var(--space-sm); font-size:var(--font-size-sm); color:var(--color-primary); font-weight:700;">${e.credits}</td>
    </tr>
  `).join("")}}function initCoursesSearch(e){let t=document.getElementById("course-search-input");t&&t.addEventListener("input",t=>{let a=t.target.value.toLowerCase().trim(),n=e.filter(e=>e.name.toLowerCase().includes(a)||e.code.toLowerCase().includes(a)||e.term.toLowerCase().includes(a));renderDeptCourses(n)})}function initFacultyDirectory(){let e=document.getElementById("faculty-directory-grid");if(!e||!window.CIS_DATA||!CIS_DATA.facultyList)return;let t=document.getElementById("faculty-search-input"),a=document.getElementById("faculty-dept-filter"),n=CIS_DATA.facultyList;function i(t){if(0===t.length){e.innerHTML=`
        <div style="grid-column:span 12; text-align:center; padding:var(--space-xl); color:var(--text-muted);">
          <div><span data-i18n="js_str_6">لا توجد نتائج مطابقة لمصطلح البحث أو ال<span data-i18n="js_str_2">قسم</span> المختار.</span></div>
        </div>
      `;return}e.innerHTML=t.map(e=>`
      <div class="card faculty-card">
        <img src="${e.img}" alt="${e.name}" class="faculty-avatar">
        <span class="faculty-dept-badge">${e.deptName}</span>
        <div>${e.name}</div>
        <p class="faculty-role-text">${e.role}</p>
        <div class="faculty-contact-strip">
          <span class="faculty-contact-chip">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"/></svg>
            ${e.email}
          </span>
        </div>
        <button class="btn-profile" onclick="openFacultyModal('${e.id}')"><span data-i18n="js_str_5">عرض <span data-i18n="js_str_32">السيرة الأكاديمية</span> الكاملة</span></button>
      </div>
    `).join("")}function s(){let e=t?t.value.toLowerCase().trim():"",s=a?a.value:"all",r=n.filter(t=>{let a=t.name.toLowerCase().includes(e)||t.role.toLowerCase().includes(e)||t.bio.toLowerCase().includes(e),n="all"===s||t.deptId===s;return a&&n});i(r)}t&&t.addEventListener("input",s),a&&a.addEventListener("change",s),i(n);let r=document.getElementById("faculty-modal-close"),l=document.getElementById("faculty-details-modal");r&&r.addEventListener("click",closeFacultyModal),l&&l.addEventListener("click",e=>{e.target===l&&closeFacultyModal()})}function openFacultyModal(e){let t=document.getElementById("faculty-details-modal");if(!t||!window.CIS_DATA||!CIS_DATA.facultyList)return;let a=CIS_DATA.facultyList.find(t=>t.id===e);if(!a)return;document.getElementById("modal-fac-img").src=a.img,document.getElementById("modal-fac-name").textContent=a.name,document.getElementById("modal-fac-role").textContent=a.role,document.getElementById("modal-fac-dept").textContent=a.deptName;let n=document.getElementById("modal-fac-email"),i=n.querySelector("span");i?i.textContent=a.email:n.textContent=a.email,n.href=`mailto:${a.email}`,document.getElementById("modal-fac-office").textContent=a.office,document.getElementById("modal-fac-bio").textContent=a.bio;let s=document.getElementById("modal-fac-research");s.innerHTML=a.research.map(e=>`<li>${e}</li>`).join("");let r=document.getElementById("modal-fac-courses");r.innerHTML=a.courses.map(e=>`<li>${e}</li>`).join("");let l=document.getElementById("modal-fac-pubs");l.innerHTML=a.publications.map(e=>`<li style="margin-bottom:8px;">${e}</li>`).join(""),t.classList.add("active"),document.body.style.overflow="hidden"}function closeFacultyModal(){let e=document.getElementById("faculty-details-modal");e&&(e.classList.remove("active"),document.body.style.overflow="")}function initStudentServicesPortal(){let e=document.querySelector("[data-portal-hub]");if(!e||!window.CIS_DATA)return;let t=document.getElementById("portal-lms-list");t&&CIS_DATA.lmsCourses&&(t.innerHTML=CIS_DATA.lmsCourses.map(e=>`
      <div class="lms-row">
        <div style="flex:1;">
          <span class="badge badge-primary" style="margin-bottom:4px; display:inline-block;">${e.code}</span>
          <div style="font-size:var(--font-size-base); margin-bottom:2px; font-weight:700;">${e.name}</div>
          <span style="font-size:var(--font-size-xs); color:var(--text-muted);"><span data-i18n="js_str_67">أستاذ المادة:</span> ${e.prof}</span>
        </div>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <span style="font-size:var(--font-size-xs); color:var(--text-muted); display:inline-flex; align-items:center; gap:4px;">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
            ${e.lectures} <span data-i18n="js_str_110">محاضرات</span>
          </span>
          <a class="btn btn-outline" style="padding:6px 14px; font-size:var(--font-size-xs); border-radius:var(--radius-full);" href="lectures.html?course=${e.code}"><span data-i18n="js_str_66">تحميل المحاضرات</span></a>
        </div>
      </div>
    `).join(""));let a=document.getElementById("portal-internships-grid");a&&CIS_DATA.internships&&(a.innerHTML=CIS_DATA.internships.map(e=>{let t=/مغلق|closed/i.test(e.status)||/انتهى|ended/i.test(e.deadline),a="en"===(localStorage.getItem("cis_lang")||"ar");return`
        <div class="intern-card ${t?"closed":""}">
          <div>
            <div style="font-size:var(--font-size-base); margin-bottom:6px; font-weight:700;">${e.title}</div>
            <span class="badge badge-gold" style="margin-bottom:10px; display:inline-block;">${e.type}</span>
            <p style="font-size:var(--font-size-xs); color:var(--text-muted); display:flex; align-items:center; gap:4px;">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span data-i18n="js_str_21">آخر تقديم:</span> ${e.deadline}
            </p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:10px; border-top:1px solid rgba(15,15,16,0.06);">
            <span style="font-size:var(--font-size-xs); font-weight:700; color:${t?"var(--text-muted)":"var(--color-primary)"}; display:inline-flex; align-items:center; gap:4px;">
              <span style="width:8px; height:8px; border-radius:50%; background:${t?"#9ca3af":"#10b981"}; display:inline-block;"></span>
              ${e.status}
            </span>
            ${t?`<button class="btn btn-outline" style="padding:6px 14px; font-size:var(--font-size-xs); border-radius:var(--radius-full); opacity:0.5;cursor:not-allowed;" disabled>${a?"Closed":"مغلق"}</button>`:`<a class="btn btn-primary" style="padding:6px 14px; font-size:var(--font-size-xs); border-radius:var(--radius-full);" href="apply-internship.html?opportunity=${encodeURIComponent(e.id)}">${a?"Register Interest":"سجّل اهتمامك"}</a>`}
          </div>
        </div>
      `}).join(""));let n=document.getElementById("portal-results-btn"),i=document.getElementById("student-id-input"),s=document.getElementById("student-results-output");n&&i&&s&&n.addEventListener("click",()=>{let e=i.value.trim(),t=CIS_DATA.studentResults[e];if(!t){s.innerHTML=`
          <div class="alert alert-info" style="margin-top:var(--space-md);">
            <span><span data-i18n="js_str_23">عذراً، لم نجد رقم أكاديمي مطابق. يرجى إدخال أرقام صحيحة (أرقام التجربة المتوفرة: 202601 أو 202602).</span></span>
          </div>
        `;return}s.innerHTML=`
        <div style="margin-top:var(--space-md); border-top:1px solid rgba(15,15,16,0.08); padding-top:var(--space-md);">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-sm); margin-bottom:var(--space-sm);">
            <div><strong><span data-i18n="js_str_26">اسم الطالب:</span></strong> ${t.name}</div>
            <div><strong><span data-i18n="js_str_61">الشعبة الدراسية:</span></strong> ${t.dept}</div>
            <div><strong><span data-i18n="js_str_106">الفصل الدراسي:</span></strong> ${t.term}</div>
            <div><strong><span data-i18n="js_str_60">المعدل التراكمي الفصل (</span>GPA):</strong> <span style="color:var(--color-primary); font-weight:800;">${t.gpa}</span></div>
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
              ${t.grades.map(e=>`
                <tr>
                  <td style="padding:8px 12px; font-weight:700;">${e.code}</td>
                  <td style="padding:8px 12px;">${e.name}</td>
                  <td style="padding:8px 12px;">${e.credits} <span data-i18n="js_str_48">ساعات</span></td>
                  <td style="padding:8px 12px; color:var(--color-primary); font-weight:700;">${e.grade}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `});let r=document.getElementById("portal-complaints-form"),l=document.getElementById("portal-complaints-list"),o=[];function d(){if(l){if(0===o.length){l.innerHTML=`<p style="font-size:var(--font-size-xs); color:var(--text-muted); text-align:center; padding:12px;"><span data-i18n="js_str_125">لا توجد شكاوى أو استفسارات مسجلة باسمك حالياً.</span></p>`;return}l.innerHTML=o.map(e=>`
      <div style="border-bottom:1px solid rgba(15,15,16,0.06); padding:10px 0; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span style="font-size:10px; color:var(--text-muted); display:block;"><span data-i18n="js_str_19">الرقم المرجعي:</span> #${e.id} | ${e.date}</span>
          <span style="font-size:var(--font-size-sm); font-weight:600; display:block;"><span data-i18n="js_str_126"><span data-i18n="js_str_2">قسم</span>:</span> ${e.category}</span>
          <span style="font-size:11px; color:var(--text-muted); display:block;"><span data-i18n="services_identity_log_label">صفة مقدّم الشكوى</span>: ${e.identity}</span>
          <p style="font-size:var(--font-size-xs); color:var(--text-muted);">${e.text}</p>
        </div>
        <span class="badge badge-gold" style="font-size:10px;">${e.status}</span>
      </div>
    `).join("")}}r&&(r.addEventListener("submit",e=>{e.preventDefault();let t=document.getElementById("complaint-text").value.trim(),a=document.getElementById("complaint-category").value,n=document.getElementById("complaint-identity"),i=n&&n.options[n.selectedIndex]?.text||"";if(!t)return;let s="";if("portal"===a)s=window.translateJS("js_str_38","بوابة الخدمات");else{let l=I18n.t&&I18n.t.js_str_118?I18n.t.js_str_118.split(":"):["الامتحانات والكنترول","أعضاء التدريس وشؤون دراسية"],c=l[0]?l[0].replace(/^[(\s"']+|[)\s"':,]+$/g,""):"الامتحانات والكنترول",p=l[1]?l[1].replace(/^[(\s"']+|[)\s"':,]+$/g,""):"أعضاء التدريس وشؤون دراسية";s="exams"===a?c:p}let m={id:Math.floor(1e3+9e3*Math.random()),category:s,identity:i,text:t,date:new Date().toLocaleDateString("ar-EG"),status:window.translateJS("js_str_92","قيد المراجعة الفورية")};o.push(m),r.reset(),d();let v=window.translateJS("js_str_94","تم إرسال الشكوى"),g=window.translateJS("js_str_105","الاستفسار بنجاح! تم تعيين الرقم المرجعي"),u=window.translateJS("js_str_45","للمتابعة.");alert(`${v}/${g} #${m.id} ${u}`)}),d());let c=document.getElementById("portal-cert-form");c&&c.addEventListener("submit",e=>{e.preventDefault(),alert(window.translateJS("js_str_56","تم استلام طلب استخراج الشهادة بنجاح! جاري تحضير الوثيقة وسنتواصل معك فور تجهيزها لدفع رسوم التمغات واستلامها من مكتب الشؤون.")),c.reset()})}function initVideoLightbox(){let e=document.getElementById("video-play-btn");e&&e.addEventListener("click",e=>{e.preventDefault();let t=document.createElement("div");t.id="video-lightbox",t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",t.style.backgroundColor="rgba(0, 0, 0, 0.9)",t.style.display="flex",t.style.alignItems="center",t.style.justifyContent="center",t.style.zIndex="99999",t.style.opacity="0",t.style.transition="opacity 0.3s ease",t.innerHTML=`
      <div style="position:relative; width:90%; max-width:800px; aspect-ratio:16/9; background:#000; border-radius:var(--radius-md); overflow:hidden; box-shadow:var(--shadow-lg);">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/3i0edKWPjAs?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border:0;"></iframe>
        <button id="lightbox-close" style="position:absolute; top:12px; left:12px; background:rgba(255,255,255,0.2); color:#fff; border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; font-size:18px;">&times;</button>
      </div>
    `,document.body.appendChild(t),document.body.style.overflow="hidden",setTimeout(()=>{t.style.opacity="1"},50);let a=t.querySelector("#lightbox-close");function n(){t.style.opacity="0",setTimeout(()=>{t.remove(),document.body.style.overflow=""},300)}a.addEventListener("click",n),t.addEventListener("click",e=>{e.target===t&&n()})})}function initTabsAndAccordions(){let e=document.querySelectorAll("[data-tab-target]");e.forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab-target"),a=document.querySelector(t);if(!a)return;let n=e.parentElement.querySelectorAll("[data-tab-target]");n.forEach(e=>e.classList.remove("active"));let i=a.parentElement.children;Array.from(i).forEach(e=>e.classList.remove("active")),e.classList.add("active"),a.classList.add("active")})}),document.body.addEventListener("click",e=>{let t=e.target.closest(".accordion-header");if(!t)return;let a=t.parentElement,n=t.nextElementSibling,i=a.classList.contains("active"),s=a.parentElement,r=s.querySelectorAll(".accordion-item");r.forEach(e=>{e.classList.remove("active");let t=e.querySelector(".accordion-content");t&&(t.style.maxHeight=null)}),i||(a.classList.add("active"),requestAnimationFrame(()=>{let height=n.scrollHeight;requestAnimationFrame(()=>{n.style.maxHeight=height+"px"})}))})}function initScrollTop(){let e=document.getElementById("scroll-top-btn");if(!e)return;let t=!1;window.addEventListener("scroll",()=>{t||(window.requestAnimationFrame(()=>{window.scrollY>400?e.classList.add("visible"):e.classList.remove("visible"),t=!1}),t=!0)},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function initNewsPage(){let e=document.getElementById("news-page-grid");if(!e||!window.CIS_DATA||!CIS_DATA.news)return;let t=document.getElementById("news-search-input"),a=document.querySelectorAll(".news-pill"),n=document.getElementById("featured-news-wrapper"),i=document.getElementById("trending-news-list"),s="all",r="";function l(){let t=CIS_DATA.news.filter(e=>{let t="all"===s||e.category===s,a=e.title.toLowerCase().includes(r)||e.summary.toLowerCase().includes(r)||e.body.toLowerCase().includes(r);return t&&a});if(0===t.length){e.innerHTML=`
        <div style="grid-column:span 12; text-align:center; padding:var(--space-xl); color:var(--text-muted);">
          <div><span data-i18n="js_str_3">لا توجد أخبار مطابقة لبحثك في هذا ال<span data-i18n="js_str_2">قسم</span>.</span></div>
        </div>
      `;return}e.innerHTML=t.map(e=>`
      <article class="card news-card" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div>
          <div class="news-img-wrapper" style="background-image: url('${e.image}'); height:180px; background-size:cover; background-position:center; border-radius:var(--radius-md) var(--radius-md) 0 0; position:relative;">
            ${e.trending?`<span class="badge badge-gold" style="position:absolute; top:10px; right:10px;"><span data-i18n="js_str_73">عاجل</span> / <span data-i18n="js_str_104">رائج</span></span>`:""}
          </div>
          <div class="news-content" style="padding:var(--space-sm) var(--space-sm) 0 var(--space-sm);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span class="badge badge-primary">${e.category}</span>
              <span style="font-size:10px; color:var(--text-muted);">${e.date}</span>
            </div>
            <div style="font-size:var(--font-size-base); font-weight:700; line-height:1.4; margin-bottom:8px; color:var(--text-dark);">${e.title}</div>
            <p style="font-size:var(--font-size-xs); color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${e.summary}</p>
          </div>
        </div>
        <div style="padding:0 var(--space-sm) var(--space-sm) var(--space-sm); display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(15,15,16,0.05); pt:8px; margin-top:8px;">
          <span style="font-size:10px; color:var(--text-muted); display:inline-flex; align-items:center; gap:2px;">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            ${e.views}
          </span>
          <button class="btn btn-outline" onclick="openNewsDetail(${e.id})" style="padding:4px 12px; font-size:10px; border-radius:var(--radius-full);"><span data-i18n="js_str_55">اقرأ الخبر</span></button>
        </div>
      </article>
    `).join("")}a.forEach(e=>{e.addEventListener("click",()=>{a.forEach(e=>e.classList.remove("active")),e.classList.add("active"),s=e.getAttribute("data-category"),l()})}),t&&t.addEventListener("input",e=>{r=e.target.value.toLowerCase().trim(),l()}),function e(){if(!n)return;let t=CIS_DATA.news.find(e=>e.featured)||CIS_DATA.news[0];t&&(n.innerHTML=`
      <div class="card featured-news-card" style="display:grid; grid-template-columns:1.2fr 1fr; gap:var(--space-md); padding:0; overflow:hidden; border:none; box-shadow:var(--shadow-lg);">
        <div class="featured-img" style="background-image: url('${t.image}'); background-size:cover; background-position:center; min-height:300px;"></div>
        <div class="featured-content" style="padding:var(--space-lg); display:flex; flex-direction:column; justify-content:center;">
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span class="badge badge-primary">${t.category}</span>
            <span style="font-size:var(--font-size-xs); color:var(--text-muted);">${t.date}</span>
          </div>
          <h2 style="font-family:var(--font-headings); font-size:var(--font-size-xl); line-height:1.4; margin-bottom:12px; font-weight:800; color:var(--text-dark);">${t.title}</h2>
          <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.6; margin-bottom:var(--space-md);">${t.summary}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <span style="font-size:var(--font-size-xs); color:var(--text-muted); display:flex; align-items:center; gap:4px;">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              ${t.views} <span data-i18n="js_str_65">مشاهدة</span>
            </span>
            <button class="btn btn-primary" onclick="openNewsDetail(${t.id})" style="padding:8px 20px; font-size:var(--font-size-xs);"><span data-i18n="js_str_10"><span data-i18n="js_str_55">اقرأ الخبر</span> كاملاً</span></button>
          </div>
        </div>
      </div>
    `)}(),function e(){if(!i)return;let t=CIS_DATA.news.filter(e=>e.trending).slice(0,4);i.innerHTML=t.map((e,t)=>`
      <div class="trending-item" style="display:flex; gap:12px; padding:12px 0; border-bottom:1px solid rgba(15,15,16,0.06); cursor:pointer;" onclick="openNewsDetail(${e.id})">
        <span style="font-family:var(--font-headings); font-weight:800; font-size:1.8rem; color:var(--color-primary); line-height:1; min-width:30px;">٠${t+1}</span>
        <div>
          <span class="badge" style="background:var(--color-primary-light); color:var(--color-primary); font-size:9px; padding:2px 6px; margin-bottom:4px; display:inline-block;">${e.category}</span>
          <div style="font-size:var(--font-size-sm); line-height:1.4; font-weight:700; margin-bottom:4px;">${e.title}</div>
          <span style="font-size:10px; color:var(--text-muted);">${e.date}</span>
        </div>
      </div>
    `).join("")}(),l();let o=document.getElementById("news-modal-close"),d=document.getElementById("news-detail-modal");o&&o.addEventListener("click",closeNewsDetail),d&&d.addEventListener("click",e=>{e.target===d&&closeNewsDetail()})}function openNewsDetail(e){let t=document.getElementById("news-detail-modal");if(!t||!window.CIS_DATA||!CIS_DATA.news)return;let a=CIS_DATA.news.find(t=>t.id===e);if(!a)return;a.views=(a.views||0)+1,document.getElementById("modal-news-title").textContent=a.title,document.getElementById("modal-news-category").textContent=a.category,document.getElementById("modal-news-date").textContent=a.date,document.getElementById("modal-news-views").textContent=`${a.views} <span data-i18n="js_str_65">مشاهدة</span>`,document.getElementById("modal-news-readtime").textContent=`<span data-i18n="js_str_111">وقت القراءة:</span> ${a.readTime}`,document.getElementById("modal-news-img").src=a.image,document.getElementById("modal-news-body").innerHTML=`<p>${a.body}</p><p style="margin-top:12px;"><span data-i18n="js_str_107">نحث جميع طلابنا وهيئتنا الأكاديمية على البقاء مطلعين على آخر مستجدات المعهد والتعليمات الرسمية الصادرة من قطاعات شؤون الطلاب، رعاية الشباب، وأقسام التدريب والتوظيف المختلفة.</span></p>`,t.classList.add("active"),document.body.style.overflow="hidden";let n=document.getElementById("news-search-input");if(n){let i=document.getElementById("featured-news-wrapper");if(i){let s=document.querySelector(".news-pill.active");s&&s.getAttribute("data-category"),document.getElementById("trending-news-list");let r=document.getElementById("news-page-grid"),l=CIS_DATA.news.find(e=>e.featured)||CIS_DATA.news[0],o=i.querySelector(".featured-content span");o&&l.id===e&&(o.innerHTML=`<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> ${a.views} <span data-i18n="js_str_65">مشاهدة</span>`);let d=r.querySelectorAll(".news-card");d.forEach(t=>{let n=t.querySelector("button");if(n&&n.getAttribute("onclick")===`openNewsDetail(${e})`){let i=t.querySelector("span");i&&(i.innerHTML=`<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> ${a.views}`)}})}}}function closeNewsDetail(){let e=document.getElementById("news-detail-modal");e&&(e.classList.remove("active"),document.body.style.overflow="")}function initEventsPage(){let e=document.getElementById("upcoming-events-list"),t=document.getElementById("past-events-list");if(!e&&!t)return;let a=window.CIS_DATA?CIS_DATA.events:[];!function t(){if(!e)return;let n=a.filter(e=>"upcoming"===e.type);e.innerHTML=n.map(e=>`
      <div class="card event-card" style="display:grid; grid-template-columns: 200px 1fr; gap:var(--space-md); padding:0; overflow:hidden;">
        <div style="background-image:url('${e.image}'); background-size:cover; background-position:center; min-height:180px;"></div>
        <div style="padding:var(--space-md); display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span class="badge badge-primary">${e.tag}</span>
              <span style="font-size:var(--font-size-xs); color:var(--color-primary); font-weight:700;">${e.day} ${e.month} ${e.year}</span>
            </div>
            <div style="font-family:var(--font-headings); font-size:var(--font-size-md); font-weight:800; margin-bottom:6px; color:var(--text-dark);">${e.title}</div>
            <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${e.desc}</p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(15,15,16,0.06); pt:10px; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; gap:12px; font-size:var(--font-size-xs); color:var(--text-muted);">
              <span style="display:inline-flex; align-items:center; gap:3px;">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                ${e.time}
              </span>
              <span style="display:inline-flex; align-items:center; gap:3px;">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                ${e.location}
              </span>
            </div>
            <button class="btn btn-primary" onclick="openRsvpModal(${e.id}, '${e.title}')" style="padding:6px 16px; font-size:var(--font-size-xs);"><span data-i18n="js_str_116">حجز مقعد مجاناً</span></button>
          </div>
        </div>
      </div>
    `).join("")}(),function e(){if(!t)return;let n=a.filter(e=>"past"===e.type);t.innerHTML=n.map(e=>`
      <div class="card event-card" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div>
          <div style="background-image:url('${e.image}'); height:160px; background-size:cover; background-position:center; border-radius:var(--radius-md) var(--radius-md) 0 0; position:relative;">
            <span class="badge" style="background:rgba(15,15,16,0.8); color:white; position:absolute; top:10px; right:10px;">${e.day} ${e.month}</span>
          </div>
          <div style="padding:var(--space-sm);">
            <span class="badge" style="background:var(--color-primary-light); color:var(--color-primary); margin-bottom:6px; font-size:10px;">${e.tag}</span>
            <div style="font-size:var(--font-size-base); font-weight:700; margin-bottom:6px; line-height:1.4;">${e.title}</div>
            <p style="font-size:var(--font-size-xs); color:var(--text-muted); line-height:1.5;">${e.desc}</p>
          </div>
        </div>
        <div style="padding:var(--space-sm); border-top:1px solid rgba(15,15,16,0.06);">
          <div style="font-size:11px; font-family:var(--font-headings); margin-bottom:6px; color:var(--text-dark);"><span data-i18n="js_str_78">معرض الصور الخاص بالحدث:</span></div>
          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:6px;">
            ${e.gallery.map((t,a)=>`
              <div onclick="openEventLightbox('${t}', '${e.title}')" style="background-image:url('${t}'); background-size:cover; background-position:center; aspect-ratio:4/3; border-radius:4px; cursor:zoom-in; border:1px solid rgba(0,0,0,0.08); transition:var(--transition-fast);" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1"></div>
            `).join("")}
          </div>
        </div>
      </div>
    `).join("")}(),function e(){let t=document.getElementById("calendar-grid-days");if(!t)return;let n="";for(let i=0;i<3;i++)n+='<div class="cal-day-slot blank"></div>';for(let s=1;s<=31;s++){let r=a.find(e=>parseInt(e.day,10)===s&&e.month===window.translateJS("js_str_46","يوليو")&&"2026"===e.year);n+=`
        <div class="cal-day-slot ${r?"has-event":""}" ${r?`onclick="showCalendarDayEvent(${r.id})"`:""}>
          <span class="day-number">${s}</span>
          ${r?'<span class="event-dot"></span>':""}
        </div>
      `}t.innerHTML=n,showCalendarDayEvent(1)}();let n=document.getElementById("rsvp-form");n&&n.addEventListener("submit",e=>{e.preventDefault();let t=document.getElementById("rsvp-student-name").value.trim(),a=document.getElementById("rsvp-student-id").value.trim(),i=document.getElementById("rsvp-student-email").value.trim();if(!t||!a||!i){alert(window.translateJS("js_str_102","يرجى ملء جميع الحقول المطلوبة للتسجيل."));return}let s=document.getElementById("rsvp-event-title").textContent,r=window.translateJS("js_str_33",'تم حجز مقعدك بنجاح في حدث "'),l=window.translateJS("js_str_16","تم إرسال كود الحجز وتذكرة الدخول للبريد الإلكتروني المرفق.");alert(`${r}${s}"!
${l}`),closeRsvpModal(),n.reset()});let i=document.getElementById("rsvp-modal-close"),s=document.getElementById("rsvp-modal");i&&i.addEventListener("click",closeRsvpModal),s&&s.addEventListener("click",e=>{e.target===s&&closeRsvpModal()})}function showCalendarDayEvent(e){let t=document.getElementById("calendar-event-details");if(!t||!window.CIS_DATA)return;let a=CIS_DATA.events.find(t=>t.id===e);if(!a){t.innerHTML=`<p style="color:var(--text-muted); font-size:var(--font-size-sm); text-align:center;"><span data-i18n="js_str_128">اختر يوماً مميزاً بنقطة برتقالية لعرض تفاصيل الحدث الخاص به.</span></p>`;return}t.innerHTML=`
    <div class="card" style="padding:var(--space-md); border-right:4px solid var(--color-primary); box-shadow:var(--shadow-md); animation:fade-in 0.4s ease;">
      <span class="badge badge-primary" style="margin-bottom:6px;">${a.tag}</span>
      <div style="font-family:var(--font-headings); font-size:var(--font-size-md); font-weight:800; margin-bottom:8px;">${a.title}</div>
      <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${a.desc}</p>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:var(--font-size-xs); color:var(--text-muted); border-top:1px solid rgba(15,15,16,0.06); padding-top:8px; margin-bottom:12px;">
        <span>📅 <span data-i18n="js_str_20">التاريخ:</span> ${a.day} ${a.month} ${a.year}</span>
        <span>⏰ <span data-i18n="js_str_127">الوقت:</span> ${a.time}</span>
        <span>📍 <span data-i18n="js_str_68">الموقع:</span> ${a.location}</span>
      </div>
      
      ${"upcoming"===a.type?`
        <button class="btn btn-primary" style="width:100%; padding:8px;" onclick="openRsvpModal(${a.id}, '${a.title}')"><span data-i18n="js_str_63">حجز تذكرة <span data-i18n="js_str_8">حضور</span> مجانية</span></button>
      `:`
        <span class="badge badge-gold" style="width:100%; text-align:center; padding:6px; display:block;"><span data-i18n="js_str_86">هذا الحدث قد انتهى بنجاح</span></span>
      `}
    </div>
  `;let n=document.querySelectorAll(".cal-day-slot");n.forEach(e=>{let t=e.querySelector(".day-number");t&&parseInt(t.textContent,10)===parseInt(a.day,10)?e.classList.add("active"):e.classList.remove("active")})}function openRsvpModal(e,t){let a=document.getElementById("rsvp-modal");a&&(document.getElementById("rsvp-event-title").textContent=t,a.classList.add("active"),document.body.style.overflow="hidden")}function closeRsvpModal(){let e=document.getElementById("rsvp-modal");e&&(e.classList.remove("active"),document.body.style.overflow="")}function openEventLightbox(e,t){let a=document.createElement("div");a.style.position="fixed",a.style.inset="0",a.style.backgroundColor="rgba(15, 15, 16, 0.9)",a.style.backdropFilter="blur(8px)",a.style.display="flex",a.style.flexDirection="column",a.style.alignItems="center",a.style.justifyContent="center",a.style.zIndex="999999",a.style.opacity="0",a.style.transition="opacity 0.3s ease",a.style.padding="var(--space-md)",a.innerHTML=`
    <div style="position:relative; max-width:80%; max-height:80%;">
      <img src="${e}" alt="${t}" style="width:100%; height:auto; max-height:75vh; border-radius:var(--radius-md); box-shadow:var(--shadow-lg); object-fit:contain; border:4px solid white;">
      <button id="gallery-lightbox-close" style="position:absolute; top:-40px; left:0; background:rgba(255,255,255,0.2); color:white; border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; font-size:18px; border:none;">&times;</button>
    </div>
    <div style="color:white; margin-top:16px; font-family:var(--font-headings); font-weight:700; font-size:var(--font-size-base); text-shadow:0 2px 4px rgba(0,0,0,0.5);">${t}</div>
  `,document.body.appendChild(a),document.body.style.overflow="hidden",setTimeout(()=>{a.style.opacity="1"},50);let n=a.querySelector("#gallery-lightbox-close");function i(){a.style.opacity="0",setTimeout(()=>{a.remove(),document.body.style.overflow=""},300)}n.addEventListener("click",i),a.addEventListener("click",e=>{e.target===a&&i()})}function openVideoFrameModal(e,t){let a=document.createElement("div");a.style.position="fixed",a.style.inset="0",a.style.backgroundColor="rgba(15, 15, 16, 0.9)",a.style.backdropFilter="blur(8px)",a.style.display="flex",a.style.flexDirection="column",a.style.alignItems="center",a.style.justifyContent="center",a.style.zIndex="999999",a.style.opacity="0",a.style.transition="opacity 0.3s ease",a.style.padding="var(--space-md)",a.innerHTML=`
    <div style="position:relative; width:90%; max-width:800px; aspect-ratio:16/9; background:#000; border-radius:var(--radius-md); overflow:hidden; box-shadow:var(--shadow-lg);">
      <iframe width="100%" height="100%" src="${e}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border:0;"></iframe>
      <button id="video-frame-close" style="position:absolute; top:12px; left:12px; background:rgba(255,255,255,0.2); color:#fff; border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; font-size:18px; border:none;">&times;</button>
    </div>
    <div style="color:white; margin-top:16px; font-family:var(--font-headings); font-weight:700; font-size:var(--font-size-base);">${t}</div>
  `,document.body.appendChild(a),document.body.style.overflow="hidden",setTimeout(()=>{a.style.opacity="1"},50);let n=a.querySelector("#video-frame-close");function i(){a.style.opacity="0",setTimeout(()=>{a.remove(),document.body.style.overflow=""},300)}n.addEventListener("click",i),a.addEventListener("click",e=>{e.target===a&&i()})}function initMediaPage(){let e=document.getElementById("media-grid-container");if(!e||!window.CIS_DATA||!CIS_DATA.media)return;let t=document.querySelectorAll(".media-tab-btn"),a=CIS_DATA.media;function n(n){let i="videos"===n?"videos":"photos";t.forEach(e=>e.classList.toggle("active",e.getAttribute("data-tab")===i)),"videos"===i?e.innerHTML=(a.videos||[]).map(e=>`
      <div class="media-card" style="cursor:pointer;"
        onclick="openVideoFrameModal('${e.url}', '${(e.title||"").replace(/'/g,"\\'")}')">
        <div class="media-thumbnail-wrapper" style="background-image:url('${e.thumbnail}');">
          <div class="media-overlay-play">
            <div class="media-play-icon">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
        <div class="media-info">
          <div>${e.title}</div>
          <p>${e.desc}</p>
        </div>
      </div>
    `).join(""):e.innerHTML=(a.photos||[]).map(e=>`
      <div class="media-card">
        <div class="media-thumbnail-wrapper" style="background-image:url('${e.image}');"></div>
        <div class="media-info">
          <div>${e.title}</div>
          <p>${e.desc}</p>
        </div>
      </div>
    `).join("")}function i(){return"videos"===(window.location.hash||"").replace("#","")?"videos":"photos"}t.forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab");n(t),history.replaceState(null,"",`#${"videos"===t?"videos":"photos"}`)})}),n(i()),window.addEventListener("hashchange",()=>n(i()))}function setupVanillaFormValidation(e,t){e&&(Object.keys(t).forEach(a=>{let n=t[a],i=e.querySelector(`#${a}`);if(i){n.isPhone&&i.addEventListener("input",e=>{e.target.value=e.target.value.replace(/\D/g,"")});let s=()=>{let e=n.validate(i.value);return function e(t,a,n){let i=t.closest(".form-group")||t.closest(".form-field");if(!i)return;let s=i.querySelector(".invalid-feedback");s||((s=document.createElement("div")).className="invalid-feedback",i.appendChild(s)),a?(t.classList.remove("is-invalid"),t.classList.add("is-valid"),s.textContent="",s.style.display="none"):(t.classList.remove("is-valid"),t.classList.add("is-invalid"),s.textContent=n,s.style.display="block")}(i,e.isValid,e.msg),e.isValid};i.addEventListener("input",s),i.addEventListener("blur",s),i.runCustomValidation=s}}),e.addEventListener("submit",a=>{let n=!0;Object.keys(t).forEach(t=>{let a=e.querySelector(`#${t}`);if(a&&a.runCustomValidation){let i=a.runCustomValidation();i||(n=!1)}}),n||(a.preventDefault(),a.stopImmediatePropagation(),alert(window.translateJS("js_str_89","يرجى ملء جميع الحقول المطلوبة بشكل صحيح للاستمرار.")))}),e.addEventListener("reset",()=>{e.querySelectorAll("input, textarea, select").forEach(e=>{e.classList.remove("is-valid","is-invalid"),e.style.borderColor="";let t=e.closest(".form-group")||e.closest(".form-field");if(t){let a=t.querySelector(".invalid-feedback");a&&(a.textContent="",a.style.display="none")}})}))}function initContactPage(){let e=document.getElementById("contact-page-form"),t=document.getElementById("contact-depts-grid"),a=document.getElementById("contact-emergencies-table");if(e||t||a)t&&window.CIS_DATA&&CIS_DATA.contacts&&(t.innerHTML=CIS_DATA.contacts.departments.map(e=>`
      <div class="card" style="padding:var(--space-md); border-top: 4px solid var(--color-primary); display:flex; flex-direction:column; gap:10px; margin:0;">
        <div style="font-family:var(--font-headings); font-size:var(--font-size-base); font-weight:800; color:var(--text-dark);">${e.name}</div>
        <div style="font-size:var(--font-size-xs); color:var(--text-muted); display:flex; flex-direction:column; gap:6px; flex:1;">
          <span>✉️ <a href="mailto:${e.email}" style="color:var(--color-primary); font-weight:700;">${e.email}</a></span>
          <span style="font-size:10px; background:var(--color-bg-neutral); padding:6px 8px; border-radius:6px; line-height:1.5;">⏰ ${e.hours}</span>
        </div>
        <a href="${function e(t){let a=t.replace(/[٠-٩]/g,e=>"٠١٢٣٤٥٦٧٨٩".indexOf(e));return"tel:"+a.replace(/[^\d+]/g,"")}(e.phone)}" class="btn btn-outline" style="justify-content:center; gap:8px; padding:8px 0; font-weight:800; font-size:var(--font-size-sm); direction:ltr;">📞 ${e.phone}</a>
      </div>
    `).join("")),a&&window.CIS_DATA&&CIS_DATA.contacts&&(a.innerHTML=CIS_DATA.contacts.emergencies.map(e=>`
      <tr>
        <td style="padding:var(--space-sm); font-weight:700;">${e.service}</td>
        <td style="padding:var(--space-sm); color:var(--color-primary); font-weight:800;">${e.phone}</td>
      </tr>
    `).join("")),e&&(setupVanillaFormValidation(e,{"contact-name":{validate(e){let t=e.trim();return t?/^[a-zA-Z\u0621-\u064A\u0671-\u06D3\u06D5\s]+$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_name_invalid","يجب أن يحتوي الاسم على حروف ومسافات فقط ولا يحتوي على أرقام أو رموز.")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}},"contact-phone":{isPhone:!0,validate(e){let t=e.trim();return t?/^01\d{9}$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_phone_invalid","يجب أن يكون رقم الهاتف مكوناً من 11 رقماً ويبدأ بـ 01.")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}},"contact-email":{validate(e){let t=e.trim();return t?/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_email_invalid","يرجى إدخال بريد إلكتروني صحيح (مثال: student@gmail.com).")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}},"contact-message":{validate(e){let t=e.trim();return t?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}}}),e.addEventListener("submit",t=>{t.defaultPrevented||(t.preventDefault(),alert(window.translateJS("js_str_1","شكرًا لك! تم إرسال رسالتك وقنوات الدعم الفني أو الإداري ستقوم بالرد عليك في غضون ٢٤ ساعة.")),e.reset())}))}function initHomepageContactForm(){let e=document.getElementById("contact-form");e&&(setupVanillaFormValidation(e,{"contact-name":{validate(e){let t=e.trim();return t?/^[a-zA-Z\u0621-\u064A\u0671-\u06D3\u06D5\s]+$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_name_invalid","يجب أن يحتوي الاسم على حروف ومسافات فقط ولا يحتوي على أرقام أو رموز.")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}},"contact-phone":{isPhone:!0,validate(e){let t=e.trim();return t?/^01\d{9}$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_phone_invalid","يجب أن يكون رقم الهاتف مكوناً من 11 رقماً ويبدأ بـ 01.")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}},"contact-email":{validate(e){let t=e.trim();return t?/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_email_invalid","يرجى إدخال بريد إلكتروني صحيح (مثال: student@gmail.com).")}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}},"contact-msg":{validate(e){let t=e.trim();return t?{isValid:!0}:{isValid:!1,msg:window.translateJS("val_required","هذا الحقل مطلوب.")}}}}),e.addEventListener("submit",t=>{t.defaultPrevented||(t.preventDefault(),alert(window.translateJS("js_str_1","شكرًا لك! تم إرسال رسالتك وقنوات الدعم الفني أو الإداري ستقوم بالرد عليك في غضون ٢٤ ساعة.")),e.reset())}))}document.addEventListener("DOMContentLoaded",()=>{initLanguageSwitcher(),initMobileMenu(),initStickyHeader(),initNavPill(),initButtonRipple(),initAnimatedCounters(),renderNews(),renderEvents(),renderTestimonials(),renderTimeline(),initAdmissionsPage(),initDepartmentPages(),initFacultyDirectory(),initStudentServicesPortal(),initVideoLightbox(),initTabsAndAccordions(),initScrollTop(),initNewsPage(),initEventsPage(),initMediaPage(),initContactPage(),initHomepageContactForm(),initQualityPage(),initItUnitPage(),initResearchPage(),initAlumniPage(),initCareerPage(),initFaqPage()}),window.openFacultyModal=openFacultyModal,window.closeFacultyModal=closeFacultyModal,window.openNewsDetail=openNewsDetail,window.closeNewsDetail=closeNewsDetail,window.openVideoFrameModal=openVideoFrameModal,window.initMediaPage=initMediaPage;let mapScale=1;function zoomMockMap(e){let t=document.getElementById("mock-map-image");t&&(mapScale=Math.max(.7,Math.min(3,mapScale+e)),t.style.transform=`scale(${mapScale})`)}function initQualityPage(){let e=document.getElementById("qa-objectives-list");if(!e||!window.CIS_DATA||!CIS_DATA.qualityAssurance)return;e.innerHTML=CIS_DATA.qualityAssurance.objectives.map(e=>`
    <li style="font-size:var(--font-size-sm); color:var(--text-muted); display:flex; gap:10px; align-items:flex-start; margin-bottom:12px;">
      <svg width="18" height="18" fill="none" stroke="var(--color-primary)" stroke-width="3" viewBox="0 0 24 24" style="min-width:18px; margin-top:2px;"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
      ${e}
    </li>
  `).join("");let t=document.getElementById("qa-reports-list");t&&(t.innerHTML=CIS_DATA.qualityAssurance.reports.map(e=>`
      <div class="qa-doc-row" style="animation: fade-in 0.4s ease;">
        <div>
          <span style="font-size:10px; color:var(--text-muted); display:block;"><span data-i18n="js_str_35">تاريخ التقرير:</span> ${e.date}</span>
          <span style="font-weight:700; font-size:var(--font-size-sm);">${e.title}</span>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <span class="badge badge-success" style="font-size:10px;"><span data-i18n="js_str_17">الحالة:</span> ${e.status}</span>
          <a href="assets/docs/quality-report.pdf" download class="btn btn-outline" style="padding:4px 12px; font-size:10px;"><span data-i18n="js_str_29">تحميل التقرير</span></a>
        </div>
      </div>
    `).join(""));let a=document.getElementById("qa-documents-list");a&&(a.innerHTML=CIS_DATA.qualityAssurance.documents.map(e=>`
      <div class="card" style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-sm) var(--space-md); margin-bottom:8px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:1.5rem;">📄</span>
          <div>
            <div style="font-size:var(--font-size-sm); font-weight:700; color:var(--text-dark);">${e.name}</div>
            <span style="font-size:10px; color:var(--text-muted);"><span data-i18n="js_str_132">حجم الملف:</span> ${e.size}</span>
          </div>
        </div>
        <a href="assets/docs/quality-report.pdf" download class="btn btn-primary" style="padding:6px 14px; font-size:var(--font-size-xs);"><span data-i18n="js_str_103">تحميل النموذج</span></a>
      </div>
    `).join(""))}function initItUnitPage(){let e=document.getElementById("it-services-grid");if(!e||!window.CIS_DATA||!CIS_DATA.itUnit)return;e.innerHTML=CIS_DATA.itUnit.services.map(e=>`
    <div class="card" style="padding:var(--space-md); display:flex; flex-direction:column; justify-content:space-between; border-top: 4px solid var(--color-primary);">
      <div>
        <div style="font-family:var(--font-headings); font-size:var(--font-size-base); font-weight:800; margin-bottom:6px; color:var(--text-dark);">${e.title}</div>
        <p style="font-size:var(--font-size-xs); color:var(--text-muted); line-height:1.5; margin-bottom:12px;">${e.desc}</p>
      </div>
      <a href="${e.link}" class="btn btn-outline" style="width:100%; text-align:center; padding:8px 0; font-size:var(--font-size-xs);"><span data-i18n="js_str_82">الدخول للخدمة</span></a>
    </div>
  `).join("");let t=document.getElementById("it-faqs-accordion");t&&(t.innerHTML=CIS_DATA.itUnit.faqs.map(e=>`
      <div class="accordion-item">
        <div class="accordion-header">${e.q}</div>
        <div class="accordion-content">
          <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.6;">${e.a}</p>
        </div>
      </div>
    `).join(""));let a=document.getElementById("it-support-form"),n=document.getElementById("it-support-log-list"),i=[];function s(){if(n){if(0===i.length){n.innerHTML=`<p style="font-size:var(--font-size-xs); color:var(--text-muted); text-align:center; padding:16px;"><span data-i18n="js_str_30">لا توجد طلبات دعم فني مسجلة باسمك حالياً.</span></p>`;return}n.innerHTML=i.map(e=>`
      <div class="card" style="padding:var(--space-sm); border-right:4px solid var(--color-accent-gold); margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; animation: fade-in 0.4s ease;">
        <div>
          <span style="font-size:9px; color:var(--text-muted); display:block;"><span data-i18n="js_str_59">رقم التذكرة:</span> #${e.id} | ${e.date}</span>
          <div style="font-size:var(--font-size-sm); font-weight:700; margin-bottom:2px;">${e.subject}</div>
          <p style="font-size:var(--font-size-xs); color:var(--text-muted);">${e.details}</p>
        </div>
        <span class="badge badge-gold" style="font-size:10px; white-space:nowrap;">${e.status}</span>
      </div>
    `).join("")}}a&&(a.addEventListener("submit",e=>{e.preventDefault();let t=document.getElementById("it-ticket-subject").value.trim(),n=document.getElementById("it-ticket-details").value.trim(),r=document.getElementById("it-ticket-category").value;if(!t||!n)return;let l="";if("email"===r)l=window.translateJS("js_str_11","البريد الجامعي");else{let o=I18n.t&&I18n.t.js_str_15?I18n.t.js_str_15.split(":"):["البوابة الذكية","الشبكات والواي فاي"],d=o[0]?o[0].replace(/^[(\s"']+|[)\s"':,]+$/g,""):"البوابة الذكية",c=o[1]?o[1].replace(/^[(\s"']+|[)\s"':,]+$/g,""):"الشبكات والواي فاي";l="portal"===r?d:c}let p={id:Math.floor(1e5+9e5*Math.random()),subject:`[${l}] ${t}`,details:n,date:new Date().toLocaleDateString("ar-EG"),status:window.translateJS("js_str_47","قيد المراجعة الفنية")};i.push(p),a.reset(),s();let m=window.translateJS("js_str_39","تم فتح تذكرة دعم فني جديدة برقم"),v=window.translateJS("js_str_87","سيتصل بك مهندس دعم فني من وحدة تكنولوجيا المعلومات فور مراجعة المشكلة.");alert(`${m} #${p.id}!
${v}`)}),s())}function initResearchPage(){let e=document.getElementById("research-projects-list");if(!e||!window.CIS_DATA||!CIS_DATA.research)return;e.innerHTML=CIS_DATA.research.projects.map(e=>`
    <div class="card" style="padding:var(--space-md); border-right:4px solid var(--color-primary);">
      <span class="badge badge-primary" style="margin-bottom:6px;">${e.tag}</span>
      <div style="font-family:var(--font-headings); font-size:var(--font-size-base); font-weight:800; margin-bottom:4px;">${e.title}</div>
      <p style="font-size:var(--font-size-xs); color:var(--text-muted); margin-bottom:8px; line-height:1.5;">${e.desc}</p>
      <span style="font-size:10px; font-weight:700; color:var(--color-secondary);"><span data-i18n="js_str_91">الباحث الرئيسي للمشروع:</span> ${e.lead}</span>
    </div>
  `).join("");let t=document.getElementById("research-publications-list");t&&(t.innerHTML=CIS_DATA.research.publications.map(e=>`
      <div class="qa-doc-row" style="animation: fade-in 0.4s ease;">
        <div style="flex:1;">
          <div style="font-size:var(--font-size-sm); font-weight:700; color:var(--text-dark); margin-bottom:2px;">"${e.title}"</div>
          <span style="font-size:var(--font-size-xs); color:var(--text-muted);">${e.authors} | ${e.journal} (${e.year})</span>
        </div>
        <a href="assets/docs/quality-report.pdf" download class="btn btn-outline" style="padding:4px 12px; font-size:10px;"><span data-i18n="js_str_121">تحميل</span> PDF</a>
      </div>
    `).join(""));let a=document.getElementById("research-hackathons-list");a&&(a.innerHTML=CIS_DATA.research.hackathons.map(e=>`
      <div class="card" style="padding:var(--space-sm) var(--space-md); border-top: 4px solid var(--color-accent-gold); margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <div style="font-size:var(--font-size-sm); font-weight:800; margin-bottom:2px;">${e.title}</div>
          <span style="font-size:10px; color:var(--text-muted);"><span data-i18n="js_str_20">التاريخ:</span> ${e.date}</span>
        </div>
        <span class="badge badge-gold" style="font-size:10px;">${e.rank}</span>
      </div>
    `).join(""))}function initAlumniPage(){let e=document.getElementById("alumni-stories-grid");if(!e||!window.CIS_DATA||!CIS_DATA.alumni)return;e.innerHTML=CIS_DATA.alumni.stories.map(e=>`
    <div class="card faculty-card" style="text-align:center; padding:var(--space-md); display:flex; flex-direction:column; align-items:center;">
      <img src="${e.avatar}" alt="${e.name}" class="faculty-avatar" style="border-color:var(--color-accent-gold); width:90px; height:90px;">
      <span class="badge badge-gold" style="margin-bottom:8px; font-size:10px;"><span data-i18n="js_str_133">قصة نجاح مميزة</span></span>
      <div style="font-size:var(--font-size-base); margin-bottom:2px; font-weight:800;">${e.name}</div>
      <p style="font-size:11px; color:var(--text-muted); margin-bottom:12px; font-weight:700;">${e.gradYear}</p>
      <div style="background:var(--color-bg-neutral); padding:8px 12px; border-radius:var(--radius-sm); border:1px dashed rgba(15,15,16,0.1); margin-bottom:12px; flex:1;">
        <p style="font-size:var(--font-size-xs); font-style:italic; color:var(--text-muted); line-height:1.5;">"${e.quote}"</p>
      </div>
      <span style="font-size:10px; color:var(--color-primary); font-weight:700;"><span data-i18n="js_str_117">الجهة الحالية:</span> ${e.company}</span>
    </div>
  `).join("");let t=document.getElementById("alumni-employment-rate");t&&(t.innerHTML=`
      <div class="card" style="padding:var(--space-md); text-align:center; border:none; background:var(--gradient-primary); color:white;">
        <div style="font-size:2.5rem; font-weight:900; line-height:1; margin-bottom:4px;">%٩١</div>
        <div style="color:white; font-family:var(--font-headings); font-size:var(--font-size-sm); margin-bottom:4px; font-weight:800;"><span data-i18n="js_str_58">معدل توظيف الخريجين</span></div>
        <p style="font-size:11px; color:rgba(255,255,255,0.9); line-height:1.4;"><span data-i18n="js_str_124">نسبة التحاق خريجي المعهد بسوق العمل في التخصصات التقنية والإدارية خلال الـ ٦ أشهر الأولى من التخرج.</span></p>
      </div>
    `)}function initCareerPage(){let e=document.getElementById("career-jobs-list");if(!e||!window.CIS_DATA||!CIS_DATA.career)return;e.innerHTML=CIS_DATA.career.jobs.map(e=>`
    <div class="job-card" style="animation: fade-in 0.4s ease;">
      <div>
        <span class="badge badge-primary" style="margin-bottom:4px; font-size:10px;">${e.type}</span>
        <div style="font-family:var(--font-headings); font-size:var(--font-size-base); font-weight:800; color:var(--text-dark); margin-bottom:2px;">${e.title}</div>
        <p style="font-size:var(--font-size-xs); color:var(--text-muted);">${e.company} | 📍 ${e.location}</p>
      </div>
      <div style="text-align:left; display:flex; flex-direction:column; gap:6px;">
        <span style="font-size:var(--font-size-xs); font-weight:800; color:var(--color-primary);">${e.salary}</span>
        <button class="btn btn-primary" style="padding:6px 16px; font-size:var(--font-size-xs);" onclick="alert(window.translateJS('js_str_49', 'تم تقديم طلبك بنجاح! سيقوم مسؤول التوظيف بمراجعة سيرتك المرفقة بملفك الأكاديمي والتواصل معك.'))"><span data-i18n="js_str_50">تقدم الآن</span></button>
      </div>
    </div>
  `).join("");let t=document.getElementById("cv-in-name"),a=document.getElementById("cv-in-title"),n=document.getElementById("cv-in-email"),i=document.getElementById("cv-in-phone"),s=document.getElementById("cv-in-bio"),r=document.getElementById("cv-in-edu"),l=document.getElementById("cv-in-exp"),o=document.getElementById("cv-in-skills"),d=document.getElementById("cv-out-name"),c=document.getElementById("cv-out-title"),p=document.getElementById("cv-out-email"),m=document.getElementById("cv-out-phone"),v=document.getElementById("cv-out-bio"),g=document.getElementById("cv-out-edu"),u=document.getElementById("cv-out-exp"),f=document.getElementById("cv-out-skills");function y(){if(d&&t&&(d.textContent=t.value.trim()||window.translateJS("js_str_85","اسم الطالب بالكامل")),c&&a&&(c.textContent=a.value.trim()||window.translateJS("js_str_69","التخصص المهنـي")),p&&n&&(p.textContent=n.value.trim()||window.translateJS("js_str_137","البريد الإلكتروني")),m&&i&&(m.textContent=i.value.trim()||window.translateJS("js_str_74","رقم الهاتف للتواصل")),v&&s&&(v.textContent=s.value.trim()||window.translateJS("js_str_113","اكتب نبذة مختصرة عن مهاراتك وأهدافك الوظيفية تظهر هنا للشركات.")),g&&r&&(g.innerHTML=(r.value.trim()||window.translateJS("js_str_108","المعهد العالي لعلوم الحاسب ونظم المعلومات - شعبة علوم الحاسب (دفعة ٢٠٢٦)")).replace(/\n/g,"<br>")),u&&l&&(u.innerHTML=(l.value.trim()||window.translateJS("js_str_72","مطور برمجيات متدرب في شركة حلول برمجية (التدريب الصيفي ٢٠٢٥) - العمل على بناء واجهات المستخدم واختبار الأنظمة.")).replace(/\n/g,"<br>")),f&&o){let e=o.value.split(",");f.innerHTML=e.map(e=>{let t=e.trim();return t?`<span class="badge" style="background:var(--color-bg-neutral); color:var(--text-dark); margin:2px;">${t}</span>`:""}).join("")||"JavaScript, HTML/CSS, Git, SQL"}}[t,a,n,i,s,r,l,o].forEach(e=>{e&&e.addEventListener("input",y)});let h=document.getElementById("cv-print-btn");h&&h.addEventListener("click",()=>{window.print()}),document.addEventListener("langchange",y),y()}function initFaqPage(){let e=document.getElementById("faq-page-accordion-list");if(!e||!window.CIS_DATA||!CIS_DATA.faqsList)return;let t=document.querySelectorAll(".faq-tab-btn"),a=document.getElementById("faq-page-search-input"),n="all",i="";function s(){e.innerHTML="";let t=i.toLowerCase(),a=CIS_DATA.faqsList.filter(e=>{let a="all"===n||e.category===n,i=e.q.toLowerCase().includes(t)||e.a.toLowerCase().includes(t);return a&&i});if(0===a.length){e.innerHTML=`<p style="text-align:center; padding:24px; color:var(--text-muted); font-size:var(--font-size-sm);"><span data-i18n="js_str_75">لا توجد أسئلة شائعة مطابقة لبحثك.</span></p>`;return}let s={admissions:"القبول",academics:"الدراسة","student-life":"الأنشطة",technical:"الخدمات الفنية"};e.innerHTML=a.map(e=>{let t="faq_cat_"+e.category.replace(/-/g,"_"),a=window.translateJS(t,s[e.category]||e.category);return`
        <div class="accordion-item" style="animation: fade-in 0.4s ease;">
          <div class="accordion-header" style="display:flex; justify-content:space-between; align-items:center;">
            <span>${e.q}</span>
            <span class="badge" data-i18n="${t}" style="font-size:9px; background:var(--color-bg-neutral); color:var(--text-muted);">
              ${a}
            </span>
          </div>
          <div class="accordion-content">
            <p style="font-size:var(--font-size-sm); color:var(--text-muted); line-height:1.6; margin:0;">${e.a}</p>
          </div>
        </div>
      `}).join("")}t.forEach(e=>{e.addEventListener("click",()=>{t.forEach(e=>e.classList.remove("active")),e.classList.add("active"),n=e.getAttribute("data-category"),s()})}),a&&a.addEventListener("input",e=>{i=e.target.value.trim(),s()}),s()}function initGlobalSearch(){let e=document.querySelectorAll(".global-search-trigger-btn"),t=document.getElementById("site-search-modal-backdrop");if(!t)return;let a=t.querySelector(".search-modal-close-btn"),n=t.querySelector(".search-modal-input"),i=document.getElementById("search-suggestions-box"),s=document.getElementById("search-recent-box"),r=[{title:window.translateJS("js_str_98","الصفحة الرئيسية")+" (Homepage)",desc:window.translateJS("js_str_9","المعهد العالي لعلوم الحاسب ونظم المعلومات الإدارية"),url:"index.html"},{title:window.translateJS("js_str_51","عن معهد")+" CIS (About Institute)",desc:window.translateJS("js_str_130","تاريخ، رؤية ورسالة، كلمة العميد، والإنجازات"),url:"about.html"},{title:window.translateJS("js_str_96","القبول والتسجيل")+" (Admissions)",desc:window.translateJS("js_str_120","شروط الالتحاق، المصروفات الدراسية والملفات"),url:"admissions.html"},{title:window.translateJS("js_str_37","دليل أعضاء هيئة التدريس")+" (Faculty)",desc:window.translateJS("js_str_42","البحث والتواصل مع الهيئة التدريسية والساعات المكتبية"),url:"faculty.html"},{title:window.translateJS("js_str_136","بوابة خدمات الطلاب")+" (Student Services)",desc:window.translateJS("js_str_43","النتائج، الجداول، تسجيل رغبات التدريب والمكتبة"),url:"services.html"},{title:window.translateJS("js_str_115","أخبار المعهد والبيانات")+" (News Center)",desc:window.translateJS("js_str_25","تغطية الأحداث والتوجيهات الأكاديمية الرسمية"),url:"news.html"},{title:window.translateJS("js_str_70","الفعاليات والأنشطة")+" (Events Calendar)",desc:window.translateJS("js_str_54","الأحداث الرياضية والعلمية وحجز المقاعد للفعاليات"),url:"events.html"},{title:window.translateJS("js_str_71","المركز الإعلامي والمطبوعات")+" (Media)",desc:window.translateJS("js_str_18","معرض الصور، فيديو المعهد، التنزيلات الورقية"),url:"media.html"},{title:window.translateJS("js_str_27","شعبة علوم الحاسب")+" (CS)",desc:window.translateJS("js_str_62","قسم البرمجة وبحوث الرؤية الحاسوبية والذكاء الاصطناعي"),url:"dept-cs.html"},{title:window.translateJS("js_str_138","شعبة نظم المعلومات")+" (BIS)",desc:window.translateJS("js_str_57","تطوير تطبيقات الأعمال والأنظمة وتحليل البيانات للمؤسسات"),url:"dept-bis.html"},{title:window.translateJS("js_str_31","وحدة تكنولوجيا المعلومات")+" (IT)",desc:window.translateJS("js_str_28","البريد الإلكتروني، حسابات الواي فاي، وتذاكر الدعم"),url:"it-unit.html"},{title:window.translateJS("js_str_97","وحدة ضمان الجودة")+" (Quality Assurance)",desc:window.translateJS("js_str_109","الاعتماد الأكاديمي، النماذج، والتقارير الذاتية"),url:"quality.html"},{title:window.translateJS("js_str_64","البحث العلمي والابتكار")+" (Research)",desc:window.translateJS("js_str_134","مشاريع الذكاء الاصطناعي والأوراق البحثية المنشورة"),url:"research.html"},{title:window.translateJS("js_str_40","مركز التطوير المهني")+" (Career & CV)",desc:window.translateJS("js_str_12","وظائف الخريجين وباني السيرة الذاتية التفاعلي المطبوع"),url:"career.html"},{title:window.translateJS("js_str_123","الأسئلة الشائعة العامة")+" (FAQs)",desc:window.translateJS("js_str_99","شروحات التحويل والمقاصة وسحب الملفات والتقديم"),url:"faq.html"},{title:window.translateJS("js_str_84","تواصل معنا مباشرة")+" (Contact Us)",desc:window.translateJS("js_str_76","أرقام الهواتف، خريطة الموقع، والواتساب والدعم المباشر"),url:"contact.html"}];function l(){t.classList.add("active"),document.body.style.overflow="hidden",setTimeout(()=>n.focus(),100),c(),i&&(i.innerHTML="")}function o(){t.classList.remove("active"),document.body.style.overflow="",n&&(n.value="")}function d(){let e=I18n.t&&I18n.t.js_str_52?I18n.t.js_str_52.split(",").map(e=>e.replace(/^[(\s"']+|[)\s"':,]+$/g,"")):["تنسيق القبول","جدول المحاضرات","نتائج الامتحانات"];try{return JSON.parse(localStorage.getItem("cis_recent_searches"))||e}catch{return e}}function c(){if(!s)return;let e=d();s.innerHTML=e.map(e=>`
      <span class="search-history-chip" onclick="triggerPresetSearch('${e}')">${e}</span>
    `).join("")}function p(e){if(!i)return;let t=e.toLowerCase().trim();if(!t){i.innerHTML="";return}let a=r.filter(e=>e.title.toLowerCase().includes(t)||e.desc.toLowerCase().includes(t));if(0===a.length){i.innerHTML=`<p style="font-size:var(--font-size-xs); color:var(--text-muted); text-align:center; padding:16px;"><span data-i18n="js_str_101">لا توجد صفحات مطابقة لمصطلح البحث.</span></p>`;return}i.innerHTML=a.map(t=>`
      <div class="search-result-hit" onclick="addRecent('${e}'); window.location.href='${t.url}';">
        <div>
          <div>${t.title}</div>
          <p>${t.desc}</p>
        </div>
        <span style="font-size:12px; color:var(--color-primary); font-weight:700;"><span data-i18n="js_str_22">انتقال</span> 🔗</span>
      </div>
    `).join("")}e.forEach(e=>e.addEventListener("click",l)),a&&a.addEventListener("click",o),t.addEventListener("click",e=>{e.target===t&&o()}),window.triggerPresetSearch=function(e){n&&(n.value=e,p(e))},n&&(n.addEventListener("input",e=>{p(e.target.value)}),n.addEventListener("keypress",e=>{"Enter"===e.key&&function e(t){if(!t)return;let a=d().filter(e=>e!==t);a.unshift(t),a=a.slice(0,5),localStorage.setItem("cis_recent_searches",JSON.stringify(a)),c()}(n.value)})),c()}window.zoomMockMap=zoomMockMap,window.initFaqPage=initFaqPage,window.initGlobalSearch=initGlobalSearch;
function cisWriteFrame(e){return requestAnimationFrame(e)}function initNavPill(){let e=document.querySelector(".nav-menu");if(!e)return;let t=e.querySelector(".nav-pill");t||(t=document.createElement("li"),t.setAttribute("aria-hidden","true"),t.className="nav-pill",e.insertBefore(t,e.firstChild));let a=Array.from(e.querySelectorAll(".nav-item > .nav-link")),n=Array.from(e.querySelectorAll(".nav-item")),i=new Map,s=null,r=!1,l=window.location.pathname.split("/").pop()||"index.html";function o(e){return(e.getAttribute("href")||"").split("/").pop().split("#")[0]}function d(){let t=e.getBoundingClientRect().left;i.clear(),n.forEach(e=>{let a=e.querySelector(".nav-link");if(a){let n=a.getBoundingClientRect();i.set(e,{x:n.left-t,width:n.width})}})}function c(e){s=e,r||(r=!0,cisWriteFrame(()=>{if(s){let e=i.get(s);e?(t.style.width="1px",t.style.transform=`translate3d(${e.x}px, -50%, 0) scaleX(${e.width})`,t.style.transformOrigin="left center"):t.style.width="0px"}else t.style.width="0px";r=!1}))}function p(){c(e.querySelector(".nav-item.active"))}e.querySelectorAll(".nav-item").forEach(e=>e.classList.remove("active"));let m=null;a.forEach(e=>{m||o(e)!==l||(m=e.closest(".nav-item"))}),m||e.querySelectorAll(".nav-item .dropdown-item").forEach(e=>{m||o(e)!==l||(m=e.closest(".nav-item"))}),m&&m.classList.add("active"),d(),t.style.transition="none",p(),cisWriteFrame(()=>{cisWriteFrame(()=>{t.style.transition="",e.classList.add("pill-ready")})}),a.forEach(e=>{e.addEventListener("click",function(){let e=this.closest(".nav-item");c(e),cisWriteFrame(()=>{n.forEach(e=>e.classList.remove("active")),e.classList.add("active")})})}),n.forEach(e=>{e.addEventListener("mouseenter",function(){c(this)}),e.addEventListener("mouseleave",p)});let v;window.addEventListener("resize",()=>{clearTimeout(v),v=setTimeout(()=>{d(),t.style.transition="none",p(),cisWriteFrame(()=>{cisWriteFrame(()=>{t.style.transition=""})})},150)},{passive:!0})}function initButtonRipple(){document.body.addEventListener("click",function(e){let t=e.target.closest(".btn");if(!t)return;let a=e.offsetX,n=e.offsetY;cisWriteFrame(()=>{let e=document.createElement("span");e.className="ripple",e.style.left=`${a}px`,e.style.top=`${n}px`,t.appendChild(e),setTimeout(()=>{e.remove()},600)})})}function initTabsAndAccordions(){let e=document.querySelectorAll("[data-tab-target]");e.forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab-target"),a=document.querySelector(t);if(!a)return;let n=e.parentElement.querySelectorAll("[data-tab-target]"),i=a.parentElement.children;cisWriteFrame(()=>{n.forEach(e=>e.classList.remove("active")),Array.from(i).forEach(e=>e.classList.remove("active")),e.classList.add("active"),a.classList.add("active")})})}),document.body.addEventListener("click",e=>{let t=e.target.closest(".accordion-header");if(!t)return;let a=t.parentElement,n=t.nextElementSibling,i=a.classList.contains("active"),s=a.parentElement,r=Array.from(s.querySelectorAll(".accordion-item")),l=r.map(e=>{let t=e.querySelector(".accordion-content");return{item:e,content:t,height:t?t.scrollHeight:0}});cisWriteFrame(()=>{l.forEach(e=>{e.item.classList.remove("active"),e.content&&(e.content.style.maxHeight=null)}),i||(a.classList.add("active"),n&&(n.style.maxHeight=(l.find(e=>e.content===n)?.height||0)+"px"))})})}
function initNavPill(){let e=document.querySelector(".nav-menu");if(!e)return;let t=e.querySelector(".nav-pill"),a=!t;t||(t=document.createElement("li"),t.setAttribute("aria-hidden","true"),t.className="nav-pill");let n=Array.from(e.querySelectorAll(".nav-item > .nav-link")),i=Array.from(e.querySelectorAll(".nav-item")),s=new Map,r=null,l=!1,o=window.location.pathname.split("/").pop()||"index.html";function d(e){return(e.getAttribute("href")||"").split("/").pop().split("#")[0]}function c(){let t=e.getBoundingClientRect().left;s.clear(),i.forEach(e=>{let a=e.querySelector(".nav-link");if(a){let n=a.getBoundingClientRect();s.set(e,{x:n.left-t,width:n.width})}})}function p(e){r=e,l||(l=!0,cisWriteFrame(()=>{if(r){let e=s.get(r);e?(t.style.width="1px",t.style.transform=`translate3d(${e.x}px, -50%, 0) scaleX(${e.width})`,t.style.transformOrigin="left center"):t.style.width="0px"}else t.style.width="0px";l=!1}))}function m(){p(e.querySelector(".nav-item.active"))}let v=null;n.forEach(e=>{v||d(e)!==o||(v=e.closest(".nav-item"))}),v||e.querySelectorAll(".nav-item .dropdown-item").forEach(e=>{v||d(e)!==o||(v=e.closest(".nav-item"))}),c(),cisWriteFrame(()=>{a&&e.insertBefore(t,e.firstChild),i.forEach(e=>e.classList.remove("active")),v&&v.classList.add("active"),t.style.transition="none",m(),cisWriteFrame(()=>{cisWriteFrame(()=>{t.style.transition="",e.classList.add("pill-ready")})})}),n.forEach(e=>{e.addEventListener("click",function(){let e=this.closest(".nav-item");p(e),cisWriteFrame(()=>{i.forEach(e=>e.classList.remove("active")),e.classList.add("active")})})}),i.forEach(e=>{e.addEventListener("mouseenter",function(){p(this)}),e.addEventListener("mouseleave",m)});let g;window.addEventListener("resize",()=>{clearTimeout(g),g=setTimeout(()=>{c(),cisWriteFrame(()=>{t.style.transition="none",m(),cisWriteFrame(()=>{cisWriteFrame(()=>{t.style.transition=""})})})},150)},{passive:!0})}
