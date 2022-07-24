/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import AtomBanner from '@Components/@atoms/AtomBanner'
import AtomCard from '@Components/@atoms/AtomCard'
import AtomTrack from '@Components/@atoms/AtomTrack'
import SectionProps from '@Components/List'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import AtomButton from 'lib/Atombutton'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext, NextPageFC } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { SwiperSlide } from 'swiper/react'

type ArtistById = {
  Artist: SpotifyApi.SingleArtistResponse
  ArtistAlbums: SpotifyApi.ArtistsAlbumsResponse
  Popular: SpotifyApi.ArtistsTopTracksResponse
  ArtistRelated: SpotifyApi.ArtistsRelatedArtistsResponse
  id: string
}

const ArtistById: NextPageFC<ArtistById> = ({
  Artist,
  Popular,
  ArtistAlbums,
  ArtistRelated,
}) => {
  const [display, setDisplay] = useState(true)
  const user = useSelector((state: SelectFor) => state.user)
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

  const router = useRouter()

  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page={Artist.name}
        image={Artist.images[0].url}
        description={
          'Discover new music from artists all over the world' + Artist.name
        }
        keywords={['Swap', `${Artist.name}`]}
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
          type="artist"
          image_url={Artist.images[0].url}
          name={Artist.name}
          followers={Artist.followers.total}
        />
        <AtomWrapper
          padding="0 90px"
          maxWidth="1440px"
          css={css`
            @media (max-width: 980px) {
              padding: 0 30px;
            }
          `}
        >
          <AtomText as="h3" margin="10px">
            Popular
          </AtomText>
          {Popular.tracks
            .filter((_, index) => (display ? index < 5 : index < 10))
            .map((track, index) => (
              <AtomTrack
                key={track?.id}
                type="likedsongs"
                id={track?.album.id as string}
                likedSongs={{
                  id: track?.album.id,
                  name: track?.name,
                  preview_url: track?.preview_url as string,
                  position: index,
                  album: {
                    id: track?.album.id,
                    name: track?.album.name,
                    image: track?.album.images[0].url as string,
                  },
                  image: track?.album.images[0].url,
                  duration: track?.duration_ms,
                  artists: track?.artists,
                  context: Popular.tracks.map((track) => ({
                    id: track?.id,
                    name: track?.name,
                    preview_url: track?.preview_url as string,
                    position: index,
                    album: {
                      id: track?.album.id,
                      name: track?.album.name,
                      image: track?.album.images[0].url as string,
                    },
                    image: track?.album.images[0].url,
                    duration: track?.duration_ms,
                    artists: track?.artists,
                    type: 'likedsongs',
                  })),
                }}
              />
            ))}

          <AtomButton onClick={() => setDisplay(!display)}>
            {display ? 'Show More' : 'Show Less'}
          </AtomButton>
        </AtomWrapper>
        <AtomWrapper
          maxWidth="1440px"
          css={css`
            display: flex;
            alig-items: flex-start;
            padding: 0 90px;
            flex-direction: column;
            @media (max-width: 768px) {
              padding: 0 30px;
            }
          `}
        >
          {data.map((item) => (
            <AtomWrapper key={item.id} width="100%">
              <SectionProps title={item.title}>
                {item.assets?.map((artist) => (
                  <SwiperSlide key={artist.id} style={{ width: 'auto' }}>
                    <AtomCard
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
        <AtomWrapper
          maxWidth="1440px"
          css={css`
            display: flex;
            alig-items: flex-start;
            padding: 0 90px;
            flex-direction: column;
            @media (max-width: 768px) {
              padding: 0 30px;
            }
          `}
        >
          {user.SavedAlbums?.items?.filter((item) =>
            item.album.artists.find((artist) => artist.name === Artist.name)
          ).length > 0 && (
            <SectionProps title={`Your Favorites Albums from ${Artist.name}`}>
              {user.SavedAlbums?.items
                ?.filter((item) =>
                  item.album.artists.find(
                    (artist) => artist.name === Artist.name
                  )
                )
                ?.map((artist, index) => (
                  <SwiperSlide key={index} style={{ width: 'auto' }}>
                    <AtomCard
                      key={artist.album.id}
                      {...{
                        id: artist.album.id,
                        type: artist.album.type,
                        image: artist.album.images[0].url,
                        name: artist.album.name,
                      }}
                    />
                  </SwiperSlide>
                ))}
            </SectionProps>
          )}
        </AtomWrapper>
      </AtomWrapper>
    </>
  )
}
ArtistById.Layout = 'swap'

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

  ArtistById.Layout = 'swap'
  ArtistById.SEO = {
    title: Artist.name,
    description:
      'Discover new music from artists all over the world' + Artist.name,
    image: Artist.images[0].url,
    keywords: [`${Artist.name}`],
  }
  return {
    props: {
      id,
      Artist,
      ArtistAlbums,
      ArtistRelated,
      Popular,
    },
  }
}
export default ArtistById
