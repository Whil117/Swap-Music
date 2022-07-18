import AtomBarScroll, {
  isBottomAtom,
  scrollPositionAtom,
} from '@Components/@atoms/AtomBarScroll'
import NavbarPlayer from '@Components/Navbar/player'
import Navbar from '@Components/Navbar/swap'
import { css } from '@emotion/react'
import { useAtomValue, useSetAtom } from 'jotai'
import AtomWrapper from 'lib/Atomwrapper'
import { FC, useRef } from 'react'
import { PropsLayout } from '..'
import Hidratation from '../Hidratation'

const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  Number(Number(((value - x1) * (y2 - x2)) / (y1 - x1) + x2).toFixed(2))

const SwapUser: FC<PropsLayout> = (props) => {
  const setscrollPositionAtom = useSetAtom(scrollPositionAtom)

  const scrollRef = useRef<HTMLDivElement>()
  const isBottom = useAtomValue(isBottomAtom)
  const handleScroll = async () => {
    if (scrollRef.current) {
      setscrollPositionAtom({
        scrollHeight: map(
          scrollRef.current.scrollHeight,
          0,
          scrollRef.current.scrollHeight,
          0,
          100
        ),
        clientHeight: map(
          scrollRef.current.clientHeight,
          0,
          scrollRef.current.scrollHeight,
          0,
          100
        ),
        isBottom: isBottom,
        scrollTop: map(
          scrollRef.current.scrollTop,
          0,
          scrollRef.current.scrollHeight,
          0,
          100
        ),
      })
    }
  }

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
            ref={scrollRef as any}
            onScroll={handleScroll}
            alignItems="center"
            css={css`
              width: 100%;
              display: flex;
              grid-column: 2;
              grid-row: 1 /2;
              position: relative;
              overflow: hidden;
              /* margin-bottom: 50px; */
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
