"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthNotice } from "@/components/auth/AuthShell";
import { Field } from "@/components/auth/Field";
import { Button } from "@/components/ui/Button";
import { ApiError, postJson } from "@/lib/api";
import { loginSchema, type LoginValues } from "@/lib/validation";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path fill="currentColor" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z" /></svg>
);
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path fill="currentColor" d="M21.35 11.1H12v2.98h5.35c-.23 1.4-1.65 4.1-5.35 4.1-3.22 0-5.85-2.67-5.85-5.95S8.78 6.28 12 6.28c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.68 3.7 14.55 2.7 12 2.7 6.92 2.7 2.8 6.82 2.8 11.9S6.92 21.1 12 21.1c5.18 0 8.6-3.64 8.6-8.77 0-.59-.06-1.04-.15-1.23Z" /></svg>
);

export function LoginForm() {
  const router = useRouter();
  const [notice, setNotice] = useState<{ kind: "success" | "error" | "info"; text: string } | null>(null);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    setNotice(null);
    try {
      const res = await postJson<{ message: string }>("/api/auth/login", values);
      setNotice({ kind: "success", text: res.message });
      setTimeout(() => router.push("/"), 900);
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        for (const [name, message] of Object.entries(err.fieldErrors)) setError(name as keyof LoginValues, { message });
      }
      setNotice({ kind: "error", text: err instanceof ApiError ? err.message : "Something went wrong." });
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <p className="text-body-m text-blue-600">Sign In</p>
      <h1 className="mt-1 text-[34px] leading-[1.2] sm:text-h-m">Welcome Back</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-9 space-y-5">
        <Field id="email" label="Email" type="email" placeholder="designer@example.com" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Field id="password" label="Password" type="password" placeholder="********" autoComplete="current-password" error={errors.password?.message} {...register("password")} />
        <div className="flex justify-end pt-2">
          <Button type="submit" size="lg" disabled={isSubmitting || isSubmitSuccessful}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>

      <div className="my-10 flex items-center gap-4 text-body-s text-neutral-500" aria-hidden="true">
        <span className="h-px flex-1 bg-neutral-100" /> or <span className="h-px flex-1 bg-neutral-100" />
      </div>

      <div className="flex justify-center gap-5">
        {[{ name: "Facebook", Icon: FacebookIcon }, { name: "Google", Icon: GoogleIcon }].map(({ name, Icon }) => (
          <button
            key={name}
            type="button"
            aria-label={`Continue with ${name}`}
            onClick={() => setNotice({ kind: "info", text: `${name} sign-in isn't available in this demo.` })}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-neutral-100 text-neutral-950 transition-colors hover:bg-neutral-50"
          >
            <Icon />
          </button>
        ))}
      </div>

      {notice && <AuthNotice kind={notice.kind}>{notice.text}</AuthNotice>}

      <p className="mt-auto pt-10 text-center text-body-s text-neutral-600">
        New user? <Link href="/register" className="text-blue-600 hover:underline">Create an account</Link>
      </p>
    </div>
  );
}
