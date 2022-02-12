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
import { FC, useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'

type Props = {
  Album: SpotifyApi.SingleAlbumResponse
  Artist: SpotifyApi.SingleArtistResponse
}

const Album: FC<Props> = ({ Album, Artist }) => {
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
          </LikedSongsProps>
        </Div>
      </LikedSongsWrapper>
      <pre>{JSON.stringify(Album, null, 2)}</pre>
    </ArtistWrapper>
  )
}
export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query
  const Session = await getSession(context)
  spotifyAPI.setAccessToken(Session?.accessToken as string)

  const Album = await spotifyAPI.getAlbum(id as string).then((res) => res.body)
  const ArtistId = Album?.artists?.find((artist) => artist?.id)?.id

  const Artist = await spotifyAPI
    .getArtist(ArtistId as string)
    .then((artist) => artist.body)
  // const Artists = await spotifyAPI.getAccessToken(Album.artists.filter((artist)=> artist.id))
  return {
    props: {
      Album,
      Artist,
    },
  }
}
export default Album
