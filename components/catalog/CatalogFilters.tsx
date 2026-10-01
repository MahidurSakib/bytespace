"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { BarChart3, Filter, LayoutGrid, ListFilter } from "lucide-react";
import { MenuButton } from "@/components/ui/MenuButton";
import { allCategories, levels, priceOptions, quickCategories, sortOptions, type CatalogQuery } from "@/data/catalog";
import { cn } from "@/lib/cn";

type Props = {
  basePath: string;
  current: CatalogQuery;
  showPills?: boolean;
  children: React.ReactNode;
};

const levelOptions = [{ value: "", label: "All levels" }, ...levels.map((l) => ({ value: l, label: l }))];
const categoryOptions = [{ value: "", label: "All categories" }, ...allCategories.map((c) => ({ value: c, label: c }))];

/**
 * Filter toolbar for course listings. All state lives in the URL so results are
 * shareable and rendered on the server; `children` is the server-rendered grid.
 */
export function CatalogFilters({ basePath, current, showPills = false, children }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const update = (patch: Partial<Record<"category" | "level" | "price" | "sort", string>>) => {
    const next: Record<string, string | undefined> = {
      q: current.q,
      category: current.category,
      level: current.level,
      price: current.price,
      sort: current.sort,
      ...patch,
    };
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v) params.set(k, v);
    const qs = params.toString();
    startTransition(() => router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false }));
  };

  const activeCategory = current.category || "Featured";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <MenuButton label="Filter" icon={<Filter className="h-4 w-4" aria-hidden="true" />} options={priceOptions} value={current.price ?? ""} onChange={(v) => update({ price: v })} />
          <MenuButton label="Level" icon={<BarChart3 className="h-4 w-4" aria-hidden="true" />} options={levelOptions} value={current.level ?? ""} onChange={(v) => update({ level: v })} />
          <MenuButton label="Category" icon={<LayoutGrid className="h-4 w-4" aria-hidden="true" />} options={categoryOptions} value={current.category ?? ""} onChange={(v) => update({ category: v })} />
        </div>
        <MenuButton
          label="Most relevant"
          icon={<ListFilter className="h-4 w-4" aria-hidden="true" />}
          options={sortOptions}
          value={current.sort ?? "relevant"}
          onChange={(v) => update({ sort: v === "relevant" ? "" : v })}
          showSelection={false}
          align="right"
        />
      </div>

      {showPills && (
        <div role="group" aria-label="Quick categories" className="no-scrollbar -mx-5 mt-6 flex gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 md:mt-8 xl:flex-nowrap xl:justify-between">
          {quickCategories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={activeCategory === c}
              onClick={() => update({ category: c === "Featured" ? "" : c })}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 text-label-m transition-colors",
                activeCategory === c ? "bg-lime-500 font-medium text-neutral-950" : "bg-neutral-50 text-neutral-800 hover:bg-neutral-100",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div aria-busy={pending} className={cn("mt-8 transition-opacity duration-150 md:mt-10", pending && "pointer-events-none opacity-50")}>
        {children}
      </div>
    </>
  );
}
