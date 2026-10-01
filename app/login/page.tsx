import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign In" };

export default function LoginPage() {
  return (
    <AuthShell
      heading="Sign in with ease"
      text="Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge."
    >
      <LoginForm />
    </AuthShell>
  );
}
