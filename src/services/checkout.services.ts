const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function onlineCheckout (cartId : string , formData: Record<string, unknown> , token:string){
const response = await fetch (`${BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
        method : "POST",
        headers :{
        token : token,
        "Content-Type" : "application/json"},
    body : JSON.stringify({formData}) })
    const data = await response.json()
    return data
}
