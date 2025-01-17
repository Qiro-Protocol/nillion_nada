"use client";
import { Header } from "../components/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { GlobalStats } from "../components/AppStats";
import { NFTListing } from "../components/nft-listing";

const NILLION_CONFIG = {
  title: "NFTs",
  description: "Underwrite the NFTs with the Nillion protocol.",
};

export default function Qiro() {
  return (
    <main className="flex flex-col gap-y-6 h-screen">
      <GlobalStats />
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{NILLION_CONFIG.title}</CardTitle>
          <CardDescription>{NILLION_CONFIG.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <NFTListing />
        </CardContent>
      </Card>
    </main>
  );
}
