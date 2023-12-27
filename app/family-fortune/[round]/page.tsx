import RoundStart from "@/components/fortune/global/roundstart";
import React from "react";

const RoundPage = ({ params }: { params: { round: number } }) => {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1 gap-4">
      <h1 className="font-black text-center text-white text-9xl">
        Round {params.round}
      </h1>
      <RoundStart round={params.round} />
    </div>
  );
};

export default RoundPage;
