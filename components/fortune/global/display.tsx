"use client";
import React from "react";
import { useFortuneContext } from "../context";

const Display = ({ answer, price }: { answer: string; price: number }) => {
  const splitted = answer.toLocaleUpperCase().split(" ");

  const { guessed } = useFortuneContext();
  return (
    <section className="flex flex-wrap items-center justify-center w-full gap-4">
      {splitted.map((word, i) => {
        const wordArr = word.split("");
        return (
          <div className="flex" key={i}>
            {wordArr.map((letter) => {
              let shown = false;
              if (guessed.includes(letter)) shown = true;

              return (
                <>
                  <Card
                    key={letter}
                    value={letter}
                    shown={shown}
                    price={price}
                  />
                </>
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
    <>
      <div
        className={`bg-green-600 text-white w-[4rem] h-[5rem] border-2 flex justify-center items-center text-6xl rounded-sm relative`}
      >
        {shown ? (
          <>
            <div className="absolute text-xs font-black top-1 right-1">
              {price}
            </div>
            {value}
          </>
        ) : null}
      </div>
    </>
  );
};

export default Display;
