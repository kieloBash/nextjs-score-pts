"use client";
import { fetchPlayers } from "@/lib/actions/game";
import { useQuery } from "@tanstack/react-query";

const usePlayers = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`players`],
    queryFn: async () => {
      const players = await fetchPlayers();

      return players;
    },
  });
  return { data, isLoading };
};

export default usePlayers;
