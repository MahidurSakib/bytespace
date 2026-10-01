import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

/** Row of five stars with `count` filled. Purely visual; pair with text for screen readers. */
export function Stars({ count, size = "md", className }: { count: number; size?: "sm" | "md"; className?: string }) {
  return (
    <span className={cn("inline-flex gap-1", className)} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn(size === "md" ? "h-6 w-6" : "h-5 w-5", i < count ? "fill-neutral-700 text-neutral-700" : "fill-neutral-100 text-neutral-100")} />
      ))}
    </span>
  );
}
