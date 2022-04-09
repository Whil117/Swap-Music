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
          <AtomWrapper
            css={css`
              .swiper {
                margin: 20px 0;
                width: 100%;
                height: auto;
              }
              .swiper-slide {
                text-align: center;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .swiper-pagination-bullet-active {
                background-color: white;
              }
              .swiper-slide img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .swiper-button-prev {
                ::after {
                  font-size: 42px;
                  color: #ebebebeb;
                }
                top: 50%;
                left: 3%;
              }
              .swiper-button-next {
                ::after {
                  font-size: 42px;
                  color: #ebebebeb;
                }
                top: 50%;
                right: 3%;
              }
            `}
          >
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={6}
              centeredSlides={true}
              centerInsufficientSlides={true}
              centeredSlidesBounds={true}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 1,
                },
                568: {
                  slidesPerView: 4,
                },
                640: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
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
