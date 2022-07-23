/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import { colorsAtom } from '@Hooks/UseColor'
import ReducerAtomPlayer, {
  ActionPlayer,
  Inti,
  PLAYATOM,
  reducerplayer,
} from '@Redux/reducers/player/controls'
import Svg from '@Whil/components/Svg'
import axios from 'axios'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomIcon from 'lib/AtomIcon'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextRouter, useRouter } from 'next/router'
import { FC, MutableRefObject, useLayoutEffect, useRef } from 'react'
import Progressbar from './progressbar'
import BarVolumen from './volumen.bar'

export const controlsAtom = ReducerAtomPlayer(reducerplayer)

type NavigatorProps = {
  title: string
  artist_name?: string
  album_name: string
  image: string
}

export const Navigator = (props: NavigatorProps) => {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: props?.title,
    artist: props?.artist_name,
    album: props?.album_name,
    artwork: [
      {
        src: props.image,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  })
}

const NavbarPlayer: FC = () => {
  const colors = useAtomValue(colorsAtom)
  const [controls, dispatch] = useAtom(controlsAtom)
  const setPlayPlayer = useSetAtom(PLAYATOM)
  const audio = useRef<HTMLAudioElement>()
  const router = useRouter()

  const handlePlay = () => {
    audio.current?.play()
    if (audio.current) {
      setPlayPlayer(true)
      Navigator({
        title: controls?.player?.currentTrack?.name as string,
        artist_name: controls?.player?.currentTrack?.artists[0].name,
        album_name: controls?.player?.currentTrack?.album.name as string,
        image: controls?.player?.currentTrack?.image as string,
      })
    }
  }
  const handlePause = () => {
    audio.current?.pause()
    setPlayPlayer(false)
  }

  const handleAudioRepeat = () => {
    dispatch({
      type: 'REPEAT',
      payload: { ...controls, repeat: !controls.repeat },
    })
  }
  const handleAleatory = () => {
    dispatch({
      type: 'ALEATORY',
      payload: { ...controls, aleatory: !controls.aleatory },
    })
  }
  const handleNext = () => {
    handlePlay()
    dispatch({
      type: 'NEXT',
      payload: { ...controls, play: true },
    })
  }

  useLayoutEffect(() => {
    if (audio.current) {
      const currentTime = localStorage.getItem('PROGRESSBAR')
      const volumen = localStorage.getItem('VOLUMENSWAP')
      audio.current.currentTime = currentTime as unknown as number
      audio.current.volume = (volumen as unknown as number) / 100
    }
  }, [])

  return (
    <>
      {controls?.player?.currentTrack?.preview_url && (
        <>
          <AtomWrapper
            css={css`
              padding: 10px;
              grid-column: 1 / -1;
              grid-row: 2;
              background-color: #191922;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: auto;
              gap: 10px;
              @media (max-width: 980px) {
                grid-template-columns: 1fr auto;
                grid-template-rows: auto auto;
                padding: 0 15px 15px 15px;
              }
            `}
          >
            <AtomWrapper
              css={css`
                grid-column: 1 / 2;
                display: grid;
                grid-template-rows: 40px 40px;
                grid-template-columns: auto 1fr;
                grid-column-gap: 10px;
                sadfsadf_sdaffds: asfsdaf;
                @media (max-width: 980px) {
                  grid-template-rows: auto;
                  grid-row: 2;
                  grid-column: 1 / 2;
                }
              `}
            >
              {!controls?.view && (
                <AtomWrapper
                  css={css`
                    width: 80px;
                    grid-row: 1 /-1;
                    @media (max-width: 980px) {
                      display: none;
                    }
                  `}
                >
                  <AtomButton
                    padding="0px"
                    width="100%"
                    height="100%"
                    onClick={() => {
                      dispatch({
                        type: 'VIEWIMAGESIDEBAR',
                        payload: {
                          view: !controls.view,
                          image: controls?.player?.currentTrack?.image,
                        },
                      })
                    }}
                  >
                    <AtomImage
                      src={controls?.player?.currentTrack?.image}
                      alt={controls?.player?.currentTrack?.name as string}
                      borderRadius="10px"
                      id="IMAGE"
                      width="100%"
                      height="100%"
                      css={css`
                        grid-row: 1 / -1;
                      `}
                    />
                  </AtomButton>
                </AtomWrapper>
              )}
              <AtomWrapper
                css={css`
                  grid-column: 2;
                  grid-row: 1;
                `}
              >
                <AtomButton
                  width="max-content"
                  css={css`
                    &:hover {
                      text-decoration: underline;
                    }
                  `}
                  onClick={() => {
                    router
                      .push({
                        pathname: `/swap/album/[id]`,
                        query: {
                          id: controls?.player?.currentTrack?.album.id,
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
                    fontWeight="700"
                    as="p"
                    css={css`
                      grid-column: 2;
                      grid-row: 1;
                      align-self: center;
                      @media (max-width: 980px) {
                        grid-row: 1;
                        grid-column: 1;
                        font-size: 1rem;
                      }
                    `}
                  >
                    {controls?.player?.currentTrack?.name}
                  </AtomText>
                </AtomButton>
                <AtomButton
                  onClick={() => {
                    router.push({
                      pathname: `/swap/video/[id]`,
                      query: {
                        id: controls?.player?.currentTrack?.id,
                      },
                    })
                  }}
                >
                  {controls?.player?.currentTrack?.youtube_url}
                </AtomButton>
              </AtomWrapper>
              <AtomWrapper
                css={css`
                  grid-row: 2;
                  align-self: center;
                  @media (max-width: 980px) {
                    grid-column: 2;
                    grid-row: 1;
                  }
                `}
              >
                <AtomWrapper
                  css={css`
                    display: flex;
                    justify-content: flex-start;
                  `}
                >
                  {controls?.player?.currentTrack?.artists?.map(
                    (item, index) => (
                      <AtomButton
                        key={item.id && item?.id}
                        css={css`
                          &:hover {
                            text-decoration: underline;
                          }
                        `}
                        onClick={() => {
                          router
                            .push({
                              pathname: `/swap/artist/[id]`,
                              query: {
                                id: item.id,
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
                          as="p"
                          css={css`
                            opacity: 0.5;
                            @media (max-width: 980px) {
                              font-size: 0.8rem;
                            }
                          `}
                          key={item.id}
                        >
                          {index === 0 ? item.name : `, ${item.name}`}
                        </AtomText>
                      </AtomButton>
                    )
                  )}
                </AtomWrapper>
              </AtomWrapper>
            </AtomWrapper>
            <AtomButton
              css={css`
                display: none;
                @media (max-width: 980px) {
                  grid-column: 2;
                  grid-row: 2;
                  border: none;
                  background-color: transparent;
                  cursor: pointer;
                  width: 50px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
              `}
              onClick={() => {
                controls.play ? handlePause() : handlePlay()
              }}
            >
              <Svg
                src={`/icons/${controls.play ? 'pause' : 'play'}`}
                css={css`
                  svg {
                    width: 30px;
                    height: 30px;
                  }
                `}
              />
            </AtomButton>
            <AtomWrapper
              css={css`
                grid-column: 2/3;
                display: grid;
                grid-template-rows: repeat(2, auto);
                @media (max-width: 980px) {
                  grid-column: 1 / -1;
                }
              `}
            >
              <AtomWrapper
                css={css`
                  grid-row: 1;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
                `}
              >
                {playerButtons(controls, dispatch).map((button) => (
                  <>
                    {typeof button.icon === 'object' ? (
                      <AtomButton
                        css={css`
                          border: none;
                          background-color: transparent;
                          cursor: pointer;
                          width: 62px;
                          height: 48px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          @media (max-width: 980px) {
                            display: none;
                          }
                        `}
                        onClick={() => {
                          controls.play ? handlePause() : handlePlay()
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'MediaPlayPause') {
                            controls.play ? handlePause() : handlePlay()
                          }
                        }}
                      >
                        <AtomIcon
                          width="50px"
                          height="50px"
                          icon={
                            controls.play ? button.icon.pause : button.icon.play
                          }
                          color={
                            button.active ? (colors[0] as string) : 'white'
                          }
                        />
                      </AtomButton>
                    ) : (
                      <AtomButton
                        onClick={button.onClick}
                        css={css`
                          @media (max-width: 980px) {
                            display: none;
                          }
                        `}
                      >
                        <AtomIcon
                          icon={button.icon}
                          width="22px"
                          height="22px"
                          color={
                            button.active ? (colors[0] as string) : 'white'
                          }
                        />
                      </AtomButton>
                    )}
                  </>
                ))}
              </AtomWrapper>
              <Progressbar
                audio={audio as MutableRefObject<HTMLAudioElement | null>}
              />
            </AtomWrapper>
            <AtomWrapper
              css={css`
                grid-column: 3 / 4;
                display: flex;
                align-self: center;
                justify-self: flex-end;
                align-items: center;
                gap: 15px;
                @media (max-width: 980px) {
                  display: none;
                }
              `}
            >
              {buttonsActions(router, controls, dispatch).map((item) => (
                <AtomButton key={item.key} onClick={item.onClick} padding="0px">
                  <AtomIcon
                    icon={item.icon}
                    width="22px"
                    height="22px"
                    color={item.active ? (colors[0] as string) : 'white'}
                  />
                </AtomButton>
              ))}
              <AtomButton padding="0px">
                <AtomIcon
                  icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/sound.svg"
                  width="22px"
                  height="22px"
                  // color="#fff"
                />
              </AtomButton>
              <BarVolumen audio={audio} />
            </AtomWrapper>
          </AtomWrapper>
        </>
      )}
    </>
  )
}
function download(audio: string) {
  axios({
    url: audio,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'audio.mp3')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}

const buttonsActions = (
  router: NextRouter,
  controls: Inti,
  dispatch: (update: ActionPlayer) => void
) => [
  {
    key: 2,
    id: 'aleatory',
    active: controls.aleatory,
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/aleatory.svg',
  },
  {
    key: 3,
    id: 'queue',
    active: router.asPath.includes('/queue'),
    color: '#fff',
    onClick: () =>
      router.asPath.includes('/queue')
        ? router.back()
        : router.push('/swap/queue').then(() => {
            document?.getElementById('view')?.scroll({
              top: 0,
              behavior: 'smooth',
            })
          }),
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/queue.svg',
  },
]
const playerButtons = (
  controls: Inti,
  dispatch: (update: ActionPlayer) => void
) => [
  {
    key: 2,
    id: 'aleatory',
    active: controls.aleatory,
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/aleatory.svg',
  },
  {
    key: 1,
    id: 'back',
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/backsong.svg',
  },
  {
    key: 2,
    id: 'play',
    icon: {
      play: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/play.svg',
      pause:
        'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/pause.svg',
    },
  },
  {
    key: 3,
    id: 'next',
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/nextsong.svg',
  },
  {
    key: 1,
    id: 'repeat',
    onClick: () => {
      dispatch({
        type: 'REPEAT',
        payload: {
          repeat: !controls.repeat,
        },
      })
    },
    active: controls.repeat,
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/repeat2.svg',
  },
]

export default NavbarPlayer
