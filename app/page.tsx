import Display from "@/components/display";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen p-20 bg-gradient-to-r from-blue-800 to-indigo-900">
      <Display />
      <Link href={"/add/feud"}>
        <Button variant={"feudSecondary"} className="absolute font-bold text-black right-4 bottom-4">Add Rounds</Button>
      </Link>
    </main>
  );
}
