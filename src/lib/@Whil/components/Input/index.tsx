import { InputStyled } from '@Whil/styles/components/Input'
import Styles from '@Whil/types/styles'
import { FC } from 'react'

interface IProps {
  styles?: Styles
  name: string
  id: string
  as: string
  placeholder?: string
}

const Input: FC<IProps> = (props) => {
  return (
    <InputStyled
      as={props.as}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      styles={props.styles}
    />
  )
}

export default Input
