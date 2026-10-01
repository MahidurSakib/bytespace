import Image from "next/image";
import { Check } from "lucide-react";
import { Paragraph, SectionTitle } from "@/components/course/Prose";
import { getCourseDetail } from "@/data/course-details";
import { notFound } from "next/navigation";

export default async function CourseAboutPage({ params }: { params: Promise<{ slug: string }> }) {
  const detail = getCourseDetail((await params).slug);
  if (!detail) notFound();

  return (
    <div className="space-y-10">
      <section aria-labelledby="desc">
        <SectionTitle className="scroll-mt-28" >
          <span id="desc">Description</span>
        </SectionTitle>
        <div className="mt-6 space-y-6">
          {detail.description.map((p) => <Paragraph key={p.slice(0, 24)}>{p}</Paragraph>)}
        </div>
      </section>

      <section aria-labelledby="sneak">
        <SectionTitle><span id="sneak">Sneak Peak</span></SectionTitle>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">
              <Image src={`/images/course-detail/sneak-${n}.webp`} alt={`Course preview image ${n}`} fill sizes="(max-width: 640px) 45vw, 170px" className="object-cover" />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="key-points">
        <SectionTitle><span id="key-points">Key Points</span></SectionTitle>
        <ul className="mt-6 space-y-3">
          {detail.keyPoints.map((point) => (
            <li key={point} className="flex items-center gap-3 text-body-m text-neutral-700">
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden="true" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
