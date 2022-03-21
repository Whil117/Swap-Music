import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { CardArtist } from '@Types/components/Cards/types'

export const Cards = styled.div<CardArtist>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ assets }) =>
    assets?.length > 6 ? 'space-between' : 'flex-start'};
  overflow: hidden;
  width: ${({ width, assets }) =>
    assets ? 'inherit' : width ? '1540px' : '100%'};
  height: 304px;
  ${({ show }) =>
    show &&
    css`
      overflow: none;
      height: 100%;
    `}
  @media (max-width: 768px) {
    width: auto;
    justify-content: center;
  }
`
