import { cn } from '@/lib/utils/cn'
import type { CardProps } from '@/types/components'

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'bg-background border border-border rounded-xl p-6 shadow-card',
        className
      )}
    >
      {children}
    </div>
  )
}
