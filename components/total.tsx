"use client";
import usePlayers from "@/hooks/usePlayers";
import React from "react";

const TotalDisplay = () => {
  const players = usePlayers();
  const total = players?.data?.reduce((total, point) => total + point.score, 0);
  return (
    <div className="mb-4 text-4xl font-black text-center text-white lg:mb-8 lg:text-8xl">
      Player Scores: PHP {total?.toLocaleString()}
    </div>
  );
};

export default TotalDisplay;
