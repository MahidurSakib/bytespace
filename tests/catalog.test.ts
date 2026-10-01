import { describe, expect, it } from "vitest";
import { PAGE_SIZE, catalog, parseCatalogParams, queryCatalog } from "@/data/catalog";

describe("catalog query", () => {
  it("has 90 courses across 5 pages of 18", () => {
    const r = queryCatalog({});
    expect(catalog).toHaveLength(90);
    expect(r.courses).toHaveLength(PAGE_SIZE);
    expect(r.pages).toBe(5);
  });

  it("keeps the first pages identical to the design values", () => {
    const first = queryCatalog({}).courses;
    expect(first.every((c) => c.level === "Beginner" && c.price === 25 && c.rating === 4.5)).toBe(true);
  });

  it("filters by category, level and price together", () => {
    const r = queryCatalog({ category: "Data Science", level: "Intermediate", price: "30-40" });
    expect(r.total).toBeGreaterThan(0);
    for (const c of r.courses) {
      expect(c.categories).toContain("Data Science");
      expect(c.level).toBe("Intermediate");
      expect(c.price).toBeGreaterThanOrEqual(30);
      expect(c.price).toBeLessThanOrEqual(40);
    }
  });

  it("searches title, author and category text", () => {
    expect(queryCatalog({ q: "figma" }).total).toBe(15);
    expect(queryCatalog({ q: "zzzz" }).total).toBe(0);
  });

  it("sorts by price and rating", () => {
    const asc = queryCatalog({ sort: "price-asc" }).courses.map((c) => c.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const top = queryCatalog({ sort: "rating" }).courses[0];
    expect(top.rating).toBe(4.8);
  });

  it("clamps out-of-range pages and never returns page 0", () => {
    expect(queryCatalog({ page: 99 }).page).toBe(5);
    expect(queryCatalog({ page: -3 }).page).toBe(1);
    expect(queryCatalog({ q: "zzzz" }).pages).toBe(1);
  });

  it("ignores unknown or malformed URL params", () => {
    const q = parseCatalogParams({ level: "Wizard", sort: "random", price: "free", page: "abc", q: ["a", "b"] });
    expect(q).toMatchObject({ level: undefined, sort: undefined, price: undefined, page: 1, q: "a" });
  });
});
