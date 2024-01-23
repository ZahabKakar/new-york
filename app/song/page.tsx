"use client";

import React, { useEffect, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Song } from "@/types/song";
import axios from "axios";

const preprocessLyrics = (lyrics: string) => {
  // Add <br> before each timestamp and remove the timestamp
  if (!lyrics) {
    return;
  }
  const processedLyrics = lyrics.replace(/\[\d+:\d+\.\d+\]/g, `<br><br>`);

  return processedLyrics;
};

export default function Learn() {
  const params = useSearchParams();
  const song = params.get("name");
  const artist = params.get("artist");
  const [data, setData] = useState<Song>({});
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const res = await axios.post(
      `http://localhost:3000/api/name=${song}&artist=${artist}`
    );
    console.log(res.data);
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

  const processedLyrics = preprocessLyrics(data?.subtitle);

  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
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
            className="main flex w-full	h-screen   mx-4   "
            style={{
              overflow: "hidden",
            }}
          >
            <div
              className="w-2/3 h-screen  flex flex-col  m-auto p-4 pt-8  "
              style={{
                flex: "2",
                overflowY: "auto",
              }}
            >
              <YouTube videoId={data.videoId} opts={opts} />
              <div className=" h-screen">
                <div>
                  <div className="flex items-center">
                    <img
                      className="m-2 rounded-full"
                      src={data.album.images[2].url}
                    />
                    <div>
                      <p className="name text-sm  mt-2">artist name</p>
                      <p className="name text-sm  mb-2">music genre </p>
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
              <span className="text-white h-screen font-satoshi text-3xl">
                {ReactHtmlParser(processedLyrics)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
