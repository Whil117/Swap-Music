import { PWrapper } from '@Whil/styles/components/P'
import Styles from '@Whil/types/styles'
import { FC } from 'react'

interface IProps {
  styles?: Styles
}

const P: FC<IProps> = ({ styles, children }) => {
  return <PWrapper {...{ styles }}>{children}</PWrapper>
}

export default P
