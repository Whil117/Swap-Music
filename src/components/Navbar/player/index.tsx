import { css } from '@emotion/react'
import AtomInput from 'lib/AtomInput'
import AtomWrapper from 'lib/Atomwrapper'
import { FC, useState } from 'react'

type Props = {}

const NavbarPlayer: FC<Props> = (props) => {
  const [volumen, setVolumen] = useState(50)
  return (
    <AtomWrapper
      css={css`
        height: 80px;
        grid-column: 1 / -1;
        grid-row: 2;
        background-color: #292935;
      `}
    >
      {volumen}
      <AtomInput
        id="volumen"
        type="range"
        placeholder="Search"
        value={volumen}
        onChange={(e) => setVolumen(e.target.value)}
        css={css`
          /* width: 400px; */
        `}
      />
    </AtomWrapper>
  )
}

export default NavbarPlayer
