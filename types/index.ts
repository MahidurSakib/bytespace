export type Course = {
  id: string;
  title: string;
  author: string;
  image: string;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  lessons: number;
  duration: string;
  comments: number;
  categories: string[];
  /** Route segment for the course page. Falls back to `id`. */
  slug?: string;
};
