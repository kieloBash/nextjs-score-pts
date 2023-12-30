"use client";
import React, { useEffect, useRef, useState } from "react";

import useSingleFeudRounds from "@/hooks/useSingleFeudRounds";
import useFeudTeams from "@/hooks/useFeudTeams";
import GuessCard from "@/components/feud/card/guess";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Check,
  GiftIcon,
  Loader2,
  X,
} from "lucide-react";

import Image from "next/image";
import Allen from "/public/pics/allen.png";
import Kielo from "/public/pics/kielo.png";
import Klark from "/public/pics/klark.png";
import Perry from "/public/pics/perry.png";
import Ashton from "/public/pics/ashton.png";
import Leanne from "/public/pics/leanne.png";
import { Button } from "@/components/ui/button";
import WinnerDisplay from "@/components/feud/displays/winner";
import QuestionDisplay from "@/components/feud/displays/question";

const reset = [false, false, false, false, false, false, false, false];
const GameRoundPage = ({
  params,
}: {
  params: { round: number; roundId: string };
}) => {
  const { roundId, round: roundNum } = params;
  const round = useSingleFeudRounds({ id: roundId });
  const teams = useFeudTeams();

  const [TeamAScore, setTeamAScore] = useState(0);
  const [TeamBScore, setTeamBScore] = useState(0);
  const [turn, setTurn] = useState<"A" | "B" | undefined>();
  const [mistakes, setMistakes] = useState(0);
  const [stealing, setStealing] = useState(false);
  const [winner, setWinner] = useState<"A" | "B" | undefined>();
  const [shownArr, setShownArr] = useState<boolean[]>(reset);

  const [trialTurn, setTrialTurn] = useState<"A" | "B" | undefined>();
  const [trialGuess, setTrialGuess] = useState({ A: 0, B: 0 });
  const [countTurnTrial, setCountTurnTrial] = useState(0);

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

  function handleShow(index: number) {
    if (mistakes >= 3 && stealing === false) return null;
    let temp = [...shownArr];
    temp[index] = true;
    setShownArr(temp);
    let count = 0;

    for (const element of temp) {
      if (element === true) {
        count++;
      }
    }

    if (turn === "A")
      setTeamAScore((prev) => prev + (round.data?.answerPts[index] || 0));
    else setTeamBScore((prev) => prev + (round.data?.answerPts[index] || 0));

    if (count === round.data?.answer.length) {
      setWinner(turn);
    } else {
      if (stealing) {
        setMistakes((prev) => prev + 1);
        setStealing(false);
        setWinner(turn);
      }
    }
    playCorrect();
  }

  function handleShowFirst(index: number) {
    if (!trialTurn) return null;
    let temp = [...shownArr];
    temp[index] = true;
    setShownArr(temp);
    playCorrect();

    if (trialTurn === "A") {
      setTrialGuess((prev) => {
        return { ...prev, A: round.data?.answerPts[index] || 0 };
      });
    } else
      setTrialGuess((prev) => {
        return { ...prev, B: round.data?.answerPts[index] || 0 };
      });
    const newTurn = trialTurn === "A" ? "B" : "A";

    setTrialTurn(newTurn);
    setCountTurnTrial((prev) => prev + 1);
  }

  useEffect(() => {
    if (
      ((trialGuess.A > 0 || trialGuess.B > 0) && countTurnTrial >= 2) ||
      round.data?.answerPts[0] === trialGuess.A ||
      round.data?.answerPts[0] === trialGuess.B
    ) {
      const turnIn = trialGuess.A > trialGuess.B ? "A" : "B";
      setTurn(turnIn);
      if (turnIn === "A") {
        setTeamAScore(trialGuess.A + trialGuess.B);
      } else setTeamBScore(trialGuess.A + trialGuess.B);
    }
  }, [countTurnTrial]);

  function handleTurn(e: "A" | "B") {
    setTrialTurn(e);
  }

  if (round.isLoading || teams.isLoading)
    return (
      <div className="">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );

  if (!turn)
    return (
      <section className="relative flex flex-col items-center justify-center w-full h-full gap-4">
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
        <QuestionDisplay
          question={round.data?.question || ""}
          bool={true}
          handleTurn={handleTurn}
        />
        {trialTurn && (
          <>
            {trialTurn === "A" ? (
              <>
                <div className="absolute mt-12 text-6xl font-bold leading-none text-center text-blue-600 uppercase -translate-y-1/2 top-1/2 left-10 drop-shadow-2xl">
                  {Array("playing".length)
                    .fill(["p", "l", "a", "y", "i", "n", "g"])
                    .map((_, index) => {
                      return (
                        <React.Fragment key={index}>
                          <span className="">{_[index]}</span>
                          <br />
                        </React.Fragment>
                      );
                    })}
                  <button
                    type="button"
                    onClick={() => {
                      if (trialTurn) {
                        setTrialTurn("B");
                        playIncorrect();
                        setCountTurnTrial((prev) => prev + 1);
                      }
                    }}
                    className="flex items-center justify-center w-12 h-12 p-2 mt-6 text-white bg-red-500 rounded-full"
                  >
                    <X className="w-full h-full" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="absolute mt-12 text-6xl font-bold leading-none text-center text-blue-600 uppercase -translate-y-1/2 top-1/2 right-10 drop-shadow-2xl">
                  {Array("playing".length)
                    .fill(["p", "l", "a", "y", "i", "n", "g"])
                    .map((_, index) => {
                      return (
                        <React.Fragment key={index}>
                          <span className="">{_[index]}</span>
                          <br />
                        </React.Fragment>
                      );
                    })}
                  <button
                    type="button"
                    onClick={() => {
                      if (trialTurn) {
                        setTrialTurn("A");
                        playIncorrect();
                        setCountTurnTrial((prev) => prev + 1);
                      }
                    }}
                    className="flex items-center justify-center w-12 h-12 p-2 mt-6 text-white bg-red-500 rounded-full"
                  >
                    <X className="w-full h-full" />
                  </button>
                </div>
              </>
            )}
          </>
        )}

        <div className="grid w-full h-full max-w-[45rem] grid-cols-2 gap-4">
          <div className="grid grid-cols-1 grid-rows-4 gap-2">
            {Array(4)
              .fill([0, 1, 2, 3])
              .map((_, index) => {
                const num = _[index];
                const data = {
                  answer: round.data?.answer[num],
                  score: round.data?.answerPts[num],
                };
                return (
                  <GuessCard
                    key={_[index]}
                    index={num + 1}
                    shown={shownArr[num]}
                    data={data}
                    handleShow={handleShowFirst}
                    disabled={
                      (mistakes === 4 && stealing === false) ||
                      (mistakes === 3 && stealing === false)
                    }
                  />
                );
              })}
          </div>
          <div className="grid grid-cols-1 grid-rows-4 gap-2">
            {Array(4)
              .fill([4, 5, 6, 7])
              .map((_, index) => {
                const num = _[index];
                const data = {
                  answer: round.data?.answer[num],
                  score: round.data?.answerPts[num],
                };
                return (
                  <GuessCard
                    key={_[index]}
                    index={num + 1}
                    shown={shownArr[num]}
                    data={data}
                    handleShow={handleShowFirst}
                    disabled={
                      (mistakes === 4 && stealing === false) ||
                      (mistakes === 3 && stealing === false)
                    }
                  />
                );
              })}
          </div>
        </div>
      </section>
    );

  return (
    <>
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
      <div className="relative flex flex-col items-center justify-between w-full h-full gap-4">
        {winner && (
          <WinnerDisplay
            winner={winner}
            finalScore={TeamAScore + TeamBScore}
            roundNum={roundNum}
            answers={round.data?.answer || []}
            scores={round.data?.answerPts || []}
            roundId={round.data?.id || ""}
          />
        )}
        <QuestionDisplay question={round.data?.question || ""} />
        <div className="flex items-center justify-between w-full h-full">
          <div className="w-48 h-full border-r-[15px] border-y-[10px] border-blue-700 grid grid-cols-1 grid-rows-3 gap-4 px-4 py-6">
            {teams.data?.teamA?.players.map((player) => {
              let img;
              if (player.name === "Allen") img = Allen;
              if (player.name === "Kielo") img = Kielo;
              if (player.name === "Klark") img = Klark;
              if (player.name === "Perry") img = Perry;
              if (player.name === "Ashton") img = Ashton;
              if (player.name === "Leanne") img = Leanne;
              return (
                <div className="flex justify-end" key={player.id}>
                  <div
                    className="relative overflow-hidden border-2 border-gray-300 rounded-full shadow-lg w-28 h-28"
                    key={player.id}
                  >
                    <Image alt="Pic" src={img || ""} fill objectFit={"cover"} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid w-full h-full max-w-[45rem] grid-cols-2 gap-4">
            <div className="grid grid-cols-1 grid-rows-4 gap-2">
              {Array(4)
                .fill([0, 1, 2, 3])
                .map((_, index) => {
                  const num = _[index];
                  const data = {
                    answer: round.data?.answer[num],
                    score: round.data?.answerPts[num],
                  };
                  return (
                    <GuessCard
                      key={_[index]}
                      index={num + 1}
                      shown={shownArr[num]}
                      data={data}
                      handleShow={handleShow}
                      disabled={
                        (mistakes === 4 && stealing === false) ||
                        (mistakes === 3 && stealing === false)
                      }
                    />
                  );
                })}
            </div>
            <div className="grid grid-cols-1 grid-rows-4 gap-2">
              {Array(4)
                .fill([4, 5, 6, 7])
                .map((_, index) => {
                  const num = _[index];
                  const data = {
                    answer: round.data?.answer[num],
                    score: round.data?.answerPts[num],
                  };
                  return (
                    <GuessCard
                      key={_[index]}
                      index={num + 1}
                      shown={shownArr[num]}
                      data={data}
                      handleShow={handleShow}
                      disabled={
                        (mistakes === 4 && stealing === false) ||
                        (mistakes === 3 && stealing === false)
                      }
                    />
                  );
                })}
            </div>
          </div>
          <div className="w-48 h-full border-l-[15px] border-y-[10px] border-blue-700 grid grid-cols-1 grid-rows-3 gap-4 px-4 py-6">
            {teams.data?.teamB?.players.map((player) => {
              let img;
              if (player.name === "Allen") img = Allen;
              if (player.name === "Kielo") img = Kielo;
              if (player.name === "Klark") img = Klark;
              if (player.name === "Perry") img = Perry;
              if (player.name === "Ashton") img = Ashton;
              if (player.name === "Leanne") img = Leanne;
              return (
                <div className="flex justify-start" key={player.id}>
                  <div
                    className="relative overflow-hidden border-2 border-gray-300 rounded-full shadow-lg w-28 h-28"
                    key={player.id}
                  >
                    <Image alt="Pic" src={img || ""} fill objectFit={"cover"} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center flex-1 gap-10 text-blue-700">
            <div className="text-6xl font-black text-center drop-shadow-lg">
              {TeamAScore.toLocaleString()}
            </div>
            {turn === "A" && (
              <ArrowBigLeftDash className="w-32 h-32 text-red-600 drop-shadow-lg" />
            )}
          </div>
          <div className="flex items-center justify-center h-32 gap-2 max-w-[45rem] w-full">
            {mistakes >= 3 ? (
              <>
                {stealing ? (
                  <>
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        type="button"
                        onClick={() => {
                          setStealing(false);
                          playIncorrect();
                        }}
                        className="w-16 h-16 p-2 text-white bg-red-500 rounded-full"
                        variant={"ghost"}
                      >
                        <X className="w-full h-full" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <h3 className="text-4xl font-bold text-blue-700">
                        No More Lives
                      </h3>
                      <Button
                        type="button"
                        disabled={
                          (mistakes === 4 && stealing === false) || stealing
                        }
                        variant={"feud"}
                        className="text-xl font-bold"
                        onClick={() => {
                          setStealing(true);
                          setTurn((prev) => {
                            return prev === "A" ? "B" : "A";
                          });
                        }}
                      >
                        Steal
                      </Button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {Array(3 - mistakes)
                  .fill([])
                  .map((_, index) => {
                    return (
                      <button
                        key={index}
                        className="flex items-center justify-center w-24 h-24 p-1 rounded-full"
                        type="button"
                        onClick={() => {
                          if (mistakes < 3) {
                            setMistakes((prev) => prev + 1);
                            playIncorrect();
                          }
                        }}
                      >
                        <GiftIcon className="w-20 h-20 text-blue-700 drop-shadow-sm" />
                      </button>
                    );
                  })}
              </>
            )}
          </div>
          <div className="flex items-center justify-center flex-1 gap-10 text-blue-700">
            {turn === "B" && (
              <ArrowBigRightDash className="w-32 h-32 text-red-600 drop-shadow-lg" />
            )}
            <div className="text-6xl font-black text-center drop-shadow-lg">
              {TeamBScore.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameRoundPage;
