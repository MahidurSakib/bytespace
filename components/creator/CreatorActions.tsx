"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

const chip = "inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-body-m text-neutral-950";

/** Product and follower counts plus the Follow toggle (state is local to this demo). */
export function CreatorActions({ products, followers }: { products: number; followers: number }) {
  const [following, setFollowing] = useState(false);
  const count = followers + (following ? 1 : 0);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <ul className="flex flex-wrap gap-3">
        <li className={chip}><b className="font-normal text-blue-600">{products}</b> Products</li>
        <li className={chip}><b className="font-normal text-blue-600" aria-live="polite">{count}</b> Followers</li>
      </ul>
      <button
        type="button"
        aria-pressed={following}
        onClick={() => setFollowing((v) => !v)}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full px-7 text-label-m font-medium text-neutral-950 transition-colors",
          following ? "bg-white hover:bg-neutral-50" : "bg-lime-500 hover:bg-lime-400",
        )}
      >
        {following && <Check className="h-4 w-4" aria-hidden="true" />}
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}
