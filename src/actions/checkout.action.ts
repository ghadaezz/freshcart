"use server"

import { getServerToken } from "@/lib/auth"
import { onlineCheckout } from "@/services/checkout.services"

export async function onlinePayment (cartId : string , formData: FormData ){
        const token = await getServerToken()
        return await onlineCheckout(cartId, Object.fromEntries(formData.entries()), token)
} 