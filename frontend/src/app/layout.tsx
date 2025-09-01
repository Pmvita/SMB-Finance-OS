import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trident Financial OS - Financial Operating System for Global SMBs",
  description: "Streamline your business finances with our comprehensive platform. From invoicing to lending, we provide everything SMBs need to thrive in emerging markets.",
  keywords: "SMB, small business, finance, invoicing, expense tracking, payments, tax reporting, credit scoring, lending, payroll",
  authors: [{ name: "Trident Financial OS Team" }],
  openGraph: {
    title: "Trident Financial OS - Financial Operating System for Global SMBs",
    description: "Streamline your business finances with our comprehensive platform. From invoicing to lending, we provide everything SMBs need to thrive in emerging markets.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trident Financial OS - Financial Operating System for Global SMBs",
    description: "Streamline your business finances with our comprehensive platform. From invoicing to lending, we provide everything SMBs need to thrive in emerging markets.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
