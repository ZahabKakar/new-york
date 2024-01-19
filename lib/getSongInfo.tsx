/**
 * Retrieves the song information from Spotify
 *
 * @returns {Promise<Song>} A promise that resolves to the song's data
 */
import { SpotifyResponse } from "@/types/song";
import axios from "axios";

const SPOTIFY_KEY = process.env.SPOTIFY_API_KEY;

const getSongInfo = async (name: string, artist: string) => {
  const { data } = await axios.get<SpotifyResponse>(
    `https://api.spotify.com/v1/search?q=${name}%2520artist%3A${artist}&type=track&limit=1`,
    {
      headers: {
        Authorization: "Bearer " + SPOTIFY_KEY,
      },
    }
  );

  const song = data.tracks.items[0];

  return song;
};

export default getSongInfo;
