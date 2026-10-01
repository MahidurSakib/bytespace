"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type MenuOption = { value: string; label: string };

type Props = {
  label: string;
  icon?: React.ReactNode;
  options: readonly MenuOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "outline" | "lime";
  align?: "left" | "right";
  /** Shows the selected option next to the label, e.g. "Level: Beginner". */
  showSelection?: boolean;
  className?: string;
};

/** Pill-shaped dropdown used for toolbar filters. Keyboard: Esc closes, arrows move, Enter selects. */
export function MenuButton({ label, icon, options, value, onChange, variant = "outline", align = "left", showSelection = true, className }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const selected = options.find((o) => o.value === value);
  const hasSelection = showSelection && value !== "" && selected && !selected.label.startsWith("All");

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onMenuKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=menuitemradio]"));
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-full px-4 text-label-m transition-colors",
          variant === "lime"
            ? "bg-lime-500 px-5 font-medium text-neutral-950 hover:bg-lime-400"
            : cn("border bg-white text-neutral-950 hover:bg-neutral-50", hasSelection ? "border-neutral-950" : "border-neutral-300"),
        )}
      >
        {icon}
        <span>{variant === "lime" && selected ? selected.label : hasSelection ? `${label}: ${selected.label}` : label}</span>
        {variant === "lime" && <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden="true" />}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKey}
          className={cn("absolute z-30 mt-2 min-w-[210px] rounded-2xl border border-neutral-100 bg-white p-1.5 text-neutral-950 shadow-card", align === "right" ? "right-0" : "left-0")}
        >
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value || "all"}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setOpen(false);
                  if (!active) onChange(o.value);
                  triggerRef.current?.focus();
                }}
                className={cn("flex w-full items-center justify-between gap-6 rounded-xl px-3 py-2.5 text-left text-label-m transition-colors hover:bg-neutral-50", active && "bg-neutral-50 font-medium")}
              >
                {o.label}
                {active && <Check className="h-4 w-4 text-blue-600" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
