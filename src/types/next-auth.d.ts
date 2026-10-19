import { DefaultSession } from "next-auth";

interface IUserData {
  name: string;
  role: string;
  email: string;
}

declare module "next-auth" {
  interface User {
    user: IUserData;
    token: string;
  }

  interface Session {
    user: IUserData;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUserData;
    token: string;
  }
}

