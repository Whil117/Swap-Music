import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'

type Props = {
  css?: SerializedStyles
}
const AtomLink = styled(Link)<Props>`
  ${(props) => props?.css}
`
export default AtomLink
