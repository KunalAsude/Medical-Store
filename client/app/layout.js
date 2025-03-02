"use client"
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";


const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
            <Navbar />
            <main className="bg-[linear-gradient(to_right,#042F2E,#012621,#002A1C)]">{children}</main>
            <footer className="py-4 text-center bg-teal-950 text-white">
              © {new Date().getFullYear()} MediStore. All rights reserved.
            </footer>
         
        </CartProvider>
      </body>
    </html>
  );
}