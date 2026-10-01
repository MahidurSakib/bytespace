"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

export const Field = forwardRef<HTMLInputElement, Props>(function Field({ label, error, id, type, className, ...rest }, ref) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const errId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-label-s text-neutral-950">{label}</label>
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errId : undefined}
          className={cn(
            "h-[52px] w-full rounded-xl border bg-white px-4 text-body-m text-neutral-950 placeholder:text-neutral-400",
            error ? "border-red-500" : "border-neutral-100",
            isPassword && "pr-12",
            className,
          )}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-500 hover:text-neutral-950"
          >
            {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p id={errId} role="alert" className="mt-1.5 text-body-xs text-red-600">{error}</p>}
    </div>
  );
});
