"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { LoginButton } from "./LoginButton";
import { useState } from "react";
import type { VmClient } from "@nillion/client-vms";

export function Header() {
  const [client, setClient] = useState<VmClient | undefined>();
  const handleClientCreated = (newClient: VmClient | undefined) => {
    setClient(newClient);
  };
  return (
    <nav className="flex h-16 items-center justify-between px-4 bg-background rounded-xl p-2 shadow-sm z-10">
      <div className="h-11 items-center bg-secondary grid grid-cols-1 rounded-lg">
        <Link href={`/`}>
          <Button className="w-full" variant={"ghost"} size="sm">
            Qiro
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <>
          <LoginButton
            onClientCreated={handleClientCreated}
            isConnected={!!client}
          />
        </>
      </div>
    </nav>
  );
}
