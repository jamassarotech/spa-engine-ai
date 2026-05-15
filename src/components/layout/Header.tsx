import Link from "next/link";
import Image from "next/image";

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
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.svg"
            alt="Deal Advisor"
            width={32}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Beta Badge */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20">
            Beta
          </span>
        </div>
      </div>
    </header>
  );
}
