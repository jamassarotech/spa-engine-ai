export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-hero font-bold text-primary mb-12">
          Honest research for informed decisions.
        </h1>
        
        <div className="bg-background border-2 border-border rounded-2xl p-4 shadow-card max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input 
                type="text"
                placeholder="What are you looking for?"
                className="w-full text-lg px-4 py-3 outline-none"
              />
            </div>
            <button className="bg-border-light text-secondary px-6 py-3 rounded-xl hover:bg-border transition-colors">
              Enter
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-secondary text-base">
          Phase 1 Complete: Next.js + TypeScript + Tailwind + Inter Font ✓
        </div>
      </div>
    </main>
  )
}
