"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

//this will be used to provide session info to all the clients
//access it directly using useSession   -> otherwise it gives null value
//but only for client side , on server side it is already available