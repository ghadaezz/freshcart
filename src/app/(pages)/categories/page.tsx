
import Image from "next/image";

import { Card} from "@/components/ui/card";
import Link from "next/link";
import { getAllCategories } from "@/services/categories";

export default async function Brands() {
  const data = await getAllCategories();
  console.log(data);

  const categories = data.data;

  return (
    <>
<div className="container mx-auto p-10">



<div className="grid grid-cols-12 gap-5 mt-16">
{categories?.map((category: { _id: string; image: string;  name: string; slug: string }) => {
return (
<div key={category._id} className="col-span-6 sm:col-span-6 lg:col-span-2">
<Card className="
transation-all
duration-300
hover:shadow-lg
hover:-translate-y-1
mx-auto w-full max-w-sm pt-0 h-full">

<Link   className=" group flex flex-col items-center p-4"
 href={`/categories/${category._id}`}>
<Image 
alt='' width={400} height={400}
src={category.image}
className="- transition-transform duration-300
- group-hover:scale-105 w-32 h-32 rounded object-contain mx-auto "
/>
<p className=" - transition-colors duration-300
- group-hover:text-primary text-l text-center font-semibold cursor-pointer pt-4">{category.name}</p>

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
