/**
 * Google Analytics Utilities
 * Helper functions for tracking events, page views, and conversions
 */

// Extend window object to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>,
    ) => void;
    dataLayer?: any[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Check if Google Analytics is enabled and loaded
 */
export const isAnalyticsEnabled = (): boolean => {
  return !!(GA_ID && typeof window !== "undefined" && window.gtag);
};

/**
 * Track page views for client-side navigation
 */
export const trackPageView = (url: string): void => {
  if (!isAnalyticsEnabled()) return;

  try {
    window.gtag!("config", GA_ID!, {
      page_path: url,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Page view:", url);
    }
  } catch (error) {
    console.error("[Analytics] Error tracking page view:", error);
  }
};

/**
 * Track custom events
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>,
): void => {
  if (!isAnalyticsEnabled()) return;

  try {
    window.gtag!("event", eventName, {
      ...eventParams,
      send_to: GA_ID,
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Event:", eventName, eventParams);
    }
  } catch (error) {
    console.error("[Analytics] Error tracking event:", error);
  }
};

/**
 * Track search queries
 */
export const trackSearch = (query: string): void => {
  trackEvent("search", {
    search_term: query,
  });
};

/**
 * Track when user starts a new search
 */
export const trackSearchStart = (query: string): void => {
  trackEvent("search_start", {
    search_term: query,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track search completion (when results are displayed)
 */
export const trackSearchComplete = (query: string, duration: number): void => {
  trackEvent("search_complete", {
    search_term: query,
    duration_ms: duration,
  });
};

/**
 * Track clicks on external sources (YouTube, Reddit)
 */
export const trackSourceClick = (
  sourceType: "youtube" | "reddit",
  sourceUrl: string,
  querySlug?: string,
): void => {
  trackEvent("source_click", {
    source_type: sourceType,
    source_url: sourceUrl,
    query_slug: querySlug,
  });
};

/**
 * Track engagement with specific sections
 */
export const trackSectionView = (sectionName: string): void => {
  trackEvent("section_view", {
    section_name: sectionName,
  });
};

/**
 * Track errors for debugging
 */
export const trackError = (
  errorMessage: string,
  errorContext?: Record<string, any>,
): void => {
  trackEvent("error", {
    error_message: errorMessage,
    ...errorContext,
  });
};

/**
 * Track feature usage
 */
export const trackFeatureUse = (featureName: string): void => {
  trackEvent("feature_use", {
    feature_name: featureName,
  });
};

/**
 * Track timing (for performance monitoring)
 */
export const trackTiming = (
  name: string,
  value: number,
  category?: string,
): void => {
  if (!isAnalyticsEnabled()) return;

  try {
    window.gtag!("event", "timing_complete", {
      name,
      value: Math.round(value),
      event_category: category || "performance",
    });

    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Timing:", name, value, category);
    }
  } catch (error) {
    console.error("[Analytics] Error tracking timing:", error);
  }
};
