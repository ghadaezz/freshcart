"use server"
import { getServerToken } from "@/lib/auth"
import { AddProductToWishlist, getLoggedUserWishlist, RemoveProductFromWishlist } from "@/services/wishlist.services"

export async function addToWishlist (productId :string){
        const token = await getServerToken()
        return await AddProductToWishlist(productId , token)
} 
    
export async function getUserWishlist (){
        const token = await getServerToken()
        return await getLoggedUserWishlist (token)
}

export async function removeWishlistProduct (productId :string){
        const token = await getServerToken()
        return await RemoveProductFromWishlist (productId, token)
}