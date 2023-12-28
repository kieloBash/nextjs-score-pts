"use client";
import React, { useEffect, useRef } from "react";
import { useFortuneContext } from "../context";
import { updateFortuneTeamScore } from "@/lib/actions/game";
import { useRouter } from "next/navigation";
import { GuessModal } from "../modal/guess";

const ActionButtons = ({
  answer,
  price,
  roundNum,
}: {
  answer: string;
  price: number;
  roundNum: number;
}) => {
  const { setGuessed, setRoundScore, roundScore, turn, setMistake, mistake } =
    useFortuneContext();
  const router = useRouter();
  function count(str: string): number {
    return str.replace(/ /g, "").length;
  }

  function handleCorrect() {
    const ALPHABET = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode("A".charCodeAt(0) + i)
    );
    setGuessed(ALPHABET);
    setRoundScore(Number(count(answer)) * price);
    playCorrect();
  }

  function handleIncorrect() {
    setMistake(mistake + 1);
    playIncorrect();
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

  return (
    <div className="absolute flex flex-col gap-4 left-4 bottom-4">
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
      <GuessModal
        answer={answer}
        handleCorrect={handleCorrect}
        handleIncorrect={handleIncorrect}
      />
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
            router.push(`/family-fortune/${roundNum + 1}`);
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
