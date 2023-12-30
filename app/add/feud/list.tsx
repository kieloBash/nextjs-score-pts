"use client";
import { Button } from "@/components/ui/button";
import useFeudRounds from "@/hooks/useFeudRounds";
import { deleteFeudRound } from "@/lib/actions/game";
import { useQueryClient } from "@tanstack/react-query";
import { Delete } from "lucide-react";
import Link from "next/link";
import React from "react";

const ListComponent = () => {
  const feudRounds = useFeudRounds();
  const queryClient = useQueryClient();

  if (feudRounds.isLoading) return null;

  return (
    <div className="absolute flex flex-col w-full max-w-[20rem] p-4 bg-white rounded-lg left-10 top-10">
      <h3 className="text-lg font-medium">Normal Rounds</h3>
      <ul className="">
        {feudRounds.data?.map((round, idx) => {
          return (
            <div className="flex w-full gap-4" key={round.id}>
              <div className="w-full line-clamp-2">
                {idx + 1}. {round.question}
              </div>
              <Button
                variant={"ghost"}
                onClick={async () => {
                  const res = await deleteFeudRound({ id: round.id });
                  if (res) {
                    queryClient.invalidateQueries({
                      queryKey: [`feud-rounds`],
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
        <Link href={"/add/feud/bonus"}>
          <Button variant={"feud"}>Bonus Round</Button>
        </Link>
        <Link href={"/add/fortune"}>
          <Button variant={"fortune"}>Fortune Round</Button>
        </Link>
        <Link href={"/"}>
          <Button variant={"outline"}>Menu</Button>
        </Link>
      </div>
    </div>
  );
};

export default ListComponent;
