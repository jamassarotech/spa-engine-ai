import { SearchBar } from "@/components/search/SearchBar";
import { ExampleQueries } from "./ExampleQueries";

export function SearchHero() {
  return (
    <div className="w-full max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      {/* Hero Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-hero font-bold text-primary mb-8 sm:mb-12 text-balance leading-tight">
        Honest research for
        <br />
        informed decisions.
      </h1>

      {/* Search Bar */}
      <SearchBar autoFocus />

      {/* Example Queries */}
      <ExampleQueries />
    </div>
  );
}
