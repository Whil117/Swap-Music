import ColorThief from 'colorthief'
import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

type Props = {
  url: string
}
const rgbToHex = (r: number, g: number, b: number) =>
  '#' +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    })
    .join('')
export const colorsAtom = atom([] as string[])

const UseColor = ({ url }: Props) => {
  const [first, setfirst] = useAtom(colorsAtom)
  useEffect(() => {
    ;(async () => {
      const colorThief = new ColorThief()
      const img = new Image()
      img.addEventListener('load', function () {
        const data = colorThief.getPalette(img, 5)
        const hex = data.map((item) => rgbToHex(item[0], item[1], item[2]))
        //filter color if it is too dark or too light or if its brown, gray ,black or white or if its color skin
        const filtered = hex.filter((item) => {
          const r = parseInt(item.substring(1, 3), 16)
          const g = parseInt(item.substring(3, 5), 16)
          const b = parseInt(item.substring(5, 7), 16)
          const brightness = (r * 299 + g * 587 + b * 114) / 1000
          const isDark = brightness < 125
          const isLight = brightness > 200
          const isBrown = r > 150 && g < 50 && b < 50
          const isGray = r > 200 && g > 200 && b > 200
          const isBlack = r > 200 && g > 200 && b > 200
          const isWhite = r < 50 && g < 50 && b < 50
          const isSkin =
            r > 200 && g > 200 && b > 200 && r < 150 && g < 150 && b < 150
          return (
            !isDark &&
            !isLight &&
            !isBrown &&
            !isGray &&
            !isBlack &&
            !isWhite &&
            !isSkin
          )
        })
        setfirst(filtered.length > 0 ? filtered : ['gray'])
      })
      img.crossOrigin = 'Anonymous'
      img.src = url
    })()
  }, [url])
  return first
}

export default UseColor
