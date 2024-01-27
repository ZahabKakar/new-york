"use client";

import React, { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Song } from "@/types/song";
import axios from "axios";

export default function Learn() {
  const params = useSearchParams();
  const song = params.get("name");
  const artist = params.get("artist");
  const [data, setData] = useState<Song>();
  const [loading, setLoading] = useState(false);
  const [activeLine, setActiveLine] = useState("");
  const [processedLyrics, setProcessedLyrics] = useState("");

  const preprocessLyrics = (lyrics: string) => {
    if (!lyrics) {
      return;
    }

    return lyrics
      .split("\n")
      .map((line) => {
        const isActive = line === activeLine;

        const className = isActive ? "activeline" : "";

        return `<span class="${className}">${line}</span><br>`;
      })
      .join("");
  };

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.post(`http://localhost:3000/api`, {
      song: song,
      artist: artist,
    });
    setData(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const opts: YouTubeProps["opts"] = {
    height: "690",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  function timestamptoSecond(timestamp: string) {
    const parts = timestamp.split(":");
    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);

    const total = minutes * 60 + seconds;

    return total;
  }

  const getCurrentTime = (e: any) => {
    const currentTime = e.target.getCurrentTime();
    if (data) {
      const sub = data.subtitle;
      const lines = sub.split("\n");
      let activeLineIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(/\[(\d{2}:\d{2}\.\d{2,3})\]/);

        if (match) {
          const timestamp = match[1];
          const subtitleTime = timestamptoSecond(timestamp);

          if (Math.abs(subtitleTime - currentTime) < 0.5) {
            activeLineIndex = i;
            break;
          }
        }
      }

      if (activeLineIndex !== -1) {
        setActiveLine(lines[activeLineIndex]);
      } else {
        setActiveLine("");
      }
    }
  };

  useEffect(() => {
    setProcessedLyrics(preprocessLyrics(data?.subtitle as string));
  }, [data?.subtitle, activeLine]);

  // Use processedLyrics state in your component

  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <>
          {data?.videoId && (
            <div className="bg-black w-screen h-screen overflow-scrool">
              <img
                src={data.album.images[0].url}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: 0.4,
                  objectFit: "cover",
                  zIndex: -1,
                }}
              />
              <div
                className="main flex w-full h-screen mx-4 "
                style={{
                  overflow: "hidden",
                }}
              >
                <div
                  className="w-2/3 h-screen flex flex-col m-auto p-4 pt-8 "
                  style={{
                    flex: "2",
                    overflowY: "auto",
                  }}
                >
                  <YouTube
                    videoId={data.videoId}
                    opts={opts}
                    onStateChange={getCurrentTime}
                  />
                  <div className=" h-screen">
                    <div>
                      <div className="flex items-center">
                        <img
                          className="m-2 rounded-full"
                          src={data.album.images[2].url}
                        />

                        <div>
                          <p className="name text-sm mt-2">artist name</p>
                          <p className="name text-sm mb-2">music genre </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className=" w-1/3 max-h-screen "
                  style={{
                    flex: "1",
                    overflowY: "auto",
                    padding: "20px",
                  }}
                >
                  <span className="text-white h-screen font-satoshi text-3xl opacity-50">
                    {ReactHtmlParser(processedLyrics as string)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
