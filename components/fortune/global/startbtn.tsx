"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addTeam } from "@/lib/actions/game";
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
      <Link href={`/family-fortune/selection`}>
        <Button
          type="button"
          onClick={() => console.log("object")}
          variant={"secondary"}
          className="text-red-500 font-black bg-green-300 uppercase text-6xl mt-8 px-4 py-2 w-[20rem] h-[5rem]"
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
        onClick={async () => {
          if (teamA?.length !== 3 && teamB?.length !== 3) return null;

          if (teamA && teamB) {
            const teamARes = await addTeam({
              playerNames: teamA,
              teamName: "A",
            });
            const teamBRes = await addTeam({
              playerNames: teamB,
              teamName: "B",
            });

            if (teamARes && teamBRes) {
              setisLoading(true);
              router.push("/family-fortune/1");
            }
          }
        }}
        className="text-blue-500 bg-white uppercase text-6xl mt-8 px-4 py-2 w-[20rem] h-[5rem]"
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
