import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = { page: number; pages: number; hrefFor: (page: number) => string };

const arrow = "flex h-[46px] w-14 items-center justify-center rounded-full border border-neutral-300 text-neutral-950 transition-colors";

export function Pagination({ page, pages, hrefFor }: Props) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2 sm:gap-5">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} scroll aria-label="Previous page" className={cn(arrow, "hover:bg-neutral-50")}>
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" className={cn(arrow, "opacity-40")}><ChevronLeft className="h-6 w-6" /></span>
      )}

      <ul className="flex items-center">
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            {n === page ? (
              <span aria-current="page" className="flex h-11 w-9 items-center justify-center font-heading text-body-l font-semibold text-neutral-400 sm:w-[46px]">{n}</span>
            ) : (
              <Link href={hrefFor(n)} aria-label={`Page ${n}`} className="flex h-11 w-9 items-center justify-center font-heading text-body-l font-semibold text-neutral-950 transition-colors hover:text-blue-600 sm:w-[46px]">{n}</Link>
            )}
          </li>
        ))}
      </ul>

      {page < pages ? (
        <Link href={hrefFor(page + 1)} aria-label="Next page" className={cn(arrow, "hover:bg-neutral-50")}>
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-hidden="true" className={cn(arrow, "opacity-40")}><ChevronRight className="h-6 w-6" /></span>
      )}
    </nav>
  );
}
