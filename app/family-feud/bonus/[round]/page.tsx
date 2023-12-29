"use client";
import useBonusFeudRounds from "@/hooks/useFeudBonusRounds";
import React, { FormEvent, useState } from "react";

import Image from "next/image";
import Allen from "/public/pics/allen.png";
import Kielo from "/public/pics/kielo.png";
import Klark from "/public/pics/klark.png";
import Perry from "/public/pics/perry.png";
import Ashton from "/public/pics/ashton.png";
import Leanne from "/public/pics/leanne.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { updateGuessFeud } from "@/lib/actions/game";
import { redirect, useRouter } from "next/navigation";

const BonusRoundGame = ({ params }: { params: { round: number } }) => {
  const rounds = useBonusFeudRounds();
  const gameRound = rounds.data?.find((d) => d.order === Number(params.round));

  let img;
  if (gameRound?.player?.name === "Allen") img = Allen;
  if (gameRound?.player?.name === "Kielo") img = Kielo;
  if (gameRound?.player?.name === "Klark") img = Klark;
  if (gameRound?.player?.name === "Perry") img = Perry;
  if (gameRound?.player?.name === "Ashton") img = Ashton;
  if (gameRound?.player?.name === "Leanne") img = Leanne;

  const [guess, setGuess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const res = await updateGuessFeud({ guess, id: gameRound?.id || "" });
    if (res) {
      setIsLoading(false);
      router.push(`/family-feud/bonus/${Number(params.round) + 1}`);
    }
  }

  if (rounds.isLoading) return <Loader2 className="text-white animate-spin" />;
  if (gameRound === undefined) redirect("/family-feud/bonus/finish");

  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-6xl font-black text-blue-600 drop-shadow-md">
        {gameRound?.question}
      </h1>
      <div className="flex flex-col items-center justify-start flex-1 w-full">
        <div
          className={`border-4 relative w-56 h-56 overflow-hidden rounded-full mt-20 mb-6 border-blue-600 shadow-lg`}
        >
          <Image alt="Pic" src={img || ""} fill objectFit={"cover"} />
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-2xl gap-4">
          <Input
            type="text"
            className="flex-1 px-4 py-8 text-2xl text-center shadow-md"
            placeholder="Enter your guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <Button
            disabled={guess === "" || isLoading}
            variant={"feud"}
            type="submit"
            className="h-full p-2 aspect-square"
          >
            {isLoading ? (
              <Loader2 className="w-full h-full animate-spin" />
            ) : (
              <Check className="w-full h-full" />
            )}
          </Button>
        </form>
        <h3 className="relative mt-6 font-black text-blue-600 text-8xl">
          + {gameRound?.price.toLocaleString()}{" "}
          {gameRound?.doubled && (
            <div className="absolute top-0 text-2xl -right-8">x2</div>
          )}
        </h3>
      </div>
    </section>
  );
};

export default BonusRoundGame;
