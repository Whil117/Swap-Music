import OrganismBanner from '@Components/@organisms/OrganismBanner'
import { ArtistWrapper } from '@Styles/pages/swap/artist'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { FC } from 'react'

type Props = {
  Playlist: SpotifyApi.SinglePlaylistResponse
}

const Playlist: FC<Props> = ({ Playlist }) => {
  return (
    <ArtistWrapper>
      <OrganismBanner
        id={Playlist.id}
        title={Playlist.name}
        desc={Playlist.description as string}
        name={Playlist.owner.display_name as string}
        image_url={Playlist?.images[0]?.url}
        type={Playlist.type}
        release_date=""
        total_tracks={Playlist.tracks.total}
        useTime={{
          tracks: [...Playlist.tracks.items.map((item) => item.track)],
        }}
      />
      {/* <pre>{JSON.stringify(Playlist, null, 2)}</pre> */}
    </ArtistWrapper>
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
