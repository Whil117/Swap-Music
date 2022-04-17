import styled from '@emotion/styled'
import colors from '@Styles/global/colors'

export const Navbar = styled.nav`
  padding: 1rem 1.5rem;
  color: ${colors.white};
  width: auto;
  z-index: 2;
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  background: ${colors.black_quaternary};
  border-radius: 0px 10px 0px 0px;
  top: 0;
  @media (max-width: 980px) {
    display: none;
  }
`
export const NavbarSection = styled.a`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  p {
    color: ${colors.white};
    font-size: 14px;
    margin-left: 0.5rem;
  }
`
export const NavbarSectionName = styled.p`
  font-size: 13px;
  font-weight: 600;
  margin-left: 0.5rem;
  opacity: 0.5;
`
export const NavbarHeader = styled.header`
  display: flex;
  align-items: center;
  margin: 0 0 0 17px;
  h1 {
    margin-left: 0.5rem;
    font-size: 24px;
  }
`
