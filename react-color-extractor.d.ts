/* eslint-disable no-unused-vars */
declare module 'react-color-extractor' {
  import { FC } from 'react'
  export const ColorExtractor: FC<{
    src: string
    getColors: (colors: string[]) => void
  }>
  export default ColorExtractor
}
