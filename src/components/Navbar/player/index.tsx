/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import useScreen from '@Hooks/useScreen'
import reducerplayer, { initialState } from '@Redux/reducers/player/controls'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Svg from '@Whil/components/Svg'
import { atom } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomInput from 'lib/AtomInput'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'
import { useSelector } from 'react-redux'

const countAtom = atom(initialState)

type Props = {
  controls: {
    play: boolean
    repeat: boolean
    aleatory: boolean
    loop: boolean
    volumen: number
    color: string
    currentTime: number
  }
}

const CustomInput = styled.input<Props>`
  height: 6px;
  grid-column: 2;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;
  background: rgb(92 86 86 / 60%);
  border: none;
  border-radius: 5px;
  background-image: linear-gradient(
    ${({ controls }) => controls.color},
    ${({ controls }) => controls.color}
  );
  background-repeat: no-repeat;
  background-size: ${({ controls }) =>
      Math.floor(((controls.currentTime - 0) * 100) / 30 - 0)}%
    100%;
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: ${({ controls }) => controls.color};
    cursor: pointer;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }
  ::-moz-range-thumb {
    -webkit-appearance: none;
    height: 20px;
    border-radius: 50%;
    background: ${({ controls }) => controls.color};
    cursor: pointer;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }
  ::-ms-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: ${({ controls }) => controls.color};
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }
  ::-webkit-slider-thumb:hover {
    background: ${({ controls }) => controls.color};
  }
  ::-moz-range-thumb:hover {
    background: ${({ controls }) => controls.color};
  }
  ::-ms-thumb:hover {
    background: ${({ controls }) => controls.color};
  }

  ::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  ::-moz-range-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  ::-ms-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  @media (max-width: 980px) {
    height: 2px;
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    ::-webkit-slider-thumb {
      margin-top: -6.95px;
      width: 23px;
      height: 23px;
      opacity: 0;
      background: rgba(241, 86, 209, 0.1);
      border: 2.5px solid #83e584;
      border-radius: 12px;
      cursor: pointer;
      -webkit-appearance: none;
    }
  }
`

const NavbarPlayer: FC<{ accessToken?: string }> = ({ accessToken }) => {
  const player = useSelector((state: SelectFor) => state.playerTracks)
  const [track, setTrack] = useState<SpotifyApi.SingleTrackResponse>()
  const audio = useRef<HTMLAudioElement>(null)
  // const [controls, dispatch] = useReducer(reducerplayer, initialState)
  const [controls, dispatch] = useReducerAtom(countAtom, reducerplayer)
  const router = useRouter()
  const screen = useScreen()

  const handlePlay = () => {
    audio.current?.play()
    if (audio.current) {
      dispatch({
        type: 'PLAY',
        payload: { ...controls, play: true },
      })
    }
  }
  const handlePause = () => {
    audio.current?.pause()
    dispatch({
      type: 'PLAY',
      payload: { ...controls, play: false },
    })
  }

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = (controls?.volumen as number) / 100
    }
    return () => {
      if (audio.current) {
        audio.current.volume = 0
      }
    }
  }, [controls.volumen])

  useEffect(() => {
    if (audio.current) {
      audio.current.ontimeupdate = (event: any) => {
        dispatch({
          type: 'CURRENT_TIME',
          payload: { ...controls, currentTime: event.target.currentTime },
        })
      }
    }
    return () => {
      if (audio.current) {
        audio.current.ontimeupdate = null
      }
    }
  }, [audio.current])

  useEffect(() => {
    if (accessToken && player.currentTrackId) {
      spotifyAPI.setAccessToken(accessToken as string)
      spotifyAPI.getTrack(player.currentTrackId ?? '').then((res) =>
        res.body.preview_url
          ? setTrack(res.body)
          : (setTrack({} as SpotifyApi.SingleTrackResponse),
            dispatch({
              type: 'CURRENT_TIME',
              payload: { ...controls, currentTime: 0 },
            }))
      )
    }
  }, [accessToken, player.currentTrackId])

  return (
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
      <ColorExtractor
        src={
          track?.album?.images?.[0]?.url ??
          'https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2FFrame%2094.svg?alt=media&token=e9c9283e-808b-40ac-ba7b-3ce37452a9a2'
        }
        getColors={(colors: string[]) => {
          dispatch({
            type: 'COLOR',
            payload: { ...controls, color: colors[0] },
          })
        }}
      />
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
        <AtomWrapper
          css={css`
            width: 80px;
            grid-row: 1 /-1;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomImage
            src={
              (track?.album?.images[0]?.url as string) ??
              'https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2FFrame%2094.svg?alt=media&token=e9c9283e-808b-40ac-ba7b-3ce37452a9a2'
            }
            alt={track?.name as string}
            borderRadius="10px"
            width="100%"
            height="100%"
            css={css`
              grid-row: 1 / -1;
            `}
          />
        </AtomWrapper>
        <AtomText
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
          {track?.name}
        </AtomText>
        <AtomWrapper
          css={css`
            grid-column: 2;
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
            {track?.artists?.map((item, index) => (
              <Atombutton
                key={item.id && item?.id}
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
              </Atombutton>
            ))}
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
      <Atombutton
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
      </Atombutton>
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
                <Atombutton
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
                >
                  <Svg src={`/icons/${controls.play ? 'pause' : 'play'}`} />
                </Atombutton>
              ) : (
                <Atombutton
                  css={css`
                    @media (max-width: 980px) {
                      display: none;
                    }
                  `}
                >
                  <Svg src={`/icons/${button.icon}`} />
                </Atombutton>
              )}
            </>
          ))}
        </AtomWrapper>
        <AtomWrapper
          css={css`
            width: 100%;
            grid-row: 2;
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            @media (max-width: 980px) {
              grid-row: 2;
            }
          `}
        >
          <AtomText
            as="p"
            css={css`
              margin: 0;
              grid-column: 1;
              @media (max-width: 980px) {
                display: none;
              }
            `}
          >
            {Math.round(
              audio.current?.currentTime ? audio.current.currentTime : 0
            ) > 9
              ? `0:${Math.round(
                  audio.current?.currentTime ? audio.current.currentTime : 0
                )}`
              : `0:0${Math.round(
                  audio.current?.currentTime ? audio.current.currentTime : 0
                )}`}
          </AtomText>
          <CustomInput
            id="player-reproductor"
            type="range"
            min="0"
            max="30"
            controls={controls}
            value={controls.currentTime}
            disabled={screen <= 980}
            onChange={(event) => {
              if (audio.current) {
                audio.current.currentTime = Number(event.target.value)
              }
            }}
          />
          {track?.preview_url && (
            <audio
              ref={audio}
              // loop={player.play}
              src={track?.preview_url as string}
              autoPlay={controls.play}
              onEnded={() => {
                dispatch({
                  type: 'PLAY',
                  payload: {
                    play: false,
                  },
                })
              }}
            ></audio>
          )}

          <AtomText
            as="p"
            css={css`
              margin: 0;
              grid-column: 3;
              @media (max-width: 980px) {
                display: none;
              }
            `}
          >
            0:30
          </AtomText>
        </AtomWrapper>
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
        {buttonsActions.map((item) => (
          <Atombutton key={item.key}>
            <Svg src={`/icons/${item.icon}`} />
          </Atombutton>
        ))}
        <AtomInput
          id="volumen"
          type="range"
          placeholder="Search"
          value={controls.volumen}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: 'VOLUMEN',
              payload: {
                ...controls,
                volumen: parseInt(event.target.value),
              },
            })
          }
          css={css`
            width: 150px;
            height: 6px;
            outline: none;
            grid-column: 2;
            outline: none;
            -webkit-appearance: none;
            background: rgb(92 86 86 / 60%);
            border: none;
            border-radius: 5px;
            background-image: linear-gradient(
              ${controls.color},
              ${controls.color}
            );
            background-repeat: no-repeat;
            background-size: ${controls.volumen}% 100%;
            ::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 15px;
              width: 15px;
              border-radius: 50%;
              background: ${controls.color};
              cursor: pointer;
              box-shadow: 0 0 2px 0 #555;
              transition: background 0.3s ease-in-out;
            }
            ::-moz-range-thumb {
              -webkit-appearance: none;
              height: 20px;
              border-radius: 50%;
              background: ${controls.color};
              cursor: pointer;
              box-shadow: 0 0 2px 0 #555;
              transition: background 0.3s ease-in-out;
            }
            ::-ms-thumb {
              -webkit-appearance: none;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: ${controls.color};
              cursor: pointer;
              box-shadow: 0 0 2px 0 #555;
              transition: background 0.3s ease-in-out;
            }
            ::-webkit-slider-thumb:hover {
              background: ${controls.color};
            }
            ::-moz-range-thumb:hover {
              background: ${controls.color};
            }
            ::-ms-thumb:hover {
              background: ${controls.color};
            }

            ::-webkit-slider-runnable-track {
              -webkit-appearance: none;
              box-shadow: none;
              border: none;
              background: transparent;
            }
            ::-moz-range-track {
              -webkit-appearance: none;
              box-shadow: none;
              border: none;
              background: transparent;
            }
            ::-ms-track {
              -webkit-appearance: none;
              box-shadow: none;
              border: none;
              background: transparent;
            }
          `}
        />
      </AtomWrapper>
    </AtomWrapper>
  )
}

const buttonsActions = [
  {
    key: 1,
    id: 'repeat',
    icon: 'repeat',
  },
  {
    key: 2,
    id: 'aleatory',
    icon: 'aleatory',
  },
  {
    key: 3,
    id: 'queue',
    icon: 'queue',
  },
  {
    key: 4,
    id: 'sound',
    icon: 'sound',
  },
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
