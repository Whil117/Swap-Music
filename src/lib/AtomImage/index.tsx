import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

type Props = {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  borderRadius?: string
  css?: SerializedStyles
}

const AtomImage = styled('img')<Props>`
  object-fit: cover;
  border-radius: ${(props) => props.borderRadius};
  ${(props) => props?.css};
`
export default AtomImage
