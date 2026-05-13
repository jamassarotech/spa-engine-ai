import Link from "next/link";

interface HeaderProps {
  minimal?: boolean;
}

export function Header({ minimal = false }: HeaderProps) {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-xl font-semibold text-primary hover:text-accent transition-colors"
        >
          Research
        </Link>

        {/* Optional: Add navigation items here in the future */}
        {!minimal && (
          <nav className="hidden md:flex items-center gap-6">
            {/* Future navigation items */}
          </nav>
        )}
      </div>
    </header>
  );
}
