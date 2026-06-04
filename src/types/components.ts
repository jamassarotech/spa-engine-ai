/**
 * Component Prop Types
 */

import type {
  ProPoint,
  ConPoint,
  Warning,
  Quote,
  YouTubeSource,
  RedditSource,
  RecommendationProps,
} from "./api";

/**
 * Query Header Props
 */
export interface QueryHeaderProps {
  title: string;
  lastUpdated: string;
  confidence: "low" | "medium" | "high";
  sourceCount: number;
}

/**
 * Quick Verdict Props
 */
export interface QuickVerdictProps {
  verdict: string;
}

/**
 * Pros List Props
 */
export interface ProsListProps {
  pros: ProPoint[];
}

/**
 * Cons List Props
 */
export interface ConsListProps {
  cons: ConPoint[];
}

export interface RecommendationToBuyProps {
  recommendations?: RecommendationProps[];
}

/**
 * Warnings List Props
 */
export interface WarningsListProps {
  warnings: Warning[];
}

/**
 * Quotes Section Props
 */
export interface QuotesSectionProps {
  quotes: Quote[];
}

/**
 * Sources Section Props
 */
export interface SourcesSectionProps {
  youtubeData: YouTubeSource[];
  redditData: RedditSource[];
}

/**
 * YouTube Source Card Props
 */
export interface YouTubeSourceProps {
  source: YouTubeSource;
}

/**
 * Reddit Source Card Props
 */
export interface RedditSourceProps {
  source: RedditSource;
}

/**
 * Badge Props
 */
export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

/**
 * Card Props
 */
export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Empty State Props
 */
export interface EmptyStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Trust Indicator Props
 */
export interface TrustIndicatorProps {
  confidence: "low" | "medium" | "high";
}
