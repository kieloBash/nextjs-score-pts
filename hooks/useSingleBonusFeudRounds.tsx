"use client";
import { fetchSingleBonusFeudRoundId } from "@/lib/actions/game";
import { useQuery } from "@tanstack/react-query";

const useSingleBonusFeudRounds = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`feud-rounds:bonus:${id}`],
    queryFn: async () => {
      const round = await fetchSingleBonusFeudRoundId({ id });

      return round;
    },
  });
  return { data, isLoading };
};

export default useSingleBonusFeudRounds;
