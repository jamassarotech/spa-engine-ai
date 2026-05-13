/**
 * Slugify utility
 * Convert query strings to URL-safe slugs
 */

export function slugify(text: string): string {
  return (
    text
      .toString()
      .toLowerCase()
      .trim()
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // Remove special characters
      .replace(/[^\w\-]+/g, "")
      // Replace multiple hyphens with single hyphen
      .replace(/\-\-+/g, "-")
      // Remove leading/trailing hyphens
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  );
}

/**
 * Deslugify utility
 * Convert slug back to readable text
 */
export function deslugify(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
