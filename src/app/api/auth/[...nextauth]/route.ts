import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);     //export this as both get and post as next auth need it

export {handler as GET , handler as POST};