"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Link from "next/link";
export default function Home() {
  const [name, setName] = useState<String | undefined>("");
  const [artist, setArtist] = useState<String | undefined>("");
  const [videoId, setVideoId] = useState<String | undefined>("");
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="header  w-full h-24 bg-blue-200 flex items-center">
        <Input
          className="w-22 h-12 m-2"
          type="text"
          placeholder="Song name"
          onChange={handleName}
        />
        <Input
          className="w-22 h-12 m-2"
          type="text"
          placeholder="Artist"
          onChange={handleArtist}
        />

        <Link href={`/song?name=${name}&artist=${artist}`}>
          <Button className="w-24 h-12 m-2">Go!</Button>
        </Link>
      </div>
    </main>
  );
}
