import type { Course } from "@/types";

const base = { author: "purepearl studio", rating: 4.5, level: "Beginner", price: 25, lessons: 17, duration: "2 hours 16 mins", comments: 59 } as const;

export const courses: Course[] = [
  { ...base, id: "figma-basic", title: "Learn Figma from Basic", image: "figma", categories: ["UI/UX Design", "Graphic Design", "Web Development"] },
  { ...base, id: "digital-asset", title: "Build Digital Asset", image: "digital-assets", categories: ["Graphic Design", "Digital Illustration", "Drawing & Painting"] },
  { ...base, id: "big-data", title: "the Power of Big Data", image: "big-data", categories: ["Data Science", "Web Development"] },
  { ...base, id: "productivity", title: "Balancing Productivity and Life", image: "productivity", categories: ["Productivity", "Freelance & Entrepreneurship"] },
  { ...base, id: "money", title: "Mastering Money Management", image: "money", categories: ["Marketing", "Freelance & Entrepreneurship", "Data Science"] },
  { ...base, id: "startup", title: "From Idea to Startup Success", image: "startup", categories: ["Freelance & Entrepreneurship", "Creative Marketing", "Marketing"] },
];

export const FEATURED = "Featured";

export const primaryCategories = [
  FEATURED, "Music", "Drawing & Painting", "Marketing", "Animation", "Social Media", "UI/UX Design", "Creative Marketing",
  "Digital Illustration", "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", "Photography",
  "Productivity", "Web Development", "Data Science", "Cooking",
];

export const moreCategories = ["Finance", "Sport", "Business", "IT", "Design", "Development"];

export function getCourses(category?: string | null): Course[] {
  if (!category || category === FEATURED) return courses;
  return courses.filter((c) => c.categories.includes(category));
}
