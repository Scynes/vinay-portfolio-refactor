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

  public async loadTechnologies(): Promise<any> {
    return this.loadData('technologies');
  }
}

// Initialize and load technologies when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const dataLoader = DataLoader.getInstance();
  
  try {
    const technologiesData = await dataLoader.loadTechnologies();
    if (technologiesData && technologiesData.technologies) {
      renderTechnologies(technologiesData.technologies);
    }
  } catch (error) {
    console.error('Failed to load technologies:', error);
  }
});

function renderTechnologies(technologies: Array<{name: string, icon: string}>) {
  const skillsGrid = document.querySelector('.skills-grid');
  if (!skillsGrid) {
    console.error('Skills grid not found');
    return;
  }

  // Clear existing content
  skillsGrid.innerHTML = '';

  // Render each technology
  technologies.forEach(tech => {
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    
    skillItem.innerHTML = `
      <div class="skill-icon">
        <i class="${tech.icon}"></i>
      </div>
      <span class="skill-name">${tech.name}</span>
    `;
    
    skillsGrid.appendChild(skillItem);
  });

  // Trigger animations for the newly created skill items using the animation system
  triggerSkillAnimations();
}

function triggerSkillAnimations() {
  // Use the existing animation system to observe the new skill items
  const animationController = (window as any).AnimationController?.getInstance();
  if (animationController && animationController.observeSkillItems) {
    animationController.observeSkillItems();
  } else {
    // Fallback: manually trigger animations if animation system isn't available
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
      const delay = index * 100; // 100ms delay between animations
      
      setTimeout(() => {
        item.classList.add('animate-in');
      }, delay);
    });
  }
}

// Make DataLoader available globally
(window as any).DataLoader = DataLoader;
