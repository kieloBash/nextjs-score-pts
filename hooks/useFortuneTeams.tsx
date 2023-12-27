"use client";
import { fetchFortuneTeams } from "@/lib/actions/game";
import { useQuery } from "@tanstack/react-query";

const useFortuneTeams = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`fortune-teams`],
    queryFn: async () => {
      const teams = await fetchFortuneTeams();

      const teamA = teams.find((t) => t.team === "A");
      const teamB = teams.find((t) => t.team === "B");

      return { teamA, teamB };
    },
  });
  return { data, isLoading };
};

export default useFortuneTeams;
