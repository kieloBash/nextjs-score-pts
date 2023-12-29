"use client";
import { Loader2 } from "lucide-react";
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
import useFeudTeams from "@/hooks/useFeudTeams";

const FeudFinishPage = () => {
  const teams = useFeudTeams();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);

  if (teams.isLoading)
    return (
      <div className="">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );

  const scorePerPlayerA = Math.floor((teams.data?.teamA?.score || 0) / 3);
  const scorePerPlayerB = Math.floor((teams.data?.teamB?.score || 0) / 3);

  async function handleUpdate() {
    console.log("object");
    setisLoading(true);
    let updatedPlayersScoreA: any[] = [];
    let updatedPlayersScoreB: any[] = [];

    console.log({ scorePerPlayerA, scorePerPlayerB });
    if (teams.data?.teamA?.players) {
      updatedPlayersScoreA = await Promise.all(
        teams.data.teamA.players.map((player) =>
          addScore({ id: player.id, points: scorePerPlayerA })
        )
      );
    }

    if (teams.data?.teamB?.players) {
      updatedPlayersScoreB = await Promise.all(
        teams.data.teamB.players.map((player) =>
          addScore({ id: player.id, points: scorePerPlayerB })
        )
      );
    }
    if (updatedPlayersScoreA && updatedPlayersScoreB) {
      router.push("/family-feud/bonus");
      setisLoading(false);
    }
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
          Play Bonus Round
        </Button>
      </div>
      <section className="relative flex flex-col items-center justify-center w-full gap-8 text-blue-600">
        <h1 className="text-6xl font-black drop-shadow-sm">Final Score</h1>
        <div className="grid w-full grid-cols-2 grid-rows-1">
          <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <h2 className="text-4xl font-medium">Team A</h2>
            <div className="flex-1">
              <CountUp
                delay={1}
                duration={5}
                end={teams.data?.teamA?.score || 0}
                className="font-bold drop-shadow-lg text-9xl"
              />
            </div>
            <div className="flex items-center justify-center gap-8">
              {teams.data?.teamA?.players.map((player) => {
                let img;
                if (player.name === "Allen") img = Allen;
                if (player.name === "Kielo") img = Kielo;
                if (player.name === "Klark") img = Klark;
                if (player.name === "Perry") img = Perry;
                if (player.name === "Ashton") img = Ashton;
                if (player.name === "Leanne") img = Leanne;

                return (
                  <div
                    className="flex flex-col items-center justify-center gap-2"
                    key={player.id}
                  >
                    <div
                      className="relative w-24 h-24 overflow-hidden rounded-full"
                      key={player.id}
                    >
                      <Image
                        alt="Pic"
                        src={img || ""}
                        fill
                        objectFit={"cover"}
                      />
                    </div>
                    <h5 className="text-xl font-bold">{player.name}</h5>
                    <CountUp
                      delay={6}
                      duration={5}
                      start={player.score}
                      end={player.score + scorePerPlayerA}
                      className="text-4xl font-bold"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full gap-4">
            <h2 className="text-4xl font-medium">Team B</h2>
            <div className="flex-1">
              <CountUp
                delay={1}
                duration={5}
                end={teams.data?.teamB?.score || 0}
                className="font-bold drop-shadow-lg text-9xl"
              />
            </div>
            <div className="flex items-center justify-center gap-8">
              {teams.data?.teamB?.players.map((player) => {
                let img;
                if (player.name === "Allen") img = Allen;
                if (player.name === "Kielo") img = Kielo;
                if (player.name === "Klark") img = Klark;
                if (player.name === "Perry") img = Perry;
                if (player.name === "Ashton") img = Ashton;
                if (player.name === "Leanne") img = Leanne;

                return (
                  <div
                    className="flex flex-col items-center justify-center gap-2"
                    key={player.id}
                  >
                    <div
                      className="relative w-24 h-24 overflow-hidden rounded-full"
                      key={player.id}
                    >
                      <Image
                        alt="Pic"
                        src={img || ""}
                        fill
                        objectFit={"cover"}
                      />
                    </div>
                    <h5 className="text-xl font-bold">{player.name}</h5>
                    <CountUp
                      delay={6}
                      duration={5}
                      start={player.score}
                      end={player.score + scorePerPlayerB}
                      className="text-4xl font-bold"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeudFinishPage;
