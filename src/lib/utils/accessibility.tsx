/**
 * Accessibility Utilities
 * Helper functions and components for improved accessibility
 */

/**
 * Skip to main content link
 * Allows keyboard users to skip navigation
 */
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg"
    >
      Skip to main content
    </a>
  );
}

/**
 * Screen reader only text
 */
export function SrOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

/**
 * Visually hidden but accessible
 */
export function VisuallyHidden({
  children,
  as: Component = "span",
}: {
  children: React.ReactNode;
  as?: "span" | "div" | "p";
}) {
  return (
    <Component className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
      {children}
    </Component>
  );
}

/**
 * ARIA live region for dynamic content announcements
 */
export function LiveRegion({
  children,
  politeness = "polite",
}: {
  children: React.ReactNode;
  politeness?: "polite" | "assertive";
}) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {children}
    </div>
  );
}
