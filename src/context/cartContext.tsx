"use client"
import { getUserCart } from '@/actions/cart.action'
import { ICart } from '@/types/cart'
import { useSession } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'
export const cartContext = createContext({})
export default function CartContextProvider({children} : {children :React.ReactNode }) {

    const{status} = useSession()

    const [noOfCartItems, setnoOfCartItems] = useState(0)
    async function handleCart(){
        const data : ICart = await getUserCart()
        const totalCount = data.data.products.reduce((accu , prod) => prod.count + accu ,0 )

        setnoOfCartItems(totalCount)
    }

useEffect(() => {
if(status == "authenticated") {
  void Promise.resolve().then(handleCart)
}
}, [status])


  return (
<>
<cartContext.Provider value = {{noOfCartItems , handleCart}}>
{children}
</cartContext.Provider>
</>
  )
}
