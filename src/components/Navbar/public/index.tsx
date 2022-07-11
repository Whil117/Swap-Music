import { css } from '@emotion/react'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'

type Props = {}

const AtomNavbar: FC<Props> = () => {
  return (
    <AtomWrapper
      css={css`
        background-color: #191922;
      `}
    >
      <AtomText>Swap</AtomText>
    </AtomWrapper>
  )
}

export default AtomNavbar
