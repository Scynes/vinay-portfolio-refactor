class DataLoader {
  private static instance: DataLoader;
  private dataCache: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  public async loadData(dataType: string): Promise<any> {
    // Check cache first
    if (this.dataCache.has(dataType)) {
      return this.dataCache.get(dataType);
    }

    try {
      const response = await fetch(`/src/data/${dataType}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${dataType} data: ${response.statusText}`);
      }
      
      const data = await response.json();
      this.dataCache.set(dataType, data);
      return data;
    } catch (error) {
      console.error(`Error loading ${dataType} data:`, error);
      return null;
    }
  }

  public getData(dataType: string): any {
    return this.dataCache.get(dataType);
  }

  public async loadAllSections(): Promise<void> {
    try {
      // Load all sections in parallel
      const [heroData, aboutData, technologiesData, projectsData, experienceData, testimonialsData, contactData, footerData] = await Promise.all([
        this.loadData('hero'),
        this.loadData('about'),
        this.loadData('technologies'),
        this.loadData('projects'),
        this.loadData('experience'),
        this.loadData('testimonials'),
        this.loadData('contact'),
        this.loadData('footer')
      ]);

      // Render all sections
      if (heroData) renderHero(heroData.hero);
      if (aboutData) renderAbout(aboutData.about);
      if (technologiesData) renderTechnologies(technologiesData.technologies);
      if (projectsData) renderProjects(projectsData.projects);
      if (experienceData) renderExperience(experienceData.experience);
      if (testimonialsData) renderTestimonials(testimonialsData.testimonials);
      if (contactData) renderContact(contactData.contact);
      if (footerData) renderFooter(footerData.footer);

      // Trigger animations for all dynamic content
      triggerAllAnimations();
    } catch (error) {
      console.error('Failed to load sections:', error);
    }
  }
}

// Render functions for each section
function renderHero(hero: any) {
  const heroContainer = document.querySelector('.hero-container');
  if (!heroContainer) return;

  heroContainer.innerHTML = `
    <div class="hero-content">
      <div class="hero-image">
        <img src="${hero.image}" alt="${hero.imageAlt}" class="profile-img">
        <div class="image-glow"></div>
      </div>
      <div class="hero-text">
        <h1 class="hero-title">${hero.title}</h1>
        <p class="hero-subtitle">${hero.subtitle}</p>
        <div class="hero-buttons">
          ${hero.buttons.map((btn: any) => 
            `<button class="${btn.class}" onclick="${btn.onclick}">${btn.text}</button>`
          ).join('')}
        </div>
      </div>
    </div>
    <div class="skills-marquee">
      <div class="marquee-content">
        ${hero.marqueeItems.map((item: string) => `<span class="marquee-item">${item}</span>`).join('')}
        ${hero.marqueeItems.map((item: string) => `<span class="marquee-item">${item}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderAbout(about: any) {
  const aboutContainer = document.querySelector('#about .container');
  if (!aboutContainer) return;

  aboutContainer.innerHTML = `
    <h2 class="section-title">${about.title}</h2>
    <div class="hero-stats">
      ${about.stats.map((stat: any) => `
        <div class="stat-item">
          <div class="stat-number" data-target="${stat.number}">0</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `).join('')}
    </div>
    
    <div class="about-content">
      <p class="about-intro">${about.intro}</p>
      
      <div class="about-highlights">
        <h3 class="accordion-header" onclick="toggleAccordion('accomplishments')">
          ${about.highlights.title}
          <span class="accordion-icon" id="accomplishments-icon">+</span>
        </h3>
        <div class="accordion-content expanded" id="accomplishments-content">
          <ul>
            ${about.highlights.items.map((item: string) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <p class="about-collaboration">${about.collaboration}</p>
      
      <div class="about-community">
        <h3 class="accordion-header" onclick="toggleAccordion('community')">
          ${about.community.title}
          <span class="accordion-icon" id="community-icon">+</span>
        </h3>
        <div class="accordion-content expanded" id="community-content">
          <p>${about.community.intro}</p>
          <ul>
            ${about.community.items.map((item: string) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

function renderTechnologies(technologies: Array<{name: string, icon: string}>) {
  const skillsGrid = document.querySelector('.skills-grid');
  if (!skillsGrid) return;

  skillsGrid.innerHTML = technologies.map(tech => `
    <div class="skill-item">
      <div class="skill-icon">
        <i class="${tech.icon}"></i>
      </div>
      <span class="skill-name">${tech.name}</span>
    </div>
  `).join('');
}

function renderProjects(projects: any) {
  const projectsContainer = document.querySelector('#projects .container');
  if (!projectsContainer) return;

  projectsContainer.innerHTML = `
    <h2 class="section-title">${projects.title}</h2>
    <div class="projects-grid">
      ${projects.projects.map((project: any) => `
        <div class="project-card" onclick="openProjectModal('${project.id}')">
          <div class="project-image">
            <img src="${project.image}" alt="${project.imageAlt}" class="project-preview-img">
          </div>
          <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
              ${project.technologies.map((tech: string) => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
              <button class="btn btn-small">View Project</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderExperience(experience: any) {
  const experienceContainer = document.querySelector('#experience .container');
  if (!experienceContainer) return;

  experienceContainer.innerHTML = `
    <h2 class="section-title">${experience.title}</h2>
    <div class="timeline">
      ${experience.timeline.map((item: any) => `
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3>${item.title}</h3>
            <h4>${item.company}</h4>
            <span class="timeline-date">${item.date}</span>
            <p>${item.description}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderTestimonials(testimonials: any) {
  const testimonialsContainer = document.querySelector('#testimonials .container');
  if (!testimonialsContainer) return;

  testimonialsContainer.innerHTML = `
    <h2 class="section-title">${testimonials.title}</h2>
    <div class="testimonials-grid">
      ${testimonials.testimonials.map((testimonial: any) => `
        <div class="testimonial-card">
          <div class="testimonial-content">
            <div class="quote-icon">
              <i class="fas fa-quote-right"></i>
            </div>
            <div class="testimonial-author">
              <img src="${testimonial.author.avatar}" alt="${testimonial.author.avatarAlt}" class="author-avatar">
              <div class="author-info">
                <h4 class="author-name">${testimonial.author.name}</h4>
                <p class="author-title">${testimonial.author.title}</p>
                <p class="testimonial-date">${testimonial.author.date}</p>
              </div>
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderContact(contact: any) {
  const contactContainer = document.querySelector('#contact .container');
  if (!contactContainer) return;

  contactContainer.innerHTML = `
    <h2 class="section-title">${contact.title}</h2>
    <div class="contact-content">
      <div class="contact-info">
        <p class="contact-description">${contact.description}</p>
        <div class="contact-methods">
          ${contact.methods.map((method: any) => `
            <a href="${method.href}" ${method.target ? `target="${method.target}"` : ''} ${method.rel ? `rel="${method.rel}"` : ''} class="contact-method">
              <i class="${method.icon}"></i>
              <span>${method.text}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderFooter(footer: any) {
  const footerContainer = document.querySelector('.footer .container');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <div class="footer-content">
      <div class="footer-info">
        <h3>${footer.name}</h3>
        <p>${footer.description}</p>
      </div>
      <div class="footer-links">
        ${footer.links.map((link: any) => `
          <a href="${link.href}" ${link.target ? `target="${link.target}"` : ''} ${link.rel ? `rel="${link.rel}"` : ''} aria-label="${link.ariaLabel}">
            <i class="${link.icon}"></i>
          </a>
        `).join('')}
      </div>
    </div>
    <div class="footer-bottom">
      <p>${footer.copyright}</p>
    </div>
  `;
}

function triggerAllAnimations() {
  // Use the existing animation system to observe all dynamic elements
  const animationController = (window as any).AnimationController?.getInstance();
  if (animationController) {
    // Observe all types of elements
    if (animationController.observeSkillItems) animationController.observeSkillItems();
    if (animationController.observeTimelineItems) animationController.observeTimelineItems();
    if (animationController.observeProjectCards) animationController.observeProjectCards();
    if (animationController.observeTestimonialCards) animationController.observeTestimonialCards();
  } else {
    // Fallback: manually trigger animations
    const animatedElements = document.querySelectorAll('.skill-item, .timeline-item, .project-card, .testimonial-card');
    animatedElements.forEach((element, index) => {
      const delay = index * 100;
      setTimeout(() => {
        element.classList.add('animate-in');
      }, delay);
    });
  }

  // Trigger counter animations for stat numbers
  const counterController = (window as any).CounterController?.getInstance();
  if (counterController && counterController.observeStatNumbers) {
    counterController.observeStatNumbers();
  }
}

// Initialize and load all sections when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const dataLoader = DataLoader.getInstance();
  await dataLoader.loadAllSections();
});

// Make DataLoader available globally
(window as any).DataLoader = DataLoader;