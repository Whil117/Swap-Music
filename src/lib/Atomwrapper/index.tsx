import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

export type AtomWrapperProps = {
  children?: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  css?: SerializedStyles
  href?: string
  width?: string
  htmlFor?: string
}

export const AtomWrapper = styled.div<AtomWrapperProps>`
  width: ${(props) => props.width};
  ${(props) => props?.css};
`

export default AtomWrapper
