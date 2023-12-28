"use client";
import { Button } from "@/components/ui/button";
import useFeudRounds from "@/hooks/useFeudRounds";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const RoundStart = ({ round: roundNum }: { round: number }) => {
  const rounds = useFeudRounds();
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  if (rounds.isLoading || !rounds.data)
    return (
      <div className="">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  if (roundNum - 1 >= rounds.data?.length) redirect("/family-feud/finish");
  const round = rounds.data[roundNum - 1];
  return (
    <Button
      type="button"
      disabled={isLoading}
      onClick={() => {
        setisLoading(true);
        router.push(`/family-feud/${roundNum}/${round.id}`);
      }}
      variant={"feud"}
      className="px-10 py-10 text-5xl text-white"
    >
      Start
    </Button>
  );
};

export default RoundStart;
