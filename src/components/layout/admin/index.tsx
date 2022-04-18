import NavbarDashboard from '@Components/Navbar/dashboard'
import { css } from '@emotion/react'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import { PropsLayout } from '..'

const LayoutDashboard: FC<PropsLayout> = ({ children }) => {
  return (
    <AtomWrapper
      css={css`
        display: grid;
        grid-template-columns: 216px 1fr;
        grid-template-rows: 1fr auto;
        height: 100vh;
        @media (max-width: 980px) {
          grid-template-columns: 1fr;
        }
      `}
    >
      <NavbarDashboard />
      {children}
    </AtomWrapper>
  )
}

export default LayoutDashboard
