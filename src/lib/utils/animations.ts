/**
 * Animation and Transition Utilities
 * Reusable animation classes and configurations
 */

/**
 * Common transition classes
 */
export const transitions = {
  base: "transition-all duration-200 ease-in-out",
  fast: "transition-all duration-150 ease-in-out",
  slow: "transition-all duration-300 ease-in-out",
  colors: "transition-colors duration-200 ease-in-out",
  opacity: "transition-opacity duration-200 ease-in-out",
  transform: "transition-transform duration-200 ease-in-out",
  shadow: "transition-shadow duration-200 ease-in-out",
};

/**
 * Common animation classes
 */
export const animations = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  scaleIn: "animate-scale-in",
  slideIn: "animate-slide-in",
  shimmer: "animate-shimmer",
};

/**
 * Hover effect classes
 */
export const hoverEffects = {
  lift: "hover:-translate-y-1 transition-transform duration-200",
  scale: "hover:scale-105 transition-transform duration-200",
  glow: "hover:shadow-card-hover transition-shadow duration-200",
  brighten: "hover:brightness-110 transition-all duration-200",
};

/**
 * Focus effect classes
 */
export const focusEffects = {
  ring: "focus:ring-2 focus:ring-accent focus:ring-offset-2",
  outline: "focus:outline-2 focus:outline-accent focus:outline-offset-2",
  visible: "focus-visible:outline-2 focus-visible:outline-accent",
};

/**
 * Loading state classes
 */
export const loadingStates = {
  skeleton: "animate-pulse bg-border rounded",
  shimmer:
    "bg-gradient-to-r from-border via-border-light to-border bg-[length:1000px_100%] animate-shimmer",
  spinner: "animate-spin",
};

/**
 * Stagger delay classes for list animations
 */
export function getStaggerDelay(index: number, baseDelay: number = 50): string {
  return `animation-delay: ${index * baseDelay}ms`;
}

/**
 * Check if animations should be disabled
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Conditional animation class
 */
export function animationClass(
  animation: string,
  condition: boolean = true,
): string {
  if (!condition || shouldReduceMotion()) return "";
  return animation;
}
