"use client";
import useBonusFeudRounds from "@/hooks/useFeudBonusRounds";
import useFeudRounds from "@/hooks/useFeudRounds";
import useFeudTeams from "@/hooks/useFeudTeams";
import { Crown, Loader2, Play, TimerResetIcon } from "lucide-react";
import React, { useState } from "react";
import CountUp from "react-countup";

import Image from "next/image";
import Allen from "/public/pics/allen.png";
import Kielo from "/public/pics/kielo.png";
import Klark from "/public/pics/klark.png";
import Perry from "/public/pics/perry.png";
import Ashton from "/public/pics/ashton.png";
import Leanne from "/public/pics/leanne.png";
import { Button } from "@/components/ui/button";
import { updateBonusRoundFeud } from "@/lib/actions/game";
import { useRouter } from "next/navigation";

const BonusFeudPage = () => {
  const bonus_rounds = useBonusFeudRounds();
  const normal_rounds = useFeudRounds();
  const teams = useFeudTeams();

  const countA =
    normal_rounds.data?.filter((d) => d.winner === "A").length || 0;
  const countB =
    normal_rounds.data?.filter((d) => d.winner === "B").length || 0;
  const first = countA >= countB ? "A" : "B";

  const router = useRouter();

  const [order, setOrder] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState(false);

  async function handleStart() {
    setisLoading(true);
    let winningTeam = first === "A" ? teams.data?.teamA : teams.data?.teamB;
    let losingTeam = first !== "A" ? teams.data?.teamA : teams.data?.teamB;

    const winPlayers =
      order
        .map((name) => {
          if (winningTeam?.players?.find((player) => player.name === name)) {
            return { name, order: order.indexOf(name) + 1 };
          } else return;
        })
        .filter((d) => d) || [];

    const losePlayers =
      order
        .map((name) => {
          if (losingTeam?.players?.find((player) => player.name === name)) {
            return { name, order: order.indexOf(name) + 1 };
          } else return;
        })
        .filter((d) => d) || [];

    const getParams = (players: any[], doubled: boolean) => ({
      doubled,
      playerNames: players.map((d) => d?.name || ""),
      order: players.map((d) => d?.order || 0),
    });

    const winners = await updateBonusRoundFeud(getParams(winPlayers, true));
    const losers = await updateBonusRoundFeud(getParams(losePlayers, false));

    if (winners && losers) {
      router.push(`/family-feud/bonus/1`);
      setisLoading(false);
    }
  }
  if (normal_rounds.isLoading || bonus_rounds.isLoading || teams.isLoading)
    return (
      <div className="">
        <Loader2 className="text-white animate-spin" />
      </div>
    );
  return (
    <section className="relative grid w-full h-full grid-cols-2 grid-rows-1 gap-6 overflow-hidden text-white shadow-xl bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl">
      <div className="absolute z-10 flex flex-col gap-2 font-semibold text-center translate-x-1/2 text-7xl drop-shadow-lg top-10 right-1/2">
        <h2 className="">Scoreboard</h2>
        <div className="flex items-center justify-center gap-2">
          <Button
            disabled={order.length === 0 || isLoading}
            variant={"feudSecondary"}
            type="button"
            onClick={() => setOrder([])}
            className="text-xl"
          >
            Reset <TimerResetIcon className="ml-2" />
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
          <Button
            disabled={order.length !== 6 || isLoading}
            onClick={handleStart}
            variant={"feudSecondary"}
            type="button"
            className="text-xl"
          >
            Start <Play className="ml-2" />{" "}
            {isLoading && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-2 border-yellow-400">
        <div className="relative">
          {first === "A" && (
            <Crown className="absolute z-10 w-20 h-20 text-yellow-400 translate-x-1/2 -top-16 right-1/2" />
          )}
          <CountUp
            delay={1}
            duration={1}
            end={countA}
            className="font-black leading-none text-[15rem]"
          />
        </div>
        <h4 className="text-4xl font-medium">Team A</h4>
        <div className="flex items-center justify-center gap-8">
          {teams.data?.teamA?.players.map((player) => {
            let img;
            if (player.name === "Allen") img = Allen;
            if (player.name === "Kielo") img = Kielo;
            if (player.name === "Klark") img = Klark;
            if (player.name === "Perry") img = Perry;
            if (player.name === "Ashton") img = Ashton;
            if (player.name === "Leanne") img = Leanne;

            const selected = order.includes(player.name)
              ? "border-yellow-400"
              : "border-transparent";

            const indexOf = order.indexOf(player.name) + 1;
            return (
              <div
                className="flex flex-col items-center justify-center gap-2"
                key={player.id}
              >
                <div className="relative w-24 h-24">
                  {indexOf > 0 && (
                    <div className="absolute z-10 text-5xl font-black text-yellow-500 drop-shadow-md -top-2 -left-2">
                      {indexOf}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (order.includes(player.name)) {
                        const temp = order.filter((d) => d !== player.name);
                        setOrder(temp);
                      } else setOrder((prev) => [...prev, player.name]);
                    }}
                    className={`border-4 ${selected} relative w-24 h-24 overflow-hidden rounded-full`}
                    key={player.id}
                  >
                    <Image alt="Pic" src={img || ""} fill objectFit={"cover"} />
                  </button>
                </div>
                <h5 className="text-xl font-bold">{player.name}</h5>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-2 border-r-4 border-yellow-400">
        <div className="relative">
          {first === "B" && (
            <Crown className="absolute z-10 w-20 h-20 text-yellow-400 translate-x-1/2 -top-16 right-1/2" />
          )}
          <CountUp
            delay={1}
            duration={1}
            end={countB}
            className="font-black leading-none text-[15rem]"
          />
        </div>
        <h4 className="text-4xl font-medium">Team B</h4>
        <div className="flex items-center justify-center gap-8">
          {teams.data?.teamB?.players.map((player) => {
            let img;
            if (player.name === "Allen") img = Allen;
            if (player.name === "Kielo") img = Kielo;
            if (player.name === "Klark") img = Klark;
            if (player.name === "Perry") img = Perry;
            if (player.name === "Ashton") img = Ashton;
            if (player.name === "Leanne") img = Leanne;

            const selected = order.includes(player.name)
              ? "border-yellow-400"
              : "border-transparent";

            const indexOf = order.indexOf(player.name) + 1;
            return (
              <div
                className="flex flex-col items-center justify-center gap-2"
                key={player.id}
              >
                <div className="relative w-24 h-24">
                  {indexOf > 0 && (
                    <div className="absolute z-10 text-5xl font-black text-yellow-500 drop-shadow-md -top-2 -left-2">
                      {indexOf}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (order.includes(player.name)) {
                        const temp = order.filter((d) => d !== player.name);
                        setOrder(temp);
                      } else setOrder((prev) => [...prev, player.name]);
                    }}
                    className={`border-4 ${selected} relative w-24 h-24 overflow-hidden rounded-full`}
                    key={player.id}
                  >
                    <Image alt="Pic" src={img || ""} fill objectFit={"cover"} />
                  </button>
                </div>
                <h5 className="text-xl font-bold">{player.name}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BonusFeudPage;
