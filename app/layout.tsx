import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "ByteSpace | Learn, create and grow with hundreds of courses";
const description =
  "Get access to hundreds of courses on ByteSpace. Discover your passion, build your skills, or become a creator and share your expertise.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: title, template: "%s | ByteSpace" },
  description,
  openGraph: { title, description, type: "website", siteName: "ByteSpace" },
  twitter: { card: "summary_large_image", title, description },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#003be2" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime-500 focus:px-4 focus:py-2 focus:text-neutral-950"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
