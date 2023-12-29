import React from "react";

const QuestionDisplay = ({ question }: { question: string }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-4xl font-bold text-blue-700 drop-shadow-lg">
        Team A
      </div>
      <h1 className="text-5xl font-black text-center text-blue-700 w-full drop-shadow-lg max-w-[45rem]">
        {question}
      </h1>
      <div className="text-4xl font-bold text-blue-700 drop-shadow-lg">
        Team B
      </div>
    </div>
  );
};

export default QuestionDisplay;
