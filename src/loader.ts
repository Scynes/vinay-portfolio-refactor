// Loading Screen Controller
class LoadingController {
  private loadingScreen: HTMLElement;
  private readonly minLoadingTime: number = 1500; // Minimum loading time in ms

  constructor() {
    this.loadingScreen = document.getElementById('loading-screen') as HTMLElement;
    this.init();
  }

  private init(): void {
    // Ensure minimum loading time for smooth experience
    const startTime: number = performance.now();
    
    // Wait for DOM to be fully loaded
    window.addEventListener('load', () => {
      const elapsedTime: number = performance.now() - startTime;
      const remainingTime: number = Math.max(0, this.minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        this.hideLoadingScreen();
      }, remainingTime);
    });
  }

  private hideLoadingScreen(): void {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('fade-out');
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        this.loadingScreen.remove();
      }, 500);
    }
  }
}

// Initialize loading controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LoadingController();
});
