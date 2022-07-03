import AtomBarScroll from '@Components/@atoms/AtomBarScroll'
import NavbarPlayer from '@Components/Navbar/player'
import Navbar from '@Components/Navbar/swap'
import { css } from '@emotion/react'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import { PropsLayout } from '..'
import Hidratation from '../Hidratation'

const SwapUser: FC<PropsLayout> = (props) => {
  return (
    <>
      <Hidratation>
        <AtomWrapper
          css={css`
            display: grid;
            grid-template-columns: 250px 1fr;
            grid-template-rows: 1fr auto;
            height: 100vh;
            @media (max-width: 980px) {
              grid-template-columns: 1fr;
            }
          `}
        >
          <Navbar />
          <AtomWrapper
            id="view"
            alignItems="center"
            css={css`
              width: 100%;
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
            <AtomBarScroll />
            <AtomWrapper
              width="100%"
              css={css`
                position: absolute;
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
          <NavbarPlayer />
        </AtomWrapper>
      </Hidratation>
    </>
  )
}
export default SwapUser
