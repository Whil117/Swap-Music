import NavbarPlayer from '@Components/Navbar/player'
import AtomNavbar from '@Components/Navbar/public'
import { css } from '@emotion/react'
import AtomWrapper from 'lib/Atomwrapper'
import { FC, Suspense } from 'react'

type Props = {}

const Public: FC<Props> = (props) => {
  return (
    <AtomWrapper
      css={css`
        display: grid;
        grid-template-columns: 225px 1fr;
        grid-template-rows: 1fr auto;
        height: 100vh;
        @media (max-width: 980px) {
          grid-template-columns: 1fr;
        }
      `}
    >
      <AtomNavbar />
      <AtomWrapper
        id="view"
        css={css`
          width: auto;
          display: flex;
          grid-column: 2;
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
          @media (max-width: 980px) {
            margin: 2rem;
            grid-column: 1/ -1;
            overflow-x: hidden;
            margin-left: 0;
            margin: 0;
          }
        `}
      >
        <AtomWrapper
          css={css`
            position: absolute;
            width: 100%;
            z-index: 1;
            top: 0;
            @media (max-width: 980px) {
              grid-column: 1 / -1;
            }
          `}
        >
          {props.children}
        </AtomWrapper>
      </AtomWrapper>
      <Suspense fallback="loading">
        <NavbarPlayer />
      </Suspense>
    </AtomWrapper>
  )
}

export default Public
