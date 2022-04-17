import styled from '@emotion/styled'

export const TrackWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

type AlbumTrackWrapperProps = {
  album?: string
}
export const AlbumTrackWrapper = styled.div<AlbumTrackWrapperProps>`
  display: flex;
  flex-direction: column;
  alugin-items: flex-start;
  width: ${({ album }) => album || '50%'};
  @media (max-width: 768px) {
    display: none;
  }
`
