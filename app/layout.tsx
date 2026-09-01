import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import Link from "next/link";
import AuthStatus from "../components/AuthStatus";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vad har vi på..?",
  description: "One drink at a time — reviews, scores, and notes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="font-body">
        <header className="border-b border-line bg-ink text-paper">
          <div className="mx-auto flex max-w-4xl items-baseline justify-between px-6 py-5">
            <Link href="/" className="font-display text-2xl tracking-tight">
              Vad har vi på..?
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/reviews/new"
                className="text-sm text-paper/80 hover:text-brass transition-colors"
              >
                Log a drink
              </Link>
              <AuthStatus />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
        <footer className="mx-auto max-w-4xl px-6 py-10 text-sm text-stone">
          Vad har vi på..? — a personal drinks journal.
        </footer>
      </body>
    </html>
  );
}
