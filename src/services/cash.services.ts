
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function createCashOrder(
  cartId: string,
  formData: {
    shippingAddress: {
      details: string;
      phone: string;
      city: string;
    };
  },
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create cash order");
  }

  return data;
}
