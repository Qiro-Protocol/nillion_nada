"use client";

import { PortfolioStatCardSkelton } from "../components/skeleton-start-card";
import { fadeInUp, stagger } from "../config/animation-defaults";
import { useGlobalStats } from "../hooks/use-global-stats";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { GlobalStatCard } from "./global-stats-card";

export function GlobalStats() {
  const searchParams = useSearchParams();
  const { stats, fetchingStats } = useGlobalStats();
  if (fetchingStats) {
    return <PortfolioStatCardSkelton />;
  }
  return (
    <motion.div
      className={cn("w-full grid grid-cols-3 gap-10")}
      variants={stagger}
    >
      {stats?.map((item) => {
        return (
          <motion.div
            key={item.label}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <GlobalStatCard
              className="bg-gradient-to-br from-accent to-primary/20"
              currency=""
              label={item.label}
              value={item?.value}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
