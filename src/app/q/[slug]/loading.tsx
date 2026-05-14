import { Header } from "@/components/layout/Header";
import { SearchProgressAnimation } from "@/components/query/SearchProgressAnimation";

/**
 * Loading State for Query Page
 * Displayed while fetching query data
 */
export default function Loading() {
  return (
    <>
      <Header minimal />
      <main id="main-content" className="min-h-screen bg-background py-8">
        <SearchProgressAnimation />
      </main>
    </>
  );
}
