# ByteSpace

Every frame of the ByteSpace Figma design as a working Next.js site: landing page, course search, course pages, creator profile, login, register and 404.

**Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, React Hook Form + Zod, Vitest + Testing Library.

## Run it

```powershell
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm test`.

## Pages

| Route | Figma frame |
| --- | --- |
| `/` | Home (nav, hero, partners, course explorer, learning paths, growth blocks, creator CTA, testimonials, footer) |
| `/courses` | Search Page (search box, Filter / Level / Category / sort menus, category pills, 18 cards per page, pagination) |
| `/courses/[slug]` | Course Details (About tab) |
| `/courses/[slug]/lessons` | Course Lessons |
| `/courses/[slug]/reviews` | Course Reviews |
| `/creators/[slug]` | Creator Profile |
| `/login`, `/register` | Sign in and sign up |
| any unknown URL | 404 Not Found |

Try `/courses/digital-asset` first: it has the fully designed copy. The other five courses reuse the same layout with a shorter generated outline.

## What works (not just looks)

- Fixed navbar that gains a background on scroll, with an accessible mobile menu (Esc closes it).
- Course category pills call `GET /api/courses`, with skeleton loading, error + retry, and empty states.
- Hero search sends you to the course list filtered by your query (`/?q=figma`).
- Newsletter form posts to `/api/newsletter` with inline validation and status messages.
- Login and Register validate with Zod on the client and again on the server.
- The Search page keeps every filter, the sort order and the page number in the URL, so results are shareable and rendered on the server. Invalid params are ignored.
- Course pages: Share copies the link, Enroll Now confirms, the preview button opens a dialog, and the Reviews tab filters by star rating with an empty state.
- Creator page: Follow toggles and updates the follower count; the course list has the same filters.

## Project layout

```
app/                 routes, layout, API route handlers
components/ui/       Button, Logo, Container, CourseCard, MenuButton, stat cards, ornaments
components/catalog/  filters, pagination, course grid, search banner
components/course/   course page tabs, sidebar, preview, reviews
components/creator/  follow button and counts
components/layout/   Navbar, Footer, NewsletterForm
components/sections/ one file per landing page section
components/auth/     AuthShell, Field, LoginForm, RegisterForm
data/                courses, catalog query logic, course details and creators as typed data
lib/                 validation schemas, fetch helpers
tests/               Vitest tests
```

Design tokens (colors, type scale) live in `app/globals.css` and come straight from the Style Guide page.

## Git workflow

```powershell
git init -b main
git add . ; git commit -m "chore: initial Next.js scaffold"
git remote add origin https://github.com/<your-username>/bytespace.git
git push -u origin main

git switch -c feat/landing-page
# ...commit as you go, then:
git push -u origin feat/landing-page
```

Then open a Pull Request from `feat/landing-page` into `main` on GitHub (a template is included) and leave it open for review.

## Deploy to Vercel

1. Import the GitHub repo at vercel.com/new (framework is detected automatically, no env vars needed).
2. Deploy, then open the URL in a private window to confirm it is public.

## Notes and assumptions

- Auth endpoints are mocked: they validate input and return success, with no database or sessions. Swap the calls in `components/auth/*` and `app/api/auth/*` for a real backend.
- Satoshi is not on npm, so the body font falls back to DM Sans. To use the real font, follow `public/fonts/README.txt`.
- The partner strip uses placeholder "Logoipsum" marks, as in the design.
- The newsletter button keeps the label from the design ("Search").
- Photos and 3D shapes were exported from the design file and optimized to WebP.
- The catalog is demo data: the six designed courses repeated to fill five pages. The first pages match the design values; later repeats vary level, price and rating so filters and sorting have something to do.
- Small copy fixes to the design: the Creator Profile bio placeholder "[Creator's Name]" uses the real name, and the stray "ive into" reads "Dive into". The Reviews rating rows show graded stars (5, 4, 3, 2, 1) instead of five full stars on every row.
- The design skips "Module 3" in the lesson list; the numbering is kept as designed.
