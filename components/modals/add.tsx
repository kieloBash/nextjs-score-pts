"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { addScore, updateScore } from "../temp/temp";
import { Loader2 } from "lucide-react";

export function AddModal({
  open,
  setOpen,
  selected,
}: {
  open: boolean;
  selected: string;
  setOpen: (e: boolean) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState<number>(0);

  const queryClient = useQueryClient();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const res = await addScore({ id: selected, points: score });

    if (res)
      queryClient.invalidateQueries({
        queryKey: [`players`],
      });

    setIsLoading(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Score</DialogTitle>
          <DialogDescription>
            Make changes to the player score.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="score" className="text-right">
              Score
            </Label>
            <Input
              id="score"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button disabled={isLoading} type="submit">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
