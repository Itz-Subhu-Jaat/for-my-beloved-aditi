import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "For My Beloved Aditi - A Love Story",
  description: "A website made with love, for the most beautiful person in my world - Miss Aditi",
  keywords: ["Love", "Aditi", "Romance", "Forever"],
  authors: [{ name: "With Love" }],
  icons: {
    icon: "❤️",
  },
  openGraph: {
    title: "For My Beloved Aditi",
    description: "A love letter written in code, for the one who holds my heart",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
