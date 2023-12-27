"use client";
import { GiftIcon } from "lucide-react";
import React from "react";
import { useFortuneContext } from "../context";

const Scoreboard = () => {
  const { roundScore, mistake } = useFortuneContext();

  return (
    <div className="absolute flex items-center justify-center gap-8 right-4 bottom-4">
      <div className="flex flex-col items-center justify-center text-white">
        <div className="font-black text-8xl">
          {Number(roundScore).toLocaleString()}
        </div>
        <div className="text-xl font-medium text-center">
          Round <br /> Score
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Array(3 - mistake)
          .fill([])
          .map((_, index) => {
            return <GiftIcon key={index} className="w-16 h-16 text-white" />;
          })}
      </div>
    </div>
  );
};

export default Scoreboard;
