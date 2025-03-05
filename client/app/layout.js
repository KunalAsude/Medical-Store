"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";

export default function RootLayout({ children, title = "Medi-Store", description = "Your trusted online pharmacy" }) {
  const pathname = usePathname(); // Get the current route
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Show loader when path changes
    const timeout = setTimeout(() => setLoading(false), 500); // Simulate loading delay

    return () => clearTimeout(timeout);
  }, [pathname]); // Runs when path changes

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {loading && <Loader />} {/* Show loader when loading */}
          <Navbar />
          <main className="bg-[linear-gradient(to_right,#042F2E,#012621,#002A1C)]">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
