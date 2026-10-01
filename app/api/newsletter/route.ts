import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid email" }, { status: 422 });
  }
  // Demo endpoint: plug a real mailing-list provider in here.
  return NextResponse.json({ message: "Thanks for subscribing! Check your inbox soon." });
}
