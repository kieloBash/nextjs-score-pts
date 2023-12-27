"use client";
import usePlayers from "@/hooks/usePlayers";
import React, { useState } from "react";
import PlayerCard from "./card";
import { AddModal } from "./modals/add";
import { EditModal } from "./modals/edit";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { addPlayerDefault } from "@/lib/actions/game";
import { useQueryClient } from "@tanstack/react-query";

const Display = () => {
  const players = usePlayers();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [leftHover, setleftHover] = useState(false);
  const [rightHover, setrightHover] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<string>("");
  function handleOpenAdd(id: string) {
    setOpen(true);
    setSelected(id);
  }
  function handleOpenEdit(id: string) {
    setOpenEdit(true);
    setSelected(id);
  }
  return (
    <>
      <EditModal open={openEdit} setOpen={setOpenEdit} selected={selected} />
      <AddModal open={open} setOpen={setOpen} selected={selected} />
      <section className="relative flex items-center justify-center w-full">
        <Button
          onClick={() => router.push("/family-feud")}
          className="absolute -translate-y-1/2 rounded-full left-4 top-1/2 text-main-400"
          type="button"
          variant={"secondary"}
          onMouseOver={() => setleftHover(true)}
          onMouseLeave={() => setleftHover(false)}
        >
          <ChevronLeft className="w-10 h-10" />
          {leftHover && (
            <span className="ml-2 text-lg font-black">Family Feud</span>
          )}
        </Button>
        {players.isLoading ? (
          <div className="flex items-center justify-center flex-1 text-white">
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>
        ) : (
          <>
            {players.data?.length === 0 ? (
              <>
                <Button
                  onClick={async () => {
                    const res = await addPlayerDefault();

                    if (res)
                      queryClient.invalidateQueries({
                        queryKey: [`players`],
                      });
                  }}
                >
                  Add Default Players
                </Button>
              </>
            ) : (
              <>
                <div className="flex flex-col grid-cols-3 grid-rows-2 gap-2 lg:grid">
                  {players?.data?.map((player, index) => {
                    return (
                      <div
                        className="flex items-center justify-center w-full h-full"
                        key={player.id}
                      >
                        <PlayerCard
                          place={index}
                          player={player}
                          handleOpenAdd={handleOpenAdd}
                          handleOpenEdit={handleOpenEdit}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
        <Button
          onClick={() => router.push("/family-fortune")}
          className="absolute -translate-y-1/2 rounded-full right-4 top-1/2 text-main-400"
          type="button"
          variant={"secondary"}
          onMouseOver={() => setrightHover(true)}
          onMouseLeave={() => setrightHover(false)}
        >
          {rightHover && (
            <span className="mr-2 text-lg font-black">Family Fortune</span>
          )}
          <ChevronRight className="w-10 h-10" />
        </Button>
      </section>
    </>
  );
};

export default Display;
