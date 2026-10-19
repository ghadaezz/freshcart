"use client";
import { cashPayment } from "@/actions/cash.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Building2,
  ReceiptText,
  CreditCard,
  Banknote,
  ShieldCheck,
  LockKeyhole,
  Info,
} from "lucide-react";

import { getUserCart } from "@/actions/cart.action";
import { onlinePayment } from "@/actions/checkout.action";
import { cartContext } from "@/context/cartContext";
import { ICart, ICartProduct } from "@/types/cart";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function Checkout() {
  const [products, setProducts] = useState<ICartProduct[]>([]);
  const [cartData, setCartData] = useState<ICart | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
const router = useRouter();
  const { handleCart } = useContext(cartContext) as {
    handleCart: () => void;
  };

  useEffect(() => {
    async function loadCart() {
      try {
        const data: ICart = await getUserCart();
        setCartData(data);
        setProducts(data.data.products);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center gap-3">
        Loading checkout...
        <Spinner className="size-6" />
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <ReceiptText className="size-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link href="/products" className="text-primary underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = products.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;

 
async function handlePlaceOrder(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  try {
    setIsSubmitting(true);

    const shippingData = {
      shippingAddress: { details: address, phone, city },
    };

    // لازم يكون عندنا cart ID
    const cartId = cartData?.data?._id;

    if (!cartId) {
      throw new Error("Cart ID not found");
    }








    if (paymentMethod === "cash") {
      // Cash on Delivery
const result = await cashPayment(cartId, shippingData);
       if (result?.status === "success") {
    toast.success("Order placed successfully!");

    handleCart();

    router.push("/order-success");
  }

      // شوفي استجابة الـ API في الـ Console
    } else {
      // Online Payment
      const onlineShippingData = new FormData();
      onlineShippingData.append("details", address);
      onlineShippingData.append("phone", phone);
      onlineShippingData.append("city", city);

      const result = await onlinePayment(cartId, onlineShippingData);

      console.log("Online Payment:", result);

      if (result?.session?.url) {
        window.location.href = result.session.url;
      } else {
        throw new Error("Payment URL not found");
      }
    }
  } catch (error) {
    console.error("Checkout error:", error);
  } finally {
    setIsSubmitting(false);
  }
}


  return (
    <main className="min-h-screen bg-slate-50/70 px-4 py-8 sm:px-6 mt-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary p-2 text-white">
                <ReceiptText className="size-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Complete Your Order
              </h1>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Review your items and complete your purchase
            </p>
          </div>

          <Link
            href="/cart"
            className="flex shrink-0 items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to Cart
          </Link>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12"
        >
          <div className="space-y-5 lg:col-span-8">
            <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="bg-primary px-5 py-4 text-white">
                <h2 className="flex items-center gap-2 font-semibold">
                  <Building2 className="size-4" />
                  Shipping Address
                </h2>
                <p className="mt-1 text-xs text-white/90">
                  Where should we deliver your order?
                </p>
              </div>

              <div className="space-y-5 p-5">
                <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-700">
                  <Info className="mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Delivery Information
                    </p>
                    <p className="mt-1 text-xs">
                      Please ensure your address is accurate for smooth delivery.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center gap-3 rounded-lg border px-3 focus-within:ring-2 focus-within:ring-primary/30">
                    <Building2 className="size-4 shrink-0 text-slate-400" />
                    <input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      required
                      className="h-11 w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Street Address <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-start gap-3 rounded-lg border px-3 py-3 focus-within:ring-2 focus-within:ring-primary/30">
                    <MapPin className="mt-1 size-4 shrink-0 text-slate-400" />
                    <textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street name, building number, floor, apartment..."
                      required
                      rows={2}
                      className="w-full resize-y bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center gap-3 rounded-lg border px-3 focus-within:ring-2 focus-within:ring-primary/30">
                    <Phone className="size-4 shrink-0 text-slate-400" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01xxxxxxxxx"
                      pattern="01[0-2,5][0-9]{8}"
                      title="Enter a valid Egyptian mobile number"
                      required
                      className="h-11 w-full bg-transparent text-sm outline-none"
                    />
                  </div>

                  <p className="text-right text-xs text-muted-foreground">
                    Egyptian numbers only
                  </p>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="bg-primary px-5 py-4 text-white">
                <h2 className="flex items-center gap-2 font-semibold">
                  <CreditCard className="size-4" />
                  Payment Method
                </h2>
                <p className="mt-1 text-xs text-white/90">
                  Choose how you&apos;d like to pay
                </p>
              </div>

              <div className="space-y-3 p-5">
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition ${
                    paymentMethod === "cash"
                      ? "border-primary bg-green-50"
                      : "border-slate-200 hover:border-primary/50"
                  }`}
                >
                  <span
                    className={`rounded-lg p-3 ${
                      paymentMethod === "cash"
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Banknote className="size-5" />
                  </span>

                  <span className="flex-1">
                    <span className="block text-sm font-semibold">
                      Cash on Delivery
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Pay when your order arrives at your doorstep
                    </span>
                  </span>

                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="size-4 accent-green-600"
                  />
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition ${
                    paymentMethod === "online"
                      ? "border-primary bg-green-50"
                      : "border-slate-200 hover:border-primary/50"
                  }`}
                >
                  <span
                    className={`rounded-lg p-3 ${
                      paymentMethod === "online"
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <CreditCard className="size-5" />
                  </span>

                  <span className="flex-1">
                    <span className="block text-sm font-semibold">
                      Pay Online
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Pay securely by card
                    </span>
                  </span>

                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="size-4 accent-green-600"
                  />
                </label>

                <div className="flex items-center gap-3 rounded-lg border border-green-100 bg-green-50 p-3 text-green-700">
                  <ShieldCheck className="size-5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      Secure & Encrypted
                    </p>
                    <p className="mt-1 text-xs">
                      Your payment information is protected.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="overflow-hidden rounded-xl border bg-white shadow-sm lg:sticky lg:top-24 lg:col-span-4">
            <div className="bg-primary px-5 py-4 text-white">
              <h2 className="flex items-center gap-2 font-semibold">
                <LockKeyhole className="size-4" />
                Order Summary
              </h2>
              <p className="mt-1 text-xs">
                {products.length} product types
              </p>
            </div>

            <div className="max-h-96 space-y-3 overflow-y-auto p-4">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 rounded-xl border bg-white p-3"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={100}
                      height={100}
                      className="size-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold">
                      {item.product.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500">
                      Quantity: {item.count}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Unit Price: {item.price.toLocaleString()} EGP
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-primary">
                      {(item.price * item.count).toLocaleString()} EGP
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Total
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{subtotal.toLocaleString()} EGP</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `${shipping} EGP`}
                </span>
              </div>

              <div className="flex justify-between border-t pt-3 font-bold">
                <span>Total</span>
                <span className="text-primary">
                  {total.toLocaleString()} EGP
                </span>
              </div>

              <Button
                className="w-full bg-primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="mr-2 size-4" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}