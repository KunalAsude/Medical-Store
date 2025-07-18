"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
      <CheckCircle className="text-green-500 mb-4" size={64} />
      <h1 className="text-3xl font-bold mb-2 text-green-700">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
      <Link href="/" className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800 transition-colors">Go to Home</Link>
    </div>
  );
}
