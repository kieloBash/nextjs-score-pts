import RoundStart from "@/components/fortune/global/roundstart";
import React from "react";

const RoundPage = ({ params }: { params: { round: number } }) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="font-black text-white text-9xl">Round {params.round}</h1>
      <RoundStart />
    </section>
  );
};

export default RoundPage;
