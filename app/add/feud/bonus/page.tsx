"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addFeudBonusRound } from "@/lib/actions/game";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ListComponent from "./list";

export interface AnswerType {
  answer: string;
  score: number;
}

const reset = ["", "", "", "", ""];

const AddFuedRoundsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const [answersArr, setAnswersArr] = useState(reset);
  const [questionsArr, setQuestionsArr] = useState(reset);
  const [doubled, setDoubled] = useState(false);
  const [score, setScore] = useState<number | undefined>();

  async function handleSubmit() {
    console.log(answersArr, questionsArr, score, doubled);
    if (
      answersArr.some((d) => d === "") ||
      questionsArr.some((d) => d === "") ||
      !score
    )
      return null;
    setIsLoading(true);

    const res = await addFeudBonusRound({
      questions: questionsArr,
      answers: answersArr,
      score,
      doubled,
    });

    if (res) {
      setIsLoading(false);

      setScore(0);
      setAnswersArr(reset);
      setQuestionsArr(reset);

      queryClient.invalidateQueries({
        queryKey: [`feud-rounds:bonus`],
      });
    }
  }

  return (
    <>
      <h1 className="text-6xl font-bold text-blue-600 drop-shadow-md">
        Add Family Feud Bonus Rounds
      </h1>
      <article className="relative flex items-center justify-center flex-1 w-full h-full">
        <ListComponent />
        <article className="flex flex-col w-full max-w-[60rem] gap-10 px-20 py-10 mt-4">
          <div className="grid w-full grid-flow-row grid-cols-3 gap-4">
            <div className="col-span-1" />
            <Label className="text-center">Question</Label>
            <Label className="text-center">Answer</Label>
            {Array(5)
              .fill([])
              .map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="flex items-center justify-end text-lg font-bold text-right">
                      {index + 1}.
                    </div>
                    <Input
                      name="question"
                      value={questionsArr[index]}
                      onChange={(e) => {
                        const temp = [...questionsArr];
                        temp[index] = e.target.value;
                        setQuestionsArr(temp);
                      }}
                      className="w-full"
                    />
                    <Input
                      name="answer"
                      value={answersArr[index]}
                      className="w-full"
                      onChange={(e) => {
                        const temp = [...answersArr];
                        temp[index] = e.target.value;
                        setAnswersArr(temp);
                      }}
                    />
                  </React.Fragment>
                );
              })}
          </div>

          <Separator />

          <div className="flex w-full gap-4">
            <div className="grid items-center w-full grid-cols-4 gap-4">
              <Label htmlFor="score" className="text-right">
                Points
              </Label>
              <Input
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                type="number"
                id="score"
                className="col-span-3"
              />
            </div>
            <div className="grid items-center w-full grid-cols-4 gap-4">
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
          </div>

          <Button
            disabled={
              isLoading ||
              answersArr.some((d) => d === "") ||
              questionsArr.some((d) => d === "") ||
              !score
            }
            className="py-8 text-2xl font-bold"
            variant={"feud"}
            type="button"
            onClick={handleSubmit}
          >
            Confirm{" "}
            {isLoading && <Loader2 className="w-5 h-5 ml-2 animate-spin" />}
          </Button>
        </article>
      </article>
    </>
  );
};

export default AddFuedRoundsPage;
