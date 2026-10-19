
import { getAllProducts } from "@/services/products.services";
import { IProduct } from "@/types/product";
import Image from "next/image";
import WishlistButton from "@/components/wishlist/WishlistButton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Plus, Star } from "lucide-react";
import Link from "next/link";
import AddProductToCartBtn from "@/components/cart/AddProductToCartBtn";

export default async function Products() {
  const data = await getAllProducts();
  console.log(data);

  const products: IProduct[] = data.data;

  return (
    <>
<div className="container mx-auto p-10 mt-16">
<h1 className="text-4xl font-bold mb-5">
Featured <span className="text-primary">Products</span>
</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
{products?.map((product) => {
return (
<div key={product._id} >
<Card className="
transation-all
duration-300
hover:shadow-lg
hover:-translate-y-1

relative mx-auto w-full max-w-sm pt-0 h-full">
<WishlistButton productId={product._id} />
<Link href={`/products/${product._id}`}>
<Image width={600} height={600}
src={product.imageCover}
alt="Event cover"
className="w-full object-cover border-b-3 border-primary"
/>

<CardHeader className="flex flex-1 flex-col">
  <p className="mb-2 text-sm text-gray-500">
    {product.category.name}
  </p>

  <CardTitle
    title={product.title}
    className="line-clamp-2 min-h-12 text-base font-semibold"
  >
    {product.title}
  </CardTitle>

  {/* Rating */}
  <div className="mt-auto flex items-center gap-1 pt-3">
    {[0, 1, 2, 3, 4].map((star) => {
      const filledStar = star < Math.floor(product.ratingsAverage);

      return (
        <Star
          key={star}
          size={16}
          className={
            filledStar
              ? "fill-yellow-500 text-yellow-500"
              : "fill-gray-300 text-gray-300"
          }
        />
      );
    })}
  </div>
</CardHeader>
</Link>


{/* <div className="flex justify-between items-center px-4 ">
<p className="text-lg font-bold text-primary">
{product.price} EGP
</p>

<AddProductToCartBtn productId={product._id} />
</div> */}
<div className="mt-auto flex items-center justify-between gap-2 px-4 pb-4">
  <p className="text-lg font-bold text-primary">
    {product.price} EGP
  </p>

  <AddProductToCartBtn
  productId={product._id}
  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary"
>
  <Plus className="h-5 w-5 text-white" />
</AddProductToCartBtn>
</div>
</Card>
</div>
);
})}
</div>
</div>
</>
);
}
