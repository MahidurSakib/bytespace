"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function EnrollButton() {
  const [enrolled, setEnrolled] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setEnrolled(true)}
        disabled={enrolled}
        className={cn(
          "inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-lime-400 text-label-m font-medium text-neutral-950 transition-colors",
          enrolled ? "cursor-default bg-lime-200" : "hover:bg-lime-300",
        )}
      >
        {enrolled && <Check className="h-5 w-5" aria-hidden="true" />}
        {enrolled ? "You're enrolled" : "Enroll Now"}
      </button>
      <span role="status" className="sr-only">{enrolled ? "You are now enrolled in this course" : ""}</span>
    </>
  );
}
