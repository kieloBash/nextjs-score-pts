"use client";
import React from "react";

interface DataType {
  answer: string | undefined;
  score: number | undefined;
}
const GuessCard = ({
  index,
  shown,
  data,
  handleShow,
  disabled,
}: {
  index: number;
  shown: boolean;
  disabled: boolean;
  data: DataType;
  handleShow: (i: number) => void;
}) => {
  if (shown)
    return (
      <div className="flex items-center justify-between w-full gap-2 px-6 text-center bg-yellow-500 border-8 border-blue-900 rounded-lg shadow-lg">
        <h2 className="text-xl font-black text-left text-blue-800 line-clamp-1">{data.answer}</h2>
        <h2 className="text-xl font-black text-blue-800">{data.score}</h2>
      </div>
    );
  else
    return (
      <button
        type="button"
        disabled={!data.answer && !data.score || disabled}
        onClick={() => handleShow(index - 1)}
        className="flex items-center justify-center w-full text-center bg-blue-700 border-8 border-blue-900 rounded-lg shadow-lg"
      >
        {data.answer && data.score && (
          <h2 className="text-6xl font-black text-white">{index}</h2>
        )}
      </button>
    );
};

export default GuessCard;
