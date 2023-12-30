"use client";
import useSingleBonusFeudRounds from "@/hooks/useSingleBonusFeudRounds";
import { Check, Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Allen from "/public/pics/allen.png";
import Kielo from "/public/pics/kielo.png";
import Klark from "/public/pics/klark.png";
import Perry from "/public/pics/perry.png";
import Ashton from "/public/pics/ashton.png";
import Leanne from "/public/pics/leanne.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useBonusFeudRounds from "@/hooks/useFeudBonusRounds";
import { updateBonusGuessFeud } from "@/lib/actions/game";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const reset = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
const resetBool: (boolean | undefined)[][] = [
  [undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined],
];

const BonusFeudRoundPage = ({ params }: { params: { round: string } }) => {
  const bonus = useSingleBonusFeudRounds({ id: params.round });
  const [playerGuess, setPlayerGuess] = useState(reset);
  const [playerScore, setPlayerScore] = useState(resetBool);

  const [updated, setUpdated] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const bonus_rounds = useBonusFeudRounds();
  const loseIdRound = bonus_rounds.data?.find((round) => {
    return round.doubled === false;
  });

  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    console.log(playerGuess);
    console.log(playerScore);
    setPlayerGuess(reset);
    setPlayerScore(resetBool);
  }, [bonus.data?.doubled]);

  async function handleNext() {
    setisLoading(true);
    const data =
      bonus.data?.playerGuesses.map((player, index) => {
        return {
          id: player.id,
          score: playerScore[index].filter((d) => d === true).length,
        };
      }) || [];
    const res = await updateBonusGuessFeud({ data });
    if (res) {
      setUpdated(true);
      queryClient.invalidateQueries({
        queryKey: [`feud-rounds:bonus`],
      });
      setisLoading(false);
    }
  }

  if (bonus.isLoading)
    return (
      <div className="">
        <Loader2 className="text-white animate-spin" />
      </div>
    );

  return (
    <section className="grid w-full h-full grid-cols-7 grid-rows-4 gap-4">
      <div className="flex flex-col items-center justify-center text-4xl font-black text-center text-blue-600">
        <div className="">
          {bonus.data?.doubled ? "Champion" : "Runner"} Team
        </div>
        <Button
          type="button"
          onClick={() => setShowAnswers((prev) => !prev)}
          variant={"ghost"}
        >
          {!showAnswers ? "Show Answers" : "Hide Answers"}
        </Button>
      </div>
      {bonus.data?.questions.map((q, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-center w-full h-full p-2 text-lg font-medium text-center text-white bg-blue-600 rounded-md line-clamp-5"
          >
            {showAnswers ? bonus.data?.answers[index] : q}
          </div>
        );
      })}
      <div className="grid w-full h-full grid-cols-1 grid-rows-4 row-span-4 gap-4">
        <div className="flex flex-col items-center justify-center text-4xl font-black text-center text-blue-600">
          <div className="">Points</div>
          {updated ? (
            <Link
              href={
                bonus.data?.doubled
                  ? `/family-feud/bonus/${loseIdRound?.id}`
                  : `/family-feud/bonus/finish`
              }
            >
              <Button type="button" variant={"ghost"}>
                Next
              </Button>
            </Link>
          ) : (
            <>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => {
                      handleNext();
                    }}
                  >
                    Update Scores
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        {Array(3)
          .fill([])
          .map((_, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center text-6xl font-black text-blue-600"
              >
                {playerScore[index].filter((d) => d === true).length}/5
              </div>
            );
          })}
      </div>
      {bonus.data?.playerGuesses.map((guess, pIdx) => {
        let img;
        if (guess.player?.name === "Allen") img = Allen;
        if (guess.player?.name === "Kielo") img = Kielo;
        if (guess.player?.name === "Klark") img = Klark;
        if (guess.player?.name === "Perry") img = Perry;
        if (guess.player?.name === "Ashton") img = Ashton;
        if (guess.player?.name === "Leanne") img = Leanne;
        return (
          <React.Fragment key={guess.id}>
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="relative overflow-hidden rounded-full w-36 h-36 aspect-square">
                <Image alt="Pic" src={img || ""} fill objectFit={"cover"} />
              </div>
              <h1 className="text-xl font-bold text-center text-blue-600">
                {guess.player?.name}
              </h1>
            </div>
            {Array(5)
              .fill([])
              .map((_, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-between p-4 bg-white shadow-xl"
                  >
                    <Input
                      type="text"
                      disabled={playerScore[pIdx][index] !== undefined}
                      placeholder="Guess"
                      value={playerGuess[pIdx][index]}
                      onChange={(e) => {
                        const temp = [...playerGuess];
                        temp[pIdx][index] = e.target.value;
                        setPlayerGuess(temp);
                      }}
                    />
                    {playerScore[pIdx][index] !== undefined ? (
                      <div className="font-bold">
                        {playerScore[pIdx][index] ? (
                          <div className="flex text-green-500">
                            <div className="">Correct</div>
                            <Check className="ml-2" />
                          </div>
                        ) : (
                          <div className="flex text-red-500">
                            <div className="">Incorrect</div>
                            <X className="ml-2" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-center w-full gap-2">
                          <Button
                            type="button"
                            onClick={() => {
                              const temp = [...playerScore];
                              temp[pIdx][index] = true;
                              setPlayerScore(temp);
                            }}
                            variant={"feud"}
                            className="w-10 h-10 p-1 rounded-full"
                          >
                            <Check className="w-full h-full" />
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              const temp = [...playerScore];
                              temp[pIdx][index] = false;
                              setPlayerScore(temp);
                            }}
                            variant={"feudSecondary"}
                            className="w-10 h-10 p-1 rounded-full"
                          >
                            <X className="w-full h-full" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </React.Fragment>
        );
      })}
    </section>
  );
};

export default BonusFeudRoundPage;
