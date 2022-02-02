import { LabelWrapper } from '@Whil/styles/components/Label'
import { ButtonType } from '@Whil/types/components/Button'
import Styles from '@Whil/types/styles'
import { FC } from 'react'

interface IProps {
  to: string
  props: {
    type: ButtonType
    style?: Styles
  }
}

const Label: FC<IProps> = ({ to, props, children }) => {
  return (
    <LabelWrapper htmlFor={to} {...{ props }}>
      {children}
    </LabelWrapper>
  )
}

export default Label
