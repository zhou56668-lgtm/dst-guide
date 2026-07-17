import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dst-guide.vercel.app"),
  title: {
    default: "DST攻略站 - Don't Starve Together Guide",
    template: "%s | DST攻略站",
  },
  description:
    "饥荒联机版中文攻略站 / DST Chinese Player Community: 角色指南、Boss打法、食谱配方、实用工具。",
  openGraph: {
    siteName: "DST攻略站",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
