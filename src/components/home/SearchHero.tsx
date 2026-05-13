import { SearchBar } from "@/components/search/SearchBar";
import { ExampleQueries } from "./ExampleQueries";

export function SearchHero() {
  return (
    <div className="w-full max-w-4xl mx-auto text-center px-6">
      {/* Hero Heading */}
      <h1 className="text-hero font-bold text-primary mb-12 text-balance leading-tight">
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
