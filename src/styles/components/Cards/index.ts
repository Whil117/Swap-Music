import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { CardArtist } from '@Types/components/Cards/types'

export const Cards = styled.div<CardArtist>`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  width: 1540px;
  height: 304px;
  ${({ show }) =>
    show &&
    css`
      overflow: none;
      height: 100%;
    `}
`
