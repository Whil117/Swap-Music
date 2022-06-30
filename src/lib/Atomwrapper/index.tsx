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
  backgroundColor?: string
  flexWrap?: 'wrap' | 'nowrap'
}

export const AtomWrapper = styled.div<AtomWrapperProps>`
  display: flex;
  width: ${(props) => props.width ?? '100%'};
  gap: ${(props) => props.gap || '0px'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  flex-wrap: ${(props) => props.flexWrap || 'wrap'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
  padding: ${(props) => props.padding ?? '0px'};
  ${(props) => props?.css};
`

export default AtomWrapper
