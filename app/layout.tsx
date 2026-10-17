import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DREAMFRAME — Next-Gen AI Image Generator",
  description:
    "Synthesize cinematic AI visuals, photorealistic 8K dreamscapes, and impossible worlds with DreamFrame's real-time neural diffusion engine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark`}
    >
      <body className="min-h-full bg-[#080706] text-white selection:bg-[#ff5c28] selection:text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
