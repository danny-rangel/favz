import type { NextApiRequest, NextApiResponse } from 'next';

type MusicResponseData = {
  id: String
  albumTitle: String
  artist: String
  imageURL: String
}

function handler(req: NextApiRequest, res: NextApiResponse<[MusicResponseData]>) {
  if (req.method === 'POST') {
    const searchQuery = req.body.searchQuery;
    const reqURL = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchQuery}&api_key=${process.env.LASTFM_KEY}&format=json&limit=16`;

    fetch(reqURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      const responseData: [MusicResponseData] = data.results.albummatches.album.map((d: any, index: Number) => {
        return {
          id: `${d.artist}-${d.name}`,
          albumTitle: d.name,
          artist: d.artist,
          imageURL: d.image.at(-1)['#text'],
        };  
      });
      return res.status(200).json(responseData);
    });
  }
}

export default handler;