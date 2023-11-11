import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    firebaseToke?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
