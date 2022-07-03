import AtomBanner from '@Components/public/@atoms/AtomBanner'
import * as cookie from 'cookie'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext, NextPageFC } from 'next'
type Props = {
  Album: SpotifyApi.SingleAlbumResponse
  Artist: SpotifyApi.SingleArtistResponse
  TracksAlbum: SpotifyApi.AlbumTracksResponse
  DurationTracks: number
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
  id: string
}

const AlbumId: NextPageFC<Props> = () => {
  return (
    <AtomWrapper>
      <h1>AlbumId</h1>
      <AtomBanner type="album" image_url="dsf" name="sdf" />
    </AtomWrapper>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  const { reserve_token } = cookie.parse(context.req?.headers.cookie as string)
  spotifyAPI.setAccessToken(reserve_token as string)

  const Album = await spotifyAPI.getAlbum(id as string).then((res) => res.body)

  const ArtistId = Album?.artists?.find((artist) => artist?.id)?.id
  // const DurationTracks = Album.tracks.items.reduce(
  //   (acc, curr) => acc + curr.duration_ms,
  //   0
  // )

  // const Artist = await spotifyAPI
  //   .getArtist(ArtistId as string)
  //   .then((artist) => artist.body)

  // const ArtistAlbums = await spotifyAPI
  //   .getArtistAlbums(Artist.id)
  //   .then((releases) => releases.body)

  // const TracksAlbum = await spotifyAPI
  //   .getAlbumTracks(id as string)
  //   .then((res) => res.body)
  AlbumId.SEO = {
    title: Album.name,
    image: Album.images[0].url,
    keywords: [Album.album_type],
  }

  return {
    props: {},
  }
}
AlbumId.Layout = 'public'

export default AlbumId
