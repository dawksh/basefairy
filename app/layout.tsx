import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import RainbowKitLayout from "@/components/layout/rainbowkit";
import Navbar from "@/components/shared/navbar";
import { Toaster } from "@/components/ui/toaster";

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
  title: "basefairy",
  description: "gift basename to frens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased magicpattern`}
      >
        <RainbowKitLayout>
          <Navbar />
          <Toaster />
          {children}
        </RainbowKitLayout>
      </body>
    </html>
  );
}
