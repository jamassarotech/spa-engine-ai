/**
 * Performance Configuration Constants
 */

/**
 * API Performance Settings
 */
export const API_PERFORMANCE = {
  // Cache revalidation times (in seconds)
  REVALIDATE_QUERY: 3600, // 1 hour
  REVALIDATE_HOME: 600, // 10 minutes

  // Request timeouts (in milliseconds)
  TIMEOUT_DEFAULT: 10000, // 10 seconds
  TIMEOUT_SEARCH: 15000, // 15 seconds

  // Retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
} as const

/**
 * Image Loading Configuration
 */
export const IMAGE_CONFIG = {
  // Quality settings
  QUALITY_THUMBNAIL: 75,
  QUALITY_DEFAULT: 85,
  QUALITY_HIGH: 90,

  // Blur placeholder
  BLUR_DATA_URL:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4=',

  // Loading priorities
  PRIORITY_HERO: true,
  PRIORITY_ABOVE_FOLD: true,
  PRIORITY_DEFAULT: false,
} as const

/**
 * Animation Performance Settings
 */
export const ANIMATION_CONFIG = {
  // Animation durations (in milliseconds)
  DURATION_FAST: 150,
  DURATION_DEFAULT: 200,
  DURATION_SLOW: 300,

  // Debounce/throttle timings
  DEBOUNCE_SEARCH: 300,
  THROTTLE_SCROLL: 100,
  THROTTLE_RESIZE: 200,
} as const

/**
 * UI Performance Settings
 */
export const UI_CONFIG = {
  // Pagination
  ITEMS_PER_PAGE: 12,
  INFINITE_SCROLL_THRESHOLD: 200,

  // Virtual scrolling
  VIRTUAL_ITEM_HEIGHT: 100,
  VIRTUAL_OVERSCAN: 5,

  // Intersection observer
  LAZY_LOAD_THRESHOLD: 0.1,
  LAZY_LOAD_ROOT_MARGIN: '50px',
} as const
