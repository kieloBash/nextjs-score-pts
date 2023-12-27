"use client";
import React from "react";
import { useFortuneContext } from "../context";

const Display = ({ answer, price }: { answer: string; price: number }) => {
  const splitted = answer.toLocaleUpperCase().split(" ");

  const { guessed } = useFortuneContext();
  return (
    <section className="flex flex-wrap gap-4 w-full max-w-[60rem] justify-center items-center">
      {splitted.map((word, i) => {
        const wordArr = word.split("");
        return (
          <div className="flex" key={i}>
            {wordArr.map((letter) => {
              let shown = false;
              if (guessed.includes(letter)) shown = true;

              return (
                <Card key={letter} value={letter} shown={shown} price={price} />
              );
            })}
            <div className="w-12 h-full" />
          </div>
        );
      })}
    </section>
  );
};

const Card = ({
  value,
  shown,
  price,
}: {
  value: string;
  shown: boolean;
  price: number;
}) => {
  return (
    <div
      className={`bg-green-600 text-white w-[5rem] h-[6.5rem] border-2 flex justify-center items-center text-6xl rounded-sm relative`}
    >
      {shown ? (
        <>
          <div className="absolute text-xs font-black top-2 right-2">
            {price}
          </div>
          {value}
        </>
      ) : null}
    </div>
  );
};

export default Display;
