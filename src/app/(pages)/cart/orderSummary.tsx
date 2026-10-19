
import { ICart } from "@/types/cart";
import Link from "next/link";
import { ArrowRight} from "lucide-react";

export default function OrderSummary({ cartData }: { cartData : ICart }) {
  const subtotal = cartData.data.products.reduce(
    (total, product) => total + product.price * product.count,
    0,
  );
  return (
<>

<div className="col-span-12 self-start lg:col-span-4">
  <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

    {/* Heading */}
    <h2 className="text-xl font-bold text-gray-900">
      Order Summary
    </h2>

    <p className="mt-2 mb-6 text-sm text-gray-500">
      {cartData.numOfCartItems} items in your cart
    </p>

    {/* Price Details */}
    <div className="space-y-4">

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-gray-500">
          Subtotal
        </span>
        <span className="font-semibold text-gray-900">
          {cartData.data.totalCartPrice} EGP
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-gray-500">
          Shipping
        </span>
        <span className="text-sm font-semibold text-primary">
          Free
        </span>
      </div>

    </div>

    {/* Total */}
    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">
      <span className="text-base font-bold text-gray-900">
        Total
      </span>

      <span className="text-xl font-bold text-primary">
        {cartData.data.totalCartPrice} EGP
      </span>
    </div>

    {/* Checkout Button */}
    <Link
      href="/checkout"
      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-center font-semibold text-white shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      Proceed to Checkout
      <ArrowRight className="h-5 w-5 shrink-0" />
    </Link>

    {/* Secure Checkout Note */}


  </div>
</div>

</>
  )
}
