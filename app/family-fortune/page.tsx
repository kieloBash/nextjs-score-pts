import { HelpDialog } from "@/components/fortune/global/helpbtn";
import RoundsDisplay from "@/components/fortune/global/rounds-display";
import StartButton from "@/components/fortune/global/startbtn";
import { Anton } from "next/font/google";

import Image from "next/image";
import FamPic from "/public/pics/fam-pic.jpg";
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const FamilyFortunePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1 w-full h-full">
      <div className="absolute z-0 w-[40rem] aspect-video top-0 shadow-xl border-8 border-green-800 rounded-2xl overflow-hidden">
        <Image alt="Pic" src={FamPic} fill objectFit={"cover"} />
      </div>
      <h1
        className={`${anton.className} mt-60 text-center text-[10rem] leading-none text-green-400 drop-shadow-md`}
      >
        Family Fortune
      </h1>
      <RoundsDisplay />
      <StartButton selection />
      <HelpDialog />
    </div>
  );
};

export default FamilyFortunePage;
