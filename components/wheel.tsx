"use client";
import React, { useEffect, useState } from "react";
// import { Wheel } from "react-custom-roulette";

interface WheelProps {
  mustStartSpinning: boolean;
  prizeNumber: number;
  data: any[];
  onStopSpinning: () => void;
  backgroundColors?: string[];
  textColors?: string[];
  outerBorderColor?: string;
  outerBorderWidth?: number;
  innerRadius?: number;
  innerBorderColor?: string;
  innerBorderWidth?: number;
  radiusLineColor?: string;
  radiusLineWidth?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  perpendicularText?: boolean;
  textDistance?: number;
  spinDuration?: number;
  startingOptionIndex?: number;
  disableInitialAnimation?: boolean;
}

let Wheel: React.FC<WheelProps>;

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

const WheelComponent = ({
  handleUpdateTeam,
}: {
  handleUpdateTeam: (turn: "A" | "B", change: string) => void;
}) => {
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    import("react-custom-roulette").then((module) => {
      Wheel = module.Wheel;
      setLoading(false);
    });
  }, []);

  if (loading || !Wheel) {
    return null; // Or some loading spinner
  }

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
          outerBorderWidth={10}
          disableInitialAnimation={true}
        />
      </div>
    </>
  );
};

export default WheelComponent;
