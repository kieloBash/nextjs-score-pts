"use client";
import { Button } from "@/components/ui/button";
import useFortuneRounds from "@/hooks/useFortuneRounds";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const RoundStart = ({ round: roundNum }: { round: number }) => {
  const rounds = useFortuneRounds();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  if (rounds.isLoading || !rounds.data)
    return (
      <div className="">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  if (roundNum - 1 >= rounds.data?.length) redirect("/family-fortune/finish");
  const round = rounds.data[roundNum - 1];
  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={() => {
        setisLoading(true);
        router.push(`/family-fortune/${roundNum}/${round.id}`);
      }}
      variant={"secondary"}
      className="py-10 text-5xl text-white bg-green-500"
    >
      Start
    </Button>
  );
};

export default RoundStart;
