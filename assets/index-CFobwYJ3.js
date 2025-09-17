(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(e){if(e.ep)return;e.ep=!0;const i=n(e);fetch(e.href,i)}})();const s=document.getElementById("nav-toggle"),a=document.getElementById("nav-menu");s&&a&&(s.addEventListener("click",()=>{a.classList.toggle("active"),s.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(t=>{t.addEventListener("click",()=>{a.classList.remove("active"),s.classList.remove("active")})}),window.addEventListener("scroll",()=>{const t=document.querySelector(".nav");t&&(window.scrollY>100?t.classList.add("scrolled"):t.classList.remove("scrolled"))}));function r(t){document.getElementById(t)?.scrollIntoView({behavior:"smooth"})}function d(t){const o=document.getElementById("project-modal"),n=document.getElementById("modal-body"),e={sudoku:{title:"Sudoku Game",description:"A responsive Sudoku application built with vanilla JavaScript and TailwindCSS. Features include difficulty levels, timer, hints, and a clean, intuitive interface.",tech:["JavaScript","TailwindCSS","HTML5","CSS3"],features:["Multiple difficulty levels","Timer functionality","Hint system","Responsive design","Clean UI/UX"],links:{github:"https://github.com/vinay/sudoku",demo:"https://vinay-sudoku.netlify.app"}},minesweeper:{title:"Minesweeper",description:"A modern take on the classic Minesweeper game built with React. Features include customizable board sizes, difficulty levels, and a sleek interface.",tech:["React","JavaScript","CSS3","HTML5"],features:["Customizable board sizes","Multiple difficulty levels","Modern UI design","Responsive layout","Smooth animations"],links:{github:"https://github.com/vinay/minesweeper",demo:"https://vinay-minesweeper.netlify.app"}}}[t];e&&o&&n&&(n.innerHTML=`
        <h2>${e.title}</h2>
        <p class="project-description">${e.description}</p>
        <div class="project-features">
            <h3>Features:</h3>
            <ul>
            ${e.features.map(i=>`<li>${i}</li>`).join("")}
            </ul>
        </div>
        <div class="project-tech-stack">
            <h3>Tech Stack:</h3>
            <div class="tech-tags">
            ${e.tech.map(i=>`<span class="tech-tag">${i}</span>`).join("")}
            </div>
        </div>
        <div class="project-links">
            <a href="${e.links.github}" target="_blank" class="btn btn-primary">View Code</a>
            <a href="${e.links.demo}" target="_blank" class="btn btn-secondary">Live Demo</a>
        </div>
        `,o.style.display="block")}function u(){const t=document.getElementById("project-modal");t&&(t.style.display="none")}window.addEventListener("click",t=>{const o=document.getElementById("project-modal");t.target===o&&o&&(o.style.display="none")});window.scrollToSection=r;window.openProjectModal=d;window.closeProjectModal=u;
