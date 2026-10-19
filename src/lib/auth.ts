

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getServerToken() {
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!sessionToken) {
    throw new Error("You must be logged in to perform this action");
  }

  const decodedToken = await decode({
    token: sessionToken,
    secret: process.env.AUTH_SECRET!,
  });

  if (!decodedToken?.token) {
    throw new Error("Invalid session. Please log in again.");
  }

  return decodedToken.token as string;
}
