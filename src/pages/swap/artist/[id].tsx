import { ArtistWrapper } from '@Styles/pages/swap/artist'
import {
  LikedSongsProps,
  LikedSongsWrapper,
} from '@Styles/pages/swap/liked songs'
import FollowNumbers from '@Utils/Followers'
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
}

const Artist: FC<Artist> = ({ Artist }) => {
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
  return {
    props: {
      Artist,
    },
  }
}

export default Artist
