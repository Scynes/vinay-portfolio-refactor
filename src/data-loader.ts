// Data loader for dynamic content
class DataLoader {
  private static instance: DataLoader;
  private data: { [key: string]: any } = {};

  private constructor() {}

  public static getInstance(): DataLoader {
    if (!DataLoader.instance) {
      DataLoader.instance = new DataLoader();
    }
    return DataLoader.instance;
  }

  public async loadData(): Promise<void> {
    try {
      const [hero, technologies, projects, experience, testimonials, contact] = await Promise.all([
        this.fetchData('/data/hero.json'),
        this.fetchData('/data/technologies.json'),
        this.fetchData('/data/projects.json'),
        this.fetchData('/data/experience.json'),
        this.fetchData('/data/testimonials.json'),
        this.fetchData('/data/contact.json')
      ]);

      this.data = {
        hero,
        technologies,
        projects,
        experience,
        testimonials,
        contact
      };

      this.renderData();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  private async fetchData(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }
    return response.json();
  }

  private renderData(): void {
    this.renderHero();
    this.renderTechnologies();
    this.renderProjects();
    this.renderExperience();
    this.renderTestimonials();
    this.renderContact();
  }

  private renderHero(): void {
    const heroData = this.data.hero;
    if (!heroData) return;

    // Update hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.textContent = heroData.name;
    }

    // Update hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      heroSubtitle.textContent = heroData.title;
    }

    // Update hero description
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
      heroDescription.textContent = heroData.description;
    }

    // Update stats
    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer && heroData.stats) {
      statsContainer.innerHTML = heroData.stats.map((stat: any) => `
        <div class="stat-item">
          <div class="stat-number" data-target="${stat.number}">0</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `).join('');
    }

    // Update marquee
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent && heroData.marquee?.skills) {
      const skills = heroData.marquee.skills;
      marqueeContent.innerHTML = [
        ...skills.map((skill: string) => `<span class="marquee-item">${skill}</span>`),
        ...skills.map((skill: string) => `<span class="marquee-item">${skill}</span>`)
      ].join('');
    }
  }

  private renderTechnologies(): void {
    const technologiesData = this.data.technologies;
    if (!technologiesData?.technologies) return;

    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
      skillsGrid.innerHTML = technologiesData.technologies.map((tech: any) => `
        <div class="skill-item">
          <i class="${tech.icon}"></i>
          <span>${tech.name}</span>
        </div>
      `).join('');
    }
  }

  private renderProjects(): void {
    const projectsData = this.data.projects;
    if (!projectsData?.projects) return;

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
      projectsGrid.innerHTML = projectsData.projects.map((project: any) => `
        <div class="project-card" onclick="openProjectModal('${project.id}')">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-overlay">
              <div class="project-links">
                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" onclick="event.stopPropagation()">GitHub</a>` : ''}
                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" onclick="event.stopPropagation()">Live Demo</a>` : ''}
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
              ${project.technologies.map((tech: string) => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  private renderExperience(): void {
    const experienceData = this.data.experience;
    if (!experienceData?.experience) return;

    const timeline = document.querySelector('.timeline');
    if (timeline) {
      timeline.innerHTML = experienceData.experience.map((exp: any) => `
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <h3>${exp.title}</h3>
            <h4>${exp.company}</h4>
            <span class="timeline-date">${exp.period}</span>
            <p>${exp.description}</p>
            ${exp.achievements ? `
              <ul>
                ${exp.achievements.map((achievement: string) => `<li>${achievement}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  private renderTestimonials(): void {
    const testimonialsData = this.data.testimonials;
    if (!testimonialsData?.testimonials) return;

    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid) {
      testimonialsGrid.innerHTML = testimonialsData.testimonials.map((testimonial: any) => `
        <div class="testimonial-card">
          <div class="testimonial-content">
            <div class="quote-icon">
              <i class="fas fa-quote-right"></i>
            </div>
            <div class="testimonial-author">
              <img src="${testimonial.author.avatar}" alt="${testimonial.author.name}" class="author-avatar">
              <div class="author-info">
                <h4 class="author-name">${testimonial.author.name}</h4>
                <p class="author-title">${testimonial.author.title}</p>
                <p class="testimonial-date">${testimonial.author.date}</p>
              </div>
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
          </div>
        </div>
      `).join('');
    }
  }

  private renderContact(): void {
    const contactData = this.data.contact;
    if (!contactData) return;

    // Update contact title
    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle) {
      contactTitle.textContent = contactData.title;
    }

    // Update contact description
    const contactDescription = document.querySelector('.contact-description');
    if (contactDescription) {
      contactDescription.textContent = contactData.description;
    }

    // Update contact methods
    const contactMethods = document.querySelector('.contact-methods');
    if (contactMethods && contactData.methods) {
      contactMethods.innerHTML = contactData.methods.map((method: any) => `
        <a href="${method.url}" ${method.type !== 'email' ? 'target="_blank" rel="noopener noreferrer"' : ''} class="contact-method">
          <i class="${method.icon}"></i>
          <span>${method.label}</span>
        </a>
      `).join('');
    }
  }

  public getData(key: string): any {
    return this.data[key];
  }
}

// Initialize data loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const dataLoader = DataLoader.getInstance();
  dataLoader.loadData();
});

// Export for use in other modules
export default DataLoader;
