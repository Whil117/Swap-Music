import AtomTracksDuration from '@Components/@atoms/AtomTracksDuration'
import { css } from '@emotion/react'
import { UseTimeProps } from '@Hooks/useTime'
import AtomImage from 'lib/AtomImage'
import AtomLink from 'lib/AtomLink'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC, useState } from 'react'
import { ColorExtractor } from 'react-color-extractor'

type Props = {
  id: string
  title: string
  name: string
  desc?: string
  image_url: string
  image_url_avatar?: string
  type: string
  release_date?: string
  total_tracks?: number
  useTime?: UseTimeProps
}

const stringToHTML = (str?: string) => {
  const parser = new DOMParser()

  const doc = parser.parseFromString(str as string, 'text/html')
  return doc.body
}

const OrganismBanner: FC<Props> = (props) => {
  const [color, setColor] = useState<string[]>([])
  return (
    <AtomWrapper
      css={css`
        height: 400px;
        display: flex;
        align-items: center;
        padding: 0px 90px;
        justify-content: center;
        transition: all 0.3s ease;

        background: linear-gradient(
            180deg,
            rgba(90, 28, 28, 0) 0%,
            #121216 100%
          ),
          ${color};
        @media (max-width: 768px) {
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
          width: 100%;
          @media (max-width: 568px) {
            flex-direction: column;
            width: auto;
            padding: 0;
          }
        `}
      >
        <ColorExtractor
          src={props.image_url}
          getColors={(colors: string[]) => setColor(colors)}
        />

        <AtomImage
          src={props.image_url || 'https://via.placeholder.com/150/92c952'}
          width={240}
          height={240}
          alt={props.name}
          borderRadius="10px"
        />
        <AtomWrapper
          css={css`
            width: 900px;
            margin: 0 50px;
            @media (max-width: 768px) {
              width: 400px;
              margin: 0 20px;
            }
          `}
        >
          <AtomText
            as="h4"
            css={css`
              @media (max-width: 568px) {
                text-align: center;
              }
            `}
          >
            {props.type.toUpperCase()}
          </AtomText>
          <AtomText
            as="h1"
            css={css`
              margin: 0;
              font-size: 48px;
              @media (max-width: 568px) {
                font-size: 32px;
                text-align: center;
              }
            `}
          >
            {props.title}
          </AtomText>
          {props.desc && (
            <AtomText
              as="p"
              css={css`
                opacity: 0.5;
                text-align: center;
              `}
            >
              {stringToHTML(props.desc).innerText}
            </AtomText>
          )}
          <AtomWrapper
            css={css`
              width: 100%;
              display: flex;
              justify-content: flex-start;
              @media (max-width: 568px) {
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
            `}
          >
            <AtomLink
              href={{
                pathname: '/swap/artist/[id]',
                query: { id: props.id },
              }}
              passHref
            >
              <a>
                <AtomText
                  as="p"
                  css={css`
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                    margin: 20px 1px;
                  `}
                >
                  {props.image_url_avatar && (
                    <AtomImage
                      src={props.image_url_avatar}
                      width={100}
                      height={100}
                      alt={props.name}
                      borderRadius="50%"
                    />
                  )}
                  {props.name}
                </AtomText>
              </a>
            </AtomLink>
            {props.total_tracks && (
              <AtomTracksDuration
                release={props.release_date as string}
                totalTracks={props.total_tracks}
                useTime={props.useTime as UseTimeProps}
              />
            )}
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  )
}

export default OrganismBanner
