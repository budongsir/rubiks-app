import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "魔方 3D 还原助手",
  description: "用手机扫描魔方，获取清晰易懂的 3D 分步还原指引。",
  authors: [{ name: "Dawid Krasowski", url: "https://github.com/dejwi" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={cn("bg-background font-sans antialiased", fontSans.variable)}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
