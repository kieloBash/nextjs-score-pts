"use client";
import { Pen, Plus } from "lucide-react";

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
  gamesPlayed: number;
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
    <Card className={cn("w-[300px]", className)}>
      <CardHeader>
        <CardTitle className="capitalize">
          Top {place + 1}. {player.name}
        </CardTitle>
        {/* <CardDescription>
          You have played {player.gamesPlayed-1} games
        </CardDescription> */}
      </CardHeader>
      <CardContent className="relative flex flex-col">
        <div className="absolute overflow-hidden -translate-x-1/2 rounded-full w-44 h-44 -top-4 left-1/2">
          <Image alt="Pic" src={img || ""} fill objectFit={"cover"} />
        </div>
        <div className="pt-40 text-4xl font-extrabold text-center">
          Php {player.score.toLocaleString()}{" "}
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
      </CardContent>
      <CardFooter>
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
