import type { Metadata } from "next";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CourseGrid, EmptyResults } from "@/components/catalog/CourseGrid";
import { Pagination } from "@/components/catalog/Pagination";
import { SearchHero } from "@/components/catalog/SearchHero";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { parseCatalogParams, queryCatalog } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Courses",
  description: "Search and filter hundreds of ByteSpace courses by topic, level and price.",
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function CoursesPage({ searchParams }: Props) {
  const query = parseCatalogParams(await searchParams);
  const { courses, page, pages, total } = queryCatalog(query);

  const hrefFor = (n: number) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries({ q: query.q, category: query.category, level: query.level, price: query.price, sort: query.sort })) if (v) params.set(k, v);
    if (n > 1) params.set("page", String(n));
    const qs = params.toString();
    return qs ? `/courses?${qs}` : "/courses";
  };

  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero>
          <Container className="pb-8 pt-[124px] text-center md:pb-10 md:pt-[150px]">
            <h1 className="text-[30px] sm:text-[36px]">Find Your Next Course</h1>
            <SearchHero key={query.q ?? ""} initialQuery={query.q} />
          </Container>
        </PageHero>

        <section aria-label="Course results" className="py-10 md:py-[52px]">
          <Container>
            <CatalogFilters basePath="/courses" current={query} showPills>
              <p className="sr-only" role="status">{total} {total === 1 ? "course" : "courses"} found</p>
              {courses.length > 0 ? (
                <>
                  <CourseGrid courses={courses} />
                  <Pagination page={page} pages={pages} hrefFor={hrefFor} />
                </>
              ) : (
                <EmptyResults clearHref="/courses" query={query.q} />
              )}
            </CatalogFilters>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
