"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Share2 } from "lucide-react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onClick = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the share sheet was dismissed or clipboard access was denied: nothing to do */
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-lime-500 px-5 text-label-m font-medium text-neutral-950 transition-colors hover:bg-lime-400"
      >
        {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Share2 className="h-5 w-5" aria-hidden="true" />}
        {copied ? "Link copied" : "Share"}
      </button>
      <span role="status" className="sr-only">{copied ? "Link copied to clipboard" : ""}</span>
    </>
  );
}
