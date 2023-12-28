"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

export function GuessModal({
  answer,
  handleCorrect,
  handleIncorrect,
}: {
  answer: string;
  handleCorrect: () => void;
  handleIncorrect: () => void;
}) {
  const [guess, setGuess] = useState<string>("");
  const [open, setOpen] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (guess === "") return null;
    if (
      guess.toLowerCase() === answer.toLowerCase() &&
      answer.toUpperCase() === guess.toUpperCase()
    ) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-8 py-2 text-2xl font-bold text-center text-white bg-green-500 border-2 border-white rounded-full">
          Guess
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Guess the answer</DialogTitle>
          <DialogDescription>
            Make a guess on what the answer may be, beware that a wrong answer
            will deduct a life!
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label className="text-right">Guess</Label>
            <Input
              className="col-span-3"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" variant={"fortune"}>
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
