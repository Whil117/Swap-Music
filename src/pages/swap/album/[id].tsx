import { ArtistWrapper } from '@Styles/pages/swap/artist'
import {
  LikedSongsProps,
  LikedSongsWrapper,
} from '@Styles/pages/swap/liked songs'
import Div from '@Whil/components/Div'
import Image from '@Whil/components/Image'
import P from '@Whil/components/P'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'
import useTime from '@Hooks/useTime'
import Track from '@Components/Track/Track'
import List from '@Components/List'
import Button from '@Whil/components/Button'
import { Cards } from '@Styles/components/Cards'
import Card from '@Components/Cards/Card'
import Svg from '@Whil/components/Svg'
type Props = {
  Album: SpotifyApi.SingleAlbumResponse
  Artist: SpotifyApi.SingleArtistResponse
  TracksAlbum: SpotifyApi.AlbumTracksResponse
  DurationTracks: number
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
}

const Album: FC<Props> = ({
  Album,
  Artist,
  TracksAlbum,
  ArtistAlbums,
  DurationTracks: ms,
}) => {
  const [color, setColor] = useState<string[]>([])

  const [hours, minutes, seconds] = useTime({
    ms,
  })

  const data = [
    {
      id: '1',
      title: 'Albums',
      assets: ArtistAlbums.items,
    },
  ]

  return (
    <ArtistWrapper>
      <LikedSongsWrapper color={color[0]}>
        <Div
          styles={{
            boxshadow: 'a',
            justifycontent: 'flex-start',
            flexdirection: 'row',
          }}
        >
          <ColorExtractor
            src={Album.images[0].url}
            getColors={(colors: string[]) => setColor(colors)}
          />

          <Image
            src={Album.images[0].url}
            width={240}
            height={240}
            alt={Album.name}
            styles={{
              borderRadius: '5px',
            }}
          />
          <LikedSongsProps>
            <h4>{Album.album_type.toUpperCase()}</h4>
            <h1>{Album.name}</h1>
            <Div
              styles={{
                width: '100%',
                justifycontent: 'flex-start',
                flexdirection: 'row',
              }}
            >
              <Link
                href={{
                  pathname: '/swap/artist/[id]',
                  query: { id: Artist.id },
                }}
                passHref
              >
                <a>
                  <P
                    styles={{
                      display: 'flex',
                      alignitems: 'center',
                      fontWeight: '600',
                      margin: '20px 1px',
                    }}
                  >
                    <Image
                      src={Artist.images[2].url}
                      width={30}
                      height={30}
                      alt={Artist.name}
                      styles={{
                        borderRadius: '50%',
                      }}
                    />
                    {Artist.name}
                  </P>
                </a>
              </Link>
              <P
                styles={{
                  opacity: 0.5,
                  margin: '0 5px',
                  width: 'auto',
                  fontSize: '15px',
                }}
              >
                • {Album.release_date.slice(0, 4)} • {Album.total_tracks} Songs,{' '}
                {hours ? `${hours} ${minutes}` : ''}{' '}
                {!hours
                  ? `${minutes} Min ${
                      seconds?.toFixed(0).length === 1
                        ? `0${seconds.toFixed()}`
                        : `${seconds?.toFixed()} Sec`
                    }`
                  : ''}
              </P>
            </Div>
          </LikedSongsProps>
        </Div>
      </LikedSongsWrapper>
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
              <List
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
                      justifycontent: 'space-between',
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
                      {item.assets?.map((artist) => (
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
              </List>
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
