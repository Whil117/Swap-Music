/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import AtomWrapper from 'lib/Atomwrapper'
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'
import { Pagination } from 'swiper'
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
                /* gap: 20px; */
                /* margin: 20px 0; */
                width: 100%;
                height: auto;
              }
              .swiper-wrapper {
                gap: 20px;
              }
              .swiper-slide {
                gap: 20px;
                width: auto !important;
                text-align: center;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .swiper-slide-active {
                width: auto !important;
              }
              .swiper-slide-next {
                width: auto !important;
              }

              .swiper-pagination-bullet-active {
                background-color: white;
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
              modules={[Pagination]}
              slidesPerView={6}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 2,
                },
                568: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 3,
                },
                1440: {
                  slidesPerView: 4,
                },
                1920: {
                  slidesPerView: 6,
                },
              }}
              pagination={{
                el: '.swiper-pagination',
                clickable: true,
              }}
              className="mySwiper"
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
              gap: 20px;
              justify-content: flex-start;
              @media (max-width: 520px) {
                /* flex-direction: column; */
                align-items: center;
                justify-content: center;
              }
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
