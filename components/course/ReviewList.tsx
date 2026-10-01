"use client";

import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";
import { Stars } from "@/components/course/Stars";
import type { Review } from "@/data/course-details";
import { cn } from "@/lib/cn";

type Filter = "all" | 1 | 2 | 3 | 4 | 5;
const filters: Filter[] = ["all", 5, 4, 3, 2, 1];

export function ReviewList({ reviews }: { reviews: Review[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? reviews : reviews.filter((r) => r.rating === filter);

  return (
    <>
      <div role="group" aria-label="Filter reviews by rating" className="mt-5 flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-label-m transition-colors",
              filter === f ? "bg-lime-500 font-medium text-neutral-950" : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100",
            )}
          >
            {f === "all" ? "All rating" : <><Star className="h-4 w-4 fill-current" aria-hidden="true" /><span aria-hidden="true">{f}</span><span className="sr-only">{f} star</span></>}
          </button>
        ))}
      </div>

      <div className="mt-6" aria-live="polite">
        {shown.length === 0 ? (
          <p role="status" className="rounded-3xl border border-dashed border-neutral-200 px-6 py-12 text-center text-body-m text-neutral-600">
            No {filter}-star reviews to show yet.
          </p>
        ) : (
          <ul className="space-y-6">
            {shown.map((r) => (
              <li key={r.id}>
                <article className="rounded-[32px] border border-neutral-200 p-6 sm:p-8">
                  <header className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Image src={`/images/people/${r.avatar}.webp`} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="text-body-m leading-tight text-neutral-950">{r.name}</p>
                        <p className="text-body-s text-neutral-600">{r.role}</p>
                      </div>
                    </div>
                    <p className="shrink-0 text-body-s text-neutral-600">{r.when}</p>
                  </header>
                  <p className="mt-4"><Stars count={r.rating} /><span className="sr-only">{r.rating} out of 5 stars</span></p>
                  <p className="mt-4 text-body-m text-neutral-700">{r.text}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
