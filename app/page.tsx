import Display from "@/components/display";
import SongMPThree from "@/components/song";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen p-20 bg-gradient-to-r from-blue-800 to-indigo-900">
      <Display />
      <SongMPThree src="/assets/bg-2.mp3" />
    </main>
  );
}
