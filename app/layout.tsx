import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My Next Course",
  description: "Decide what, when and how you want to learn",
  keywords: ["course", "learning", "next"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full w-full antialiased `}
      >
        <div className="bg-slate-100 flex w-full justify-end">
          <Button variant="link" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
        <div className="min-h-screen h-full w-full flex flex-col justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
