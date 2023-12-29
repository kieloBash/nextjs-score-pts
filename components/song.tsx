"use client";
// Import the necessary modules
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Pause, Play } from "lucide-react";

const SongMPThree = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Function to toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.autoplay = false;
    }
  }, []);

  return (
    <>
      <div className="">
        <audio ref={audioRef} src={src} autoPlay={false} loop/>
      </div>
      <Button
        type="button"
        className="mt-10 cursor-pointer fixed bottom-4 left-4 z-[100]"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>
    </>
  );
};

export default SongMPThree;
