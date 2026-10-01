"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/?q=${encodeURIComponent(q)}#courses` : "/#courses");
  };

  return (
    <form onSubmit={onSubmit} role="search" className="mx-auto mt-10 flex w-full max-w-[560px] items-center gap-3 md:mt-[70px]">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
        <label htmlFor="hero-search" className="sr-only">Search courses, topics or creators</label>
        <input
          id="hero-search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Course, topic, creator"
          className="h-[52px] w-full rounded-full bg-white pl-12 pr-4 text-body-m text-neutral-950 placeholder:text-neutral-500"
        />
      </div>
      <Button type="submit" className="h-[46px] shrink-0">Search</Button>
    </form>
  );
}
