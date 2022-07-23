/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { TRACKBYSLUG } from '@Apollo/client/querys/track'
import { controlsAtom, Navigator } from '@Components/Navbar/player'
import { css } from '@emotion/react'
import useScreen from '@Hooks/useScreen'
import useTime from '@Hooks/useTime'
import { ActionPlayer, PLAYATOM } from '@Redux/reducers/player/controls'
import { useSetAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomIcon from 'lib/AtomIcon'
import AtomImage from 'lib/AtomImage'
import AtomLink from 'lib/AtomLink'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextRouter, useRouter } from 'next/router'
import { client } from 'pages/_app'

import { FC } from 'react'

const typeTracks = ({ dispatch, type, screen, router }: DefsTrack) => ({
  album: (props: Props) => {
    const [hours, minutes, seconds] = useTime({ ms: props?.album?.duration })
    const setPlayPlayer = useSetAtom(PLAYATOM)
    const handleClick = async (track: string) => {
      Navigator({
        title: props?.album?.name as string,
        artist_name:
          props?.album?.artists && (props?.album?.artists[0]?.name as string),
        album_name: props?.album?.name as string,
        image: props?.album?.image as string,
      })
      setPlayPlayer(true)
      dispatch({
        type: 'SEVERAL',
        payload: {
          play: true,
          currentTime: 0,
          image: props?.album?.image,
          player: {
            currentSite: {
              type: type,
            },
            currentTrack: {
              position: props?.album?.position as number,
              id: props?.id as string,
              name: props?.album?.name as string,
              image: props?.album?.image as string,
              artists: props?.album?.artists as ArtistProps,
              album: props as {
                id?: string
                name?: string
                images?: {
                  url?: string
                }[]
              },
              preview_url: (track as string) ?? '',
            },
            context: props?.album?.context as any,
          },
        },
      })
    }
    const slug =
      props?.album?.artists &&
      props?.album?.artists[0]?.name + ' ' + props?.album?.name

    return (
      <AtomWrapper
        css={css`
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: 50px 1fr 50px;
          gap: 10px;
          width: 100%;
          align-items: center;
          cursor: ${screen <= 980 ? 'pointer' : 'default'};
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
        `}
        key={props?.id}
        onClick={async (e) => {
          if (screen <= 980) {
            const data = await client.query({
              fetchPolicy: 'no-cache',
              variables: {
                slug: slug,
              },
              query: TRACKBYSLUG,
            })

            handleClick(data?.data?.trackBySlug?.url)
          }
        }}
      >
        <AtomButton
          onClick={async (e) => {
            const data = await client.query({
              fetchPolicy: 'no-cache',
              variables: {
                slug: slug,
              },
              query: TRACKBYSLUG,
            })

            handleClick(data?.data?.trackBySlug?.url)
          }}
          css={css`
            grid-column: 1;
            justify-self: center;
            align-self: center;
            position: relative;
            margin: 0;
            padding: 0;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomText
            as="p"
            css={css`
              margin: 0;
              padding: 0;
              font-size: 16px;
              font-weight: 600;
              opacity: 1;
              &:hover {
                display: none;
                opacity: 0;
              }
            `}
          >
            {(props?.album?.position as number) + 1}
          </AtomText>
          <AtomIcon
            customCSS={css`
              padding: 5px;
              background-color: #121216;
              position: absolute;
              opacity: 0;
              &:hover {
                opacity: 1;
              }
            `}
            width="18px"
            height="18px"
            icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/playho.svg"
          />
        </AtomButton>
        <AtomWrapper
          css={css`
            grid-column: 2 / 3;
            @media (max-width: 980px) {
              grid-column: 1 / -1;
            }
          `}
        >
          <AtomText as="p">{props?.album?.name}</AtomText>
          {props?.album?.artists?.length !== 0 && (
            <AtomWrapper
              css={css`
                display: flex;
                justify-content: flex-start;
              `}
            >
              {props?.album?.artists?.map((artist, index) => (
                <AtomButton
                  key={artist.id && artist?.id + index}
                  onClick={() => {
                    router
                      .push({
                        pathname: `/swap/artist/[id]`,
                        query: {
                          id: artist.id,
                        },
                      })
                      .then(() => {
                        document?.getElementById('view')?.scroll({
                          top: 0,
                        })
                      })
                  }}
                >
                  <AtomText
                    key={artist.id}
                    fontSize="14px"
                    opacity={0.5}
                    css={css`
                      &:hover {
                        text-decoration: underline;
                      }
                    `}
                  >
                    {index === 0 ? artist.name : `, ${artist.name}`}
                  </AtomText>
                </AtomButton>
              ))}
            </AtomWrapper>
          )}
        </AtomWrapper>
        <AtomWrapper
          css={css`
            grid-column: 3 /4;
            align-self: center;
            justify-self: center;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomText as="p">
            {hours ? `${hours} ${minutes}` : ''}
            {!hours
              ? `${minutes}:${
                  seconds?.toFixed(0).length === 1
                    ? `0${seconds.toFixed()}`
                    : seconds?.toFixed()
                }`
              : ''}
          </AtomText>
        </AtomWrapper>
      </AtomWrapper>
    )
  },
  likedsongs: (props: Props) => {
    const [hours, minutes, seconds] = useTime({
      ms: props?.likedSongs?.duration,
    })
    const setPlayPlayer = useSetAtom(PLAYATOM)

    const handleClick = (track: string) => {
      Navigator({
        title: props?.likedSongs?.name as string,
        artist_name:
          props?.likedSongs?.artists &&
          (props?.likedSongs?.artists[0]?.name as string),
        album_name: props?.likedSongs?.album?.name as string,
        image: props?.likedSongs?.album?.image as string,
      })
      setPlayPlayer(true)
      dispatch({
        type: 'SEVERAL',
        payload: {
          play: true,
          currentTime: 0,
          image: props?.likedSongs?.image as string,
          player: {
            currentSite: {
              type: type,
            },
            currentTrack: {
              position: props?.likedSongs?.position as number,
              id: props?.likedSongs?.id as string,
              name: props?.likedSongs?.name as string,
              image: props?.likedSongs?.album?.image as string,
              artists: props?.likedSongs?.artists as ArtistProps,
              album: props as {
                id?: string
                name?: string
                images?: {
                  url?: string
                }[]
              },
              preview_url: (track as string) ?? '',
            },
            context: props?.likedSongs?.context as any,
          },
        },
      })
    }
    const slug =
      props?.likedSongs?.artists &&
      props?.likedSongs?.artists[0]?.name + ' ' + props?.likedSongs?.name
    return (
      <AtomWrapper
        css={css`
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: 50px 1fr 1fr 50px;
          gap: 10px;
          width: 100%;
          align-items: center;
          cursor: ${screen <= 980 ? 'pointer' : 'default'};
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
        `}
        key={props?.id}
        onClick={async () => {
          if (screen <= 980) {
            const data = await client.query({
              fetchPolicy: 'no-cache',
              variables: {
                slug: slug,
              },
              query: TRACKBYSLUG,
            })

            handleClick(data?.data?.trackBySlug?.url)
          }
        }}
      >
        <AtomButton
          onClick={async () => {
            const data = await client.query({
              fetchPolicy: 'no-cache',
              variables: {
                slug: slug,
              },
              query: TRACKBYSLUG,
            })
            handleClick(data?.data?.trackBySlug?.url)
          }}
          css={css`
            grid-column: 1;
            justify-self: center;
            align-self: center;
            position: relative;
            margin: 0;
            padding: 0;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomText
            as="p"
            css={css`
              margin: 0;
              padding: 0;
              font-size: 16px;
              font-weight: 600;
              opacity: 1;
              &:hover {
                display: none;
                opacity: 0;
              }
            `}
          >
            {(props?.likedSongs?.position as number) + 1}
          </AtomText>
          <AtomIcon
            customCSS={css`
              padding: 5px;
              background-color: #121216;
              position: absolute;
              opacity: 0;
              &:hover {
                opacity: 1;
              }
            `}
            width="18px"
            height="18px"
            icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/playho.svg"
          />
        </AtomButton>
        <AtomWrapper
          css={css`
            grid-column: 2;
            display: flex;
            align-items: center;
            gap: 10px;
            @media (max-width: 980px) {
              grid-column: 1 / -1;
            }
          `}
        >
          <AtomImage
            src={props.likedSongs?.image as string}
            alt="xd"
            width="50px"
            height="50px"
          />
          <AtomWrapper>
            <AtomText as="p">{props?.likedSongs?.name}</AtomText>
            {props?.likedSongs?.artists?.length !== 0 && (
              <AtomWrapper
                css={css`
                  display: flex;
                  justify-content: flex-start;
                `}
              >
                {props?.likedSongs?.artists?.map((artist, index) => (
                  <AtomButton
                    key={artist.id && artist?.id + index}
                    onClick={() => {
                      router
                        .push({
                          pathname: `/swap/artist/[id]`,
                          query: {
                            id: artist.id,
                          },
                        })
                        .then(() => {
                          document?.getElementById('view')?.scroll({
                            top: 0,
                          })
                        })
                    }}
                  >
                    <AtomText
                      key={artist.id}
                      fontSize="14px"
                      opacity={0.5}
                      css={css`
                        &:hover {
                          text-decoration: underline;
                        }
                      `}
                    >
                      {index === 0 ? artist.name : `, ${artist.name}`}
                    </AtomText>
                  </AtomButton>
                ))}
              </AtomWrapper>
            )}
          </AtomWrapper>
        </AtomWrapper>
        <AtomWrapper
          width="auto"
          css={css`
            grid-column: 3;
          `}
        >
          <AtomLink
            href={{
              pathname: '/swap/album/[id]',
              query: {
                id: props?.likedSongs?.album?.id,
              },
            }}
            passHref
          >
            <a>
              <AtomText
                css={css`
                  &:hover {
                    text-decoration: underline;
                  }
                `}
              >
                {props?.likedSongs?.album?.name}
              </AtomText>
            </a>
          </AtomLink>
        </AtomWrapper>
        <AtomWrapper
          css={css`
            grid-column: 4;
            align-self: center;
            justify-self: center;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomText as="p">
            {hours ? `${hours} ${minutes}` : ''}
            {!hours
              ? `${minutes}:${
                  seconds?.toFixed(0).length === 1
                    ? `0${seconds.toFixed()}`
                    : seconds?.toFixed()
                }`
              : ''}
          </AtomText>
        </AtomWrapper>
      </AtomWrapper>
    )
  },
  playlist: (props: Props) => {
    const [hours, minutes, seconds] = useTime({
      ms: props?.playlist?.duration,
    })
    const setPlayPlayer = useSetAtom(PLAYATOM)

    const handleClick = async (track: string) => {
      Navigator({
        title: props?.playlist?.name as string,
        artist_name:
          props?.playlist?.artists &&
          (props?.playlist?.artists[0]?.name as string),
        album_name: props?.playlist?.album?.name as string,
        image: props?.playlist?.album?.image as string,
      })
      setPlayPlayer(true)
      dispatch({
        type: 'SEVERAL',
        payload: {
          play: true,
          currentTime: 0,
          image: props?.playlist?.image as string,
          player: {
            currentSite: {
              type: type,
            },
            currentTrack: {
              position: props?.playlist?.position as number,
              id: props?.playlist?.id as string,
              name: props?.playlist?.name as string,
              image: props?.playlist?.album?.image as string,
              artists: props?.playlist?.artists as ArtistProps,
              album: props as {
                id?: string
                name?: string
                images?: {
                  url?: string
                }[]
              },
              preview_url: (track as string) ?? '',
            },
            context: props?.playlist?.context as any,
          },
        },
      })
    }
    const slug =
      props?.playlist?.artists &&
      props?.playlist?.artists[0]?.name + ' ' + props?.playlist?.name

    return (
      <AtomWrapper
        css={css`
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: 50px 1fr 50px;
          gap: 10px;
          width: 100%;
          align-items: center;
          cursor: ${screen <= 980 ? 'pointer' : 'default'};
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
        `}
        key={props?.id}
        onClick={async (e) => {
          if (screen <= 980) {
            await client
              .query({
                fetchPolicy: 'no-cache',
                variables: {
                  slug: slug,
                },
                query: TRACKBYSLUG,
              })
              .then(async (data: any) => {
                await handleClick(data?.trackBySlug?.url)
              })
          }
        }}
      >
        <AtomButton
          onClick={async (e) => {
            await client
              .query({
                fetchPolicy: 'no-cache',
                variables: {
                  slug: slug,
                },
                query: TRACKBYSLUG,
              })
              .then(async (data: any) => {
                await handleClick(data?.trackBySlug?.url)
              })
          }}
          css={css`
            grid-column: 1;
            justify-self: center;
            align-self: center;
            position: relative;
            margin: 0;
            padding: 0;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomText
            as="p"
            css={css`
              margin: 0;
              padding: 0;
              font-size: 16px;
              font-weight: 600;
              opacity: 1;
              &:hover {
                display: none;
                opacity: 0;
              }
            `}
          >
            {(props?.playlist?.position as number) + 1}
          </AtomText>
          <AtomIcon
            customCSS={css`
              padding: 5px;
              background-color: #121216;
              position: absolute;
              opacity: 0;
              &:hover {
                opacity: 1;
              }
            `}
            width="18px"
            height="18px"
            icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/playho.svg"
          />
        </AtomButton>
        <AtomWrapper
          css={css`
            grid-column: 2 / 3;
            display: flex;
            align-items: center;
            gap: 10px;
            @media (max-width: 980px) {
              grid-column: 1 / -1;
            }
          `}
        >
          <AtomImage
            src={props.playlist?.image as string}
            alt="xd"
            width="50px"
            height="50px"
          />
          <AtomWrapper>
            <AtomText as="p">{props?.playlist?.name}</AtomText>
            {props?.playlist?.artists?.length !== 0 && (
              <AtomWrapper
                css={css`
                  display: flex;
                  justify-content: flex-start;
                `}
              >
                {props?.playlist?.artists?.map((artist, index) => (
                  <AtomButton
                    key={artist.id && artist?.id + index}
                    onClick={() => {
                      router
                        .push({
                          pathname: `/swap/artist/[id]`,
                          query: {
                            id: artist.id,
                          },
                        })
                        .then(() => {
                          document?.getElementById('view')?.scroll({
                            top: 0,
                          })
                        })
                    }}
                  >
                    <AtomText
                      key={artist.id}
                      fontSize="14px"
                      opacity={0.5}
                      css={css`
                        &:hover {
                          text-decoration: underline;
                        }
                      `}
                    >
                      {index === 0 ? artist.name : `, ${artist.name}`}
                    </AtomText>
                  </AtomButton>
                ))}
              </AtomWrapper>
            )}
          </AtomWrapper>
        </AtomWrapper>
        <AtomWrapper
          css={css`
            grid-column: 3 /4;
            align-self: center;
            justify-self: center;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomText as="p">
            {hours ? `${hours} ${minutes}` : ''}
            {!hours
              ? `${minutes}:${
                  seconds?.toFixed(0).length === 1
                    ? `0${seconds.toFixed()}`
                    : seconds?.toFixed()
                }`
              : ''}
          </AtomText>
        </AtomWrapper>
      </AtomWrapper>
    )
  },
})

type ArtistProps = {
  name?: string
  id?: string
}[]

type DefsTrack = {
  type: 'album' | 'likedsongs' | 'playlist'
  id: string
  screen: number
  dispatch: (update: ActionPlayer) => void
  router: NextRouter
}
type Album = {
  id?: string
  name?: string
  image?: string
}

export type ContextTracks = {
  id?: string
  name?: string
  image?: string
  album?: Album
  artists?: ArtistProps
  duration?: number
  position?: number
  preview_url?: string
  type: 'album' | 'likedsongs' | 'playlist'
}

type Props = {
  type: 'album' | 'likedsongs'
  id: string
  album?: {
    id?: string
    position?: number
    name?: string
    duration?: number
    preview_url?: string
    image?: string
    artists?: ArtistProps
    context?: ContextTracks[]
  }
  likedSongs?: {
    id?: string
    position?: number
    name?: string
    duration?: number
    preview_url?: string
    image?: string
    artists?: ArtistProps
    album?: Album
    context?: ContextTracks[]
  }
  playlist?: {
    id?: string
    position?: number
    name?: string
    duration?: number
    preview_url?: string
    image?: string
    artists?: ArtistProps
    album?: Album
    context?: ContextTracks[]
  }
}

const AtomTrack: FC<Props> = (props) => {
  const dispatch = useSetAtom(controlsAtom)
  const router = useRouter()
  const screen = useScreen()
  return typeTracks({
    dispatch,
    router,
    screen,
    id: props.id,
    type: props.type,
  })[props.type](props)
}

export default AtomTrack
