// Animated Counter Functionality
class CounterController {
  private static instance: CounterController;
  private observer!: IntersectionObserver;
  private readonly animationDuration: number = 2000; // Duration in ms

  constructor() {
    this.init();
  }

  public static getInstance(): CounterController {
    if (!CounterController.instance) {
      CounterController.instance = new CounterController();
    }
    return CounterController.instance;
  }

  private init(): void {
    // Create intersection observer for stats
    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target as HTMLElement);
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all stat numbers
    this.observeStatNumbers();
  }

  public observeStatNumbers(): void {
    const statNumbers: NodeListOf<HTMLElement> = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat: HTMLElement) => {
      // Only observe if not already animated
      if (!stat.classList.contains('animated')) {
        this.observer.observe(stat);
      }
    });
  }

  private animateCounter(element: HTMLElement): void {
    const target: number = parseInt(element.getAttribute('data-target') || '0');
    const startTime: number = performance.now();
    
    // Mark as animated to prevent re-animation
    element.classList.add('animated');
    
    const animate = (currentTime: number): void => {
      const elapsed: number = currentTime - startTime;
      const progress: number = Math.min(elapsed / this.animationDuration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
      const easedProgress: number = easeOutQuart(progress);
      
      const currentValue: number = Math.floor(easedProgress * target);
      element.textContent = currentValue.toString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toString();
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// Initialize counter controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  CounterController.getInstance();
});

// Make CounterController available globally
(window as any).CounterController = CounterController;
