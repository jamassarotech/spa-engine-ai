import { SearchHero } from "@/components/home/SearchHero";
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

      <main
        id="main-content"
        className="min-h-screen flex flex-col items-center justify-center"
      >
        <SearchHero />
      </main>
    </>
  );
}
