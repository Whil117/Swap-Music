/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Svg from '@Whil/components/Svg'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomInput from 'lib/AtomInput'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  ChangeEvent,
  FC,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'
import useTime from '@Hooks/useTime'
export enum IActions {
  ON_Play = 'ON_Play',
  ON_Repeat = 'ON_Repeat',
  ON_Aleatory = 'ON_Aleatory',
  ON_Volumen = 'ON_Volumen',
  ON_Loop = 'ON_Loop',
}

export type IPlayer = {
  play?: boolean
  repeat?: boolean
  aleatory?: boolean
  loop?: boolean
  volumen?: number
}
export type IAction = {
  type: IActions
  payload: IPlayer
}

const reducer = (state: IPlayer, action: IAction): IPlayer => {
  switch (action.type) {
    case IActions.ON_Play:
      return { ...state, play: action.payload.play }
    case IActions.ON_Repeat:
      return { ...state, repeat: action.payload.repeat }
    case IActions.ON_Aleatory:
      return { ...state, aleatory: action.payload.aleatory }
    case IActions.ON_Volumen:
      return { ...state, volumen: action.payload.volumen }
    case IActions.ON_Loop:
      return { ...state, loop: action.payload.loop }
    default:
      return state
  }
}

const NavbarPlayer: FC = () => {
  const player = useSelector((state: SelectFor) => state.playerTracks)
  const [track, setTrack] = useState<SpotifyApi.SingleTrackResponse>()
  const [currentTime, setCurrentTime] = useState(0)
  const audio = useRef<HTMLAudioElement>(null)
  const [controls, dispatch] = useReducer(reducer, {
    play: (player.play as boolean) || false,
    repeat: false,
    aleatory: false,
    loop: false,
    volumen: 25,
  })
  const router = useRouter()
  const { data } = useSession()

  const handlePlay = () => {
    audio.current?.play()
    if (audio.current) {
      dispatch({
        type: IActions.ON_Play,
        payload: { ...controls, play: true },
      })
      audio.current.volume = (controls?.volumen as number) / 100
    }
  }
  const handlePause = () => {
    audio.current?.pause()
    dispatch({
      type: IActions.ON_Play,
      payload: { ...controls, play: false },
    })
  }

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = (controls?.volumen as number) / 100
    }
    return () => {}
  }, [controls.volumen])

  useLayoutEffect(() => {
    if (player.play) {
      handlePlay()
    } else {
      handlePause()
    }
  }, [player.play])

  useEffect(() => {
    if (audio.current) {
      audio.current.ontimeupdate = (event: any) => {
        setCurrentTime(event?.target?.currentTime)
      }
    }
    return () => {
      if (audio.current) {
        audio.current.ontimeupdate = null
      }
    }
  }, [audio.current])

  useEffect(() => {
    if (data?.accessToken) {
      spotifyAPI.setAccessToken(data?.accessToken as string)
      spotifyAPI
        .getTrack(player.currentTrackId as string)
        .then((res) =>
          res.body.preview_url
            ? setTrack(res.body)
            : (setTrack({} as SpotifyApi.SingleTrackResponse),
              setCurrentTime(0))
        )
    }
  }, [data, player.currentTrackId])

  return (
    <AtomSeoLayout
      title={track?.name}
      description={track?.name}
      image={track?.album?.images[0]?.url}
    >
      <AtomWrapper
        css={css`
          padding: 15px;
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
              src={track?.album?.images[0]?.url as string}
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
                  key={item.id && item?.id + index}
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
          <Svg src={`/icons/${controls.play ? 'pause' : 'play'}`} />
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
            <AtomInput
              id="player-reproductor"
              type="range"
              min="0"
              max="30"
              value={currentTime}
              disabled
              onChange={(event: any) => {
                if (audio.current) {
                  audio.current.currentTime = event.target.value
                }
              }}
              css={css`
                height: 15px;
                grid-column: 2;
                outline: none;
                @media (max-width: 980px) {
                  height: 2px;
                  grid-row: 1 / -1;
                  grid-column: 1 / -1;
                }
              `}
            />
            {track?.preview_url && (
              <audio
                ref={audio}
                // loop={player.play}
                src={track?.preview_url as string}
                autoPlay={controls.play}
                onEnded={() => {
                  dispatch({
                    type: IActions.ON_Play,
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
                type: IActions.ON_Volumen,
                payload: {
                  ...controls,
                  volumen: parseInt(event.target.value),
                },
              })
            }
            css={css`
              width: 150px;
              height: 10px;
              outline: none;
            `}
          />
        </AtomWrapper>
      </AtomWrapper>
    </AtomSeoLayout>
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
