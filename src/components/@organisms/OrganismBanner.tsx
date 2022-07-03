/* eslint-disable no-unused-vars */
import AtomTracksDuration from '@Components/@atoms/AtomTracksDuration'
import SwapArtist from '@Components/swap/artist'
import { css } from '@emotion/react'
import UseColor from '@Hooks/UseColor'
import { UseTimeProps } from '@Hooks/useTime'
import FollowNumbers from '@Utils/Followers'
import { atom } from 'jotai'
import AtomImage from 'lib/AtomImage'
import AtomLink from 'lib/AtomLink'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { useRouter } from 'next/router'
import { FC } from 'react'

type Props = {
  id?: string
  title: string
  name: string
  desc?: string
  image_url?: string | undefined
  image_url_avatar?: string
  type: string
  release_date?: string
  total_tracks?: number
  useTime?: UseTimeProps
  borderRadiusImage?: string
  followers?: number
  fullData: SpotifyApi.SingleArtistResponse | SpotifyApi.SingleAlbumResponse
}

type PropsCses = {
  color: string
  fullData: SpotifyApi.SingleArtistResponse | SpotifyApi.SingleAlbumResponse
}

const typeCases = (data: PropsCses) => ({
  artist: (
    <SwapArtist
      color={data.color}
      Artist={data?.fullData as SpotifyApi.SingleArtistResponse}
    />
  ),
  album: 'Álbum',
  playlist: 'Playlist',
})

const stringToHTML = (str?: string) => {
  const parser = new DOMParser()

  const doc = parser.parseFromString(str as string, 'text/html')
  return doc.body
}

export const titleBanner = atom('')

export const colorBanner = atom<string[]>([])

const OrganismBanner: FC<Props> = (props) => {
  const router = useRouter()
  const colors = UseColor({ url: props.image_url as string })

  return (
    <AtomWrapper
      id="background-dynamic-color"
      css={css`
        height: 400px;
        display: flex;
        align-items: center;
        padding: 0px 90px;
        justify-content: flex-start;
        transition: all 0.3s ease;
        background: linear-gradient(
            180deg,
            rgba(100, 100, 100, 0) 0%,
            #121216 100%
          ),
          ${colors[0]};
        @media (max-width: 980px) {
          justify-content: center;
          width: 100%;
          height: 600px;
          padding: 0;
        }
      `}
    >
      <AtomWrapper
        css={css`
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 1440px;
          gap: 20px;

          @media (max-width: 980px) {
            flex-direction: column;
            width: auto;
            padding: 0;
          }
        `}
      >
        <AtomImage
          src={props.image_url || 'https://via.placeholder.com/150/92c952'}
          width={260}
          height={260}
          alt={props.name}
          borderRadius={props.borderRadiusImage || '10px'}
        />
        <AtomWrapper
          css={css`
            max-width: 1160px;
            display: grid;
            gap: 10px;
            /* width: 900px; */
            @media (max-width: 1440px) {
              width: 500px;
            }
            @media (max-width: 1240px) {
              width: 350px;
            }
            @media (max-width: 980px) {
              width: auto;
              margin: 0 10px;
            }
          `}
        >
          <AtomText
            as="p"
            fontWeight="bold"
            css={css`
              @media (max-width: 778px) {
                text-align: center;
              }
            `}
          >
            {props?.type?.toUpperCase()}
          </AtomText>
          <AtomText
            as="h1"
            fontWeight="bold"
            css={css`
              margin: 0;
              font-size: 48px;
              @media (max-width: 1440px) {
                font-size: 36px;
              }
              @media (max-width: 890px) {
                font-size: 28px;
              }
              @media (max-width: 778px) {
                font-size: 22px;
                text-align: center;
              }
            `}
            id="headerBarScrollTitle"
          >
            {props.title}
          </AtomText>
          {props.desc && (
            <AtomText
              as="p"
              css={css`
                opacity: 0.5;
                text-align: center;
              `}
            >
              {stringToHTML(props.desc).innerText}
            </AtomText>
          )}
          {props.followers && (
            <AtomText
              as="p"
              css={css`
                opacity: 0.5;
              `}
            >
              {FollowNumbers(props.followers as number)}
            </AtomText>
          )}
          {
            typeCases({
              color: colors[0],
              fullData: props.fullData,
            })[router.pathname.split('/')[2] as keyof typeof typeCases]
          }
          <AtomWrapper
            css={css`
              width: 100%;
              display: flex;
              justify-content: flex-start;
              @media (max-width: 980px) {
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
            `}
          >
            {props?.id && (
              <AtomLink
                href={{
                  pathname: '/swap/artist/[id]',
                  query: { id: props.id },
                }}
                passHref
              >
                <a>
                  <AtomText
                    as="p"
                    css={css`
                      display: flex;
                      align-items: center;
                      font-weight: 600;
                      margin: 20px 1px;
                    `}
                  >
                    {props.image_url_avatar && (
                      <AtomImage
                        src={props.image_url_avatar}
                        width={100}
                        height={100}
                        alt={props.name}
                        borderRadius="50%"
                      />
                    )}
                    {props.name}
                  </AtomText>
                </a>
              </AtomLink>
            )}
            {props.total_tracks && (
              <AtomTracksDuration
                release={props.release_date as string}
                totalTracks={props.total_tracks}
                useTime={props.useTime as UseTimeProps}
              />
            )}
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  )
}

export default OrganismBanner
