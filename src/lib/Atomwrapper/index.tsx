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
  margin?: string
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
  maxWidth?: string
}

export const AtomWrapper = styled.div<AtomWrapperProps>`
  width: ${(props) => props.width};
  gap: ${(props) => props.gap || '0px'};
  margin: ${(props) => props.margin || '0px'};
  max-width: ${(props) => props.maxWidth || 'none'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  flex-wrap: ${(props) => props.flexWrap || 'wrap'};
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: ${(props) => props.alignItems || 'none'};
  justify-content: ${(props) => props.justifyContent || 'none'};
  padding: ${(props) => props.padding ?? '0px'};
  ${(props) => props?.css};
`

export default AtomWrapper
