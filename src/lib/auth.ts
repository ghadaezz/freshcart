

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getServerToken() {
  const cookieStore = await cookies();

  console.log("ALL COOKIES:", cookieStore.getAll());

  const sessionToken = cookieStore.get("next-auth.session-token")?.value;
  if(!sessionToken){
    throw new Error ("You must have an account")
  }

  console.log("SESSION TOKEN EXISTS:", !!sessionToken);

  const decodedToken = await decode({
    token: sessionToken,
    secret: process.env.AUTH_SECRET!,
  });

  console.log("DECODED TOKEN:", decodedToken);
  console.log("API TOKEN EXISTS:", !!decodedToken?.token);

  return decodedToken?.token as string;
}