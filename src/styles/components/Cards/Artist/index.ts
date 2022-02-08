import styled from '@emotion/styled'
import colors from '@Styles/global/colors'

export const CardArtist = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${colors.white};
  padding: 10px;
  background-color: ${colors.black_quinary};
  margin: 10px;
  border-radius: 5px;
  height: 264px;
  &:hover {
    background: ${colors.black_quaternary};
  }
  h4 {
    width: 170px;
    line-height: 1.2;
    text-align: center;
    font-size: 1rem;
    margin: 10px 0;
  }
  p {
    /* font-size: 0.8rem; */
    opacity: 0.5;
    margin: 0;
  }
`
