import { FC, useState } from 'react'

type Props = {
  Elements: any
  children: any
}

const List: FC<Props> = ({ children, Elements }) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <>
      {Elements ? Elements({ show, setShow }) : null}
      {children ? children({ show }) : null}
    </>
  )
}

export default List
