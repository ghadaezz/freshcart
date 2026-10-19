"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />

        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>

        <p className="mb-6 text-gray-600">
          Thank you for your order. We’ll process it as soon as possible.
        </p>

        <Link
          href="/products"
          className="inline-flex rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}