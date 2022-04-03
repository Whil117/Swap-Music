import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

export type AtombuttonProps = {
  children?: React.ReactNode
  as?: keyof JSX.IntrinsicElements
  css?: SerializedStyles
  href?: string
  backgroundColor?: string
}

const Atombutton = styled.button<AtombuttonProps>`
  border: none;
  outline: none;
  padding: 5px;
  cursor: pointer;
  background-color: ${(props) => props?.backgroundColor};

  ${(props) => props?.css};
`
export default Atombutton
