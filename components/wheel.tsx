"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const reset = [
  {
    option: "Kielo",
    style: { backgroundColor: "white" },
  },
  { option: "Perry" },
  { option: "Allen" },
  { option: "Leanne", style: { backgroundColor: "white" } },
  { option: "Klark", style: { backgroundColor: "white" } },
  { option: "Ashton" },
];

export default ({
  handleUpdateTeam,
}: {
  handleUpdateTeam: (turn: "A" | "B", change: string) => void;
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);
  const [turn, setTurn] = useState<"A" | "B">("A");
  const [done, setDone] = useState(false);

  const [choices, setChoices] = useState<string[]>(reset.map((d) => d.option));

  const [data, setData] = useState<any[]>(reset);

  const handleSpinClick = () => {
    if (!mustSpin && data.length >= 2 && !done) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <>
      <div onClick={handleSpinClick}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={() => {
            setMustSpin(false);

            if (data.length === 2) {
              handleUpdateTeam("A", choices[prizeNumber]);
              handleUpdateTeam(
                "B",
                choices.find((d) => d !== choices[prizeNumber]) || ""
              );

              setData(reset);
              setDone(true);
            } else {
              if (choices[prizeNumber]) {
                handleUpdateTeam(turn, choices[prizeNumber]);
                setTurn((prev) => (prev === "A" ? "B" : "A"));
              }
            }

            setChoices((prev) => {
              return prev.filter((d) => d !== prev[prizeNumber]);
            });
            setData((prev) => {
              return prev.filter((d) => d !== prev[prizeNumber]);
            });
          }}
          pointerProps={{
            style: {
              color: "black",
            },
          }}
          spinDuration={0.1}
          outerBorderWidth={10}
          disableInitialAnimation={true}
        />
      </div>
    </>
  );
};
