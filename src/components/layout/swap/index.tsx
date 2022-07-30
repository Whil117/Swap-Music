/* eslint-disable @next/next/no-page-custom-font */
import AtomBarScroll, {
  isBottomAtom,
  routerAtom,
  scrollPositionAtom,
} from '@Components/@atoms/AtomBarScroll'
import NavbarPlayer from '@Components/Navbar/player'
import Navbar from '@Components/Navbar/swap'
import { css } from '@emotion/react'
import { useAtomValue, useSetAtom } from 'jotai'
import AtomWrapper from 'lib/Atomwrapper'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, useRef } from 'react'
import { PropsLayout } from '..'
import Hidratation from '../Hidratation'

const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  Number(Number(((value - x1) * (y2 - x2)) / (y1 - x1) + x2).toFixed(2))

const SwapUser: FC<PropsLayout> = (props) => {
  const setscrollPositionAtom = useSetAtom(scrollPositionAtom)
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>()
  const setrouterAtom = useSetAtom(routerAtom)
  const isBottom = useAtomValue(isBottomAtom)
  const handleScroll = async () => {
    if (scrollRef.current) {
      setrouterAtom(router.pathname.split('/')[2])
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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Hidratation>
        <AtomWrapper
          css={css`
            display: grid;
            grid-template-columns: 250px 1fr;
            grid-template-rows: 1fr auto;
            overflow: hidden;

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
                width: 8px;
              }

              ::-webkit-scrollbar-thumb {
                width: 5px;
                background: #ccc;
                border-radius: 4px;
              }
              ::-webkit-scrollbar-thumb:hover {
                width: 5px;
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
