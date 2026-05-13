import { SearchHero } from "@/components/home/SearchHero";
import { Header } from "@/components/layout/Header";
import {
  JsonLd,
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/utils/jsonLd";

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <JsonLd data={generateOrganizationSchema()} />
      <JsonLd data={generateWebsiteSchema()} />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main
          id="main-content"
          className="flex-1 flex flex-col items-center justify-center"
        >
          <SearchHero />
        </main>
      </div>
    </>
  );
}
