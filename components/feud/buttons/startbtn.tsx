"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addFeudTeam } from "@/lib/actions/game";
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

  if (selection) {
    return (
      <Link href={`/family-feud/selection`}>
        <Button
          type="button"
          onClick={() => console.log("object")}
          variant={"feud"}
          className="font-black uppercase text-6xl mt-8 px-4 py-2 w-[20rem] h-[5rem]"
        >
          Start
        </Button>
      </Link>
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
