"use client";
import React, { useEffect, useState } from "react";
import { useFortuneContext } from "./context";
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
    option: "Team A",
    style: { backgroundColor: "green" },
  },
  {
    option: "Team B",
    style: { backgroundColor: "red" },
  },
];

const WheelTurnComponent = ({
  setTurnSelected,
}: {
  setTurnSelected: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);

  const [data] = useState<any[]>(reset);
  const { setTurn } = useFortuneContext();

  const handleSpinClick = () => {
    if (!mustSpin) {
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
            if (prizeNumber === 0) setTurn("A");
            else setTurn("B");
            setTurnSelected();
          }}
          outerBorderWidth={10}
          disableInitialAnimation={true}
        />
      </div>
    </>
  );
};

export default WheelTurnComponent;
