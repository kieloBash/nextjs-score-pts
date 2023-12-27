"use client";
import SelectionCard from "@/components/fortune/global/card/selection";
import StartButton from "@/components/fortune/global/startbtn";
import WheelComponent from "@/components/wheel";
import React, { useState } from "react";

const FortuneSelection = () => {
  const [teamA, setTeamA] = useState<string[]>([]);
  const [teamB, setTeamB] = useState<string[]>([]);

  function handleUpdateTeam(turn: "A" | "B", change: string) {
    if (turn === "A") {
      setTeamA((prev) => [...prev, change]);
    } else {
      setTeamB((prev) => [...prev, change]);
    }
  }

  return (
    <div className="grid flex-1 w-full h-full grid-cols-10 grid-rows-1">
      <div className="flex flex-col items-center justify-center col-span-2 gap-4 pr-10">
        <div className="text-4xl font-bold">Team A</div>
        <div className="grid w-full h-full grid-cols-1 grid-rows-3 gap-4">
          {teamA.map((player, index) => {
            return <SelectionCard key={index} name={player} />;
          })}
          {Array(3 - teamA.length)
            .fill([])
            .map((_, index) => {
              return <Blank key={index} />;
            })}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center col-span-6">
        <WheelComponent handleUpdateTeam={handleUpdateTeam} />
        {teamA.length === 3 && teamB.length === 3 && (
          <StartButton teamA={teamA} teamB={teamB} />
        )}
      </div>
      <div className="flex flex-col items-center justify-center col-span-2 gap-4 pr-10">
        <div className="text-4xl font-bold">Team B</div>
        <div className="grid w-full h-full grid-cols-1 grid-rows-3 gap-4">
          {teamB.map((player, index) => {
            return <SelectionCard key={index} name={player} />;
          })}
          {Array(3 - teamB.length)
            .fill([])
            .map((_, index) => {
              return <Blank key={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

const Blank = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-green-700 border-4 border-black rounded-md shadow-lg shadow-red-800">
      <span className="font-black text-red-500 text-8xl">?</span>
    </div>
  );
};

export default FortuneSelection;
