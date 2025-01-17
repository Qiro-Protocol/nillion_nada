"use client";

import { api } from "../lib/axios";
// import { useQuery } from "@tanstack/react-query";

export function useGlobalStats() {
  //   const {
  //     data: stats,
  //     isLoading: fetchingStats,
  //     ...rest
  //   } = useQuery({
  //     queryKey: ["GLOBAL_STATS"],
  //     queryFn: async () => {
  //       const res = await api.get(`/stats/`);
  //       return res.data as {
  //         label: string;
  //         value: string;
  //       }[];
  //     },
  //   });
  //send dummy data for now
  const stats = [
    { label: "Total Users", value: "1000" },
    { label: "Total Assets", value: "1000" },
    { label: "Total Loans", value: "1000" },
  ];
  const fetchingStats = false;
  return {
    stats,
    fetchingStats,
  };
}
