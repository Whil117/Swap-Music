import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const LikedSongsWrapper = styled.div<{ color: string }>`
  height: 320px;
  display: flex;
  align-items: center;
  padding: 30px 60px;
  transition: all 0.3s ease;
  ${({ color }) =>
    color &&
    css`
      background: linear-gradient(180deg, rgba(90, 28, 28, 0) 0%, #121216 100%),
        ${color};
    `}
`
export const LikedSongsApp = styled.div`
  width: 100%;
`
export const LikedSongsProps = styled.div`
  margin: 0 50px;
  h1 {
    margin: 0;
    font-size: 48px;
  }
`
