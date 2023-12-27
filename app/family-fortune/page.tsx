import { HelpDialog } from "@/components/fortune/global/helpbtn";
import RoundsDisplay from "@/components/fortune/global/rounds-display";
import StartButton from "@/components/fortune/global/startbtn";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const FamilyFortunePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center flex-1">
      <RoundsDisplay />
      <h1
        className={`${anton.className} text-center text-9xl text-green-300 drop-shadow-md`}
      >
        Family <br /> Fortune
      </h1>
      <StartButton selection />
      <HelpDialog />
    </div>
  );
};

export default FamilyFortunePage;
