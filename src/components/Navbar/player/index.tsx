/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import ReducerAtomPlayer, {
  Inti,
  reducerplayer,
} from '@Redux/reducers/player/controls'

import Svg from '@Whil/components/Svg'
import { useAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomIcon from 'lib/AtomIcon'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { NextRouter, useRouter } from 'next/router'
import { FC, MutableRefObject, useEffect, useRef } from 'react'
import Progressbar from './progressbar'
import BarVolumen from './volumen.bar'

export const controlsAtom = ReducerAtomPlayer(reducerplayer)

export const handleSong = async (trackId: string, accessToken: string) => {
  spotifyAPI.setAccessToken(accessToken as string)
  return await spotifyAPI.getTrack(trackId ?? '').then((res) => res)
}
const NavbarPlayer: FC = () => {
  const audio = useRef<HTMLAudioElement>()
  const [controls, dispatch] = useAtom(controlsAtom)
  const router = useRouter()
  const caudio = document.createElement('audio')
  const handlePlay = () => {
    audio.current?.play()
    caudio.play()
    if (audio.current) {
      dispatch({
        type: 'PLAY',
        payload: { ...controls, play: true },
      })
      navigator.mediaSession.metadata = new MediaMetadata({
        title: controls?.player?.currentTrack?.name,
        artist: controls?.player?.currentTrack?.artists[0].name,
        album: controls?.player?.currentTrack?.album.name,
        artwork: [
          {
            src: controls?.player?.currentTrack?.image as string,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      })
      if (controls.volumen) {
        const volumen = localStorage.getItem('VOLUMENSWAP')
        audio.current.volume = Number(volumen) / 100
      }
    }
  }
  const handlePause = () => {
    audio.current?.pause()
    dispatch({
      type: 'PLAY',
      payload: { ...controls, play: false },
    })
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

  useEffect(() => {
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
                {playerButtons.map((button) => (
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
                        // onPointerUp={() => {
                        //   if (button.action) {
                        //     button.action()
                        //   }
                        // }}
                        onClick={() => {
                          controls.play ? handlePause() : handlePlay()
                        }}
                        //detect keydown
                        onKeyDown={(e) => {
                          if (e.key === 'MediaPlayPause') {
                            controls.play ? handlePause() : handlePlay()
                          }
                          // if (e.key === 'MediaNextTrack') {
                          //   handleNext()
                          // }
                        }}
                      >
                        <Svg
                          src={`/icons/${controls.play ? 'pause' : 'play'}`}
                        />
                      </AtomButton>
                    ) : (
                      <AtomButton
                        css={css`
                          @media (max-width: 980px) {
                            display: none;
                          }
                        `}
                      >
                        <Svg src={`/icons/${button.icon}`} />
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
              {buttonsActions(router, controls).map((item) => (
                <AtomButton key={item.key} onClick={item.onClick} padding="0px">
                  <AtomIcon
                    icon={item.icon}
                    width="22px"
                    height="22px"
                    color={item.active ? 'blue' : 'white'}
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

const buttonsActions = (router: NextRouter, controls: Inti) => [
  {
    key: 1,
    id: 'repeat',
    active: controls.repeat,
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/repeat2.svg',
  },
  {
    key: 2,
    id: 'aleatory',
    active: controls.aleatory,
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/aleatory.svg',
  },
  {
    key: 3,
    id: 'queue',
    active: false,
    onClick: () => router.push('/swap/queue'),
    icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/queue.svg',
  },
  // {
  //   key: 4,
  //   id: 'sound',
  //   icon: 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/sound.svg',
  // },
]
const playerButtons = [
  {
    key: 1,
    id: 'aleatory',
    icon: 'aleatory',
  },
  {
    key: 1,
    id: 'back',
    icon: 'back',
  },
  {
    key: 2,
    id: 'play',
    icon: {
      play: 'play',
      pause: 'pause',
    },
  },
  {
    key: 3,
    id: 'next',
    icon: 'next',
  },
  {
    key: 1,
    id: 'repeat',
    icon: 'repeat',
  },
]

export default NavbarPlayer
