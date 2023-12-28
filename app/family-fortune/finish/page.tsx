"use client";
import useFortuneTeams from "@/hooks/useFortuneTeams";
import { Loader2 } from "lucide-react";
import React from "react";

import Image from "next/image";
import Allen from "/public/pics/allen.png";
import Kielo from "/public/pics/kielo.png";
import Klark from "/public/pics/klark.png";
import Perry from "/public/pics/perry.png";
import Ashton from "/public/pics/ashton.png";
import Leanne from "/public/pics/leanne.png";

import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FortuneFinishPage = () => {
  const teams = useFortuneTeams();

  if (teams.isLoading)
    return (
      <div className="">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );
  return (
    <>
      <div className="absolute top-10 left-10">
        <Link href={"/"}>
          <Button variant={"fortune"} type="button">
            Go Back to Menu
          </Button>
        </Link>
      </div>
      <section className="relative flex flex-col items-center justify-center w-full gap-8 text-white">
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
            <div className="flex items-center justify-center gap-4">
              {teams.data?.teamA?.players.map((player) => {
                let img;
                if (player.name === "Allen") img = Allen;
                if (player.name === "Kielo") img = Kielo;
                if (player.name === "Klark") img = Klark;
                if (player.name === "Perry") img = Perry;
                if (player.name === "Ashton") img = Ashton;
                if (player.name === "Leanne") img = Leanne;

                return (
                  <div className="flex flex-col items-center justify-center gap-2">
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
            <div className="flex items-center justify-center gap-4">
              {teams.data?.teamB?.players.map((player) => {
                let img;
                if (player.name === "Allen") img = Allen;
                if (player.name === "Kielo") img = Kielo;
                if (player.name === "Klark") img = Klark;
                if (player.name === "Perry") img = Perry;
                if (player.name === "Ashton") img = Ashton;
                if (player.name === "Leanne") img = Leanne;

                return (
                  <div className="flex flex-col items-center justify-center gap-2">
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

export default FortuneFinishPage;
