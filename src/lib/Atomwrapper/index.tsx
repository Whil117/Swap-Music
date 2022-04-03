import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

export type AtomWrapperProps = {
  children?: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  css?: SerializedStyles
  href?: string
}

export const AtomWrapper = styled.div<AtomWrapperProps>`
  ${(props) => props?.css};
`

export default AtomWrapper
