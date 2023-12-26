"use client";
import usePlayers from "@/hooks/usePlayers";
import React, { useState } from "react";
import PlayerCard from "./card";
import { AddModal } from "./modals/add";
import { EditModal } from "./modals/edit";

const Display = () => {
  const players = usePlayers();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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
      <section className="flex items-center justify-center ">
        <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-8">
          {players?.data?.map((player) => {
            return (
              <div
                className="flex items-center justify-center w-full h-full"
                key={player.id}
              >
                <PlayerCard
                  player={player}
                  handleOpenAdd={handleOpenAdd}
                  handleOpenEdit={handleOpenEdit}
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Display;
