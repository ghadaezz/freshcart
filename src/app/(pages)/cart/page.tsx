"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import CartItem from "./cartItem";
import OrderSummary from "./orderSummary";
import { ClearUserCart, getUserCart } from "@/actions/cart.action";
import { useEffect, useState } from "react";
import { ICart, ICartProduct } from "@/types/cart";
import { Spinner } from "@/components/ui/spinner";

import { useContext } from "react";
import { cartContext } from "@/context/cartContext";


export default function Cart() {
const [products, setproducts] = useState<ICartProduct[]>([])
const [isLoading, setisLoading] = useState <boolean>(false)
const [cartData, setCartData] = useState <ICart | null >(null)

const { handleCart } = useContext(cartContext) as { handleCart: () => void }
async function getCart (){
  try {
    setisLoading(true)
    const data: ICart = await getUserCart()
    setCartData(data)
    setproducts(data.data.products)
     console.log(data)
  } catch (error) {
    console.log(error)
  } finally {
    setisLoading(false)
  }
}



async function ClearCart(){
  try {
    setisLoading(true)
    const data: ICart = await ClearUserCart()
    setproducts(data.data.products)
    handleCart()
     console.log(data)
  } catch (error) {
    console.log(error)
  } finally {
    setisLoading(false)
  }
}





 useEffect(() => {
  getCart()
 }, [])

 if(isLoading){
  return <>
  <div className="flex justify-center items-center h-screen">
Loading Cart ... <Spinner className="size-6"/>

  </div>
  
  </>
 }
 if(products.length == 0){
  return <>
  <div className="flex justify-center items-center h-screen">
<p>Your Cart is empty</p>

  </div>
  
  </>
 }






 
  return (
    
    <div className="container mx-auto px-4 mt-16 ">
<div className="bread-crumb py-4">
    <Breadcrumb>
      <BreadcrumbList className='text-l'>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
    
        <BreadcrumbItem>
          <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>


</div>








      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 mt-3">
        Shopping <span className="text-primary">Cart</span>
      </h1>

                  <h2 className="text-xl font-semibold">
              Cart Items
            </h2>

      <div className="grid grid-cols-12 gap-8 items-start">
      <div className="col-span-12 lg:col-span-8 ">   

        <div className="w-full min-w-0 max-h-150 overflow-y-auto pr-4 flex flex-col gap-4">
            {/* Cart Items */}
{products.map((prod: ICartProduct) => <CartItem key={prod._id} product={prod} setProducts={setproducts} setCartData = {setCartData} />)}

        </div>
            <button onClick={ClearCart} className="text-red-500 hover:text-red-600 justify-start py-5 ">
              clear all items
            </button>

</div>


        {/* Order Summary */}
{cartData && <OrderSummary cartData={cartData} />}

      </div>


      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 border-t pt-10">

        <div>
          <h3 className="font-semibold mb-2">
            Free Shipping
          </h3>
          <p className="text-sm text-gray-500">
            Free shipping on orders over 500 EGP
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            Easy Returns
          </h3>
          <p className="text-sm text-gray-500">
            Easy returns within 14 days
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            Secure Payment
          </h3>
          <p className="text-sm text-gray-500">
            Your payment information is secure
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            24/7 Support
          </h3>
          <p className="text-sm text-gray-500">
            We are here to help you anytime
          </p>
        </div>

      </div>

    </div>
  );
}

