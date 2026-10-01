"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function CourseTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  const base = `/courses/${slug}`;
  const tabs = [
    { label: "About", href: base },
    { label: "Lessons", href: `${base}/lessons` },
    { label: "Reviews", href: `${base}/reviews` },
  ];
  return (
    <nav aria-label="Course sections" className="flex flex-wrap gap-3">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.label}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={cn("rounded-full px-5 py-2.5 text-label-m transition-colors", active ? "bg-lime-500 font-medium text-neutral-950" : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100")}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
