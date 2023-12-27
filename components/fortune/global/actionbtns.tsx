"use client";
import React from "react";
import { useFortuneContext } from "../context";
import { updateFortuneTeamScore } from "@/lib/actions/game";
import { useRouter } from "next/navigation";

const ActionButtons = ({
  answer,
  price,
  roundNum,
}: {
  answer: string;
  price: number;
  roundNum: number;
}) => {
  const { setGuessed, setRoundScore, roundScore, turn } = useFortuneContext();
  const router = useRouter();
  function count(str: string): number {
    return str.replace(/ /g, "").length;
  }

  return (
    <div className="absolute flex flex-col gap-4 left-4 bottom-4">
      <button
        type="button"
        onClick={() => {
          const ALPHABET = Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode("A".charCodeAt(0) + i)
          );
          setGuessed(ALPHABET);
          setRoundScore(Number(count(answer)) * price);
        }}
        className="px-8 py-2 text-2xl font-bold text-center text-white bg-green-500 border-2 border-white rounded-full"
      >
        Guess
      </button>
      <button
        type="button"
        className="px-8 py-2 text-2xl font-bold text-center text-white bg-red-500 border-2 border-white rounded-full"
        onClick={() => window.location.reload()}
      >
        Reset
      </button>
      <button
        type="button"
        onClick={async () => {
          const res = await updateFortuneTeamScore({
            teamName: turn || "",
            points: roundScore,
          });
          if (res) {
            router.push(`/family-fortune/${roundNum+1}`);
          }
        }}
        className="px-8 py-2 text-2xl font-bold text-center text-red-500 bg-white border-2 border-white rounded-full"
      >
        Next Round
      </button>
    </div>
  );
};

export default ActionButtons;
