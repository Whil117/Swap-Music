import { DivWrapper } from '@Whil/styles/components/Div'
import Styles from '@Whil/types/styles'
import { FC } from 'react'

interface IProps {
  styles?: Styles
}

const Div: FC<IProps> = ({ styles, children }) => {
  return <DivWrapper {...{ styles }}>{children}</DivWrapper>
}

export default Div
