import styled from '@emotion/styled'
import colors from '@Styles/global/colors'

export const LadingPageWrapper = styled.main`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  color: ${colors.white};
  background-color: ${colors.black_tertiary};
`

export const LandingPageContent = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const LandingPageButton = styled.button`
  background-color: ${colors.green_light};
  color: ${colors.white};
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`
export const LandingPageImg = styled.img`
  height: 100%;
  object-fit: cover;
  object-position: center;
  background: linear-gradient(
      90deg,
      ${colors.black_primary} 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(.png);
  @media (max-width: 1148px) {
    display: none;
  }
`
