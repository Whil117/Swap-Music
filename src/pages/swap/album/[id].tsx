import AtomSectionHeader from '@Components/@atoms/AtomSection/Header'
import OrganismBanner from '@Components/@organisms/OrganismBanner'
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import Track from '@Components/Track/Track'
import { css } from '@emotion/react'
import { ArtistWrapper } from '@Styles/pages/swap/artist'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { FC } from 'react'
import { SwiperSlide } from 'swiper/react'
type Props = {
  Album: SpotifyApi.SingleAlbumResponse
  Artist: SpotifyApi.SingleArtistResponse
  TracksAlbum: SpotifyApi.AlbumTracksResponse
  DurationTracks: number
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
}

const Album: FC<Props> = ({
  Album,
  TracksAlbum,
  ArtistAlbums,
  DurationTracks: ms,
}) => {
  const data = [
    {
      id: '1',
      title: 'Albums',
      assets: ArtistAlbums.items,
    },
  ]

  return (
    <ArtistWrapper>
      <OrganismBanner
        title={Album.name}
        id={Album.artists[0].id}
        name={Album.artists[0].name}
        image_url={Album.images[0].url}
        type={Album.album_type}
        release_date={Album.release_date}
        total_tracks={Album.total_tracks}
        useTime={{
          ms,
        }}
      />
      <AtomWrapper
        css={css`
          display: flex;
          alig-items: flex-start;
          margin: 0 60px;
          flex-direction: column;
          @media (max-width: 768px) {
            margin: 0 20px;
          }
        `}
      >
        {TracksAlbum.items.map((track, idx) => (
          <Track
            key={track.id}
            {...{
              id: track.id,
              count: idx,
              name: track.name,
              artists: track.artists,
              duration: track.duration_ms,
              album: {},
              duration_ms: track.duration_ms,
              saved: false,
              styles: {
                width: {
                  song: '90%',
                },
              },
            }}
          />
        ))}

        {data.map((item) => (
          <AtomWrapper key={item.id}>
            <SectionProps
              Elements={({ setShow }) => (
                <AtomSectionHeader setShow={setShow} title={item.title} />
              )}
            >
              {item.assets?.map((artist) => (
                <SwiperSlide key={artist.id} style={{ width: 'auto' }}>
                  <Card
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
    </ArtistWrapper>
  )
}
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

  const Artist = await spotifyAPI
    .getArtist(ArtistId as string)
    .then((artist) => artist.body)

  const ArtistAlbums = await spotifyAPI
    .getArtistAlbums(Artist.id)
    .then((releases) => releases.body)

  const TracksAlbum = await spotifyAPI
    .getAlbumTracks(id as string)
    .then((res) => res.body)

  return {
    props: {
      Album,
      ArtistAlbums,
      DurationTracks,
      TracksAlbum,
      Artist,
    },
  }
}
export default Album
