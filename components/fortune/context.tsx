"use client";
import * as React from "react";

export type TurnType = "A" | "B" | null;

export type FortuneContextType = {
  turn: TurnType;
  setTurn: (index: TurnType) => void;
  guessed: string[];
  setGuessed: (index: string[]) => void;
  roundScore: number;
  setRoundScore: (index: number) => void;
  mistake: number;
  setMistake: (index: number) => void;
};

export const FortuneContext = React.createContext<FortuneContextType>({
  turn: null,
  setTurn: (index: TurnType) => {},
  guessed: [],
  setGuessed: (index: string[]) => {},
  roundScore: 0,
  setRoundScore: (index: number) => {},
  mistake: 0,
  setMistake: (index: number) => {},
});

export const useFortuneContext = () => React.useContext(FortuneContext);

const FortuneProvider = ({ children }: { children: React.ReactNode }) => {
  const [turn, setTurn] = React.useState<TurnType>(null);
  const [guessed, setGuessed] = React.useState<string[]>([]);
  const [roundScore, setRoundScore] = React.useState<number>(0);
  const [mistake, setMistake] = React.useState<number>(0);

  return (
    <FortuneContext.Provider
      value={{
        turn,
        setTurn,
        guessed,
        setGuessed,
        roundScore,
        setRoundScore,
        mistake,
        setMistake,
      }}
    >
      {children}
    </FortuneContext.Provider>
  );
};

export default FortuneProvider;
