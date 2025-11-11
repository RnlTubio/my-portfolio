import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ronel Tubio | Full Stack Developer Portfolio",
  description:
    "Official portfolio of Ronel Tubio — a full stack developer passionate about building modern, efficient, and innovative web applications.",
  keywords: [
    "Ronel Formarejo Tubio",
    "Ronel Tubio Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "Next.js Developer",
    "API Developer",
    "Frontend Developer",
    "Backend Developer",
    "Ronel Tubio Portfolio",
    "Ronel Tubio Website",
    "PHP Developer",
    "Ronel Tubio Figma",
    "Ronel Tubio GitHub",
    "Ronel Tubio LinkedIn",
    "Ronel Formarejo Tubio",
    "Ronel F. Tubio",
    "Software Engineer Ronel Tubio",
    "Startup Pitching Competition",
    "Pitching Competition Winner",
    "Data Analyst",
  ],
  authors: [{ name: "Ronel Tubio" }],
  creator: "Ronel Tubio",
  openGraph: {
    title: "Ronel Tubio | Portfolio",
    description:
      "Discover the works and achievements of Ronel Tubio, a full stack developer creating innovative digital solutions.",
    url: "https://ronel-tubio-portfolio.vercel.app/my-portfolio", // change to your actual domain or Vercel URL
    siteName: "Ronel Tubio Portfolio",

    locale: "en_PH",
    type: "website",
  },
  metadataBase: new URL(
    "https://ronel-tubio-portfolio.vercel.app/my-portfolio"
  ),
  alternates: {
    canonical: "https://ronel-tubio-portfolio.vercel.app/my-portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
