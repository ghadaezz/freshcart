
import Image from "next/image";

import { Card} from "@/components/ui/card";
import Link from "next/link";
import { getAllBrands } from "@/services/brands.services";

export default async function Brands() {
  const data = await getAllBrands();
  console.log(data);

  const Brands = data.data;

  return (
    <>
<div className="container mx-auto p-10">



<div className="grid grid-cols-12 gap-5 mt-16">
{Brands?.map((brand: { _id: string; image: string;  name: string; slug: string }) => {
return (
<div key={brand._id} className="col-span-6 sm:col-span-6 lg:col-span-2">
<Card className="
transation-all
duration-300
hover:shadow-lg
hover:-translate-y-1
mx-auto w-full max-w-sm pt-0 h-full">

<Link   className=" group flex flex-col items-center p-4"
 href={`/brands/${brand._id}`}>
<Image 
alt='' width={400} height={400}
src={brand.image}
className="- transition-transform duration-300
- group-hover:scale-105 w-32 h-32 bg-gray-100 border-0 rounded object-contain mx-auto p-4 "
/>
<p className=" - transition-colors duration-300
- group-hover:text-purple-500 text-l text-center font-semibold cursor-pointer pt-4">{brand.name}</p>

</Link>



</Card>
</div>
);
})}
</div>
</div>
</>
);
}
