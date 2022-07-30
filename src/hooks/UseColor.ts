import { atom, useAtom, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useEffect } from 'react'
import parseImage from './colors/parseImage'
export const defaultImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/800px-A_black_image.jpg?20201103073518'

const colorFetch = async (url: string) =>
  await parseImage({
    maxColors: 2,
    onError: function (): void {
      throw new Error('Function not implemented.')
    },
    rgb: false,
    src: url,
  })

const colorValueAtom = atomWithStorage('IMAGESWAP', defaultImage)
export const colorsAtom = atom(
  async (get) => (await colorFetch(get(colorValueAtom))) ?? ['#000000']
)

const UseColor = ({ url }: { url: string }) => {
  const setColorValue = useSetAtom(colorValueAtom)
  const [color] = useAtom(colorsAtom)
  useEffect(() => setColorValue(url), [url])

  return color.find((item) => item === '#040404')
    ? ['#040404']
    : (color as string[])
}

export default UseColor
