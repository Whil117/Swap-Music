import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { FC } from 'react'

type Props = {}

const Playlist: FC<Props> = ({ Playlist }) => {
  console.log(Playlist)

  return (
    <div>
      <h1>Playlist</h1>
    </div>
  )
}
export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  const Session = await getSession(context)
  spotifyAPI.setAccessToken(Session?.accessToken as string)

  const Playlist = await spotifyAPI
    .getPlaylist(id as string)
    .then((res) => res.body)
  return {
    props: {
      Playlist,
    },
  }
}

export default Playlist
