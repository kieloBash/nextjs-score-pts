"use client";
import useBonusFeudRounds from "@/hooks/useFeudBonusRounds";
import React, { useState } from "react";

import Image from "next/image";
import Allen from "/public/pics/allen.png";
import Kielo from "/public/pics/kielo.png";
import Klark from "/public/pics/klark.png";
import Perry from "/public/pics/perry.png";
import Ashton from "/public/pics/ashton.png";
import Leanne from "/public/pics/leanne.png";

import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { addScore } from "@/lib/actions/game";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const BonusFeudFinishPage = () => {
  const bonus_rounds = useBonusFeudRounds();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  async function handleUpdate() {
    setisLoading(true);

    // Map over the bonus rounds and return an array of promises
    const promises: any = bonus_rounds.data?.map((round) =>
      Promise.all(
        round.playerGuesses.map(async (guess) => {
          const priceToAdd = round.doubled
            ? round.price * 2 * guess.score
            : guess.score * round.price;

          const res = await addScore({
            id: guess.player?.id || "",
            points: priceToAdd,
          });
        })
      )
    );

    // Wait for all the promises to resolve
    await Promise.all(promises);

    setisLoading(false);
    queryClient.invalidateQueries({
      queryKey: ["players"],
    });
    router.push("/");
  }

  return (
    <>
      <div className="absolute top-10 left-10">
        <Button
          disabled={isLoading}
          variant={"feud"}
          type="button"
          onClick={handleUpdate}
        >
          Go Back to Menu
        </Button>
      </div>
      <section className="relative flex flex-col items-center justify-center w-full gap-8 text-blue-600">
        <h1 className="text-6xl font-black drop-shadow-sm">Final Score</h1>
        <div className="grid w-full grid-cols-6 grid-rows-1">
          {bonus_rounds.data?.map((round) => {
            return round.playerGuesses.map((guess) => {
              const priceToAdd = round.doubled
                ? round.price * 2 * guess.score
                : guess.score * round.price;
              const player = guess.player;
              let img;
              if (player?.name === "Allen") img = Allen;
              if (player?.name === "Kielo") img = Kielo;
              if (player?.name === "Klark") img = Klark;
              if (player?.name === "Perry") img = Perry;
              if (player?.name === "Ashton") img = Ashton;
              if (player?.name === "Leanne") img = Leanne;
              return (
                <div
                  key={round.id}
                  className="flex flex-col items-center justify-center w-full h-full gap-4"
                >
                  <h2 className="text-4xl font-medium">{guess.player?.name}</h2>

                  <p className="">{guess.score}/5</p>
                  <p className="-mt-4 text-lg font-bold">
                    {round.doubled ? round.price * 2 : round.price} x{" "}
                    {guess.score}
                  </p>
                  <div className="relative w-32 h-32 overflow-hidden rounded-full">
                    <Image alt="Pic" src={img || ""} fill objectFit={"cover"} />
                  </div>
                  <div className="flex-1">
                    <CountUp
                      delay={1}
                      duration={5}
                      start={guess.player?.score}
                      end={(guess.player?.score || 0) + priceToAdd}
                      className="text-5xl font-bold drop-shadow-lg"
                    />
                  </div>
                </div>
              );
            });
          })}
        </div>
      </section>
    </>
  );
};

export default BonusFeudFinishPage;
