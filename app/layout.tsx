import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nunito } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Valentine's Day <3",
  description: "Website - for my love (just for my love) <3",
  icons: {
    icon: [
      { rel: "icon", type: "image/x-icon", url: "/images/favicon_io/favicon.ico" },
      { rel: "icon", type: "image/png", url: "/images/favicon_io/favicon.png" },
    ],
    apple: "/images/favicon_io/apple-touch-icon.png",
  },
  openGraph: {
    title: "Valentine's Day <3",
    description: "Website - for my love (just for my love) <3",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Open Graph Image",
      },
    ],
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
        className={`${nunito.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
