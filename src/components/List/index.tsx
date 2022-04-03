/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import AtomWrapper from 'lib/Atomwrapper'
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper } from 'swiper/react'
type Props = {
  Elements: ({
    show,
    setShow,
  }: {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
  }) => JSX.Element
  children: ReactNode
}

const SectionProps: FC<Props> = ({ children, Elements }) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <>
      {Elements ? Elements({ show, setShow }) : null}
      {children ? (
        !show ? (
          <AtomWrapper>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={6}
              spaceBetween={10}
              pagination={{
                el: '.swiper-pagination',
              }}
              navigation
            >
              {children}
            </Swiper>
          </AtomWrapper>
        ) : (
          <AtomWrapper
            css={css`
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-between;
            `}
          >
            {children}
          </AtomWrapper>
        )
      ) : null}
    </>
  )
}

export default SectionProps
