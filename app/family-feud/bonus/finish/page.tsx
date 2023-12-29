"use client";
import useBonusFeudRounds from "@/hooks/useFeudBonusRounds";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Allen from "/public/pics/allen.png";
import Kielo from "/public/pics/kielo.png";
import Klark from "/public/pics/klark.png";
import Perry from "/public/pics/perry.png";
import Ashton from "/public/pics/ashton.png";
import Leanne from "/public/pics/leanne.png";

// UI
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { updateDoneBonusRoundFeud } from "@/lib/actions/game";

const reset = [false, false, false, false, false, false];
const statusDefault = [
  "guessing",
  "guessing",
  "guessing",
  "guessing",
  "guessing",
  "guessing",
];
const FeudBonusFinishPage = () => {
  const rounds = useBonusFeudRounds();
  const [shownArr, setShownArr] = useState(reset);
  const [statusArr, setStatusArr] = useState(statusDefault);
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  function handleShow(index: number) {
    let temp = [...shownArr];
    temp[index] = true;
    setShownArr(temp);
  }

  async function handleResult() {
    setisLoading(true);
    const data =
      rounds?.data
        ?.map((round, index) => {
          return {
            name: round.player?.name || "",
            id: round.playerId || "",
            prevScore: round.player?.score || 0,
            amount: round.doubled
              ? Number(round.price) * 2
              : Number(round.price),
            correct: statusArr[index] === "correct" ? true : false,
          };
        })
        .filter((d) => d !== undefined) || [];
    const res = await updateDoneBonusRoundFeud({ data });
    if (res) {
      router.push("/");
      setisLoading(false);
    }
  }

  // AUDIO
  const incorrectRef = useRef<HTMLAudioElement | null>(null);
  const correctRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (incorrectRef.current) {
      incorrectRef.current.autoplay = false;
    }
    if (correctRef.current) {
      correctRef.current.autoplay = false;
    }
  }, []);
  function playCorrect() {
    if (correctRef.current) {
      correctRef.current.currentTime = 0;
      correctRef.current.play();
    }
  }
  function playIncorrect() {
    if (incorrectRef.current) {
      incorrectRef.current.currentTime = 0;
      incorrectRef.current.play();
    }
  }

  if (rounds.isLoading) return <Loader2 className="text-white animate-spin" />;

  return (
    <>
      {!statusArr.some((s) => s === "guessing") && (
        <div className="absolute top-10 left-10">
          <Button
            disabled={isLoading}
            variant={"feud"}
            type="button"
            onClick={handleResult}
          >
            Go Back to Main Menu
          </Button>
        </div>
      )}
      <div className="hidden">
        <audio
          ref={incorrectRef}
          src={"/assets/sfx/incorrect.mp3"}
          autoPlay={false}
        />
        <audio
          ref={correctRef}
          src={"/assets/sfx/correct.mp3"}
          autoPlay={false}
        />
      </div>
      <section className="flex flex-col items-center justify-center w-full h-full">
        <Carousel className="w-full max-w-2xl">
          <CarouselContent>
            {rounds.data?.map((round, index) => {
              const player = round.player;
              let img;
              if (player?.name === "Allen") img = Allen;
              if (player?.name === "Kielo") img = Kielo;
              if (player?.name === "Klark") img = Klark;
              if (player?.name === "Perry") img = Perry;
              if (player?.name === "Ashton") img = Ashton;
              if (player?.name === "Leanne") img = Leanne;
              return (
                <CarouselItem key={index}>
                  <Card
                    className="h-[36rem] p-10 shadow-lg rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 relative"
                    key={round.id}
                  >
                    <CardContent>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="text-2xl font-bold text-center text-white">
                          {round.question}
                        </div>
                        <div
                          className="relative w-40 h-40 overflow-hidden border-4 rounded-full shadow-lg"
                          key={player?.id}
                        >
                          <Image
                            alt="Pic"
                            src={img || ""}
                            fill
                            objectFit={"cover"}
                          />
                        </div>
                        <div className="flex items-center justify-center gap-8 mt-4 text-4xl text-white">
                          <Label className="text-3xl">Guess:</Label>
                          <div>{round.playerGuess}</div>
                        </div>
                        <div className="relative flex items-center justify-center w-full p-4 mt-6 overflow-hidden rounded-xl">
                          {!shownArr[index] && (
                            <button
                              type="button"
                              onClick={() => {
                                handleShow(index);
                              }}
                              className="absolute z-[100] w-full h-full bg-white/30 backdrop-blur-lg"
                            />
                          )}
                          <div className="text-5xl font-black text-center text-white">
                            {round.answer}
                          </div>
                        </div>
                        {statusArr[index] === "guessing" ? (
                          <>
                            <div className="flex items-center justify-center gap-4 mt-8">
                              <button
                                type="button"
                                onClick={() => {
                                  playCorrect();
                                  const temp = [...statusArr];
                                  temp[index] = "correct";
                                  setStatusArr(temp);
                                  handleShow(index);
                                }}
                                className="w-16 h-16 p-2 overflow-hidden text-white transition-colors duration-100 bg-green-500 border-4 border-transparent rounded-full hover:border-white"
                              >
                                <Check className="w-full h-full" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  playIncorrect();
                                  const temp = [...statusArr];
                                  temp[index] = "incorrect";
                                  setStatusArr(temp);
                                  handleShow(index);
                                }}
                                className="w-16 h-16 p-2 overflow-hidden text-white transition-colors duration-100 bg-red-500 border-4 border-transparent rounded-full hover:border-white"
                              >
                                <X className="w-full h-full" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <h3 className="w-full mt-8 text-6xl font-bold text-center text-white underline capitalize drop-shadow-lg">
                            {statusArr[index]}
                          </h3>
                        )}

                        <div className="absolute flex items-center justify-center gap-2 text-2xl font-medium text-white bottom-10 right-10">
                          <div className="">
                            + {round.price.toLocaleString()}{" "}
                          </div>
                          {round.doubled && (
                            <div className="flex items-center justify-center w-8 h-8 p-1 text-lg bg-yellow-500 rounded-full">
                              2
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex items-center justify-center gap-4"></div>
      </section>
    </>
  );
};

export default FeudBonusFinishPage;
