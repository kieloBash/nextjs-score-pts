"use client";
import useFortuneRounds from "@/hooks/useFortuneRounds";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const RoundsDisplay = () => {
  const rounds = useFortuneRounds();

  return (
    <div className="fixed flex flex-col gap-2 -translate-y-1/2 left-4 top-1/2">
      {rounds.data?.map((d, index) => {
        return (
          <Link key={d.id} href={`/family-fortune/${index + 1}/${d.id}`}>
            <div className="flex items-center justify-between h-10 gap-4 p-4 text-lg font-medium text-center text-white bg-green-400 rounded-md">
              <div className="">Round {index + 1}</div> <ChevronRight />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RoundsDisplay;
