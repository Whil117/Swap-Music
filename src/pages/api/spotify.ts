import spotifyAPI from 'lib/spotify/spotify'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'

type Session = {
  accessToken: string
}

type Actions = {
  query: {
    type: string
    id?: string
  }
}

export default async function handler(req: Actions, res: NextApiResponse) {
  const session: JWT | null | Session = await getToken({
    req: req as unknown as NextApiRequest,
    secret: process.env.NEXTAUTH_SECRET as string,
  })
  spotifyAPI.setAccessToken(session?.accessToken as string)

  // const TypesData: any = {
  //   getArtistAlbums: async (artistId: string) => {
  //     await spotifyAPI
  //       .getArtistAlbums(artistId)
  //       .then((data) => res.json(data.body))
  //   },
  //   getFollowedArtists: async () => {
  //     await spotifyAPI.getFollowedArtists().then((data) => res.json(data.body))
  //   },
  // }
  // const handler = TypesData[req.query.type]
  await spotifyAPI
    .getArtistAlbums(req.query.id as string)
    .then((data) => res.json(data.body))
  // handler
  //   ? await handler(req.query.id as string)
  //   : res.json({
  //       error: 'Invalid request type',
  //     })
}
export const config = {
  api: {
    bodyParser: false,
  },
}
