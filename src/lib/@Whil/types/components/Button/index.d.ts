import Styles from '@Whil/types/styles'

export type ButtonType = 'default' | 'submit' | 'add' | 'danger' | 'warning'

interface ButtonProps {
  idButton?: string
  props: {
    type: ButtonType
    style?: Styles
  }
  click?: () => void
}

export default ButtonProps
