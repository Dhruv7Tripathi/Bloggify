"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider"

type Props = {
  children: ReactNode
}

const Provider = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
};

export default Provider;