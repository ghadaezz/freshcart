import { LoginSchemaType, registerSchema } from "@/lib/Schema/auth.schema";
import { z } from "zod";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function signUpUser(formData: z.infer<typeof registerSchema>) {
  const response = await fetch(
    `${BASE_URL}/api/v1/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
}


export async function signInUser(formData: LoginSchemaType) {
  const response = await fetch(
    `${BASE_URL}/api/v1/auth/signin`,
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
}