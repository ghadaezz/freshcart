"use client"

import Image from "next/image";
import { Minus, Plus,  Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { cartContext } from "@/context/cartContext";
import { ICart, ICartProduct } from "@/types/cart";
import { removeCartProduct, UpdateProductQuantity } from "@/actions/cart.action";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function CartItem({ product, setProducts, setCartData }: { product: ICartProduct; setProducts: (products: ICartProduct[]) => void; setCartData: (cart: ICart) => void }) {
  const { handleCart } = useContext(cartContext) as { handleCart: () => void };
  const [isLoading, setIsLoading] = useState(false);
  async function removeProduct (){
    try {
      setIsLoading(true)
      const data = await removeCartProduct(product.product._id)
      toast.success ("product removed successfully")
    

      setProducts(data.data.products)
handleCart()
    } catch (error) {
      toast.error ("error")
    }finally{
      setIsLoading(false)
    }
  }




  async function updateProduct (count: number){
    try {
      const data = await UpdateProductQuantity(product.product._id , count)
      toast.success ("product count changed")
      setCartData(data)
   setProducts(data.data.products)
handleCart()
    } catch (error) {
      toast.error ("error")
    } finally{
      setIsLoading(false)
    }
  }





  return (
<>          <div className="flex justify-between items-center border-b pb-4 mb-4">



        <div className="w-full min-w-0 ">

          {/* Cart Header */}


          {/* Product 1 */}

        {isLoading ? <>
        <div className="text-center ">
          Loading... <Spinner className="inline 5xl"/>
        </div>
        </> : <>
                  <div className="flex w-full min-w-0 flex-col sm:flex-row items-center gap-5 border-b py-6 px-4 shadow rounded ">

            {/* Image */}
            <div className="relative w-full sm:w-32 h-32 shrink-0">
              <Image src={product.product.imageCover}
                alt="Product"
                fill
                className="object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0 w-full flex flex-col justify-between">

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {product.product.category.name}
                </p>

                <h3 className="font-semibold text-lg line-clamp-2 ">
               {product.product.title}
                </h3>

                <p className="text-primary font-bold mt-2">
                  {product.price} EGP
                </p>
              </div>

              <button  onClick={removeProduct} className="w-8 h-8  rounded flex items-center justify-center">
                <Trash2Icon className="w-4 h-4 text-red-500 " />
                
              </button>

            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 self-center ">

              <button className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
            disabled={product.count <= 1}    onClick={() => {
                updateProduct(product.count -1)
              }}
            
              >
              
                <Minus className="w-4 h-4" />
              </button>

              <span className="font-semibold">
               {product.count}
              </span>

              <button
               onClick={() => {
                updateProduct(product.count +1)
              }}
              className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90">
                <Plus className="w-4 h-4" />
              </button>

            </div>

          </div>
        </>}


        </div>

        

          </div>
</>
  )
}
