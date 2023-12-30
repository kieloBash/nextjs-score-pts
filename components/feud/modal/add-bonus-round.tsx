"use client";
import React, { useState } from "react";

// UI
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
import { Loader2, LucideMessageCircleWarning } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQueryClient } from "@tanstack/react-query";
import { addFeudBonusRound, addFeudRound } from "@/lib/actions/game";

export interface AnswerType {
  answer: string;
  score: number;
}

const AddBonusRoundModal = () => {
  const [currAnswer, setCurrAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [currScore, setCurrScore] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [doubled, setDoubled] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  async function handleSubmit() {
    if (!currAnswer && currScore === 0 && !question) return null;
    setIsLoading(true);

    // const res = await addFeudBonusRound({
    //   question,
    //   answer: currAnswer,
    //   score: currScore,
    //   doubled,
    // });

    // if (res) {
    //   setIsLoading(false);
    //   setOpen(false);
    //   setCurrAnswer("");
    //   setCurrScore(0);

    //   queryClient.invalidateQueries({
    //     queryKey: [`feud-rounds:bonus`],
    //   });
    // }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="fixed z-10 bottom-[70px] right-6">
          <Button variant={"secondary"} className="w-10 h-10 p-1 rounded-full">
            <LucideMessageCircleWarning />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Bonus Question</DialogTitle>
          <DialogDescription>
            You can add a new bonus question here, just input the answers and
            their corresponding scores.
          </DialogDescription>
        </DialogHeader>

        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="question" className="text-right">
            Question:
          </Label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question..."
            id="question"
            rows={1}
            className="col-span-3 p-2 text-sm border rounded-md outline-none"
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="answer" className="text-right">
            Answer:
          </Label>
          <Input
            value={currAnswer}
            onChange={(e) => setCurrAnswer(e.target.value)}
            type="text"
            id="answer"
            className="col-span-3"
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="score" className="text-right">
            Score
          </Label>
          <Input
            value={currScore}
            onChange={(e) => setCurrScore(Number(e.target.value))}
            type="number"
            id="score"
            className="col-span-3"
          />
        </div>
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="doubled" className="text-right">
            Doubled
          </Label>
          <Select
            defaultValue={"false"}
            value={doubled ? "true" : "false"}
            onValueChange={(e) => setDoubled(e === "true" ? true : false)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select One" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"true"}>True</SelectItem>
              <SelectItem value={"false"}>False</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button disabled={isLoading} type="button" onClick={handleSubmit}>
            Confirm{" "}
            {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBonusRoundModal;
