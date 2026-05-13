import type { EmptyStateProps } from '@/types/components'

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Icon */}
      <div className="mb-6 text-secondary-light">
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
          />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-primary mb-3">{title}</h3>

      {/* Message */}
      <p className="text-secondary text-base max-w-md mb-6">{message}</p>

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
