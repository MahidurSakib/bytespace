import Image from "next/image";
import Link from "next/link";
import { Award, FolderOpen, MessagesSquare, Video } from "lucide-react";
import { EnrollButton } from "@/components/course/EnrollButton";
import { courseIncludes, type CourseDetail } from "@/data/course-details";
import { getCreator } from "@/data/creators";

const includeIcons = { "Learning Resources": FolderOpen, "Quality Lesson Videos": Video, "Certificate of Completion": Award, "Private Consultation": MessagesSquare } as const;
const cta = "Ready to Dive In? Enroll Now and Start Building Your Digital Future!";

export function CourseSidebar({ detail }: { detail: CourseDetail }) {
  const creator = getCreator(detail.creatorSlug);

  return (
    <div className="rounded-[32px] border border-neutral-200 bg-white p-6 text-neutral-950 shadow-card sm:p-10">
      <h2 className="font-heading text-h-xs">{detail.lessonCount} Lessons ({detail.hours} hours)</h2>

      <ol className="mt-5 space-y-3.5">
        {detail.previewLessons.map((l) => (
          <li key={l.no} className="flex items-start justify-between gap-4 text-body-s">
            <span className="flex gap-3"><span className="w-6 shrink-0">{l.no}</span><span>{l.title}</span></span>
            <span className="shrink-0 pt-0.5 text-blue-600">{l.mins} mins</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-body-s text-neutral-600">{detail.moreVideos} more videos</p>

      <p className="mt-8 max-w-[300px] text-body-s text-neutral-700">{cta}</p>
      <p className="mt-4 font-heading text-[32px] font-semibold leading-none text-blue-600">
        ${detail.price}
        <span className="ml-0.5 font-body text-body-s font-normal text-neutral-600">/lifetime</span>
      </p>
      <div className="mt-5"><EnrollButton /></div>

      <h3 className="mt-8 font-heading text-h-xs">This course include</h3>
      <ul className="mt-4 space-y-3.5">
        {courseIncludes.map((label) => {
          const Icon = includeIcons[label];
          return (
            <li key={label} className="flex items-center gap-3 text-body-s text-neutral-700">
              <Icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              {label}
            </li>
          );
        })}
      </ul>

      <hr className="my-6 border-neutral-100" />

      <div className="flex items-center gap-3">
        <Image src="/images/people/purepearl.webp" alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="text-body-m text-neutral-950">{creator?.name ?? "PurePearl Studio"}</p>
          <p className="text-body-s text-neutral-600">Professional Creator</p>
        </div>
      </div>
      <p className="mt-5 max-w-[300px] text-body-s text-neutral-700">{cta}</p>
      <Link href={`/creators/${detail.creatorSlug}`} className="mt-5 inline-flex h-10 items-center rounded-full border border-neutral-300 px-5 text-label-s transition-colors hover:bg-neutral-50">
        See Full Profile
      </Link>
    </div>
  );
}
