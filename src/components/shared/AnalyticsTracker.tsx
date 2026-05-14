"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/utils/analytics";

/**
 * Analytics Page View Tracker
 * Tracks client-side navigation for Google Analytics
 * Must be a client component to use Next.js router hooks
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Construct full URL with search params
    const url = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // Track page view
    trackPageView(url);
  }, [pathname, searchParams]);

  // This component doesn't render anything
  return null;
}
