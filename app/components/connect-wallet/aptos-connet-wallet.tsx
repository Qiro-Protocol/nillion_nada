import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useWallet, truncateAddress } from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";
import React, { useState } from "react";

export function WalletModal() {
  const { wallets, connect, connected, account } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const [connectedConnectorIcon, setConnectedConnectorIcon] = useState<
    string | undefined
  >(undefined);

  return connected && account ? (
    <Button
      className="gap-2 justify-start min-w-[120px] rounded-xl"
      variant={"outline"}
    >
      <img className="size-6" src={connectedConnectorIcon} />
      {truncateAddress(account?.address)}
    </Button>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-2 justify-start min-w-[120px] rounded-xl"
          variant={"outline"}
        >
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-2 py-4">
          {wallets?.map((wallet) => (
            <Button
              key={wallet.name}
              onClick={() => {
                connect(wallet.name);
                setIsOpen(false);
                setConnectedConnectorIcon(wallet.icon);
              }}
              className="justify-between rounded-xl px-4 py-7 text-base font-semibold"
              variant="outline"
            >
              <span>{wallet.name}</span>
              <Image
                src={wallet.icon}
                alt={`${wallet.name} icon`}
                width={24}
                height={24}
              />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
