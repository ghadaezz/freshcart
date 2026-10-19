const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function AddProductToWishlist (productId : string , token:string){
const response = await fetch (`${BASE_URL}/api/v1/wishlist`, {
        method : "POST",
        headers :{
        token : token,
        "Content-Type" : "application/json"},
    body : JSON.stringify({productId}) })
    const data = await response.json()
    return data
}


export async function getLoggedUserWishlist ( token:string){
const response = await fetch (`${BASE_URL}/api/v1/wishlist`, {
        headers :{
        token : token}})
    const data = await response.json()
    return data
}

export async function RemoveProductFromWishlist (productId : string , token:string){
const response = await fetch (`${BASE_URL}/api/v1/wishlist/${productId}`, {
        method: "DELETE",
        headers :{
        token : token}})
    const data = await response.json()
    return data
}
