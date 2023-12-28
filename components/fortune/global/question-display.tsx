"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useFortuneContext } from "../context";

const QuestionDisplay = ({ question }: { question: string }) => {
  const [shown, setShown] = useState(false);
  const { turn } = useFortuneContext();
  return (
    <div className="flex items-center justify-between w-full gap-10">
      <div className="flex items-center justify-center flex-1 text-6xl font-bold text-right text-white">
        <span className={`${turn === "A" && "text-green-500 drop-shadow-lg"}`}>
          Team A
        </span>
        {turn === "A" && (
          <ChevronLeft className="w-16 h-16 text-green-500 drop-shadow-lg" />
        )}
      </div>
      <div className="relative flex items-center justify-center p-4">
        {!shown && (
          <button
            type="button"
            onClick={() => {
              setShown(true);
            }}
            className="absolute w-full h-full bg-white/30 backdrop-blur-lg rounded-xl blur-sm"
          />
        )}
        <div className="w-full max-w-2xl text-6xl font-black text-center text-white">
          {question}
        </div>
      </div>
      <div className="flex items-center justify-center flex-1 gap-2 text-6xl font-bold text-left text-white">
        {turn === "B" && (
          <ChevronRight className="w-16 h-16 text-green-500 drop-shadow-lg" />
        )}
        <span className={`${turn === "B" && "text-green-500 drop-shadow-lg"}`}>
          Team B
        </span>
      </div>
    </div>
  );
};

export default QuestionDisplay;
