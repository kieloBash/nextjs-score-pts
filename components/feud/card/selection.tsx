import React from "react";
import Image from "next/image";
import Allen from "/public/pics/allen.png";
import Kielo from "/public/pics/kielo.png";
import Klark from "/public/pics/klark.png";
import Perry from "/public/pics/perry.png";
import Ashton from "/public/pics/ashton.png";
import Leanne from "/public/pics/leanne.png";
const SelectionCard = ({ name }: { name: string }) => {
  let img;

  if (name === "Allen") img = Allen;
  if (name === "Kielo") img = Kielo;
  if (name === "Klark") img = Klark;
  if (name === "Perry") img = Perry;
  if (name === "Ashton") img = Ashton;
  if (name === "Leanne") img = Leanne;
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 bg-yellow-500 border-4 border-black rounded-md shadow-lg shadow-red-800">
      <div className="relative overflow-hidden rounded-full">
        <Image
          alt="Pic"
          src={img || ""}
          width={120}
          height={120}
          objectFit={"cover"}
        />
      </div>
      <span className="text-2xl font-black text-blue-700">{name}</span>
    </div>
  );
};

export default SelectionCard;
