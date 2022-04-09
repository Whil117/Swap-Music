import styled from '@emotion/styled'

export const Wrapper = styled.div`
  /* padding: 20px; */
  /* position: absolute; */
  /* z-index: -1; */
  display: flex;
  grid-column: 2/3;
  grid-row: 1 /2;
  position: relative;
  overflow: hidden;
  overflor-y: scroll;
  display: flex;
  flex-direction: column;
  overflow: auto;
  alig-items: flex-start;
  ::-webkit-scrollbar {
    width: 5px;
    /* height: 8px; */
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    margin: 2rem;
  }
  @media (max-width: 768px) {
    margin-left: 0;
    margin: 0;
  }
`
export const Profile = styled.a`
  grid-column: 3;
`
