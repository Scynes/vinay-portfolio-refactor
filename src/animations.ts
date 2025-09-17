// Scroll-triggered animations
class AnimationController {
  private observer!: IntersectionObserver;
  private readonly animationDelay: number = 100; // Delay between animations in ms

  constructor() {
    this.init();
  }

  private init(): void {
    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target as HTMLElement);
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe elements
    this.observeElements();
  }

  private observeElements(): void {
    // Observe skill items
    const skillItems: NodeListOf<HTMLElement> = document.querySelectorAll('.skill-item');
    skillItems.forEach((item: HTMLElement) => {
      this.observer.observe(item);
    });

    // Observe timeline items
    const timelineItems: NodeListOf<HTMLElement> = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item: HTMLElement) => {
      this.observer.observe(item);
    });

    // Observe project cards
    const projectCards: NodeListOf<HTMLElement> = document.querySelectorAll('.project-card');
    projectCards.forEach((item: HTMLElement) => {
      this.observer.observe(item);
    });
  }

  private animateElement(element: HTMLElement): void {
    const index: number = Array.from(element.parentElement?.children || []).indexOf(element);
    const delay: number = index * this.animationDelay;

    setTimeout(() => {
      element.classList.add('animate-in');
    }, delay);
  }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AnimationController();
});
