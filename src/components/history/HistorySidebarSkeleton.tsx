/**
 * Skeleton loader for history sidebar
 * Shows while data is loading (for future use)
 */
export function HistorySidebarSkeleton() {
  return (
    <aside className="hidden lg:block w-64 border-r border-border bg-background/50 p-6">
      <div className="mb-4">
        <div className="h-4 w-32 bg-border rounded animate-pulse" />
      </div>

      <ul className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="space-y-2">
            <div className="h-4 bg-border rounded animate-pulse" />
            <div className="h-3 w-20 bg-border rounded animate-pulse" />
          </li>
        ))}
      </ul>
    </aside>
  );
}
