import { NFTQuerySchema, NFTWithId } from "../types/nft";
import { api } from "./axios";
import z from "zod";

export async function getNFTs(
  params?: z.infer<typeof NFTQuerySchema>,
): Promise<NFTWithId[]> {
  const res = await api.get("/nfts", {
    params,
  });
  return res.data;
}

export async function getNFTById(id: number): Promise<NFTWithId> {
  const res = await api.get(`/nfts?id=${id}`);
  return res.data;
}
