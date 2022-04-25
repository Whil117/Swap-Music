/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import reducerplayer, { initialState } from '@Redux/reducers/player/controls'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Svg from '@Whil/components/Svg'
import { atom } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import spotifyAPI from 'lib/spotify/spotify'
import { useRouter } from 'next/router'
import { FC, useEffect, useRef, useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'
import { useSelector } from 'react-redux'
import Progressbar from './progressbar'
import BarVolumen from './volumen.bar'

const strAtom = atom(
  localStorage.getItem('controls') ?? JSON.stringify(initialState)
)

const countAtom = atom(initialState)

const NavbarPlayer: FC<{ accessToken?: string }> = ({ accessToken }) => {
  const player = useSelector((state: SelectFor) => state.playerTracks)
  const [track, setTrack] = useState<SpotifyApi.SingleTrackResponse>()
  const audio = useRef<HTMLAudioElement>(null)
  const [controls, dispatch] = useReducerAtom(countAtom, reducerplayer)
  const router = useRouter()
  //crea un evento para guardar la imagen del album
  const handlePlay = () => {
    audio.current?.play()
    if (audio.current) {
      dispatch({
        type: 'PLAY',
        payload: { ...controls, play: true },
      })
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track?.name,
        artist: track?.artists[0].name,
        album: track?.album.name,
        artwork: track?.album.images.map((image) => ({
          src: image.url,
          sizes: `${image.width}x${image.height}`,
          type: 'image/jpeg',
        })),
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

  // useEffect(() => {
  //   navigator.mediaSession.metadata = new MediaMetadata({
  //     title: track?.name,
  //     artist: track?.artists[0].name,
  //     album: track?.album.name,
  //     artwork: track?.album.images.map((image) => ({
  //       src: image.url,
  //       sizes: `${image.width}x${image.height}`,
  //       type: 'image/jpeg',
  //     })),
  //   })
  // }, [track])

  useEffect(() => {
    if (accessToken && player.currentTrackId) {
      spotifyAPI.setAccessToken(accessToken as string)
      spotifyAPI
        .getTrack(player.currentTrackId ?? '')
        .then((res) =>
          res.body.preview_url
            ? setTrack(res.body)
            : setTrack({} as SpotifyApi.SingleTrackResponse)
        )
    }
  }, [accessToken, player.currentTrackId])

  return (
    <AtomSeoLayout title={track?.name} image={track?.album?.images[0]?.url}>
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
              id="IMAGE"
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
                    // onPointerUp={() => {
                    //   if (button.action) {
                    //     button.action()
                    //   }
                    // }}
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
          <Progressbar
            audio={audio}
            track={track?.preview_url as string}
            colorbar={controls.color}
            dispatch={dispatch}
            autoplay={controls.play}
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
          {buttonsActions.map((item) => (
            <Atombutton key={item.key}>
              <Svg src={`/icons/${item.icon}`} />
            </Atombutton>
          ))}
          <BarVolumen
            audio={audio}
            dispatch={dispatch}
            color={controls.color}
            volumen={controls.volumen}
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
