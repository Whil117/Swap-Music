import Track from '@Components/Track/Track'
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
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { FC, useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'

type Artist = {
  Artist: SpotifyApi.SingleArtistResponse
  Popular: SpotifyApi.ArtistsTopTracksResponse
}

const Artist: FC<Artist> = ({ Artist, Popular }) => {
  const [display, setDisplay] = useState(true)
  const [color, setColor] = useState<string[]>([])
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
      <div>
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
            See more
          </Button>
        </Div>
      </div>
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

  return {
    props: {
      Artist,
      Popular,
    },
  }
}

export default Artist
