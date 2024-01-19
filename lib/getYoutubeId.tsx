/**
 * Retrieves the youtube id
 *
 * @returns {Promise<String>} A promise that resolves to the youtube id
 *
 */
import axios from "axios";
import { YoutubeResponse } from "@/types/youtube";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const getYoutubeId = async (name: String, artist: String) => {
  const { data } = await axios.get<YoutubeResponse>(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${
      name + " " + artist
    } &type=video&key=${YOUTUBE_API_KEY}`
  );

  return data.items[0].id;
};

export default getYoutubeId;
