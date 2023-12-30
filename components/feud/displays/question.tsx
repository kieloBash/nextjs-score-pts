"use client";
import { Button } from "@/components/ui/button";
import { PlayCircleIcon, X } from "lucide-react";
import React from "react";

const QuestionDisplay = ({
  question,
  bool = false,
  handleTurn,
}: {
  question: string;
  bool?: boolean;
  handleTurn?: (e: "A" | "B") => void;
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-blue-700 drop-shadow-lg">
          Team A
        </div>
        {bool && handleTurn && (
          <Button
            variant={"feud"}
            className="mt-2 text-xl"
            type="button"
            onClick={() => handleTurn("A")}
          >
            Play <PlayCircleIcon className="ml-2" />
          </Button>
        )}
      </div>
      <h1 className="text-3xl font-black text-center text-blue-700 w-full drop-shadow-lg max-w-[45rem] line-clamp-1">
        {question}
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-blue-700 drop-shadow-lg">
          Team B
        </div>
        {bool && handleTurn && (
          <Button
            variant={"feud"}
            className="mt-2 text-xl"
            type="button"
            onClick={() => handleTurn("B")}
          >
            Play <PlayCircleIcon className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;
