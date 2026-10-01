"use client";

import Image from "next/image";
import { useRef } from "react";
import { Play } from "lucide-react";

export function CoursePreview({ title, className }: { title: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <div className={className}>
      <div className="relative aspect-[736/489] overflow-hidden rounded-3xl bg-neutral-100">
        <Image
          src="/images/course-detail/poster.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 736px"
          className="object-cover"
        />
        <button
          type="button"
          onClick={() => dialog.current?.showModal()}
          aria-label={`Play course preview: ${title}`}
          className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[22px] bg-neutral-950/35 backdrop-blur-md transition-transform hover:scale-105 sm:h-24 sm:w-24"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-neutral-700 sm:h-14 sm:w-14">
            <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" aria-hidden="true" />
          </span>
        </button>
      </div>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        aria-labelledby="preview-title"
        className="m-auto w-[min(92vw,440px)] rounded-3xl p-8 text-neutral-950 backdrop:bg-neutral-950/60"
      >
        <h2 id="preview-title" className="font-heading text-h-xs">Preview coming soon</h2>
        <p className="mt-3 text-body-m text-neutral-600">The course preview video isn&apos;t available in this demo. Enroll to see the full lesson list.</p>
        <form method="dialog" className="mt-6 flex justify-end">
          <button className="h-11 rounded-full bg-lime-500 px-6 text-label-m font-medium hover:bg-lime-400">Close</button>
        </form>
      </dialog>
    </div>
  );
}
