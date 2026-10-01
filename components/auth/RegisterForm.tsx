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
import { registerSchema, type RegisterValues } from "@/lib/validation";

export function RegisterForm() {
  const router = useRouter();
  const [notice, setNotice] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = async (values: RegisterValues) => {
    setNotice(null);
    try {
      const res = await postJson<{ message: string }>("/api/auth/register", values);
      setNotice({ kind: "success", text: res.message });
      setTimeout(() => router.push("/login"), 1000);
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors) {
        for (const [name, message] of Object.entries(err.fieldErrors)) setError(name as keyof RegisterValues, { message });
      }
      setNotice({ kind: "error", text: err instanceof ApiError ? err.message : "Something went wrong." });
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <p className="text-body-m text-blue-600">Create an Account</p>
      <h1 className="mt-1 text-[34px] leading-[1.2] sm:text-h-m">Welcome to ByteSpace</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-9 space-y-5">
        <Field id="fullName" label="Full Name" placeholder="Jamie Davis" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
        <Field id="email" label="Email" type="email" placeholder="designer@example.com" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Field id="password" label="Password" type="password" placeholder="********" autoComplete="new-password" error={errors.password?.message} {...register("password")} />
        <div className="flex justify-end pt-2">
          <Button type="submit" size="lg" disabled={isSubmitting || isSubmitSuccessful}>
            {isSubmitting ? "Creating account..." : "Continue"}
          </Button>
        </div>
        {notice && <AuthNotice kind={notice.kind}>{notice.text}</AuthNotice>}
      </form>

      <p className="mt-auto pt-12 text-center text-body-s text-neutral-600">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
