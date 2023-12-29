"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useFortuneContext } from "../context";
// import { updateFortuneTeamScore } from "@/lib/actions/game";
import { useRouter } from "next/navigation";

const Choices = ({
  answer,
  price,
  roundNum,
}: {
  answer: string;
  price: number;
  roundNum: number;
}) => {
  const ALPHABET = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );

  const router = useRouter();
  const [steal, setSteal] = useState(false);
  const {
    guessed,
    setGuessed,
    roundScore,
    setRoundScore,
    mistake,
    setMistake,
    turn,
    setTurn,
  } = useFortuneContext();

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

  function countOccurrences(str: string, targetChar: string): number {
    return str
      .toLowerCase()
      .split("")
      .filter((char) => char === targetChar.toLowerCase()).length;
  }

  return (
    <>
      {mistake === 3 && (
        <div className="fixed inset-0 gap-8 flex flex-col justify-center items-center text-white bg-black/80 backdrop-blur-sm z-[100] text-9xl font-black">
          <h1 className="leading-none">Game Over Team {turn}</h1>
          {!steal ? (
            <Button
              variant={"fortune"}
              className="px-12 py-10 text-6xl bg-green-500"
              type="button"
              onClick={() => {
                setSteal(true);
                setMistake(0);
                setTurn(turn === "A" ? "B" : "A");
              }}
            >
              Steal
            </Button>
          ) : (
            <>
              <Button
                variant={"fortune"}
                className="px-12 py-10 text-6xl bg-green-500"
                type="button"
                onClick={async () => {
                  // const res = await updateFortuneTeamScore({
                  //   teamName: turn || "",
                  //   points: 0,
                  // });
                  // if (res) {
                  router.push(`/family-fortune/${roundNum + 1}`);
                  // }
                }}
              >
                Next Round
              </Button>
              <p className="text-lg font-normal text-white">
                No points awarded
              </p>
            </>
          )}
        </div>
      )}
      <div className="grid grid-cols-12 grid-rows-3 gap-1 mt-4">
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
        {ALPHABET.map((val, index) => {
          const className =
            index === 24 ? "col-start-6" : index === 25 ? "col-start-7" : "";

          const selected = guessed.includes(val);

          return (
            <Button
              onClick={() => {
                const prev = [...guessed, val];
                setGuessed(prev);
                if (!answer.toLocaleUpperCase().includes(val)) {
                  if (incorrectRef.current) {
                    incorrectRef.current.currentTime = 0;
                    incorrectRef.current.play();
                  }
                  setMistake(mistake + 1);
                  // handleMistake();
                } else {
                  if (correctRef.current) {
                    correctRef.current.currentTime = 0;
                    correctRef.current.play();
                  }
                  const count = countOccurrences(answer, val);
                  setRoundScore(roundScore + price * count);
                }
              }}
              disabled={selected || mistake >= 3}
              className={`${className} p-2 text-2xl rounded-md border text-white bg-transparent hover:bg-green-500`}
              type="button"
              key={index}
            >
              {val}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default Choices;
