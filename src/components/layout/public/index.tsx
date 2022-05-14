import AtomBarScroll from '@Components/@atoms/AtomBarScroll'
import Loading from '@Components/Loading'
import NavbarPlayer from '@Components/Navbar/player'
import Navbar from '@Components/Navbar/public'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/components/layout'
import AtomWrapper from 'lib/Atomwrapper'
import { FC, useState } from 'react'
import { PropsLayout } from '..'
import Hidratation from '../Hidratation'

const SwapPublic: FC<PropsLayout> = (props) => {
  const [show, setShow] = useState(true)

  return (
    <Hidratation
      {...{
        hidratation: props.hidratation as boolean,
        accessToken: props.accessToken as string,
        setShow,
      }}
    >
      {props?.router?.pathname.includes('/swap') ? (
        <>
          {show ? (
            <Loading />
          ) : (
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
              <Navbar />
              <Wrapper id="view">
                <AtomBarScroll />
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
              </Wrapper>
              <NavbarPlayer accessToken={props.accessToken} />
            </AtomWrapper>
          )}
        </>
      ) : (
        props.children
      )}
    </Hidratation>
  )
}
export default SwapPublic
