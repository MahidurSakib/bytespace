"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { MenuButton } from "@/components/ui/MenuButton";
import { creators } from "@/data/creators";

const scopes = [
  { value: "courses", label: "Courses" },
  { value: "creators", label: "Creators" },
];

/** Search box on the blue banner. "Courses" filters the list; "Creators" opens a matching creator profile. */
export function SearchHero({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);
  const [scope, setScope] = useState("courses");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    setMessage("");
    if (scope === "creators") {
      const match = creators.find((c) => !term || c.name.toLowerCase().includes(term.toLowerCase()));
      if (match) router.push(`/creators/${match.slug}`);
      else setMessage(`No creators found for “${term}”.`);
      return;
    }
    router.push(term ? `/courses?q=${encodeURIComponent(term)}` : "/courses");
  };

  return (
    <form onSubmit={onSubmit} role="search" className="mx-auto mt-8 w-full max-w-[640px]">
      <div className="flex items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
          <label htmlFor="catalog-search" className="sr-only">Search</label>
          <input
            id="catalog-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="h-[52px] w-full rounded-full bg-white pl-12 pr-4 text-body-m text-neutral-950 placeholder:text-neutral-500"
          />
        </div>
        <MenuButton label="Search in" variant="lime" options={scopes} value={scope} onChange={(v) => { setScope(v); setMessage(""); }} align="right" className="shrink-0" />
      </div>
      <p role="status" className="mt-2 min-h-5 text-body-s text-white">{message}</p>
    </form>
  );
}
