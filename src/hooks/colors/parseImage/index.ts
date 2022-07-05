/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import Vibrant from 'node-vibrant'
import { Palette, Vec3 } from 'node-vibrant/lib/color'
import { ImageSource } from 'node-vibrant/lib/typing'
import { ReactNode } from 'react'

export type Props = {
  onError: (err: Object) => void
  getColors: (colors: (string | Vec3)[]) => void
  rgb: boolean
  src: string
  maxColors: number
  children?: ReactNode
}

export type Image = ImageSource

const parseImage = (props: Props) => {
  Vibrant.from(props?.src)
    .maxColorCount(props.maxColors)
    .getSwatches()
    .then((swatches) => {
      props.getColors(getColorsFromSwatches(swatches as Palette, props))
    })
}

type getColorsFromSwatches = {
  [key: string]: {
    getHex: () => string
    getRgb: () => Vec3
  }
}

const getColorsFromSwatches = (swatches = {} as any, props: Props) => {
  const colors = []
  for (let swatch in swatches) {
    if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
      if (props.rgb) {
        const rgb = swatches[swatch] && swatches[swatch].getRgb()
        colors.push(rgb)
      } else {
        const hex = swatches[swatch] && swatches[swatch].getHex()
        colors.push(hex)
      }
    }
  }

  return colors as (string | Vec3)[]
}

export default parseImage
