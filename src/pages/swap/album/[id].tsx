import OrganismBanner from '@Components/@organisms/OrganismBanner'
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import Track from '@Components/Track/Track'
import { Cards } from '@Styles/components/Cards'
import { ArtistWrapper } from '@Styles/pages/swap/artist'
import Button from '@Whil/components/Button'
import Div from '@Whil/components/Div'
import Svg from '@Whil/components/Svg'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { Dispatch, FC, SetStateAction } from 'react'
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
      <Div
        styles={{
          display: 'flex',
          flexdirection: 'row',
          flexwrap: 'wrap',
          width: '93%',
          justifycontent: 'space-between',
          margin: '20px 60px',
        }}
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
        <Div
          styles={{
            width: '100%',
          }}
        >
          {data.map((item) => (
            <Div
              key={item.id}
              styles={{
                width: '100%',
              }}
            >
              <SectionProps
                Elements={({
                  show,
                  setShow,
                }: {
                  show: boolean
                  setShow: Dispatch<SetStateAction<boolean>>
                }) => (
                  <Div
                    styles={{
                      width: '100%',
                      flexdirection: 'row',
                      justifycontent: 'flex-start',
                    }}
                  >
                    <h2>{item.title}</h2>
                    <Button
                      props={{ type: 'submit', style: { padding: '5px ' } }}
                      click={() => setShow(!show)}
                    >
                      <Svg src="/icons/list" />
                    </Button>
                  </Div>
                )}
              >
                {({ show }: { show: boolean }) => (
                  <>
                    <Cards {...{ show, width: true, assets: item.assets }}>
                      {item.assets
                        .filter((a) => a.name !== Album.name)
                        ?.map((artist) => (
                          <Card
                            key={artist.id}
                            {...{
                              id: artist.id,
                              type: artist.type,
                              image: artist.images[0].url,
                              name: artist.name,
                            }}
                          />
                        ))}
                    </Cards>
                  </>
                )}
              </SectionProps>
            </Div>
          ))}
        </Div>
      </Div>
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
