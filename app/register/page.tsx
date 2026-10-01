import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Create an Account" };

export default function RegisterPage() {
  return (
    <AuthShell
      heading="Sign up and come in"
      text="The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost"
    >
      <RegisterForm />
    </AuthShell>
  );
}
