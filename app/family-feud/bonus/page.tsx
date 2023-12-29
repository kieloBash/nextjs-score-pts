"use client";
import useBonusFeudRounds from "@/hooks/useFeudBonusRounds";
import React from "react";

const BonusFeudPage = () => {
  const rounds = useBonusFeudRounds();
  console.log(rounds);
  return <div>BonusFeudPage</div>;
};

export default BonusFeudPage;
