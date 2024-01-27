/**
 * Retrieves the song lyrics from Spotify
 *
//  */

import axios from "axios";

const getSubTitle = async (name: string, artist: string) => {
  const res = await axios.get<String>(
    `https://lyrics-api.lujjjh.com/?name=${name}&artist=${artist}`
  );

  console.log(res.data);

  return res.data;
};

export default getSubTitle;
