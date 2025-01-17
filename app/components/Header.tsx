"use client";

import { LoginButton } from "./LoginButton";
import { useState } from "react";
import type { VmClient } from "@nillion/client-vms";
import { LogoWithQiroFinanceBlack } from "./logo-with-qiro-finance";
import { WalletModal } from "./connect-wallet/aptos-connet-wallet";

export function Header() {
  const [client, setClient] = useState<VmClient | undefined>();
  const handleClientCreated = (newClient: VmClient | undefined) => {
    setClient(newClient);
  };
  return (
    <nav className="flex h-16 items-center justify-between px-4 bg-background rounded-xl p-2 shadow-sm z-10">
      <div className="h-11 items-center grid grid-cols-1 rounded-lg">
        <LogoWithQiroFinanceBlack />
      </div>
      <div className="flex items-center gap-2">
        <>
          <LoginButton
            onClientCreated={handleClientCreated}
            isConnected={!!client}
          />
          <WalletModal />
        </>
      </div>
    </nav>
  );
}
