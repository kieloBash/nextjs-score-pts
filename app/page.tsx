import Display from "@/components/display";
import { FormPlayer } from "@/components/form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-gradient-to-r from-blue-800 to-indigo-900">
      <div className="mb-8 font-black text-white text-8xl">Player Scores</div>
      <Display />
      {/* <FormPlayer /> */}
    </main>
  );
}
