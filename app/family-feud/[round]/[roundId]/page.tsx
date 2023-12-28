"use client";
import React from "react";

import useSingleFeudRounds from "@/hooks/useSingleFeudRounds";

const GameRoundPage = ({
  params,
}: {
  params: { round: number; roundId: string };
}) => {
  const { roundId, round: roundNum } = params;
  const round = useSingleFeudRounds({ id: roundId });
  console.log(round);

  return (
    <div className="relative flex flex-col items-center justify-between w-full h-full"></div>
  );
};

export default GameRoundPage;
