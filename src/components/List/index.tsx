/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import AtomButton from 'lib/Atombutton'
import AtomIcon from 'lib/AtomIcon'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC, ReactNode, useState } from 'react'
import { Pagination } from 'swiper'
import { Swiper } from 'swiper/react'
type Props = {
  title: string
  children: ReactNode
}

const SectionProps: FC<Props> = ({ children, title }) => {
  const [show, setShow] = useState(false)
  return (
    <AtomWrapper
      css={css`
        width: 100%;
        display: flex;
        gap: 10px;
      `}
    >
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
        <AtomText as="h3" margin="10px">
          {title}
        </AtomText>
        <AtomButton
          width="35px"
          height="35px"
          backgroundColor={colors.black_quaternary}
          css={css`
            padding: 5px;
            border-radius: 5px;
          `}
          onClick={() => setShow((show) => !show)}
        >
          <AtomIcon
            width="20px"
            height="20px"
            icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/list.svg"
            color="default"
          />
        </AtomButton>
      </AtomWrapper>
      {!show ? (
        <AtomWrapper
          width="100%"
          css={css`
            .swiper {
              width: 100%;
              height: auto;
            }
            .swiper-wrapper {
              gap: 10px;
            }
            .swiper-slide {
              gap: 10px;
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
              clickable: false,
            }}
            className="mySwiper"
          >
            {children}
          </Swiper>
        </AtomWrapper>
      ) : (
        <AtomWrapper
          css={css`
            margin-top: 20px;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 0.5fr));
            gap: 6px;
            justify-content: flex-start;
            @media (max-width: 520px) {
              /* flex-direction: column; */
              align-items: center;
              justify-content: center;
            }
            .swiper-slide {
              gap: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}
        >
          {children}
        </AtomWrapper>
      )}
    </AtomWrapper>
  )
}

export default SectionProps
