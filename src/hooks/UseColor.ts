import { atom, useAtom } from 'jotai'
import { Vec3 } from 'node-vibrant/lib/color'
import { useEffect } from 'react'
import parseImage from './colors/parseImage'

type Props = {
  url: string
}

export const colorsAtom = atom(['gray'] as (string | Vec3)[])

const UseColor = ({ url }: Props) => {
  const [first, setfirst] = useAtom(colorsAtom)
  useEffect(() => {
    parseImage({
      maxColors: 5,
      getColors: (colors) => {
        setfirst(colors)
      },
      onError: function (): void {
        throw new Error('Function not implemented.')
      },
      rgb: false,
      src: url,
    })
  }, [url])

  return first
}

export default UseColor
