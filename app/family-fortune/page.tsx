import StartButton from "@/components/fortune/global/startbtn";
import { Anton } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
});

const FamilyFortunePage = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <h1
        className={`${anton.className} text-center text-9xl text-green-300 drop-shadow-md`}
      >
        Family <br /> Fortune
      </h1>
      <StartButton selection />
    </div>
  );
};

export default FamilyFortunePage;
