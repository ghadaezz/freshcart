
import { signInUser } from "@/services/auth.services";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const data = await signInUser({
          email: credentials.email,
          password: credentials.password,
        });

        if (data.message !== "success") {
          return null;
        }

        return {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          user: data.user,
          token: data.token,
        };
      },
    }),
  ],

callbacks: {
  jwt({ token, user }) {
    if (user) {
      token.user = "user" in user ? user.user : user;
      token.token = user.token;
    }

    return token;
  },

  session({ session, token }) {
    session.user = token.user;

    return session;
  },
},
};

