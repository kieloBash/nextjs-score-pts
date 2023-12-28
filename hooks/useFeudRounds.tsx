"use client";
import { fetchFeudRounds } from "@/lib/actions/game";
import { useQuery } from "@tanstack/react-query";

const useFeudRounds = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`feud-rounds`],
    queryFn: async () => {
      const rounds = await fetchFeudRounds();

      return rounds;
    },
  });
  return { data, isLoading };
};

export default useFeudRounds;
