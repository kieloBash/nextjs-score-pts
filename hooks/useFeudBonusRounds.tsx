"use client";
import { fetchBonusRounds } from "@/lib/actions/game";
import { useQuery } from "@tanstack/react-query";

const useBonusFeudRounds = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`feud-rounds:bonus`],
    queryFn: async () => {
      const rounds = await fetchBonusRounds();

      return rounds;
    },
  });
  return { data, isLoading };
};

export default useBonusFeudRounds;
