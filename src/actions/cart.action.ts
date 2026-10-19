"use server"

import { getServerToken } from "@/lib/auth"
import { AddProductToCart, clearLoggeddUserCart, getLoggedUserCart, RemoveProductFromCart, UpdateCartProductQuantity } from "@/services/cart.services"

export async function addToCart (productId :string){
        const token = await getServerToken()
        return await AddProductToCart(productId , token)
} 
    
export async function getUserCart (){
        const token = await getServerToken()
        return await getLoggedUserCart (token)
}

export async function removeCartProduct (productId :string){
        const token = await getServerToken()
        return await RemoveProductFromCart (productId, token)
}



export async function UpdateProductQuantity (productId :string , count:number){
        const token = await getServerToken()
        return await UpdateCartProductQuantity  (productId, count,token)
}



export async function ClearUserCart (){
        const token = await getServerToken()
        return await clearLoggeddUserCart  ( token)
}