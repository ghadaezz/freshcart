"use client";

import Link from "next/link";


import { Logo } from "./logo";






export default function Footer() {


  return (
    <footer
      className="mt-16 bg-linear-to-br from-[#1a1c23] to-[#242730] text-white"
    >
      {/* Footer Content */}
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* معلومات الموقع */}
          <div className="lg:col-span-4">
<Logo />

            <p className="mb-6 leading-8 text-gray-400">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience
            </p>




          </div>

          {/* shop*/}
          <div className="lg:col-span-2 ">
            <h3 className="relative mb-6 inline-block text-xl font-semibold after:absolute after:-bottom-2 after:right-0 after:h-0.5 ">
             Shop
            </h3>

 <ul className="space-y-4  text-gray-400 ">

<li className=" hover:text-primary">
  <Link  href="/products">
    All products
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="/categories">
    Categories
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="/brands">
    Brands
  </Link>
</li>

            </ul>
          </div>

          {/* Account*/}
          <div className="lg:col-span-2">
            <h3 className="relative mb-6 inline-block text-xl font-semibold after:absolute after:-bottom-2 after:right-0 after:h-0.5 ">
              Account
            </h3>

            <ul className="space-y-4  text-gray-400">
 <li  className=" hover:text-primary">
  <Link href="#">
    My account
  </Link>
</li>
<li  className="hover:text-primary">
  <Link href="#">
    Order history
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Wishlist
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Shopping cart
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Sign in
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Create account 
  </Link>
</li>
            </ul>
          </div>
          {/* Account*/}
          <div className="lg:col-span-2">
            <h3 className="relative mb-6 inline-block text-xl font-semibold after:absolute after:-bottom-2 after:right-0 after:h-0.5 ">
              Support
            </h3>

            <ul className="space-y-4  text-gray-400">
 <li  className=" hover:text-primary">
  <Link href="#">
    Contact us
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Help center
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Shopping info
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Shopping cart
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Returnings & Refunds
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Track order 
  </Link>
</li>
            </ul>


          </div>
                  {/* legal*/}
          <div className="lg:col-span-2">
            <h3 className="relative mb-6 inline-block text-xl font-semibold after:absolute after:-bottom-2 after:right-0 after:h-0.5 ">
             Legal
            </h3>

            <ul className="space-y-4  text-gray-400">
 <li  className=" hover:text-primary">
  <Link href="#">
    Privacy policy
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Terms of service
  </Link>
</li>
<li  className=" hover:text-primary">
  <Link href="#">
    Cookie policy
  </Link>
</li>

            </ul>
          </div>
        
        </div>
      </div>

      {/* الجزء السفلي */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-6 py-5 text-center text-sm text-gray-400 md:grid-cols-2 md:text-left">
          <p>© 2026 FreshCart. All rights reserved.

</p>

 
        
        </div>
      </div>
    </footer>
  );
}