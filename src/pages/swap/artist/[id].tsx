import Card from '@Components/Cards/Card'
import List from '@Components/List'
import Track from '@Components/Track/Track'
import { Cards } from '@Styles/components/Cards'
import { ArtistWrapper } from '@Styles/pages/swap/artist'
import {
  LikedSongsProps,
  LikedSongsWrapper,
} from '@Styles/pages/swap/liked songs'
import FollowNumbers from '@Utils/Followers'
import Button from '@Whil/components/Button'
import Div from '@Whil/components/Div'
import Image from '@Whil/components/Image'
import P from '@Whil/components/P'
import Svg from '@Whil/components/Svg'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'

type Artist = {
  Artist: SpotifyApi.SingleArtistResponse
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
  Popular: SpotifyApi.ArtistsTopTracksResponse
  ArtistRelated: SpotifyApi.ArtistsRelatedArtistsResponse
}

const Artist: FC<Artist> = ({
  Artist,
  Popular,
  ArtistAlbums,
  ArtistRelated,
}) => {
  const [display, setDisplay] = useState(true)
  const [color, setColor] = useState<string[]>([])
  const data = [
    {
      id: '1',
      title: 'Albums',
      assets: ArtistAlbums.items,
    },
    {
      id: '2',
      title: 'Similiar Artists',
      assets: ArtistRelated.artists,
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
            src={Artist.images[0].url}
            getColors={(colors: string[]) => setColor(colors)}
          />

          <Image
            src={Artist.images[0].url}
            width={240}
            height={240}
            alt={Artist.name}
            styles={{
              borderRadius: '50%',
            }}
          />
          <LikedSongsProps>
            <h4>{Artist.type.toUpperCase()}</h4>
            <h1>{Artist.name}</h1>
            <P
              styles={{
                margin: '20px 1px',
                fontSize: '18px',
                opacity: 0.5,
              }}
            >
              {FollowNumbers(Artist.followers.total)}
            </P>
          </LikedSongsProps>
        </Div>
      </LikedSongsWrapper>
      <Div
        styles={{
          display: 'flex',
          flexdirection: 'row',
          flexwrap: 'wrap',
          width: '57%',
          justifycontent: 'space-between',
          margin: '20px 60px',
        }}
      >
        <Div
          styles={{
            display: 'flex',
            flexdirection: 'row',
            flexwrap: 'wrap',
            justifycontent: 'space-between',
          }}
        >
          <h2>Popular</h2>
          {Popular.tracks
            .filter((_, index) => (display ? index < 5 : index < 10))
            .map((track, index) => (
              <Track
                key={track.id}
                {...{
                  id: track.id,
                  name: track.name,
                  artists: [],
                  image: track.album.images[0].url,
                  count: index,
                  album: track.album,
                  duration: track.duration_ms,
                  saved: false,
                  styles: {
                    width: {
                      song: '50%',
                      album: '36%',
                    },
                  },
                }}
              />
            ))}
          <Button props={{ type: 'none' }} click={() => setDisplay(!display)}>
            {display ? 'Show More' : 'Show Less'}
          </Button>
        </Div>
        {data.map((item) => (
          <div key={item.id}>
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
                <Cards {...{ show, width: true }}>
                  {item.assets?.map((artist) => (
                    <Card
                      key={artist.id}
                      {...{
                        id: artist.id,
                        type: artist.type,
                        image: artist?.images[0]?.url,
                        name: artist.name,
                      }}
                    />
                  ))}
                </Cards>
              )}
            </List>
          </div>
        ))}
      </Div>
      {/* <pre>{JSON.stringify(ArtistRelated, null, 3)}</pre> */}
    </ArtistWrapper>
  )
}
export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  const Session = await getSession(context)
  spotifyAPI.setAccessToken(Session?.accessToken as string)

  const Artist = await spotifyAPI
    .getArtist(id as string)
    .then((artist) => artist.body)
  const Popular = await spotifyAPI
    .getArtistTopTracks(id as string, 'US')
    .then((releases) => releases.body)

  const ArtistAlbums = await spotifyAPI
    .getArtistAlbums(id as string)
    .then((releases) => releases.body)

  const ArtistRelated = await spotifyAPI
    .getArtistRelatedArtists(id as string)
    .then((releases) => releases.body)

  return {
    props: {
      Artist,
      ArtistAlbums,
      ArtistRelated,
      Popular,
    },
  }
}

export default Artist
