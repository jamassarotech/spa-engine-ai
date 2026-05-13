/**
 * Performance Optimization Utilities
 * Best practices for Next.js performance
 */

/**
 * Image loading priorities based on viewport position
 */
export const IMAGE_PRIORITIES = {
  HERO: "high" as const,
  ABOVE_FOLD: "high" as const,
  BELOW_FOLD: "low" as const,
};

/**
 * Optimal image sizes for responsive design
 */
export const IMAGE_SIZES = {
  THUMBNAIL: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  CARD: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  FULL_WIDTH: "100vw",
};

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Lazy load component with delay
 */
export function lazyLoadWithDelay<T>(
  factory: () => Promise<{ default: React.ComponentType<T> }>,
  delay: number = 0,
) {
  return new Promise<{ default: React.ComponentType<T> }>((resolve) => {
    setTimeout(() => {
      factory().then(resolve);
    }, delay);
  });
}
