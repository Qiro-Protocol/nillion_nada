import { z } from "zod";

export const NFTQuerySchema = z.object({
  asset_turnover: z.number(),
  cap_leverage: z.number(),
  current_ratio: z.number(),
  debt_equity: z.number(),
  ebitda_revenue: z.number(),
  interest_coverage: z.number(),
  liquidity_ratio: z.number(),
  net_interest_income: z.number(),
  profit_margin: z.number(),
  roa: z.number(),
  roe: z.number(),
});

export type NFTWithId = z.infer<typeof NFTQuerySchema> & {
  id: number;
};
