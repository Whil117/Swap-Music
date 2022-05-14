import AtomSectionHeader from '@Components/@atoms/AtomSection/Header'
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import Track from '@Components/Track/Track'
import { css } from '@emotion/react'
import {
  ArtistBody,
  ArtistHeader,
  ArtistWrapper,
} from '@Styles/pages/swap/artist'
import {
  LikedSongsProps,
  LikedSongsWrapper,
} from '@Styles/pages/swap/liked songs'
import FollowNumbers from '@Utils/Followers'
import Button from '@Whil/components/Button'
import Div from '@Whil/components/Div'
import Image from '@Whil/components/Image'
import P from '@Whil/components/P'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext, NextPageFC } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'
import { SwiperSlide } from 'swiper/react'

type Artist = {
  Artist: SpotifyApi.SingleArtistResponse
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
  Popular: SpotifyApi.ArtistsTopTracksResponse
  ArtistRelated: SpotifyApi.ArtistsRelatedArtistsResponse
}

const Artist: NextPageFC<Artist> = ({
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
        <ArtistHeader>
          <ColorExtractor
            src={Artist.images[0]?.url}
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
        </ArtistHeader>
      </LikedSongsWrapper>
      <ArtistBody>
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
              <Track {...track} key={track.id} position={index} />
            ))}
          <Button props={{ type: 'none' }} click={() => setDisplay(!display)}>
            {display ? 'Show More' : 'Show Less'}
          </Button>
        </Div>
      </ArtistBody>
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
                      image: artist.images[0]?.url,
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
Artist.Layout = 'swap'
export default Artist
