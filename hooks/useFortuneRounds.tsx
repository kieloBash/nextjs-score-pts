"use client";
import { fetchFortuneRounds } from "@/lib/actions/game";
import { useQuery } from "@tanstack/react-query";

const useFortuneRounds = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`fortune-rounds`],
    queryFn: async () => {
      const rounds = await fetchFortuneRounds();

      return rounds;
    },
  });
  return { data, isLoading };
};

export default useFortuneRounds;
