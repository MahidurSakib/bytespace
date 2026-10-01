import { courses } from "@/data/courses";

export type Module = { title: string; text: string };
export type Review = { id: string; name: string; role: string; avatar: string; rating: number; when: string; text: string };

export type CourseDetail = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  creatorSlug: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  reviewCount: number;
  students: number;
  lessonCount: number;
  /** Shown under the three preview lessons, e.g. "99 more videos". */
  moreVideos: number;
  hours: number;
  price: number;
  previewLessons: { no: string; title: string; mins: number }[];
  description: string[];
  keyPoints: string[];
  modules: Module[];
  reviews: Review[];
  reviewsIntro: string;
};

/** Star counts for the rating summary, from 5 stars down to 1. */
export const ratingBreakdown = [720, 120, 21, 12, 16];

const flagship: CourseDetail = {
  slug: "digital-asset",
  title: "Build Digital Asset: A Comprehensive Guide",
  subtitle: "Unlock the Power of Digital Creation with Expert Guidance",
  author: "purepearl studio",
  creatorSlug: "purepearl-studio",
  level: "Intermediate",
  rating: 4.8,
  reviewCount: 172,
  students: 199,
  lessonCount: 112,
  moreVideos: 99,
  hours: 24,
  price: 25,
  previewLessons: [
    { no: "01", title: "Introduction to Digital Assets", mins: 12 },
    { no: "02", title: "Design Principles for Impacts", mins: 21 },
    { no: "03", title: "Advanced Techniques in Digital Creation", mins: 16 },
  ],
  description: [
    "Embark on an enlightening exploration into the world of digital creation with our comprehensive course, \"Build Digital Assets: A Comprehensive Guide.\" This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.",
    "In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.",
    "As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.",
  ],
  keyPoints: [
    "Foundational Concepts",
    "Design Principles Mastery",
    "Advanced Techniques in Digital Creation",
    "Project Showcase and Critique",
    "Optimizing for Various Platforms",
    "Digital Asset Management Best Practices",
    "Monetization Strategies",
    "Capstone Project: Building Your Portfolio",
  ],
  // The design skips "Module 3"; numbering is kept exactly as designed.
  modules: [
    { title: "Module 1: Introduction to Digital Assets", text: "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation." },
    { title: "Module 2: Design Principles for Impact", text: "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills." },
    { title: "Module 4: User-Centric Design Strategies", text: "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design." },
    { title: "Module 5: Interactive Media and Engagement", text: "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences." },
    { title: "Module 6: Project Showcase and Critique", text: "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence." },
    { title: "Module 7: Optimizing Digital Assets for Various Platforms", text: "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes." },
  ],
  reviewsIntro: "Discover what our learners have to say about their experience with 'Build Digital Assets: A Comprehensive Guide.' Read reviews and ratings from individuals who have embarked on the transformative journey of mastering digital asset creation.",
  reviews: [
    { id: "r1", name: "PurePearl Studio", role: "UI/UX Designer", avatar: "reviewer-purepearl", rating: 5, when: "a year ago", text: "\"The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!\"" },
    { id: "r2", name: "Albert Flores", role: "UI/UX Designer", avatar: "reviewer-albert", rating: 5, when: "a year ago", text: "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!" },
    { id: "r3", name: "Cody Fisher", role: "UI/UX Designer", avatar: "reviewer-cody", rating: 5, when: "a year ago", text: "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process." },
    { id: "r4", name: "Brooklyn Simmons", role: "UI/UX Designer", avatar: "reviewer-brooklyn", rating: 5, when: "a year ago", text: "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout." },
  ],
};

/** Only "Build Digital Asset" has fully designed copy; the other courses reuse the same layout with a short generated outline. */
const topics: Record<string, string> = {
  "figma-basic": "interface design with Figma",
  "big-data": "big data",
  "productivity": "personal productivity",
  "money": "money management",
  "startup": "startup building",
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function generated(slug: string): CourseDetail | undefined {
  const course = courses.find((c) => c.id === slug);
  const topic = topics[slug];
  if (!course || !topic) return undefined;
  const title = `${cap(course.title)}: A Comprehensive Guide`;
  return {
    ...flagship,
    slug,
    title,
    subtitle: `Unlock the Power of ${cap(topic)} with Expert Guidance`,
    level: course.level,
    rating: course.rating,
    price: course.price,
    lessonCount: course.lessons,
    moreVideos: Math.max(course.lessons - 3, 0),
    hours: 3,
    reviewCount: 48,
    students: 86,
    previewLessons: [
      { no: "01", title: `Introduction to ${cap(topic)}`, mins: 12 },
      { no: "02", title: "Core Principles for Impact", mins: 21 },
      { no: "03", title: `Practical Techniques in ${cap(topic)}`, mins: 16 },
    ],
    description: [
      `Embark on an enlightening exploration into ${topic} with our comprehensive course, "${title}." This learning experience takes you from the first principles to confident, everyday practice, guided by an experienced creator.`,
      `In the initial modules, you'll build a solid foundation in ${topic}. Understand the fundamentals, learn the vocabulary, and see how the pieces fit together before moving on to more advanced ideas.`,
      `As you progress, you'll apply what you've learned through hands-on exercises and short projects, so every lesson ends with something practical you can use straight away.`,
    ],
    keyPoints: [
      "Foundational Concepts",
      "Core Principles Mastery",
      `Practical Techniques in ${cap(topic)}`,
      "Project Showcase and Critique",
      "Real-World Applications",
      "Best Practices and Common Pitfalls",
      "Building a Sustainable Workflow",
      "Capstone Project: Building Your Portfolio",
    ],
    modules: [
      { title: `Module 1: Introduction to ${cap(topic)}`, text: "Lay the groundwork with the key ideas and tools you will use throughout the course." },
      { title: "Module 2: Core Principles for Impact", text: "Learn the principles that separate good work from great work, with short guided exercises." },
      { title: "Module 3: Practical Techniques", text: "Put the principles to work with step-by-step demonstrations you can follow along with." },
      { title: "Module 4: Real-World Applications", text: "See how the techniques apply to real situations and adapt them to your own goals." },
      { title: "Module 5: Project Showcase and Critique", text: "Present your work, give and receive feedback, and refine your results with confidence." },
      { title: "Module 6: Building Your Workflow", text: "Turn what you have learned into a repeatable routine that keeps improving over time." },
    ],
    reviewsIntro: `Discover what our learners have to say about their experience with '${title}.' Read reviews and ratings from individuals who have completed the course.`,
    reviews: flagship.reviews.map((r) => ({
      ...r,
      text: `The lessons on ${topic} were clear, practical, and easy to follow. I could apply what I learned straight away.`,
    })),
  };
}

export const courseSlugs = ["digital-asset", ...Object.keys(topics)];

export function getCourseDetail(slug: string): CourseDetail | undefined {
  return slug === flagship.slug ? flagship : generated(slug);
}

export const lessonContentCopy = {
  content: "Engage with each lesson through captivating video content, detailed textual explanations, and interactive elements. Download resources, complete assignments, and test your understanding with quizzes.",
  progress: "Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through your learning journey.",
};

export const courseIncludes = ["Learning Resources", "Quality Lesson Videos", "Certificate of Completion", "Private Consultation"] as const;
