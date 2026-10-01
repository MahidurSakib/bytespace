import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/courses/route";
import { FEATURED, getCourses } from "@/data/courses";

describe("courses data + API", () => {
  it("returns every course for Featured", () => {
    expect(getCourses(FEATURED)).toHaveLength(6);
  });

  it("filters by category and can return an empty list", () => {
    expect(getCourses("Data Science").length).toBeGreaterThan(0);
    expect(getCourses("Cooking")).toHaveLength(0);
  });

  it("supports free-text search through the route handler", async () => {
    const res = await GET(new Request("http://localhost/api/courses?q=figma"));
    const body = await res.json();
    expect(body.courses).toHaveLength(1);
    expect(body.courses[0].id).toBe("figma-basic");
  });
});
