"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addFortuneRound } from "@/lib/actions/game";
import { HelpCircleIcon } from "lucide-react";
import { FormEvent, useState } from "react";

export function HelpDialog() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!question || !answer || price === 0) return null;
    setIsLoading(true);

    const res = await addFortuneRound({ question, answer, price });
    if (res) {
      setOpen(false);
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="fixed z-10 bottom-6 right-6">
          <Button variant={"secondary"} className="w-10 h-10 p-1 rounded-full">
            <HelpCircleIcon />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Round</DialogTitle>
          <DialogDescription>
            Make additional rounds for players to play
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="question" className="text-right">
              Question
            </Label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id="question"
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="answer" className="text-right">
              Answer
            </Label>
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="answer"
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="PricePerBox" className="text-right">
              Price/Letter
            </Label>
            <Input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              id="PricePerBox"
              type="number"
              className="col-span-3"
            />
          </div>
          <Button
            disabled={isLoading}
            variant={"default"}
            type="submit"
            className="bg-red-500"
          >
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
