"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
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

  const handleSubmit = async () => {
    const { data } = await axios.post("http://localhost:3000/api/", {
      song: name,
      artist: artist,
    });
    setVideoId(data.videoId);
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

        <Button className="w-24 h-12 m-2" onClick={handleSubmit}>
          Go!
        </Button>
      </div>
      <div className="main flex w-full h-64 bg-red-100 ">
        <div className="w-2/3 h-64">
          <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} />
        </div>
        <div className="w-1/3 h-64">
          <h1>lyrics</h1>
        </div>
      </div>
    </main>
  );
}
