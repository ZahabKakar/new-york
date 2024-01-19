import getSongInfo from "@/lib/getSongInfo";
import getYoutubeId from "@/lib/getYoutubeId";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { song, artist } = await request.json();

  const spotifyInfo = await getSongInfo(song, artist);
  const youtubeId = await getYoutubeId(song, artist);

  return NextResponse.json({
    ...youtubeId,
    ...spotifyInfo,
  });
}
