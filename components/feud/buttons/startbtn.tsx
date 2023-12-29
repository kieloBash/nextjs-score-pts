"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addFeudTeam, updateResetFeudTeam } from "@/lib/actions/game";
import { useRouter } from "next/navigation";

const StartButton = ({
  selection = false,
  teamA,
  teamB,
}: {
  selection?: boolean;
  teamA?: string[];
  teamB?: string[];
}) => {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  async function handleReset() {
    setisLoading(true);
    const res = await updateResetFeudTeam();
    if (res) {
      setisLoading(false);
      router.push("/family-feud/selection");
    }
  }

  if (selection) {
    return (
      <Button
        type="button"
        disabled={isLoading}
        onClick={handleReset}
        variant={"feud"}
        className="font-black uppercase text-6xl mt-8 px-4 py-2 w-[20rem] h-[5rem]"
      >
        Start {isLoading && <Loader2 className="animate-spin" />}
      </Button>
    );
  } else
    return (
      <Button
        disabled={isLoading}
        type="button"
        variant={"feud"}
        onClick={async () => {
          if (teamA?.length !== 3 && teamB?.length !== 3) return null;
          if (teamA && teamB) {
            setisLoading(true);
            const teamARes = await addFeudTeam({
              playerNames: teamA,
              teamName: "A",
            });
            const teamBRes = await addFeudTeam({
              playerNames: teamB,
              teamName: "B",
            });

            if (teamARes && teamBRes) {
              router.push("/family-feud/1");
            }
          }
        }}
        className="uppercase text-6xl mt-8 px-4 py-2 w-[20rem] h-[5rem]"
      >
        {isLoading ? (
          <Loader2 className="w-10 h-10 ml-2 animate-spin" />
        ) : (
          <span className="font-black">Start</span>
        )}
      </Button>
    );
};

export default StartButton;
