import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/navComponents/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keptoo - keep your tasks arranged",
  description:
    "Wanna manage your tasks effiientily in collaboratively keptoo is the solution for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Header />
        <main className="bg-purple-400/90 h-full">{children}</main>
      </body>
    </html>
  );
}
