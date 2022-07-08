/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import { colorsAtom } from '@Hooks/UseColor'
import useScreen from '@Hooks/useScreen'
import { useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import AtomInput from 'lib/AtomInput'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC, MutableRefObject, useEffect } from 'react'
import { controlsAtom } from '.'
// import { useDispatch } from 'react-redux'

type Props = {
  audio: MutableRefObject<HTMLAudioElement | null>
}

export const progressBarAtom = atomWithStorage('PROGRESSBAR', 0 as number)

const Progressbar: FC<Props> = ({ audio }) => {
  const [currentTime, setCurrentTime] = useAtom(progressBarAtom)
  const [controls, dispatch] = useAtom(controlsAtom)
  const screen = useScreen()
  const colors = useAtomValue(colorsAtom)

  useEffect(() => {
    if (audio.current) {
      audio.current.ontimeupdate = (event: any) => {
        setCurrentTime(Math.round(event.target.currentTime))
      }
    }
    return () => {
      if (audio.current) {
        audio.current.ontimeupdate = null
      }
    }
  }, [audio.current])
  return (
    <AtomWrapper
      css={css`
        width: 100%;
        grid-row: 2;
        display: grid;
        gap: 10px;
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
        disabled={screen <= 980}
        onChange={(event) => {
          if (audio.current) {
            audio.current.currentTime = Number(event.target.value)
          }
        }}
        css={css`
          height: 6px;
          grid-column: 2;
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
          background: rgb(92 86 86 / 60%);
          border: none;
          border-radius: 5px;
          background-image: linear-gradient(${colors[0]}, ${colors[0]});
          background-repeat: no-repeat;
          background-size: ${Math.floor(((currentTime - 0) * 100) / 30 - 0)}%
            100%;
          ::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            background: ${colors[0]};
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
          }
          ::-moz-range-thumb {
            -webkit-appearance: none;
            height: 20px;
            border-radius: 50%;
            background: ${colors[0]};
            cursor: pointer;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
          }
          ::-ms-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: ${colors[0]};
            cursor: ew-resize;
            box-shadow: 0 0 2px 0 #555;
            transition: background 0.3s ease-in-out;
          }
          ::-webkit-slider-thumb:hover {
            background: ${colors[0]};
          }
          ::-moz-range-thumb:hover {
            background: ${colors[0]};
          }
          ::-ms-thumb:hover {
            background: ${colors[0]};
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
        `}
      />
      {controls?.player?.currentTrack?.preview_url && (
        <audio
          ref={audio}
          // loop={player.play}
          src={controls?.player?.currentTrack?.preview_url as string}
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
  )
}

export default Progressbar
