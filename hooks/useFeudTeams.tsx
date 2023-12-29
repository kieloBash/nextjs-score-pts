"use client";
import { fetchFeudTeams } from "@/lib/actions/game";
import { useQuery } from "@tanstack/react-query";

const useFeudTeams = () => {
  const { data, isLoading } = useQuery({
    queryKey: [`feud-teams`],
    queryFn: async () => {
      const teams = await fetchFeudTeams();

      const teamA = teams.find((t) => t.team === "A");
      const teamB = teams.find((t) => t.team === "B");

      return { teamA, teamB };
    },
  });
  return { data, isLoading };
};

export default useFeudTeams;
