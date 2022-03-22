import { css } from '@emotion/react'
import { LoadingWrapper } from '@Styles/components/layout/Hidratation/Loading'
import colors from '@Styles/global/colors'
import Svg from '@Whil/components/Svg'
import { FC } from 'react'

type Props = {}

const Loading: FC<Props> = () => {
  return (
    <LoadingWrapper>
      <Svg
        src="/icons/loading"
        customStyles={css`
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
    </LoadingWrapper>
  )
}

export default Loading
