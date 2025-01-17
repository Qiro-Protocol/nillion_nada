"use client";

import { NoData } from "../components/no-data";
import { SkeletonTable } from "../components/skeleton-table";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { getNFTs } from "../lib/get-nfts";

const NFTTable = dynamic(
  () => import("../components/nft-table").then((mod) => mod.NFTTable),
  {
    ssr: false,
    loading: () => <SkeletonTable />,
  },
);

export function NFTListing() {
  const { data: nfts } = useQuery({
    queryKey: ["NFTs"],
    queryFn: async () => await getNFTs(),
  });

  if (!nfts?.length) {
    return (
      <NoData
        description={"No NFTs are here to display"}
        title="No NFTs are here to display"
      />
    );
  }

  return (
    <Suspense fallback={<SkeletonTable />}>
      <NFTTable data={nfts} />
    </Suspense>
  );
}
