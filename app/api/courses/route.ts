import { NextResponse } from "next/server";
import { courses, getCourses } from "@/data/courses";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase();
  const category = searchParams.get("category");

  const result = q
    ? courses.filter((c) => c.title.toLowerCase().includes(q) || c.categories.some((cat) => cat.toLowerCase().includes(q)))
    : getCourses(category);

  return NextResponse.json({ courses: result });
}
