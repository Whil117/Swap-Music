import { css } from '@emotion/react'
import UseColor from '@Hooks/UseColor'
import FollowNumbers from '@Utils/Followers'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'

type Props = {
  image_url: string
  name: string
  borderRadiusImage?: string
  type: string
  followers?: number
}
type typeBanners = {
  artist: Props
}

const typeBanners = {
  artist: (props: typeBanners['artist']) => {
    const colors = UseColor({ url: props.image_url })
    return (
      <AtomWrapper
        id="background-dynamic-color"
        css={css`
          height: 400px;
          display: flex;
          align-items: center;
          padding: 0px 90px;
          justify-content: flex-start;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(100, 100, 100, 0) 0%,
              #121216 100%
            ),
            ${colors[0]};
          @media (max-width: 980px) {
            justify-content: center;
            width: 100%;
            height: 600px;
            padding: 0;
          }
        `}
      >
        <AtomWrapper
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 1440px;
            gap: 20px;

            @media (max-width: 980px) {
              flex-direction: column;
              width: auto;
              padding: 0;
            }
          `}
        >
          <AtomImage
            src={props.image_url}
            width={260}
            height={260}
            alt={props.name}
            borderRadius={props.borderRadiusImage || '10px'}
          />
          <AtomWrapper
            css={css`
              max-width: 1160px;
              display: grid;
              gap: 10px;
              /* width: 900px; */
              @media (max-width: 1440px) {
                width: 500px;
              }
              @media (max-width: 1240px) {
                width: 350px;
              }
              @media (max-width: 980px) {
                width: auto;
                margin: 0 10px;
              }
            `}
          >
            <AtomText
              as="p"
              fontWeight="bold"
              css={css`
                @media (max-width: 778px) {
                  text-align: center;
                }
              `}
            >
              {props?.type?.toUpperCase()}
            </AtomText>
            <AtomText
              as="h1"
              fontWeight="bold"
              css={css`
                margin: 0;
                font-size: 48px;
                @media (max-width: 1440px) {
                  font-size: 36px;
                }
                @media (max-width: 890px) {
                  font-size: 28px;
                }
                @media (max-width: 778px) {
                  font-size: 22px;
                  text-align: center;
                }
              `}
            >
              {props.name}
            </AtomText>
            {props.followers && (
              <AtomText
                as="p"
                css={css`
                  opacity: 0.5;
                `}
              >
                {FollowNumbers(props.followers as number)}
              </AtomText>
            )}
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    )
  },
}

type AtomProps = {
  type: 'artist'
} & Props

const AtomBanner: FC<AtomProps> = (props) => {
  return typeBanners[props.type](props)
}

export default AtomBanner
