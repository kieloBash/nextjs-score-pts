"use client";

import { addPlayer } from "@/components/temp/temp";
import { Button } from "@/components/ui/button";
import usePlayers from "@/hooks/usePlayers";

export default function Home() {
  const players = usePlayers();
  console.log(players);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        type="button"
        onClick={async () => {
          const res = await addPlayer({ name: "Kels" });
          if (res) alert("Success");
        }}
      >
        Add Player
      </Button>
    </main>
  );
}
