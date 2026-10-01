import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BarChart3, Star, Users } from "lucide-react";
import { CoursePreview } from "@/components/course/CoursePreview";
import { CourseSidebar } from "@/components/course/CourseSidebar";
import { CourseTabs } from "@/components/course/CourseTabs";
import { ShareButton } from "@/components/course/ShareButton";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui/Container";
import { courseSlugs, getCourseDetail } from "@/data/course-details";

type Props = { children: React.ReactNode; params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => courseSlugs.map((slug) => ({ slug }));

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const detail = getCourseDetail((await params).slug);
  return detail ? { title: detail.title, description: detail.subtitle } : {};
}

const chip = "inline-flex h-11 items-center gap-2.5 rounded-full bg-white px-5 text-body-m text-neutral-950";

export default async function CourseLayout({ children, params }: Props) {
  const { slug } = await params;
  const detail = getCourseDetail(slug);
  if (!detail) notFound();

  return (
    <>
      <Navbar />
      <main id="main" className="overflow-x-clip pb-16 md:pb-[88px]">
        <Container className="isolate grid grid-cols-1 lg:grid-cols-[minmax(0,736px)_420px] lg:justify-between">
          {/* full-width blue banner behind the header and video rows */}
          <div aria-hidden="true" className="pointer-events-none relative -z-10 col-span-full col-start-1 row-start-1 row-end-3">
            <div className="on-blue absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-blue-800 bg-grid" />
          </div>

          <header className="col-span-full col-start-1 row-start-1 pt-[124px] text-white md:pt-[150px]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-[26px] sm:text-[30px] lg:text-h-s">{detail.title}</h1>
                <p className="mt-2 font-heading text-body-m font-semibold sm:text-h-xs">{detail.subtitle}</p>
                <p className="mt-5 text-body-l">by <span className="text-lime-500">{detail.author}</span></p>
              </div>
              <div className="on-blue"><ShareButton title={detail.title} /></div>
            </div>
            <ul className="mt-5 flex flex-wrap gap-3">
              <li className={chip}><BarChart3 className="h-5 w-5 text-blue-600" aria-hidden="true" />{detail.level}</li>
              <li className={chip}><Star className="h-5 w-5 fill-blue-600 text-blue-600" aria-hidden="true" />{detail.rating} ({detail.reviewCount} reviews)</li>
              <li className={chip}><Users className="h-5 w-5 text-blue-600" aria-hidden="true" />{detail.students} Students</li>
            </ul>
          </header>

          <CoursePreview title={detail.title} className="col-start-1 row-start-2 mt-8 pb-10 lg:pb-16" />

          <aside aria-label="Course summary" className="col-start-1 row-start-3 mt-2 lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:mt-8">
            <div className="lg:sticky lg:top-[132px]"><CourseSidebar detail={detail} /></div>
          </aside>

          <div className="col-start-1 row-start-4 mt-10 lg:row-start-3 lg:mt-[84px]">
            <CourseTabs slug={slug} />
            <div className="mt-8">{children}</div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
