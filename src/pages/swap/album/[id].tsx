import AtomBanner from '@Components/@atoms/AtomBanner'
import AtomCard from '@Components/@atoms/AtomCard'
import SectionProps from '@Components/List'
import Track from '@Components/Track/Track'
import { css } from '@emotion/react'
import { ActionPlayerTracks } from '@Redux/reducers/player'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext, NextPageFC } from 'next'
import { getSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { SwiperSlide } from 'swiper/react'

type Props = {
  Album: SpotifyApi.SingleAlbumResponse
  Artist: SpotifyApi.SingleArtistResponse
  TracksAlbum: SpotifyApi.AlbumTracksResponse
  DurationTracks: number
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
  id: string
}
export const convertPlayerTracks = (
  dispatch: Dispatch<ActionPlayerTracks>,
  player: {
    id: string
    position: number
    data: SpotifyApi.TrackObjectSimplified[] | SpotifyApi.SavedTrackObject[]
  }
) => {
  dispatch({
    type: 'SETPLAYERTRACKS',
    payload: {
      tracks: player.data,
      position: player.position,
      currentTrackId: player.id,
      play: true,
    },
  })
}
const AlbumPage: NextPageFC<Props> = ({
  Album,
  TracksAlbum,
  ArtistAlbums,
  DurationTracks: ms,
  id,
}) => {
  const dispatch = useDispatch<Dispatch<ActionPlayerTracks>>()
  const data = [
    {
      id: '1',
      title: 'Albums',
      assets: ArtistAlbums.items,
    },
  ]

  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page={Album.name}
        description={
          "Swap is a music discovery platform that helps you find the music you're looking for." +
          Album.name
        }
        image={Album.images[0].url}
        keywords={[Album.album_type]}
      />
      <AtomWrapper
        css={css`
          width: 100%;
          @media (max-width: 980px) {
            width: auto;
          }
        `}
      >
        <AtomBanner
          type="album"
          image_url={Album.images[0].url}
          name={Album.name}
          album={{
            type: Album.album_type,
            artist: {
              name: Album.artists[0].name,
              id: Album.artists[0].id,
            },
            total_tracks: Album.total_tracks,
            release_date: Album.release_date,
            duration_ms: ms,
          }}
        />
        <AtomWrapper
          maxWidth="1440px"
          css={css`
            padding: 0 90px;
            flex-direction: column;
            @media (max-width: 980px) {
              width: auto;
              padding: 0 20px;
            }
          `}
        >
          {TracksAlbum.items.map((track, idx) => (
            <Track
              image={Album.images[0].url}
              context={TracksAlbum.items as []}
              {...track}
              key={track.id}
              album={{
                id: Album.id,
              }}
              type="album"
              site={{
                album: {
                  id: id,
                  name: Album.name,
                  image: Album.images[0].url,
                },
              }}
              position={idx}
              onPlayer={() => {
                convertPlayerTracks(dispatch, {
                  id: track?.id,
                  position: idx,
                  data: TracksAlbum?.items,
                })
              }}
            />
          ))}

          {data.map((item) => (
            <AtomWrapper key={item.id} width="100%  ">
              <SectionProps title={item.title}>
                {item.assets
                  ?.filter((asset) => asset.id !== id)
                  ?.map((artist) => (
                    <SwiperSlide
                      key={artist.id}
                      style={{
                        width: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <AtomCard
                        {...{
                          id: artist.id,
                          type: artist.type,
                          image: artist.images[0].url,
                          name: artist.name,
                        }}
                      />
                    </SwiperSlide>
                  ))}
              </SectionProps>
            </AtomWrapper>
          ))}
        </AtomWrapper>
      </AtomWrapper>
    </>
  )
}
AlbumPage.Layout = 'swap'

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  const Session = await getSession(context)
  spotifyAPI.setAccessToken(Session?.accessToken as string)

  const Album = await spotifyAPI.getAlbum(id as string).then((res) => res.body)

  const ArtistId = Album?.artists?.find((artist) => artist?.id)?.id
  const DurationTracks = Album.tracks.items.reduce(
    (acc, curr) => acc + curr.duration_ms,
    0
  )
  AlbumPage.Layout = 'swap'
  const Artist = await spotifyAPI
    .getArtist(ArtistId as string)
    .then((artist) => artist.body)

  const ArtistAlbums = await spotifyAPI
    .getArtistAlbums(Artist.id)
    .then((releases) => releases.body)

  const TracksAlbum = await spotifyAPI
    .getAlbumTracks(id as string)
    .then((res) => res.body)
  AlbumPage.SEO = {
    title: Album.name,
    image: Album.images[0].url,
    keywords: [Album.album_type],
  }

  return !Session?.accessToken
    ? {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: {},
      }
    : {
        props: {
          id,
          Album,
          ArtistAlbums,
          DurationTracks,
          TracksAlbum,
          Artist,
        },
      }
}
export default AlbumPage
