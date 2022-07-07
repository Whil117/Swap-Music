/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react'
import UseColor from '@Hooks/UseColor'
import useTime from '@Hooks/useTime'
import FollowNumbers from '@Utils/Followers'
import AtomImage from 'lib/AtomImage'
import AtomLink from 'lib/AtomLink'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'

type PropsArtist = {
  image_url: string
  name: string
  borderRadiusImage?: string
  type: string
  followers?: number
  color?: string
}

type PropsAlbum = {
  folowers?: number | undefined
  album?: {
    type?: string
    artist?: {
      name: string
      id: string
    }
    description?: string
    duration_ms?: number
    release_date?: string
    total_tracks?: number
  }
} & PropsArtist &
  PropsPlaylist

type PropsPlaylist = {
  playlist?: {
    description?: string
    duration_ms?: number
    total_tracks?: number
    release_date?: string
    type?: string
    artist?: {
      name: string
      id: string
    }
  }
}

type typeBanners = {
  artist: PropsArtist
  album: PropsAlbum
}

const typeBanners = {
  artist: (props: typeBanners['artist']) => {
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
            ${props.color};
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
            src={props.image_url}
            width={260}
            height={260}
            alt={props.name}
            borderRadius="50%"
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
              id="headerBarScrollTitle"
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
            >
              {props.name}
            </AtomText>
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
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    )
  },
  album: (props: typeBanners['album']) => {
    const [hours, minutes, seconds] = useTime({
      ms: props.album?.duration_ms as number,
    })
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
            ${props.color};
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
            src={props.image_url}
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
              {props?.album?.type?.toUpperCase()}
            </AtomText>
            <AtomText
              as="h1"
              fontWeight="bold"
              id="headerBarScrollTitle"
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
            >
              {props.name}
            </AtomText>
            <AtomWrapper
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
              `}
            >
              <AtomLink
                href={{
                  pathname: '/swap/artist/[id]',
                  query: { id: props?.album?.artist?.id },
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
                    {props.album?.artist?.name}
                  </AtomText>
                </a>
              </AtomLink>
              <AtomText
                as="p"
                css={css`
                  margin: 0 10px;
                  font-weight: 400;
                  display: flex;
                  align-items: center;
                `}
              >
                {props?.album?.release_date &&
                  `${props?.album?.release_date.slice(0, 4)} •  `}
                {props.album?.total_tracks}
                {' Songs'}, {hours ? `${hours} hr ${minutes} min` : ''}{' '}
                {!hours
                  ? `${minutes} Min ${
                      seconds?.toFixed(0).length === 1
                        ? `0${seconds.toFixed()} Min`
                        : `${seconds?.toFixed()} Sec`
                    }`
                  : ''}
              </AtomText>
            </AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    )
  },
  playlist: (props: typeBanners['album']) => {
    const [hours, minutes, seconds] = useTime({
      ms: props.playlist?.duration_ms as number,
    })
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
            ${props.color};
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
            src={props.image_url}
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
              {props?.playlist?.type?.toUpperCase()}
            </AtomText>
            <AtomText
              as="h1"
              fontWeight="bold"
              id="headerBarScrollTitle"
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
            >
              {props.name}
            </AtomText>
            <AtomWrapper
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
              `}
            >
              <AtomLink
                href={{
                  pathname: '/swap/artist/[id]',
                  query: { id: props?.playlist?.artist?.id },
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
                    {props.playlist?.artist?.name}
                  </AtomText>
                </a>
              </AtomLink>
              <AtomText
                as="p"
                css={css`
                  margin: 0 10px;
                  font-weight: 400;
                  display: flex;
                  align-items: center;
                `}
              >
                {props?.album?.release_date &&
                  `${props?.album?.release_date.slice(0, 4)} •  `}
                {props.playlist?.total_tracks}
                {' Songs'}, {hours ? `${hours} hr ${minutes} min` : ''}{' '}
                {!hours
                  ? `${minutes} Min ${
                      seconds?.toFixed(0).length === 1
                        ? `0${seconds.toFixed()} Min`
                        : `${seconds?.toFixed()} Sec`
                    }`
                  : ''}
              </AtomText>
            </AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    )
  },
}

type AtomProps = {
  type: 'artist' | 'album' | 'playlist'
} & PropsArtist &
  PropsAlbum

const AtomBanner: FC<AtomProps> = (props) => {
  const colors = UseColor({ url: props.image_url })
  return typeBanners[props.type]({
    ...props,
    color: colors[0],
  })
}

export default AtomBanner
