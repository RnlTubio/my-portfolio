import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/json-ld";
import ChatAssistant from "@/components/chat-assistant";

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "KxYGgeNKjAvXWZk_8wGMkW6C8FUp5tdunskFEwEuPqI",
  },
  openGraph: {
    title: "Ronel Tubio | Full Stack Developer Portfolio",
    description:
      "Discover the works and achievements of Ronel Tubio, a full stack developer creating innovative digital solutions.",
    url: "https://ronel-tubio-portfolio.vercel.app/",
    siteName: "Ronel Tubio Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ronel Tubio - Full Stack Developer Portfolio",
      },
    ],
    locale: "en_PH",
    type: "website",
  },

  metadataBase: new URL("https://ronel-tubio-portfolio.vercel.app/"),
  alternates: {
    canonical: "https://ronel-tubio-portfolio.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ChatAssistant />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
