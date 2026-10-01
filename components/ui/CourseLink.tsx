import Link from "next/link";
import { CourseCard } from "@/components/ui/CourseCard";
import type { Course } from "@/types";

/** A course card that links to its course page. */
export function CourseLink({ course, priority }: { course: Course; priority?: boolean }) {
  return (
    <Link
      href={`/courses/${course.slug ?? course.id}`}
      aria-label={`${course.title} by ${course.author}`}
      className="block rounded-[28px] transition-shadow duration-200 hover:shadow-card"
    >
      <CourseCard course={course} priority={priority} className="h-full" />
    </Link>
  );
}
