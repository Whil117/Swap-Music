/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import AtomSectionHeader from '@Components/@atoms/AtomSection/Header'
import AtomTable from '@Components/@atoms/AtomTable'
import OrganismBanner from '@Components/@organisms/OrganismBanner'
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import { css } from '@emotion/react'
import useTime from '@Hooks/useTime'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Button from '@Whil/components/Button'
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
    // {
    //   id: '3',
    //   title: `Your Favorites Albums from ${Artist.name}`,
    //   assets: user.SavedAlbums?.items?.filter((item) =>
    //     item.album.artists.find((artist) => artist.name === Artist.name)
    //   ),
    // },
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
        flexDirection="column"
        css={css`
          display: flex;
          width: 100%;
          justify-content: space-between;
          @media (max-width: 768px) {
            width: auto;
          }
        `}
      >
        <OrganismBanner
          image_url={Artist.images[0].url}
          name={Artist.name}
          title={Artist.name}
          borderRadiusImage={'50%'}
          followers={Artist?.followers?.total as unknown as number}
          type={Artist.type}
          fullData={Artist}
        />

        <AtomWrapper
          padding="0 90px"
          css={css`
            @media (max-width: 980px) {
              padding: 0 30px;
            }
          `}
        >
          <AtomText as="h2">Popular</AtomText>
          <AtomTable
            tableWidth="1440px"
            customCSS={css`
              tbody {
                tr {
                  height: 60px;
                }
              }
            `}
            columns={[
              {
                id: 'position&play',
                title: '',
                customCSS: css`
                  text-align: center;
                `,
                view: (item, index) => <AtomText as="p">{index}</AtomText>,
              },

              {
                id: 'songname',
                customCSS: css`
                  padding: 0px;
                `,
                title: '',
                view: (item) => {
                  return (
                    <>
                      <AtomText as="p" fontSize="16px" fontWeight="normal">
                        {item?.name}
                      </AtomText>
                    </>
                  )
                },
              },
              {
                id: 'album',
                title: '',
                view: (item) => (
                  <AtomButton
                    onClick={() => {
                      router
                        .push({
                          pathname: `/swap/album/[id]`,
                          query: {
                            id: item?.album.id,
                          },
                        })
                        .then(() => {
                          document?.getElementById('view')?.scroll({
                            top: 0,
                          })
                        })
                    }}
                  >
                    <AtomText as="span" textDecoration="underline">
                      {item?.album.name}
                    </AtomText>
                  </AtomButton>
                ),
              },
              {
                id: 'duration',
                title: '',
                view: (item) => {
                  const [hours, minutes, seconds] = useTime({
                    ms: item?.duration_ms,
                  })
                  return (
                    <AtomText as="p">
                      {' '}
                      {hours ? `${hours} ${minutes}` : ''}
                      {!hours
                        ? `${minutes}:${
                            seconds?.toFixed(0).length === 1
                              ? `0${seconds.toFixed()}`
                              : seconds?.toFixed()
                          }`
                        : ''}
                    </AtomText>
                  )
                },
              },
            ]}
            data={Popular.tracks.filter((_, index) =>
              display ? index < 5 : index < 10
            )}
          />
          <Button props={{ type: 'none' }} click={() => setDisplay(!display)}>
            {display ? 'Show More' : 'Show Less'}
          </Button>
        </AtomWrapper>
        <AtomWrapper
          width="1440px"
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
            <AtomWrapper key={item.id} width="100%  ">
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
        <AtomWrapper
          width="1440px"
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
          <SectionProps
            Elements={({ setShow }) => (
              <AtomSectionHeader
                setShow={setShow}
                title={`Your Favorites Albums from ${Artist.name}`}
              />
            )}
          >
            {user.SavedAlbums?.items
              ?.filter((item) =>
                item.album.artists.find((artist) => artist.name === Artist.name)
              )
              ?.map((artist, index) => (
                <SwiperSlide key={index} style={{ width: 'auto' }}>
                  <Card
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
        </AtomWrapper>
      </AtomWrapper>
    </>
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
ArtistById.Layout = 'swap'
export default ArtistById
