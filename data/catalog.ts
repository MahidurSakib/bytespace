import { courses } from "@/data/courses";
import { moreCategories, primaryCategories } from "@/data/courses";
import type { Course } from "@/types";

export const PAGE_SIZE = 18;
const TOTAL = 90;

export const levels: Course["level"][] = ["Beginner", "Intermediate", "Advanced"];

export const sortOptions = [
  { value: "relevant", label: "Most relevant" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export const priceOptions = [
  { value: "", label: "Any price" },
  { value: "under-30", label: "Under $30" },
  { value: "30-40", label: "$30 to $40" },
  { value: "over-40", label: "Over $40" },
] as const;

/** Category names shown in the "Category" menu (Featured means "no category filter"). */
export const allCategories = [...primaryCategories.filter((c) => c !== "Featured"), ...moreCategories];

/** Quick-pick pills shown under the toolbar on the search page (same set as the design). */
export const quickCategories = ["Featured", "Music", "Drawing & Painting", "Marketing", "Animation", "Social Media", "UI/UX Design", "Creative Marketing", "Cooking"];

const variantLevel = (variant: number): Course["level"] => (variant < 3 ? "Beginner" : levels[variant % 3]);
const variantPrice = (variant: number) => [25, 25, 25, 30, 35, 40, 45][variant % 7];
const variantRating = (variant: number) => [4.5, 4.5, 4.5, 4.6, 4.7, 4.8, 4.4][variant % 7];

/**
 * Demo catalog: the six designed courses repeated to fill five pages.
 * The first three repeats match the design values exactly, later ones vary
 * level, price and rating so the filters and sorting have something to do.
 */
export const catalog: Course[] = Array.from({ length: TOTAL }, (_, i) => {
  const base = courses[i % courses.length];
  const variant = Math.floor(i / courses.length);
  return {
    ...base,
    id: variant === 0 ? base.id : `${base.id}-${variant + 1}`,
    slug: base.id,
    level: variantLevel(variant),
    price: variantPrice(variant),
    rating: variantRating(variant),
  };
});

export type CatalogQuery = {
  q?: string;
  category?: string;
  level?: string;
  price?: string;
  sort?: string;
  page?: number;
};

export type CatalogResult = { courses: Course[]; total: number; page: number; pages: number };

const inPriceBucket = (price: number, bucket?: string) => {
  switch (bucket) {
    case "under-30": return price < 30;
    case "30-40": return price >= 30 && price <= 40;
    case "over-40": return price > 40;
    default: return true;
  }
};

export function queryCatalog(query: CatalogQuery, source: Course[] = catalog, pageSize = PAGE_SIZE): CatalogResult {
  const q = query.q?.trim().toLowerCase();
  const category = query.category && query.category !== "Featured" ? query.category : undefined;

  let list = source.filter((c) => {
    if (q && !`${c.title} ${c.author} ${c.categories.join(" ")}`.toLowerCase().includes(q)) return false;
    if (category && !c.categories.includes(category)) return false;
    if (query.level && c.level !== query.level) return false;
    return inPriceBucket(c.price, query.price);
  });

  // Array.prototype.sort is stable, so equal items keep their catalog order.
  if (query.sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
  else if (query.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  else if (query.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(Math.max(1, Math.floor(query.page ?? 1) || 1), pages);
  return { courses: list.slice((page - 1) * pageSize, page * pageSize), total, page, pages };
}

/** Reads the URL search params of a listing page into a typed query. */
export function parseCatalogParams(raw: Record<string, string | string[] | undefined>): CatalogQuery {
  const one = (k: string) => {
    const v = raw[k];
    return (Array.isArray(v) ? v[0] : v) || undefined;
  };
  const level = one("level");
  const price = one("price");
  const sort = one("sort");
  return {
    q: one("q")?.slice(0, 80),
    category: one("category"),
    level: level && (levels as string[]).includes(level) ? level : undefined,
    price: priceOptions.some((o) => o.value === price) ? price : undefined,
    sort: sortOptions.some((o) => o.value === sort) ? sort : undefined,
    page: Number(one("page")) || 1,
  };
}
