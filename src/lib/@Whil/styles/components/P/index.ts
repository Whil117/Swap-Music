import styled from '@emotion/styled'
import colors from '@Styles/global/colors'
import Styles from '@Whil/types/styles'

export const PWrapper = styled.p<{ styles?: Styles }>`
  font-size: ${({ styles }) => styles?.fontSize || '1rem'};
  font-weight: ${({ styles }) => styles?.fontWeight || 'normal'};
  line-height: ${({ styles }) => styles?.lineheight || '16px'};
  text-align: ${({ styles }) => styles?.textAlign || 'left'};
  color: ${({ styles }) => styles?.color || colors.white};
  width: ${({ styles }) => styles?.width || '100%'};
  margin: ${({ styles }) => styles?.margin || '0'};
  padding: ${({ styles }) => styles?.padding || '0'};
`
