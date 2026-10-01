import Image from "next/image";
import { BarChart3, Star } from "lucide-react";
import { AvatarStack } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";
import type { Course } from "@/types";

export function CourseCard({ course, className, priority = false }: { course: Course; className?: string; priority?: boolean }) {
  return (
    <article className={cn("rounded-[28px] border border-neutral-200 bg-white p-4", className)}>
      <div className="relative aspect-[341/196] overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={`/images/courses/${course.image}.webp`}
          alt={`${course.title} course preview`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 341px"
          className="object-cover"
        />
        <ul className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2 text-[12px] font-medium text-neutral-800">
          {[`${course.lessons} Lessons`, course.duration, `${course.comments} Comments`].map((t) => (
            <li key={t} className="rounded-full bg-white/55 px-3 py-1 backdrop-blur-sm">{t}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <h3 className="min-w-0 truncate font-heading text-h-xs font-semibold text-neutral-950" title={course.title}>{course.title}</h3>
        <p className="flex shrink-0 items-center gap-1 text-body-m text-neutral-500">
          {course.rating}
          <Star className="h-4 w-4 fill-neutral-300 text-neutral-300" aria-label="rating" />
        </p>
      </div>
      <p className="text-[12px] text-neutral-700">
        by <span className="text-blue-600">{course.author}</span>
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-50 px-3 py-1.5 text-[12px] font-medium text-neutral-800">
          <BarChart3 className="h-3.5 w-3.5" aria-hidden="true" />
          {course.level}
        </span>
        <AvatarStack count={4} badge="26+" size={30} />
      </div>

      <p className="mt-3 font-heading text-[22px] font-semibold leading-none text-blue-600">
        ${course.price}
        <span className="ml-0.5 font-body text-[12px] font-normal text-neutral-600">/lifetime</span>
      </p>
    </article>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border border-neutral-200 bg-white p-4" aria-hidden="true">
      <div className="aspect-[341/196] rounded-2xl bg-neutral-100" />
      <div className="mt-4 h-5 w-3/4 rounded bg-neutral-100" />
      <div className="mt-2 h-3 w-1/3 rounded bg-neutral-100" />
      <div className="mt-4 h-8 w-1/2 rounded-full bg-neutral-100" />
      <div className="mt-4 h-6 w-1/4 rounded bg-neutral-100" />
    </div>
  );
}
