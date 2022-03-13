import styled from '@emotion/styled'
import colors from '@Styles/global/colors'
import Styles from '@Whil/types/styles'

export const PWrapper = styled.p<{ styles?: Styles }>`
  display: flex;
  align-items: ${({ styles }): string =>
    (styles && styles.alignitems) || 'center'};
  text-decoration: ${({ styles }) => styles?.textDecoration || 'none'};
  font-size: ${({ styles }) => styles?.fontSize || '1rem'};
  opacity: ${({ styles }) => styles?.opacity || 1};
  font-weight: ${({ styles }) => styles?.fontWeight || 'normal'};
  line-height: ${({ styles }) => styles?.lineheight || '1.4'};
  text-align: ${({ styles }) => styles?.textAlign || 'left'};
  color: ${({ styles }) => styles?.color || colors.white};
  width: ${({ styles }) => styles?.width || '100%'};
  margin: ${({ styles }) => styles?.margin || '0'};
  padding: ${({ styles }) => styles?.padding || '0'};
`
