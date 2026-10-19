
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
import {  Headphones, RotateCcw, ShieldCheck, Van } from "lucide-react";
import Categories from "../../app/(pages)/categories/page";
import { Button } from "../ui/button";
export default function Hero() {
  return (
    <>
    <section className="relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[450px] mt-16">
      {/* Background Image */}
      <Image
        src="/hero.jpg"
        alt="Fresh groceries"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Green Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/95 via-green-500/70 to-green-800/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-xl text-white">
          <h1 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Fresh Products Delivered
            <br />
            to Your Door
          </h1>

          <p className="mb-6 text-lg font-medium sm:text-xl">
            Get 20% off your first order
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="flex h-14 items-center justify-center rounded-xl bg-white px-8 font-semibold text-primary transition hover:bg-gray-100"
            >
              Shop Now
            </Link>

            <Link
              href="/products"
              className="flex h-14 items-center justify-center rounded-xl border-2 border-white/50 px-8 font-semibold text-white transition hover:bg-white/20"
            >
              View Deals
            </Link>
          </div>
        </div>
      </div>
      
    </section>

          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6  px-6 bg-gray-50  py-12  ">

<Card  className="flex flex-row  items-center gap-3 p-3 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
  <Van className="h-8 w-8 shrink-0 text-primary" />

  <div className="flex flex-col">
    <h3 className="text-sm font-semibold">
      Free Shipping
    </h3>

    <p className="text-xs text-gray-500">
      Free shipping on orders over 500 EGP
    </p>
  </div>
</Card>

<Card className="flex flex-row items-center gap-3 p-3 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
  <RotateCcw  className="h-8 w-8 shrink-0 text-primary"/>

  <div className="flex flex-col">
    <h3 className="text-sm font-semibold">
      Easy Returns
    </h3>

    <p className="text-xs text-gray-500">
      Easy returns within 14 days    </p>
  </div>
</Card>

<Card className="flex flex-row items-center gap-3 p-3 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
  <ShieldCheck  className="h-8 w-8 shrink-0 text-primary"/>

  <div className="flex flex-col">
    <h3 className="text-sm font-semibold">
      Secure Payment
    </h3>

    <p className="text-xs text-gray-500">
     Your payment information is secure
   </p>
  </div>
</Card>

<Card className="flex flex-row items-center gap-3 p-3 border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
  <Headphones className="h-8 w-8 shrink-0 text-primary"/>

  <div className="flex flex-col">
    <h3 className="text-sm font-semibold">
       24/7 Support
    </h3>

    <p className="text-xs text-gray-500">
     We are here to help you anytime
   </p>
  </div>
</Card>




      </div>

      <div className="container mx-auto p-10">
<h1 className="text-4xl font-bold mb-5">
Shop <span className="text-primary">By Category</span>
</h1>
      <Categories/>
      </div>












  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 py-12">

  {/* Orange Deal Card */}
  <Card className="relative overflow-hidden border-0 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-700 p-8 text-white shadow-sm hover:shadow-lg transition-shadow duration-300">
    <div className="relative z-10 flex flex-col items-start gap-4">
   

      <h3 className="text-sm font-semibold uppercase tracking-wider">
        Deal of the Day
      </h3>

      <h2 className="text-3xl font-bold">
        Fresh Organic Fruits
      </h2>

      <p className="max-w-sm text-sm text-white/90">
        Get up to 40% off on selected organic fruits
      </p>

      <div className="flex items-center">
        <p className="text-4xl font-extrabold">40% OFF</p>
        <p className="mt-1 font-bold text-sm text-white/90">
          Use code: ORGANIC40
        </p>
      </div>
      <Button className="mt-2 bg-white text-green-700 hover:bg-green-50">
        Explore Now
      </Button>

    </div>
  </Card>

  {/* Green New Arrivals Card */}
  <Card className="relative overflow-hidden border-0 rounded-2xl bg-gradient-to-r from-orange-500 to-red-400 p-8 text-white shadow-sm hover:shadow-lg transition-shadow duration-300">
    <div className="relative z-10 flex flex-col items-start gap-4">
      

      <h3 className="text-sm font-semibold uppercase tracking-wider">
        New Arrivals
      </h3>

      <h2 className="text-3xl font-bold">
        Exotic Vegetables
      </h2>

      <p className="max-w-sm text-sm text-white/90">
        Discover our latest collection of premium vegetables
      </p>

      <div className="flex  items-center">
        <p className="text-4xl font-extrabold">25% OFF </p>
        <p className="mt-1 font-bold text-sm text-white/90">
           Use code: FRESH25
        </p>
      </div>

      <Button className="mt-2 bg-white text-orange-600 hover:bg-orange-50">
        Shop Now
      </Button>
    </div>
  </Card>

</div>


    </>
  );
}

