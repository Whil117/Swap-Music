import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

export type AtombuttonProps = {
  children?: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  css?: SerializedStyles
  href?: string
  backgroundColor?: string
  padding?: string
  color?: string
  borderRadius?: string
  fontSize?: string
  fontWeight?:
    | 'bold'
    | 'normal'
    | 'lighter'
    | 'bolder'
    | 'initial'
    | 'inherit'
    | 'unset'
  width?: string
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline'
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
  height?: string
}

const AtomButton = styled.button<AtombuttonProps>`
  border: none;
  outline: none;
  display: flex;
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  padding: ${(props) => props.padding || '0px'};
  color: ${(props) => props.color || '#fff'};
  border-radius: ${(props) => props.borderRadius || '5px'};
  font-size: ${(props) => props.fontSize || '1rem'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  cursor: pointer;
  background-color: ${(props) => props?.backgroundColor || 'transparent'};
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  ${(props) => props?.css};
`
export default AtomButton
