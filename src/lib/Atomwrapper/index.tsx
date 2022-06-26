import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

export type AtomWrapperProps = {
  children?: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  css?: SerializedStyles
  href?: string
  width?: string
  htmlFor?: string
  value?: string
  disabled?: boolean
  padding?: string
  gap?: string
  flexDirection?: 'row' | 'column'
}

export const AtomWrapper = styled.div<AtomWrapperProps>`
  /* display: grid; */
  width: ${(props) => props.width};
  gap: ${(props) => props.gap || '0px'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
  padding: ${(props) => props.padding ?? '0px'};
  ${(props) => props?.css};
`

export default AtomWrapper
