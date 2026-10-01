import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewList } from "@/components/course/ReviewList";
import { Stars } from "@/components/course/Stars";
import { Paragraph, SectionTitle } from "@/components/course/Prose";
import { getCourseDetail, ratingBreakdown } from "@/data/course-details";

export const metadata: Metadata = { title: "Reviews" };

export default async function CourseReviewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const detail = getCourseDetail((await params).slug);
  if (!detail) notFound();

  const total = ratingBreakdown.reduce((a, b) => a + b, 0);
  const average = ratingBreakdown.reduce((sum, n, i) => sum + n * (5 - i), 0) / total;

  return (
    <div>
      <SectionTitle>What Learners Are Saying</SectionTitle>
      <Paragraph className="mt-6 text-neutral-600">{detail.reviewsIntro}</Paragraph>

      <section aria-label="Rating summary" className="mt-6 flex flex-col gap-8 rounded-[32px] border border-neutral-200 p-6 sm:flex-row sm:items-center sm:p-10">
        <div className="flex h-[132px] w-full shrink-0 flex-col items-center justify-center rounded-2xl bg-lime-400 text-neutral-950 sm:w-[132px]">
          <p className="text-label-s">Ratings</p>
          <p className="font-heading text-[40px] font-semibold leading-tight">{average.toFixed(1)}</p>
        </div>
        <ul className="min-w-0 flex-1 space-y-2.5">
          {ratingBreakdown.map((count, i) => {
            const stars = 5 - i;
            const pct = (count / total) * 100;
            return (
              <li key={stars} className="flex items-center gap-3 sm:gap-4">
                <div role="img" aria-label={`${count} reviews with ${stars} stars`} className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div className="h-full rounded-full bg-lime-400" style={{ width: `${Math.max(pct, 2)}%` }} />
                </div>
                <Stars count={stars} size="md" className="hidden sm:inline-flex" />
                <span className="w-9 text-right text-body-s text-neutral-700" aria-hidden="true">{count}</span>
                <span className="sr-only">{count} reviews</span>
              </li>
            );
          })}
        </ul>
      </section>

      <SectionTitle className="mt-10">Individual Reviews:</SectionTitle>
      <ReviewList reviews={detail.reviews} />
    </div>
  );
}
