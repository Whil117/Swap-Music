import styled from '@emotion/styled'

export const ArtistWrapper = styled.main`
  width: 100%;
`
export const AlbumsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: auto;
  }
`

export const ArtistBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 57%;
  justify-content: center;
  margin: 20px 60px;
  @media (max-width: 768px) {
    width: auto;
    margin: 20px 0;
  }
`

export const AlbumWrapper = styled.div`
  @media (max-width: 768px) {
    margin: 0 20px;
  }
`
export const ArtistHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 642px) {
    flex-direction: column;
  }
`
