"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addFortuneRound } from "@/lib/actions/game";
import { FormEvent, useState } from "react";
import ListComponent from "./list";
import { useQueryClient } from "@tanstack/react-query";

const AddFortuneRoundsPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!question || !answer || price === 0) return null;
    setIsLoading(true);

    const res = await addFortuneRound({ question, answer, price });
    if (res) {
      setIsLoading(false);
      setQuestion("");
      setAnswer("");

      queryClient.invalidateQueries({
        queryKey: [`fortune-rounds`],
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
          <form onSubmit={handleSubmit} className="grid gap-8 py-4">
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
            <Button disabled={isLoading} variant={"fortune"} type="submit">
              Confirm
            </Button>
          </form>
        </article>
      </article>
    </>
  );
};

export default AddFortuneRoundsPage;
