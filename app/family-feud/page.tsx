import { Anton } from "next/font/google";
import Image from "next/image";

import FamPic from "/public/pics/fam-pic.jpg";
import StartButton from "@/components/feud/buttons/startbtn";
// import AddRoundModal from "@/components/feud/modal/add-round";
// import RoundsDisplay from "@/components/feud/displays/rounds";
// import AddBonusRoundModal from "@/components/feud/modal/add-bonus-round";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const FamilyFeudPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1 w-full h-full">
      <div className="absolute z-0 w-[40rem] aspect-video top-0 shadow-xl border-8 border-blue-900 rounded-2xl overflow-hidden">
        <Image alt="Pic" src={FamPic} fill objectFit={"cover"} />
      </div>
      <h1
        className={`${anton.className} mt-60 text-center text-[10rem] leading-none text-blue-700 drop-shadow-md`}
      >
        Family Feud
      </h1>
      {/* <RoundsDisplay /> */}
      <StartButton selection />
      {/* <AddRoundModal />
      <AddBonusRoundModal /> */}
    </div>
  );
};

export default FamilyFeudPage;
