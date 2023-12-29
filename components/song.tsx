"use client";
// Import the necessary modules
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Pause, Play } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SongMPThree = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [src, setSrc] = useState("");
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
        <audio ref={audioRef} src={src} autoPlay={false} loop />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            className="mt-10 cursor-pointer fixed bottom-4 left-4 z-[100]"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause /> : <Play />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Songs</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setSrc("/assets/bg-1.mp3");
              togglePlay();
            }}
          >
            Song 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSrc("/assets/bg-2.mp3");
              togglePlay();
            }}
          >
            Song 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSrc("/assets/bg-3.mp3");
              togglePlay();
            }}
          >
            Song 3
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SongMPThree;
