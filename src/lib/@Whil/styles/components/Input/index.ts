import styled from '@emotion/styled'
import Styles from '@Whil/types/styles'
import { Field } from 'formik'

export const InputStyled = styled(Field)<{ styles?: Styles }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border: none;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  font-size: ${({ styles }) => styles?.fontSize || '16px'};
  margin: ${({ styles }) => styles?.margin || '0'};
  width: ${({ styles }) => styles?.width || '300px'};
  height: ${({ styles }) => styles?.height || 'auto'};
  resize: ${({ styles }) => styles?.resize || 'none'};
  color: ${({ styles }) => styles?.color || '#000000'};
  &:focus {
    outline: none;
  }
`
