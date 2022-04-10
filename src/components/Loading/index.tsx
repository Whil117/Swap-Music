import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import Svg from '@Whil/components/Svg'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'

type Props = {}

const Loading: FC<Props> = () => {
  return (
    <AtomWrapper
      css={css`
        background: ${colors.black_primary};
        color: ${colors.black_primary};
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
      `}
    >
      <Svg
        src="/icons/loading"
        css={css`
          position: fixed;
          z-index: 1;
          svg {
            width: 100px;
            height: 100px;
          }
          circle:nth-of-type(1) {
            stroke: ${colors.gray};
          }
          circle:nth-of-type(2) {
            stroke: ${colors.black_quaternary};
          }
        `}
      />
    </AtomWrapper>
  )
}

export default Loading
