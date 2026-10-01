import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validation";

/** Mock endpoint: validates input only. Replace with a real auth backend. */
export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    return NextResponse.json({ message: "Please fix the highlighted fields.", fieldErrors }, { status: 422 });
  }
  return NextResponse.json({ message: "Account created. Redirecting to sign in..." }, { status: 201 });
}
