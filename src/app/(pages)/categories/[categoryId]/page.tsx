import Image from "next/image";
import Link from "next/link";

import {  getProductsByCategory } from "@/services/products.services";
import { Card,  CardHeader, CardTitle } from "@/components/ui/card";
import AddProductToCartBtn from "@/components/cart/AddProductToCartBtn";
import { Plus, PlusIcon, ShoppingCart, Star } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getSpecificCategory } from "@/services/categories";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  const [categoryData, productsData] = await Promise.all([
    getSpecificCategory(categoryId),
    getProductsByCategory(categoryId),
  ]);

  const category = categoryData.data;
  const categories = productsData.data ?? [];

  return (
    <>
    <div className="bread-crumb mt-16 gap-3 p-5">
    <Breadcrumb>
      <BreadcrumbList className='text-l'>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/categories">categories</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{category?.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>


</div>
    <div className="container mx-auto px-5 py-10">

      

      {/* Brand products */}
      <h2 className="mb-6 text-2xl font-semibold">
        Products
      </h2>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map(
            (product: {
              _id: string;
              title: string;
              imageCover: string;
              price: number;
              category: { name: string };
              ratingsAverage: number;
            }) => (
              <div key={product._id} className="min-w-0"
              >
<Card className="
transation-all
duration-300
hover:shadow-lg
hover:-translate-y-1

relative mx-auto w-full max-w-sm pt-0 h-full">

<Link href={`/products/${product._id}`}>
<Image width={600} height={600}
src={product.imageCover}
alt="Event cover"
className="w-full object-cover border-b-3 border-primary"
/>

<CardHeader className="flex flex-col justify-between">
<p>{product.category.name}</p>

<CardTitle title={product.title}
className="text-l font-semibold cursor-pointer" >

{product.title.split(" ").slice(0, 3).join(" ")}
{product.title.split(" ").length > 3 ? "..." : ""}
</CardTitle>

<div className="flex">
{[0, 1, 2, 3, 4].map((star) => {
const filledStar =
star < Math.floor(product.ratingsAverage);

return (
<Star
key={star}
className={`${   filledStar ? "text-yellow-500 fill-yellow-500"
: "text-gray-500 fill-gray-500"}`} />
);
})}
</div>
</CardHeader>
</Link>


<div className="flex justify-between items-center px-4 pb-4">
<p className="text-lg font-bold text-primary">
{product.price} EGP
</p>
<AddProductToCartBtn 
  productId={product._id}
  className="h-10 w-10 rounded-full"
>
  <PlusIcon className="h-4 w-4" />
</AddProductToCartBtn>
</div>
</Card>
              </div>
            )
          )}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">
          No products found for this brand.
        </p>
      )}
    </div>
    </>
  );
}
