"use client";

import { type ReactNode, useState } from "react";
import { AppQueryClientProvider } from "./react-query-provider";
import { AptosWalletProvider } from "./aptos-provider";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <AppQueryClientProvider>
      <AptosWalletProvider>{children}</AptosWalletProvider>
    </AppQueryClientProvider>
  );
}
