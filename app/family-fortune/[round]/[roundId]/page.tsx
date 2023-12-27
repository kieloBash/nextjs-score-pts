"use client";
import ActionButtons from "@/components/fortune/global/actionbtns";
import Choices from "@/components/fortune/global/choices";
import Display from "@/components/fortune/global/display";
import QuestionDisplay from "@/components/fortune/global/question-display";
import Scoreboard from "@/components/fortune/global/scoreboard";
import WheelTurnComponent from "@/components/fortune/wheel-turn";
import useSingleFortuneRounds from "@/hooks/useSingleFortuneRounds";
import React, { useState } from "react";

const GameRoundPage = ({
  params,
}: {
  params: { round: number; roundId: string };
}) => {
  const { roundId, round: roundNum } = params;
  const round = useSingleFortuneRounds({ id: roundId });
  const [turnSelected, setTurnSelected] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-between w-full h-full">
      <QuestionDisplay question={round.data?.question || ""} />
      <div className="flex items-center justify-center flex-1">
        <Display
          answer={round.data?.answer || ""}
          price={round.data?.price || 0}
        />
      </div>
      <Choices
        answer={round.data?.answer || ""}
        price={round.data?.price || 0}
      />
      <ActionButtons
        answer={round.data?.answer || ""}
        price={round.data?.price || 0}
        roundNum={Number(roundNum)}
      />
      {!turnSelected && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <WheelTurnComponent setTurnSelected={() => setTurnSelected(true)} />
        </div>
      )}
      <Scoreboard />
    </div>
  );
};

export default GameRoundPage;
