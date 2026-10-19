
import { getSpecificProduct } from '@/services/products.services';
import { IProduct } from '@/types/product';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductCarousel from '../product-carousel';

import {
  Card,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {  Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AddProductToCartBtn from '@/components/cart/AddProductToCartBtn';

export default async function ProductDetails({params} : {params : Promise <{ productId : string}>}) {
    const {productId} = await params
   
    const data = await getSpecificProduct (productId)
    const product :IProduct = data.data
   
    console.log(product)
  return (
<>
<div className="container mx-auto  px-5 mt-18">
<div className="bread-crumb">
    <Breadcrumb>
      <BreadcrumbList className='text-l'>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{product.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>


</div>




<div className="grid grid-cols-12 gap-4 pt-5">
<div className="col-span-12 lg:col-span-3">
<div className="content bg-gray-100 p-3 rounded-lg">
 <ProductCarousel images = {product.images}/>
</div>
</div>


<div className="col-span-12 lg:col-span-9">
<div className="content bg-gray-100 p-3 rounded-lg h-full">
        <Card className="relative mx-auto w-full pt-0 h-full flex flex-col">
      <div  />
      
      <CardHeader className='flex flex-col justify-between '>

    <div className='brandnameandcategory flex gap-2  '>
 <Badge className='bg-green-100 text-primary   p-4'>{product.category.name}</Badge> 
 <Badge className='bg-gray-100 text-black p-4'>{product.brand.name}</Badge> 
    </div>

      
        <CardTitle title={product.title}  className="text-3xl  font-bold cursor-pointer p-2 pt-4  ">
        
{product.title}

        </CardTitle>
    

<div className='rating p-2 pt-4 flex justify-center gap-3'>


       <div className= "flex">
{[0,1,2,3,4].map((star) => {
const filledStar = star < Math.floor(product.ratingsAverage)
return <Star  key={star} className= {`${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-500 fill-gray-500"}`}/> 
})}


       </div>

<div className='flex'>
<div className='font-light'>{product.ratingsAverage}</div>
<div className='font-light'>{`(${product.ratingsQuantity} Reviews)`} </div>
</div>

</div>

<hr />

<div className='p-2 pt-4 '>  {product.description}</div>

      </CardHeader>
      <div className=' flex justify-between items-center px-4 pb-4  '>
        
<p className='text-2xl font-bold p-2 pt-4  text-black '>
{product.price} EGP
</p> 
     
     

        
      </div>


<div  className="flex flex-col items-stretch gap-3 px-6 sm:flex-row">
<AddProductToCartBtn
  productId={productId}
  className="h-12 min-h-12 max-h-12 flex-1 rounded-md bg-primary px-4 text-lg text-white"
>
  Add to Cart
</AddProductToCartBtn>

<Button className="h-12 min-h-12 max-h-12 flex-1 rounded-md bg-blue-950 px-4 text-lg text-white hover:bg-blue-900">
  Buy Now
</Button>
</div>




      
    </Card>


</div>

</div>

</div>

 
  

  







</div>




</>
  )
}

