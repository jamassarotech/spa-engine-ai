import type { QuotesSectionProps } from "@/types/components";

export function QuotesSection({ quotes }: QuotesSectionProps) {
  if (quotes.length === 0) return null;

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-secondary text-xl">&quot;</span>
        <h2 className="text-section-title font-semibold text-primary">
          Notable Quotes
        </h2>
      </div>

      {/* Quotes Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="bg-subtle border border-border rounded-xl p-6 hover:border-accent transition-colors"
          >
            {/* Quote Text */}
            <p className="text-base text-primary leading-relaxed mb-4 italic">
              &quot;{quote.text}&quot;
            </p>

            {/* Attribution */}
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-primary">{quote.author}</span>
              <a
                href={quote.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline"
              >
                {quote.source}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
