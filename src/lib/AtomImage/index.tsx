import styled from '@emotion/styled'
import Image from 'next/image'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  borderRadius?: string
}

const AtomImage = styled(Image)<Props>`
  object-fit: cover;
  border-radius: ${(props) => props.borderRadius};
`

export default AtomImage
