import AtomNavbar from '@Components/Navbar/public'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/components/layout'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'

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
      <Wrapper id="view">
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
      {/* <NavbarPlayer /> */}
    </AtomWrapper>
  )
}

export default Public
