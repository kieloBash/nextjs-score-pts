"use client";
import { Button } from "@/components/ui/button";
import useBonusFeudRounds from "@/hooks/useFeudBonusRounds";
import { deleteFeudBonusRound } from "@/lib/actions/game";
import { useQueryClient } from "@tanstack/react-query";
import { Delete } from "lucide-react";
import Link from "next/link";
import React from "react";

const ListComponent = () => {
  const feudRounds = useBonusFeudRounds();
  const queryClient = useQueryClient();

  if (feudRounds.isLoading) return null;

  return (
    <div className="absolute flex flex-col w-full max-w-[20rem] p-4 bg-white rounded-lg left-10 top-10">
      <h3 className="text-lg font-medium">Normal Rounds</h3>
      <ul className="">
        {feudRounds.data?.map((round, idx) => {
          return (
            <div className="flex w-full gap-4" key={round.id}>
              <div className="w-full line-clamp-4">
                {idx + 1}.{" "}
                <span className="font-bold">{round.doubled && "DOUBLED "}</span>{" "}
                {round.questions.join(",")}
              </div>
              <Button
                variant={"ghost"}
                onClick={async () => {
                  const res = await deleteFeudBonusRound({ id: round.id });
                  if (res) {
                    queryClient.invalidateQueries({
                      queryKey: [`feud-rounds:bonus`],
                    });
                  }
                }}
                type="button"
                className="w-8 h-8 p-1"
              >
                <Delete className="w-full h-full" />
              </Button>
            </div>
          );
        })}
      </ul>
      <div className="flex flex-wrap gap-1 mt-2">
        <Link href={"/add/feud"} className="">
          <Button variant={"feud"}>Normal Round</Button>
        </Link>
        <Link href={"/add/fortune"} className="">
          <Button variant={"fortune"}>Fortune Round</Button>
        </Link>
        <Link href={"/"} className="">
          <Button variant={"outline"}>Menu</Button>
        </Link>
      </div>
    </div>
  );
};

export default ListComponent;
