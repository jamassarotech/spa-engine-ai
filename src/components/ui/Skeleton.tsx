import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-border-light',
        variant === 'text' && 'h-4 rounded',
        variant === 'rectangular' && 'rounded-lg',
        variant === 'circular' && 'rounded-full',
        className
      )}
    />
  )
}

/**
 * Skeleton for query page header
 */
export function QueryHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-3/4" variant="text" />
      <Skeleton className="h-4 w-48" variant="text" />
    </div>
  )
}

/**
 * Skeleton for verdict card
 */
export function VerdictSkeleton() {
  return (
    <div className="bg-subtle border-2 border-border rounded-xl p-8 space-y-3">
      <Skeleton className="h-4 w-32" variant="text" />
      <Skeleton className="h-5 w-full" variant="text" />
      <Skeleton className="h-5 w-full" variant="text" />
      <Skeleton className="h-5 w-4/5" variant="text" />
    </div>
  )
}

/**
 * Skeleton for list items (pros/cons/warnings)
 */
export function ListItemSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-4 w-4 mt-1" variant="circular" />
          <Skeleton className="h-4 flex-1" variant="text" />
        </div>
      ))}
    </div>
  )
}

/**
 * Skeleton for source card
 */
export function SourceCardSkeleton() {
  return (
    <div className="bg-background border border-border rounded-xl p-4 space-y-3">
      <Skeleton className="h-24 w-full" variant="rectangular" />
      <Skeleton className="h-5 w-full" variant="text" />
      <Skeleton className="h-4 w-32" variant="text" />
    </div>
  )
}
