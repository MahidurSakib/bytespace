"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { ApiError, postJson } from "@/lib/api";
import { newsletterSchema, type NewsletterValues } from "@/lib/validation";
import { cn } from "@/lib/cn";

type Status = { kind: "idle" } | { kind: "success"; message: string } | { kind: "error"; message: string };

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: NewsletterValues) => {
    setStatus({ kind: "idle" });
    try {
      const res = await postJson<{ message: string }>("/api/newsletter", values);
      setStatus({ kind: "success", message: res.message });
      reset();
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof ApiError ? err.message : "Something went wrong." });
    }
  };

  const message = errors.email?.message ?? (status.kind !== "idle" ? status.message : undefined);
  const isError = Boolean(errors.email) || status.kind === "error";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Newsletter signup">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby="newsletter-msg"
          className="h-[52px] w-full rounded-full border border-neutral-200 bg-white px-6 text-body-m text-neutral-950 placeholder:text-neutral-600 sm:max-w-[370px]"
          {...register("email")}
        />
        <Button type="submit" size="lg" disabled={isSubmitting} className="sm:h-[52px]">
          {isSubmitting ? "Sending..." : "Search"}
        </Button>
      </div>
      <p id="newsletter-msg" role={isError ? "alert" : "status"} className={cn("mt-2 min-h-5 text-body-xs", isError ? "text-red-600" : "text-blue-700")}>
        {message}
      </p>
    </form>
  );
}
