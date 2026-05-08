import type { Metadata } from "next";
import { Inter } from "next/font/google";   // ✅ Replace Geist with Inter
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Load Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SureCarry",
  description: "Your logistics and delivery platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
