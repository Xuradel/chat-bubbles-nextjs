import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const sans = Open_Sans({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat bubbles app",
  description: "Chat bubble generator inspired by devaslife",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sans.className}>{children}</body>
    </html>
  );
}
