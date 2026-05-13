import { cn } from '@/lib/utils/cn'

interface IconProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

export function Icon({ children, className, size = 'md' }: IconProps) {
  return (
    <span
      className={cn('inline-flex items-center justify-center', sizeStyles[size], className)}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}
