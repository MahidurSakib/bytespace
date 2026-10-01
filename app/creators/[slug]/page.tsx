import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CourseGrid, EmptyResults } from "@/components/catalog/CourseGrid";
import { CreatorActions } from "@/components/creator/CreatorActions";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { catalog, parseCatalogParams, queryCatalog } from "@/data/catalog";
import { courses } from "@/data/courses";
import { creators, getCreator } from "@/data/creators";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const dynamicParams = false;
export const generateStaticParams = () => creators.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const creator = getCreator((await params).slug);
  return creator ? { title: creator.name, description: creator.headline } : {};
}

// The creator's own courses are the six designed ones (first catalog entries).
const creatorCourses = catalog.slice(0, courses.length);

export default async function CreatorPage({ params, searchParams }: Props) {
  const creator = getCreator((await params).slug);
  if (!creator) notFound();

  const query = parseCatalogParams(await searchParams);
  const { courses: results } = queryCatalog({ ...query, page: 1 }, creatorCourses, creatorCourses.length);

  return (
    <>
      <Navbar />
      <main id="main">
        <PageHero>
          <Container className="pb-10 pt-[124px] md:pb-[84px] md:pt-[150px]">
            <div className="flex items-center gap-4 sm:gap-5">
              <Image src={creator.avatar} alt={`${creator.name} profile photo`} width={88} height={88} priority className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover sm:h-[88px] sm:w-[88px]" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h1 className="text-[28px] sm:text-[36px] lg:text-h-m">{creator.name}</h1>
                  <span className="rounded-full bg-lime-500 px-4 py-1.5 text-label-s font-medium text-neutral-950">Creator</span>
                </div>
                <p className="mt-1 text-body-l">{creator.headline}</p>
              </div>
            </div>

            <div className="mt-8 space-y-1 text-body-m md:text-body-l">
              {creator.bio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
            </div>

            <CreatorActions products={creator.products} followers={creator.followers} />
          </Container>
        </PageHero>

        <section aria-label={`Courses by ${creator.name}`} className="py-10 md:py-[52px]">
          <Container>
            <CatalogFilters basePath={`/creators/${creator.slug}`} current={query}>
              {results.length > 0 ? <CourseGrid courses={results} /> : <EmptyResults clearHref={`/creators/${creator.slug}`} query={query.q} />}
            </CatalogFilters>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
