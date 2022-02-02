import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Styles from '@Whil/types/styles'

export const SvgWrapper = styled.div<{ style?: Styles }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ style }) =>
    style &&
    css`
      margin: ${style?.margin || '0'};
      bottom: ${style?.bottom || '0'};
      position: ${style?.p0sition || 'static'};
    `}
`
