"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addFeudRound } from "@/lib/actions/game";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import ListComponent from "./list";

export interface AnswerType {
  answer: string;
  score: number;
}

const AddFuedRoundsPage = () => {
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [currAnswer, setCurrAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [currScore, setCurrScore] = useState<number | undefined>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const checked = answers.length === 0 || !question ? true : false;

  async function handleSubmit() {
    if (answers.length === 0 || !question) return null;
    const sortedAnswers = [...answers]; // Create a copy of the array to avoid mutating the original state
    sortedAnswers.sort((a, b) => b.score - a.score);

    const answersArr = sortedAnswers.map((item: AnswerType) => item.answer);
    const scoresArr = sortedAnswers.map((item: AnswerType) => item.score);
    setIsLoading(true);

    const res = await addFeudRound({ answersArr, scoresArr, question });

    if (res) {
      setIsLoading(false);
      setAnswers([]);
      setCurrAnswer("");
      setCurrScore(undefined);

      queryClient.invalidateQueries({
        queryKey: [`feud-rounds`],
      });
    }
  }

  return (
    <>
      <h1 className="text-6xl font-bold text-blue-600 drop-shadow-md">
        Add Family Feud Rounds
      </h1>
      <article className="relative flex items-center justify-center flex-1 w-full h-full">
        <ListComponent />
        <article className="flex flex-col w-full max-w-2xl gap-10 px-20 py-10 mt-4">
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

          <div className="grid grid-flow-row grid-cols-5">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label className="mb-2 text-left">List of answers</Label>
              <div className="grid grid-cols-6 gap-2 font-medium">
                <Label className="col-span-4">Answer</Label>
                <Label className="col-span-2">Score</Label>
              </div>
              <div className="flex-1 flex flex-col justify-start gap-1 max-h-[10rem] overflow-y-auto">
                {answers.map((s, index) => {
                  return (
                    <div
                      key={index}
                      className="relative grid grid-cols-6 gap-2 px-2 py-2 transition border rounded-md cursor-pointer hover:bg-red-100"
                      onClick={() => {
                        const arr = [...answers];
                        arr.splice(index, 1);
                        setAnswers(arr);
                      }}
                    >
                      <div className="col-span-4">{s.answer}</div>
                      <div className="col-span-2">{s.score}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col col-span-3 gap-2 pl-10">
              <Label className="mb-2 text-left">Enter your new answers</Label>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="answer">Answer</Label>
                <Input
                  value={currAnswer}
                  onChange={(e) => setCurrAnswer(e.target.value)}
                  type="text"
                  id="answer"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="score">Score</Label>
                <Input
                  value={currScore}
                  onChange={(e) => setCurrScore(Number(e.target.value))}
                  type="number"
                  id="score"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end w-full">
            <Button
              disabled={answers.length >= 8}
              onClick={() => {
                if (currAnswer && currScore) {
                  if (currScore > 0) {
                    setAnswers((prev) => [
                      ...prev,
                      { answer: currAnswer, score: currScore },
                    ]);
                    setCurrAnswer("");
                    setCurrScore(0);
                  }
                }
              }}
              type="button"
              variant={"feud"}
              className="flex"
            >
              <Plus className="mr-2" /> <span className="">Add Answer</span>
            </Button>
          </div>
          <Button
            disabled={isLoading || checked}
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
