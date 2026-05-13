'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils/slugify'

interface SearchBarProps {
  placeholder?: string
  defaultValue?: string
  autoFocus?: boolean
  className?: string
}

export function SearchBar({
  placeholder = 'What are you looking for?',
  defaultValue = '',
  autoFocus = false,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!query.trim()) return

    const slug = slugify(query.trim())
    router.push(`/q/${slug}`)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="bg-background border-2 border-border rounded-2xl p-1 shadow-card max-w-3xl mx-auto flex items-center gap-2 hover:border-accent/30 focus-within:border-accent transition-colors">
        {/* Search Icon */}
        <div className="pl-5 pr-3 text-secondary">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="flex-1 text-lg text-primary placeholder:text-secondary-light outline-none bg-transparent py-3"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!query.trim()}
          className="bg-border-light text-secondary px-6 py-3 rounded-xl hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium mr-1"
        >
          Enter
        </button>
      </div>
    </form>
  )
}
