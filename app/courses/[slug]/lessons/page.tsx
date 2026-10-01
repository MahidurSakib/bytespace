import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Video } from "lucide-react";
import { Paragraph, SectionTitle } from "@/components/course/Prose";
import { getCourseDetail, lessonContentCopy } from "@/data/course-details";

export const metadata: Metadata = { title: "Lessons" };

export default async function CourseLessonsPage({ params }: { params: Promise<{ slug: string }> }) {
  const detail = getCourseDetail((await params).slug);
  if (!detail) notFound();

  return (
    <div className="space-y-8">
      <section>
        <SectionTitle>Explore the Modules</SectionTitle>
        <Paragraph className="mt-6">
          Immerse yourself in the course content as we break down each module into comprehensive lessons, providing practical insights and hands-on experiences.
        </Paragraph>
      </section>

      <section>
        <SectionTitle>Lesson List</SectionTitle>
        <ul className="mt-6 space-y-4">
          {detail.modules.map((m) => (
            <li key={m.title} className="flex items-start gap-4">
              <span className="flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-[20px] bg-lime-400 text-neutral-950 sm:h-[73px] sm:w-[73px]">
                <Video className="h-7 w-7" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="font-body text-body-m font-medium text-neutral-950">{m.title}</h3>
                <Paragraph className="mt-0.5 text-neutral-600">{m.text}</Paragraph>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionTitle>Lesson Content</SectionTitle>
        <Paragraph className="mt-6 text-neutral-600">{lessonContentCopy.content}</Paragraph>
      </section>

      <section>
        <SectionTitle>Lesson Progress Tracking</SectionTitle>
        <Paragraph className="mt-6 text-neutral-600">{lessonContentCopy.progress}</Paragraph>
        <div className="mt-6 rounded-2xl border border-neutral-200 p-4">
          <p className="text-label-s text-neutral-950">Learning Progress</p>
          <p className="font-heading text-[40px] font-semibold leading-tight text-neutral-950">55%</p>
          <div role="img" aria-label="55 percent complete" className="mt-1 h-2 overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full w-[55%] rounded-full bg-lime-500" />
          </div>
        </div>
      </section>
    </div>
  );
}
