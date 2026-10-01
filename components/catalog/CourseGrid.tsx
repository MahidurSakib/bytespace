import Link from "next/link";
import { CourseLink } from "@/components/ui/CourseLink";
import type { Course } from "@/types";

export function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c, i) => (
        <li key={c.id}><CourseLink course={c} priority={i < 3} /></li>
      ))}
    </ul>
  );
}

export function EmptyResults({ clearHref, query }: { clearHref: string; query?: string }) {
  return (
    <div role="status" className="mx-auto flex max-w-[520px] flex-col items-center rounded-[28px] border border-dashed border-neutral-200 px-6 py-16 text-center">
      <h2 className="font-heading text-h-xs">No courses found</h2>
      <p className="mb-6 mt-2 text-body-m text-neutral-600">
        {query ? `We couldn't find anything for “${query}” with these filters.` : "No courses match these filters yet."} Try changing or clearing them.
      </p>
      <Link href={clearHref} className="inline-flex h-11 items-center rounded-full bg-lime-500 px-6 text-label-m font-medium text-neutral-950 hover:bg-lime-400">
        Clear filters
      </Link>
    </div>
  );
}
