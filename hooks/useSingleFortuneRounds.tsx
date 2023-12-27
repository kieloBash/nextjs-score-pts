"use client";
import { fetchSingleFortuneRoundId } from "@/lib/actions/game";
import { useQuery } from "@tanstack/react-query";

const useSingleFortuneRounds = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`fortune-rounds:${id}`],
    queryFn: async () => {
      const round = await fetchSingleFortuneRoundId({ id });

      return round;
    },
  });
  return { data, isLoading };
};

export default useSingleFortuneRounds;
