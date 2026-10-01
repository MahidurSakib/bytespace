"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CourseCardSkeleton } from "@/components/ui/CourseCard";
import { CourseLink } from "@/components/ui/CourseLink";
import { Button } from "@/components/ui/Button";
import { FEATURED, moreCategories, primaryCategories } from "@/data/courses";
import { getJson } from "@/lib/api";
import { cn } from "@/lib/cn";
import type { Course } from "@/types";

type Result = { key: string; courses?: Course[]; error?: boolean };

export function CourseExplorer({ initialCourses }: { initialCourses: Course[] }) {
  const router = useRouter();
  const q = useSearchParams().get("q")?.trim() ?? "";
  const [category, setCategory] = useState(FEATURED);
  const [showMore, setShowMore] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result>({ key: `${FEATURED}||0`, courses: initialCourses });

  // One request key describes what we want on screen; loading is derived from it.
  const key = `${category}|${q}|${attempt}`;
  const loading = result.key !== key;

  useEffect(() => {
    if (result.key === key) return;
    const ac = new AbortController();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    else if (category !== FEATURED) params.set("category", category);
    getJson<{ courses: Course[] }>(`/api/courses?${params}`, ac.signal)
      .then((d) => setResult({ key, courses: d.courses }))
      .catch((e: Error) => e.name !== "AbortError" && setResult({ key, error: true }));
    return () => ac.abort();
  }, [key, q, category, result.key]);

  const select = (c: string) => {
    setCategory(c);
    if (q) router.replace("/#courses", { scroll: false });
  };

  const pills = showMore ? [...primaryCategories, ...moreCategories] : primaryCategories;
  const activeCategory = q ? null : category;
  const courses = result.courses ?? [];

  return (
    <>
      <div
        role="group"
        aria-label="Course categories"
        className="no-scrollbar -mx-5 mt-10 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-auto md:max-w-[1090px] md:flex-wrap md:justify-center md:gap-x-4 md:gap-y-5 md:overflow-visible md:px-0 md:pb-0"
      >
        {pills.map((c, i) => (
          <Pill
            key={c}
            breakBefore={i === 8 || i === 14}
            active={activeCategory === c}
            onClick={() => select(c)}
          >
            {c}
          </Pill>
        ))}
        <button
          type="button"
          aria-expanded={showMore}
          onClick={() => setShowMore((v) => !v)}
          className="shrink-0 px-2 text-label-s font-medium text-blue-600 hover:underline"
        >
          {showMore ? "− Less" : "+ More"}
        </button>
      </div>

      {q && (
        <p className="mt-8 text-center text-body-m text-neutral-600" role="status">
          Results for “{q}”{" "}
          <button type="button" onClick={() => router.replace("/#courses", { scroll: false })} className="font-medium text-blue-600 hover:underline">
            Clear
          </button>
        </p>
      )}

      <div className="mt-10 md:mt-[52px]" aria-busy={loading}>
        {loading ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => <CourseCardSkeleton key={i} />)}
          </div>
        ) : result.error ? (
          <StateMessage title="We couldn't load the courses" text="Check your connection and try again.">
            <Button onClick={() => setAttempt((n) => n + 1)}>Try again</Button>
          </StateMessage>
        ) : courses.length === 0 ? (
          <StateMessage title="No courses found" text="We don't have courses in this category yet. Try another one.">
            <Button onClick={() => { setCategory(FEATURED); if (q) router.replace("/#courses", { scroll: false }); }}>Show featured</Button>
          </StateMessage>
        ) : (
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => (
              <li key={c.id}><CourseLink course={c} priority={i < 3} /></li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function StateMessage({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div role="status" className="mx-auto flex max-w-[520px] flex-col items-center rounded-[28px] border border-dashed border-neutral-200 px-6 py-14 text-center">
      <h3 className="font-heading text-h-xs">{title}</h3>
      <p className="mb-6 mt-2 text-body-m text-neutral-600">{text}</p>
      {children}
    </div>
  );
}

function Pill({ active, breakBefore, onClick, children }: { active: boolean; breakBefore: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <>
      {/* forces the same 8 / 6 / rest row layout as the design on wide screens */}
      {breakBefore && <span aria-hidden="true" className="hidden h-0 basis-full md:block" />}
      <button
        type="button"
        aria-pressed={active}
        onClick={onClick}
        className={cn(
          "shrink-0 rounded-full px-4 py-2.5 text-label-s font-normal transition-colors",
          active ? "bg-lime-500 text-neutral-950" : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100",
        )}
      >
        {children}
      </button>
    </>
  );
}
