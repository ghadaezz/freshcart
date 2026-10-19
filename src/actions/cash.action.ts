
"use server";

import { getServerToken } from "@/lib/auth";
import { createCashOrder } from "@/services/cash.services";

export async function cashPayment(
  cartId: string,
  formData: {
    shippingAddress: {
      details: string;
      phone: string;
      city: string;
    };
  }
) {
  const token = await getServerToken();

  return await createCashOrder(cartId, formData, token);
}
