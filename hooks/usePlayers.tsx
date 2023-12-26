"use client";
import { fetchPlayers } from "@/components/temp/temp";
import { useQuery } from "@tanstack/react-query";

const usePlayers = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`players`],
    queryFn: async () => {
      const savings = await fetchPlayers();

      return savings;
    },
  });
  return { data, isLoading };
};

export default usePlayers;
