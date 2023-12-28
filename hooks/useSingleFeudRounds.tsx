"use client";
import { fetchSingleFeudRoundId } from "@/lib/actions/game";
import { useQuery } from "@tanstack/react-query";

const useSingleFeudRounds = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`feud-rounds:${id}`],
    queryFn: async () => {
      const round = await fetchSingleFeudRoundId({ id });

      return round;
    },
  });
  return { data, isLoading };
};

export default useSingleFeudRounds;
