(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();class c{static instance;observer;animationDelay=100;constructor(){this.init()}static getInstance(){return c.instance||(c.instance=new c),c.instance}init(){this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(this.animateElement(e.target),this.observer.unobserve(e.target))})},{threshold:.1,rootMargin:"0px 0px -50px 0px"}),this.observeElements()}observeElements(){document.querySelectorAll(".skill-item").forEach(s=>{this.observer.observe(s)}),document.querySelectorAll(".timeline-item").forEach(s=>{this.observer.observe(s)}),document.querySelectorAll(".project-card").forEach(s=>{this.observer.observe(s)})}observeSkillItems(){document.querySelectorAll(".skill-item").forEach(e=>{e.classList.contains("animate-in")||this.observer.observe(e)})}observeTimelineItems(){document.querySelectorAll(".timeline-item").forEach(e=>{e.classList.contains("animate-in")||this.observer.observe(e)})}observeProjectCards(){document.querySelectorAll(".project-card").forEach(e=>{e.classList.contains("animate-in")||this.observer.observe(e)})}observeTestimonialCards(){document.querySelectorAll(".testimonial-card").forEach(e=>{e.classList.contains("animate-in")||this.observer.observe(e)})}animateElement(t){const n=Array.from(t.parentElement?.children||[]).indexOf(t)*this.animationDelay;setTimeout(()=>{t.classList.add("animate-in")},n)}}document.addEventListener("DOMContentLoaded",()=>{c.getInstance()});window.AnimationController=c;class f{themeToggle;themeIcon;constructor(){this.themeToggle=document.getElementById("theme-toggle"),this.themeIcon=this.themeToggle.querySelector("i"),this.init()}init(){const t=localStorage.getItem("theme")||"light";this.setTheme(t),this.themeToggle.addEventListener("click",()=>{this.toggleTheme()})}setTheme(t){const e=document.body,n=document.documentElement;t==="dark"?(e.setAttribute("data-theme","dark"),n.setAttribute("data-theme","dark"),this.themeIcon.setAttribute("class","fas fa-sun"),this.themeToggle.classList.add("dark-mode"),localStorage.setItem("theme","dark")):(e.removeAttribute("data-theme"),n.removeAttribute("data-theme"),this.themeIcon.setAttribute("class","fas fa-moon"),this.themeToggle.classList.remove("dark-mode"),localStorage.setItem("theme","light"))}toggleTheme(){const e=document.body.getAttribute("data-theme")==="dark"?"light":"dark";this.setTheme(e)}}document.addEventListener("DOMContentLoaded",()=>{new f});class r{static instance;observer;animationDuration=2e3;constructor(){this.init()}static getInstance(){return r.instance||(r.instance=new r),r.instance}init(){this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(this.animateCounter(e.target),this.observer.unobserve(e.target))})},{threshold:.5,rootMargin:"0px 0px -100px 0px"}),this.observeStatNumbers()}observeStatNumbers(){document.querySelectorAll(".stat-number").forEach(e=>{e.classList.contains("animated")||this.observer.observe(e)})}animateCounter(t){const e=parseInt(t.getAttribute("data-target")||"0"),n=performance.now();t.classList.add("animated");const s=a=>{const o=a-n,d=Math.min(o/this.animationDuration,1),v=(g=>1-Math.pow(1-g,4))(d),p=Math.floor(v*e);t.textContent=p.toString(),d<1?requestAnimationFrame(s):t.textContent=e.toString()};requestAnimationFrame(s)}}document.addEventListener("DOMContentLoaded",()=>{r.getInstance()});window.CounterController=r;class b{loadingScreen;minLoadingTime=1500;constructor(){this.loadingScreen=document.getElementById("loading-screen"),this.init()}init(){const t=performance.now();window.addEventListener("load",()=>{const e=performance.now()-t,n=Math.max(0,this.minLoadingTime-e);setTimeout(()=>{this.hideLoadingScreen()},n)})}hideLoadingScreen(){this.loadingScreen&&(this.loadingScreen.classList.add("fade-out"),setTimeout(()=>{this.loadingScreen.remove()},500))}}document.addEventListener("DOMContentLoaded",()=>{new b});class l{static instance;dataCache=new Map;constructor(){}static getInstance(){return l.instance||(l.instance=new l),l.instance}async loadData(t){if(this.dataCache.has(t))return this.dataCache.get(t);try{const n=await fetch(`/vinay-portfolio-refactor/data/${t}.json`);if(!n.ok)throw new Error(`Failed to load ${t} data: ${n.statusText}`);const s=await n.json();return this.dataCache.set(t,s),s}catch(e){return console.error(`Error loading ${t} data:`,e),null}}getData(t){return this.dataCache.get(t)}async loadAllSections(){try{const[t,e,n,s,a,o,d,u]=await Promise.all([this.loadData("hero"),this.loadData("about"),this.loadData("technologies"),this.loadData("projects"),this.loadData("experience"),this.loadData("testimonials"),this.loadData("contact"),this.loadData("footer")]);t&&$(t.hero),e&&y(e.about),n&&S(n.technologies),s&&w(s.projects),a&&L(a.experience),o&&j(o.testimonials),d&&I(d.contact),u&&T(u.footer),k()}catch(t){console.error("Failed to load sections:",t)}}}function $(i){const t=document.querySelector(".hero-container");t&&(t.innerHTML=`
    <div class="hero-content">
      <div class="hero-image">
        <img src="${i.image}" alt="${i.imageAlt}" class="profile-img">
        <div class="image-glow"></div>
      </div>
      <div class="hero-text">
        <h1 class="hero-title">${i.title}</h1>
        <p class="hero-subtitle">${i.subtitle}</p>
        <div class="hero-buttons">
          ${i.buttons.map(e=>`<button class="${e.class}" onclick="${e.onclick}">${e.text}</button>`).join("")}
        </div>
      </div>
    </div>
    <div class="skills-marquee">
      <div class="marquee-content">
        ${i.marqueeItems.map(e=>`<span class="marquee-item">${e}</span>`).join("")}
        ${i.marqueeItems.map(e=>`<span class="marquee-item">${e}</span>`).join("")}
      </div>
    </div>
  `)}function y(i){const t=document.querySelector("#about .container");t&&(t.innerHTML=`
    <h2 class="section-title">${i.title}</h2>
    <div class="hero-stats">
      ${i.stats.map(e=>`
        <div class="stat-item">
          <div class="stat-number" data-target="${e.number}">0</div>
          <div class="stat-label">${e.label}</div>
        </div>
      `).join("")}
    </div>
    
    <div class="about-content">
      <p class="about-intro">${i.intro}</p>
      
      <div class="about-highlights">
        <h3 class="accordion-header" onclick="toggleAccordion('accomplishments')">
          ${i.highlights.title}
          <span class="accordion-icon" id="accomplishments-icon">+</span>
        </h3>
        <div class="accordion-content expanded" id="accomplishments-content">
          <ul>
            ${i.highlights.items.map(e=>`<li>${e}</li>`).join("")}
          </ul>
        </div>
      </div>
      
      <p class="about-collaboration">${i.collaboration}</p>
      
      <div class="about-community">
        <h3 class="accordion-header" onclick="toggleAccordion('community')">
          ${i.community.title}
          <span class="accordion-icon" id="community-icon">+</span>
        </h3>
        <div class="accordion-content expanded" id="community-content">
          <p>${i.community.intro}</p>
          <ul>
            ${i.community.items.map(e=>`<li>${e}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `)}function S(i){const t=document.querySelector(".skills-grid");t&&(t.innerHTML=i.map(e=>`
    <div class="skill-item">
      <div class="skill-icon">
        <i class="${e.icon}"></i>
      </div>
      <span class="skill-name">${e.name}</span>
    </div>
  `).join(""))}function w(i){const t=document.querySelector("#projects .container");t&&(t.innerHTML=`
    <h2 class="section-title">${i.title}</h2>
    <div class="projects-grid">
      ${i.projects.map(e=>`
        <div class="project-card" onclick="openProjectModal('${e.id}')">
          <div class="project-image">
            <img src="${e.image}" alt="${e.imageAlt}" class="project-preview-img">
          </div>
          <div class="project-content">
            <h3>${e.title}</h3>
            <p>${e.description}</p>
            <div class="project-tech">
              ${e.technologies.map(n=>`<span class="tech-tag">${n}</span>`).join("")}
            </div>
            <div class="project-links">
              <button class="btn btn-small">View Project</button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `)}function L(i){const t=document.querySelector("#experience .container");t&&(t.innerHTML=`
    <h2 class="section-title">${i.title}</h2>
    <div class="timeline">
      ${i.timeline.map(e=>`
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3>${e.title}</h3>
            <h4>${e.company}</h4>
            <span class="timeline-date">${e.date}</span>
            <p>${e.description}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `)}function j(i){const t=document.querySelector("#testimonials .container");t&&(t.innerHTML=`
    <h2 class="section-title">${i.title}</h2>
    <div class="testimonials-grid">
      ${i.testimonials.map(e=>`
        <div class="testimonial-card">
          <div class="testimonial-content">
            <div class="quote-icon">
              <i class="fas fa-quote-right"></i>
            </div>
            <div class="testimonial-author">
              <img src="${e.author.avatar}" alt="${e.author.avatarAlt}" class="author-avatar">
              <div class="author-info">
                <h4 class="author-name">${e.author.name}</h4>
                <p class="author-title">${e.author.title}</p>
                <p class="testimonial-date">${e.author.date}</p>
              </div>
            </div>
            <p class="testimonial-text">${e.text}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `)}function I(i){const t=document.querySelector("#contact .container");t&&(t.innerHTML=`
    <h2 class="section-title">${i.title}</h2>
    <div class="contact-content">
      <div class="contact-info">
        <p class="contact-description">${i.description}</p>
        <div class="contact-methods">
          ${i.methods.map(e=>`
            <a href="${e.href}" ${e.target?`target="${e.target}"`:""} ${e.rel?`rel="${e.rel}"`:""} class="contact-method">
              <i class="${e.icon}"></i>
              <span>${e.text}</span>
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  `)}function T(i){const t=document.querySelector(".footer .container");t&&(t.innerHTML=`
    <div class="footer-content">
      <div class="footer-info">
        <h3>${i.name}</h3>
        <p>${i.description}</p>
      </div>
      <div class="footer-links">
        ${i.links.map(e=>`
          <a href="${e.href}" ${e.target?`target="${e.target}"`:""} ${e.rel?`rel="${e.rel}"`:""} aria-label="${e.ariaLabel}">
            <i class="${e.icon}"></i>
          </a>
        `).join("")}
      </div>
    </div>
    <div class="footer-bottom">
      <p>${i.copyright}</p>
    </div>
  `)}function k(){const i=window.AnimationController?.getInstance();i?(i.observeSkillItems&&i.observeSkillItems(),i.observeTimelineItems&&i.observeTimelineItems(),i.observeProjectCards&&i.observeProjectCards(),i.observeTestimonialCards&&i.observeTestimonialCards()):document.querySelectorAll(".skill-item, .timeline-item, .project-card, .testimonial-card").forEach((n,s)=>{const a=s*100;setTimeout(()=>{n.classList.add("animate-in")},a)});const t=window.CounterController?.getInstance();t&&t.observeStatNumbers&&t.observeStatNumbers()}document.addEventListener("DOMContentLoaded",async()=>{await l.getInstance().loadAllSections()});window.DataLoader=l;const m=document.getElementById("nav-toggle"),h=document.getElementById("nav-menu");m&&h&&(m.addEventListener("click",()=>{h.classList.toggle("active"),m.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(i=>{i.addEventListener("click",()=>{h.classList.remove("active"),m.classList.remove("active")})}),window.addEventListener("scroll",()=>{const i=document.querySelector(".nav");i&&(window.scrollY>100?i.classList.add("scrolled"):i.classList.remove("scrolled"))}));function E(i){document.getElementById(i)?.scrollIntoView({behavior:"smooth"})}function C(i){const t=document.getElementById("project-modal"),e=document.getElementById("modal-body"),s={sudoku:{title:"Sudoku Game",description:"A responsive Sudoku application built with vanilla JavaScript and TailwindCSS. Features include difficulty levels, timer, hints, and a clean, intuitive interface.",tech:["JavaScript","TailwindCSS","HTML5","CSS3"],features:["Multiple difficulty levels","Timer functionality","Hint system","Responsive design","Clean UI/UX"],links:{github:"https://github.com/vinay/sudoku",demo:"https://vinay-sudoku.netlify.app"}},minesweeper:{title:"Minesweeper",description:"A modern take on the classic Minesweeper game built with React. Features include customizable board sizes, difficulty levels, and a sleek interface.",tech:["React","JavaScript","CSS3","HTML5"],features:["Customizable board sizes","Multiple difficulty levels","Modern UI design","Responsive layout","Smooth animations"],links:{github:"https://github.com/vinay/minesweeper",demo:"https://vinay-minesweeper.netlify.app"}}}[i];s&&t&&e&&(e.innerHTML=`
        <h2>${s.title}</h2>
        <p class="project-description">${s.description}</p>
        <div class="project-features">
            <h3>Features:</h3>
            <ul>
            ${s.features.map(a=>`<li>${a}</li>`).join("")}
            </ul>
        </div>
        <div class="project-tech-stack">
            <h3>Tech Stack:</h3>
            <div class="tech-tags">
            ${s.tech.map(a=>`<span class="tech-tag">${a}</span>`).join("")}
            </div>
        </div>
        <div class="project-links">
            <a href="${s.links.github}" target="_blank" class="btn btn-primary">View Code</a>
            <a href="${s.links.demo}" target="_blank" class="btn btn-secondary">Live Demo</a>
        </div>
        `,t.style.display="block")}function M(){const i=document.getElementById("project-modal");i&&(i.style.display="none")}window.addEventListener("click",i=>{const t=document.getElementById("project-modal");i.target===t&&t&&(t.style.display="none")});window.scrollToSection=E;window.openProjectModal=C;window.closeProjectModal=M;
