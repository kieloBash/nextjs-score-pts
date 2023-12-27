"use client";
import { Pen, Plus, PlusSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Allen from "/public/pics/allen.png";
import Kielo from "/public/pics/kielo.png";
import Klark from "/public/pics/klark.png";
import Perry from "/public/pics/perry.png";
import Ashton from "/public/pics/ashton.png";
import Leanne from "/public/pics/leanne.png";

interface player_type {
  id: string;
  name: string;
  score: number;
  fortuneId: string | null;
  feudId: string | null;
}

type CardPropsWithPlayer = CardProps & {
  player: player_type;
  handleOpenAdd: (id: string) => void;
  handleOpenEdit: (id: string) => void;
  place: number;
};

type CardProps = React.ComponentProps<typeof Card>;

const PlayerCard: React.FC<CardPropsWithPlayer> = ({
  className,
  player,
  handleOpenAdd,
  handleOpenEdit,
  place,
}) => {
  let img;

  if (player.name === "Allen") img = Allen;
  if (player.name === "Kielo") img = Kielo;
  if (player.name === "Klark") img = Klark;
  if (player.name === "Perry") img = Perry;
  if (player.name === "Ashton") img = Ashton;
  if (player.name === "Leanne") img = Leanne;

  return (
    <Card className={cn("w-[260px]", className)}>
      <CardHeader>
        <CardTitle className="capitalize">
          <span className="font-black text-main-400">Top {place + 1}.</span>{" "}
          {player.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex flex-col">
        <div className="absolute w-40 h-40 overflow-hidden -translate-x-1/2 rounded-full -top-4 left-1/2">
          <Image alt="Pic" src={img || ""} fill objectFit={"cover"} />
        </div>
        <div className="flex items-center justify-center gap-4 text-3xl font-extrabold text-center pt-36">
          <div className="">Php {player.score.toLocaleString()}</div>
          <div className="flex items-center justify-center">
            <Button
              variant={"ghost"}
              className="p-1 rounded-full w-7 h-7"
              type="button"
              onClick={() => {
                handleOpenEdit(player.id);
              }}
            >
              <Pen />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="-mt-4">
        <Button
          className="w-full"
          type="button"
          onClick={() => {
            handleOpenAdd(player.id);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Pamasko
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlayerCard;
