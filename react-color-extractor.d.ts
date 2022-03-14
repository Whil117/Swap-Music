/* eslint-disable no-unused-vars */
import { FC } from 'react'

declare module 'react-color-extractor' {
  export const ColorExtractor: FC<{
    src: string
    getColors: (colors: string[]) => void
  }>
  export default ColorExtractor
}
