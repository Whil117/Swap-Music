/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { controlsAtom, Navigator } from '@Components/Navbar/player'
import { css, SerializedStyles } from '@emotion/react'
import useScreen from '@Hooks/useScreen'
import useTime from '@Hooks/useTime'
import { ActionPlayer, Inti, PLAYATOM } from '@Redux/reducers/player/controls'
import { SetStateAction, useSetAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextRouter, useRouter } from 'next/router'

import { FC } from 'react'
import AtomPlayTrack from '../AtomPlayTrack'

const typeTracks = ({
  dispatch,
  type,
  screen,
  router,
  setPlayPlayer,
  customCSS,
}: DefsTrack) => ({
  album: (props: Props) => {
    const [hours, minutes, seconds] = useTime({ ms: props?.album?.duration })
    const handleClick = async (
      track: string,
      youtube_url: string,
      youtube_id: string,
      youtube_video: string,
      lyrics: string
    ) => {
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
              ...props.album,
              position: props?.album?.position as number,
              id: props?.id as string,
              idTrack: props?.album?.idTrack as string,
              name: props?.album?.name as string,
              image: props?.album?.image as string,
              youtube_url: youtube_url,
              youtube_id: youtube_id,
              lyrics: lyrics,
              youtube_video: youtube_video,
              artists: props?.album?.artists as ArtistProps,
              album: props.album?.album as {
                id?: string
                name?: string
                images?: {
                  url?: string
                }[]
              },
              preview_url: (track as string) ?? '',
            },
            context: props?.album?.context as ContextTracks[],
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
          margin-bottom: 1rem;
          padding: 0.5rem;
          &:hover {
            background-color: #222229;
          }
          display: grid;
          grid-template-columns: 50px 1fr 50px;
          gap: 10px;
          width: 100%;
          align-items: center;
          cursor: ${screen <= 980 ? 'pointer' : 'default'};
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
          ${customCSS}
        `}
        key={props?.id}
      >
        <AtomPlayTrack
          name={props?.album?.name as string}
          artist={
            props?.album?.artists && (props?.album?.artists[0]?.name as any)
          }
          title_track={props?.album?.name as string}
          position={props?.album?.position as number}
          slug={slug as string}
          onTrack={async (url, ytUrl, id, youtube_video, lyrics) => {
            await handleClick(url, ytUrl, id, youtube_video, lyrics)
          }}
        />
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

    const handleClick = (
      track: string,
      youtube_url: string,
      youtube_id: string,
      youtube_video: string,
      lyrics: string
    ) => {
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
              ...props.likedSongs,
              position: props?.likedSongs?.position as number,
              id: props?.likedSongs?.id as string,
              idTrack: props?.likedSongs?.idTrack as string,
              name: props?.likedSongs?.name as string,
              youtube_id: youtube_id,
              lyrics: lyrics,
              youtube_video: youtube_video,
              image: props?.likedSongs?.album?.image as string,
              youtube_url: youtube_url,
              artists: props?.likedSongs?.artists as ArtistProps,
              album: props.likedSongs?.album as {
                id?: string
                name?: string
                images?: {
                  url?: string
                }[]
              },
              preview_url: (track as string) ?? '',
            },
            context: props?.likedSongs?.context as ContextTracks[],
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
          margin-bottom: 1rem;
          padding: 0.5rem;
          display: grid;
          grid-template-columns: 50px 1fr 1fr 50px;
          &:hover {
            background-color: #222229;
          }
          gap: 10px;
          width: 100%;
          align-items: center;
          cursor: ${screen <= 980 ? 'pointer' : 'default'};
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
          ${customCSS}
        `}
        key={props?.id}
      >
        <AtomPlayTrack
          name={props?.likedSongs?.name as string}
          artist={
            props?.likedSongs?.artists &&
            (props?.likedSongs?.artists[0]?.name as any)
          }
          title_track={props?.likedSongs?.name as string}
          position={props?.likedSongs?.position as number}
          slug={slug as string}
          onTrack={async (url, ytUrl, id, youtube_video, lyrics) => {
            await handleClick(url, ytUrl, id, youtube_video, lyrics)
          }}
        />
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
                            behavior: 'smooth',
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
          <AtomButton
            onClick={() => {
              router
                .push({
                  pathname: '/swap/album/[id]',
                  query: {
                    id: props?.likedSongs?.album?.id,
                  },
                })
                .then(() => {
                  document?.getElementById('view')?.scroll({
                    top: 0,
                    behavior: 'smooth',
                  })
                })
            }}
          >
            <AtomText
              css={css`
                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              {props?.likedSongs?.album?.name}
            </AtomText>
          </AtomButton>
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

    const handleClick = async (
      track: string,
      youtube_url: string,
      youtube_id: string,
      youtube_video: string,
      lyrics: string
    ) => {
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
              ...props.playlist,
              position: props?.playlist?.position as number,
              id: props?.playlist?.id as string,
              idTrack: props?.playlist?.idTrack as string,
              youtube_id: youtube_id,
              name: props?.playlist?.name as string,
              youtube_url: youtube_url,
              lyrics: lyrics,
              youtube_video: youtube_video,
              image: props?.playlist?.album?.image as string,
              artists: props?.playlist?.artists as ArtistProps,
              album: props.playlist?.album as {
                id?: string
                name?: string
                images?: {
                  url?: string
                }[]
              },
              preview_url: (track as string) ?? '',
            },
            context: props?.playlist?.context as ContextTracks[],
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
          margin-bottom: 1rem;
          display: grid;
          grid-template-columns: 50px 1fr 50px;
          gap: 10px;
          width: 100%;
          align-items: center;
          cursor: ${screen <= 980 ? 'pointer' : 'default'};
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
          ${customCSS}
        `}
        key={props?.id}
      >
        <AtomPlayTrack
          name={props?.playlist?.name as string}
          artist={props?.playlist?.artists?.[0]?.name as string}
          title_track={props?.playlist?.name as string}
          position={props?.playlist?.position as number}
          slug={slug as string}
          onTrack={async (url, ytUrl, id, youtube_video, lyrics) => {
            await handleClick(url, ytUrl, id, youtube_video, lyrics)
          }}
        />
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
  setPlayPlayer: (update: SetStateAction<boolean>) => void
  customCSS?: SerializedStyles
  controls?: Inti
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
  customCSS?: SerializedStyles
  album?: {
    id?: string
    idTrack?: string
    position?: number
    name?: string
    duration?: number
    preview_url?: string
    image?: string
    artists?: ArtistProps
    album?: Album
    context?: ContextTracks[]
  }
  likedSongs?: {
    id?: string
    position?: number
    name?: string
    duration?: number
    preview_url?: string
    idTrack?: string
    image?: string
    artists?: ArtistProps
    album?: Album
    context?: ContextTracks[]
  }
  playlist?: {
    id?: string
    position?: number
    idTrack?: string
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
  const setPlayPlayer = useSetAtom(PLAYATOM)
  const router = useRouter()
  const screen = useScreen()
  return typeTracks({
    dispatch,
    router,
    screen,
    id: props.id,
    type: props.type,
    setPlayPlayer,
    customCSS: props.customCSS,
  })[props.type](props)
}

export default AtomTrack
