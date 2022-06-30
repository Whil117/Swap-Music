import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import Svg from '@Whil/components/Svg'
import AtomButton from 'lib/Atombutton'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { Dispatch, FC, SetStateAction } from 'react'

type Props = {
  setShow: Dispatch<SetStateAction<boolean>>
  title: string
}

const AtomSectionHeader: FC<Props> = ({ setShow, title }) => {
  return (
    <AtomWrapper
      width="100%"
      as="div"
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <AtomText as="h2">{title}</AtomText>
      <AtomButton
        backgroundColor={colors.black_quaternary}
        css={css`
          padding: 5px;
          border-radius: 5px;
        `}
        onClick={() => setShow((show) => !show)}
      >
        <Svg src="/icons/list" />
      </AtomButton>
    </AtomWrapper>
  )
}

export default AtomSectionHeader
