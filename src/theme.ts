// Dark Mode Toggle Functionality
class ThemeController {
  private themeToggle: HTMLElement;
  private themeIcon: HTMLElement;

  constructor() {
    this.themeToggle = document.getElementById('theme-toggle') as HTMLElement;
    this.themeIcon = this.themeToggle.querySelector('i') as HTMLElement;
    this.init();
  }

  private init(): void {
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    
    // Add click event listener
    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  private setTheme(theme: string): void {
    const body = document.body;
    const html = document.documentElement;
    
    if (theme === 'dark') {
      body.setAttribute('data-theme', 'dark');
      html.setAttribute('data-theme', 'dark');
      this.themeIcon.setAttribute('class', 'fas fa-sun');
      this.themeToggle.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
      html.removeAttribute('data-theme');
      this.themeIcon.setAttribute('class', 'fas fa-moon');
      this.themeToggle.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  private toggleTheme(): void {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

// Initialize theme controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeController();
});
