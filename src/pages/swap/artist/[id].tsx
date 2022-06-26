/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import AtomSectionHeader from '@Components/@atoms/AtomSection/Header'
import AtomTable from '@Components/@atoms/AtomTable'
import { colorBanner, titleBanner } from '@Components/@organisms/OrganismBanner'
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import { css } from '@emotion/react'
import useTime from '@Hooks/useTime'
import { ArtistWrapper } from '@Styles/pages/swap/artist'
import { SelectFor } from '@Types/redux/reducers/user/types'
import FollowNumbers from '@Utils/Followers'
import Button from '@Whil/components/Button'
import { useAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextPageContext, NextPageFC } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'
import { useSelector } from 'react-redux'
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
  const user = useSelector((state: SelectFor) => state.user.me.id)
  const [display, setDisplay] = useState(true)
  const [color, setColor] = useAtom(colorBanner)
  const [_, setTitle] = useAtom(titleBanner)
  useEffect(() => {
    setTitle(Artist.name)
  }, [Artist.name])

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

  const verifyAdmin = process.env.NEXT_PUBLIC_ADMIN === user
  const router = useRouter()

  return (
    <ArtistWrapper>
      <AtomWrapper
        css={css`
          height: 320px;
          display: flex;
          align-items: center;
          padding: 40px 90px;
          transition: all 0.3s ease;
          ${color[0] &&
          css`
            background: linear-gradient(
                180deg,
                rgba(90, 28, 28, 0) 0%,
                #121216 100%
              ),
              ${color[0]};
          `}
          @media (max-width: 642px) {
            height: auto;
            flex-direction: column;
          }
        `}
      >
        <AtomWrapper
          width="1440px"
          css={css`
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 20px;
            @media (max-width: 980px) {
              display: flex;
              width: auto;
              flex-direction: column;
            }
          `}
        >
          <ColorExtractor
            src={Artist.images[0]?.url}
            getColors={(colors: string[]) => setColor(colors)}
          />

          <AtomImage
            src={Artist.images[0].url}
            width={240}
            height={240}
            alt={Artist.name}
            borderRadius="50%"
          />
          <AtomWrapper
            css={css`
              display: grid;
              gap: 5px;
              @media (max-width: 980px) {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
            `}
          >
            <AtomText as="h4" fontWeight="600">
              {Artist.type.toUpperCase()}
            </AtomText>
            <AtomText
              as="h1"
              fontWeight="bold"
              fontSize="42px"
              css={css`
                @media (max-width: 980px) {
                  text-align: center;
                }
              `}
            >
              {Artist.name}
            </AtomText>
            <AtomText>{FollowNumbers(Artist.followers.total)}</AtomText>
            {verifyAdmin && (
              <AtomButton
                width="120px"
                padding="5px"
                color="white"
                fontWeight="bolder"
                backgroundColor={color[0]}
              >
                Add Artist
              </AtomButton>
            )}
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
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
