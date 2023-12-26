"use client";
import { Check, Pen, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
];

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
};

type CardProps = React.ComponentProps<typeof Card>;

const PlayerCard: React.FC<CardPropsWithPlayer> = ({
  className,
  player,
  handleOpenAdd,
  handleOpenEdit,
}) => {
  return (
    <Card className={cn("lg:w-[380px] w-[300px]", className)}>
      <CardHeader>
        <CardTitle className="font-bold capitalize">{player.name}</CardTitle>
        <CardDescription>
          You have played {player.gamesPlayed-1} games
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="text-4xl font-extrabold text-center">
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
