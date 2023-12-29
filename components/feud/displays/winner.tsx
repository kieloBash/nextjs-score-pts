"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import CountUp from "react-countup";

// UI
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateWinFeud } from "@/lib/actions/game";
const WinnerDisplay = ({
  winner,
  finalScore,
  roundNum,
  answers,
  scores,
  roundId,
}: {
  winner: "A" | "B";
  finalScore: number;
  roundNum: number;
  answers: string[];
  scores: number[];
  roundId: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function handleNext() {
    setIsLoading(true);
    const res = await updateWinFeud({ id: roundId, winner, price: finalScore });
    console.log(res);
    if (res) {
      setIsLoading(false);
      router.push(`/family-feud/${Number(roundNum) + 1}`);
    }
  }
  return (
    <section className="fixed inset-0 backdrop-blur-sm bg-white/20 p-6 flex justify-center items-center z-[100]">
      <div className="relative flex flex-col items-center justify-center w-full h-full text-white rounded-lg shadow-2xl bg-gradient-to-r from-blue-600 to-violet-600">
        <h4 className="text-xl">Round {roundNum} Winner</h4>
        <h1 className="font-black text-8xl">Team {winner}</h1>
        <CountUp
          delay={1}
          duration={5}
          end={finalScore}
          className="font-bold drop-shadow-lg text-[20rem] leading-none cursor-default"
        />
        <Button
          disabled={isLoading}
          variant={"outline"}
          type="button"
          onClick={handleNext}
          className="absolute text-xl text-blue-700 bottom-10 right-10"
        >
          Next Round <ArrowRightIcon className="ml-2" />{" "}
          {isLoading && <Loader2 className="animate-spin" />}
        </Button>
        <HoverCard>
          <HoverCardTrigger className="absolute cursor-pointer bottom-10 left-10">
            Show Answers
          </HoverCardTrigger>
          <HoverCardContent>
            {answers?.map((answer, index) => {
              return (
                <li className="list-decimal" key={index}>
                  {answer} - {scores[index]}
                </li>
              );
            })}
          </HoverCardContent>
        </HoverCard>
      </div>
    </section>
  );
};

export default WinnerDisplay;
