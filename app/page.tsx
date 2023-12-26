import Display from "@/components/display";
import { FormPlayer } from "@/components/form";
import TotalDisplay from "@/components/total";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-gradient-to-r from-blue-800 to-indigo-900">
      <TotalDisplay />
      <Display />
      {/* <FormPlayer /> */}
    </main>
  );
}
