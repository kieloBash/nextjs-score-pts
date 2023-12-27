"use client";
import useFortuneRounds from "@/hooks/useFortuneRounds";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const RoundsDisplay = () => {
  const rounds = useFortuneRounds();

  return (
    <div className="fixed w-40 -translate-y-1/2 left-4 top-1/2">
      {rounds.data?.map((d, index) => {
        return (
          <Link key={d.id} href={`/family-fortune/${index + 1}/${d.id}`}>
            <div className="flex items-center justify-between h-10 p-4 text-2xl font-medium text-center bg-white rounded-md w-44">
              <div className="">Round {index + 1}</div> <ChevronRight />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RoundsDisplay;
