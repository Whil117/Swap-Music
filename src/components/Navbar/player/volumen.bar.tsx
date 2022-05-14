/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import { useAtom } from 'jotai'
import AtomInput from 'lib/AtomInput'
import { ChangeEvent, FC, RefObject, useEffect } from 'react'
import { controlsAtom } from '.'

type Props = {
  volumen: number
  color: string
  audio: RefObject<HTMLAudioElement>
}

const BarVolumen: FC<Props> = ({ audio, color }) => {
  const [volumen, setvolumen] = useAtom(controlsAtom)
  useEffect(() => {
    if (audio.current) {
      audio.current.volume = Number(volumen?.volumen as unknown as number) / 100
    }
    return () => {}
  }, [volumen])
  return (
    <AtomInput
      id="volumen"
      type="range"
      placeholder="Search"
      value={volumen.volumen}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setvolumen({
          ...volumen,
          volumen: Number(event.target.value),
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
        background-image: linear-gradient(${color}, ${color});
        background-repeat: no-repeat;
        background-size: ${volumen.volumen}% 100%;
        ::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 15px;
          width: 15px;
          border-radius: 50%;
          background: ${color};
          cursor: pointer;
          box-shadow: 0 0 2px 0 #555;
          transition: background 0.3s ease-in-out;
        }
        ::-moz-range-thumb {
          -webkit-appearance: none;
          height: 20px;
          border-radius: 50%;
          background: ${color};
          cursor: pointer;
          box-shadow: 0 0 2px 0 #555;
          transition: background 0.3s ease-in-out;
        }
        ::-ms-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${color};
          cursor: pointer;
          box-shadow: 0 0 2px 0 #555;
          transition: background 0.3s ease-in-out;
        }
        ::-webkit-slider-thumb:hover {
          background: ${color};
        }
        ::-moz-range-thumb:hover {
          background: ${color};
        }
        ::-ms-thumb:hover {
          background: ${color};
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
  )
}

export default BarVolumen
