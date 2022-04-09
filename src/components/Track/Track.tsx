import { css } from '@emotion/react'
import useTime from '@Hooks/useTime'
import { TrackWrapper } from '@Styles/components/Track'
import P from '@Whil/components/P'
import Svg from '@Whil/components/Svg'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  id: string
  count: number
  name: string
  image?: string
  artists: {
    name?: string
    id?: string
  }[]
  album: {
    id?: string
    name?: string
  }
  duration: number
  saved?: boolean
  styles?: {
    width?: {
      song?: string
      album?: string
      part3?: string
    }
  }
}

const Track: FC<Props> = (props) => {
  const [hours, minutes, seconds] = useTime({ ms: props.duration })
  return (
    <TrackWrapper key={props.id}>
      <AtomWrapper
        css={css`
          display: flex;
          justify-content: flex-start;
          width: ${props.styles?.width?.song || '40%'};
          @media (max-width: 768px) {
            width: 100%;
          }
        `}
      >
        <AtomWrapper
          css={css`
            margin: 10px 20px;
            @media (max-width: 568px) {
              display: none;
            }
          `}
        >
          <AtomText
            as="p"
            css={css`
              font-size: 16px;
              font-weight: 600;
            `}
          >
            {props.count + 1}
          </AtomText>
        </AtomWrapper>
        <AtomWrapper
          css={css`
            @media (max-width: 568px) {
              display: none;
            }
          `}
        >
          {props.image && (
            <AtomImage
              src={props.image || ''}
              width={50}
              height={55}
              alt={props.name}
              borderRadius="5px"
            />
          )}
        </AtomWrapper>
        <AtomWrapper
          css={css`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 0 20px;
          `}
        >
          <P styles={{ fontWeight: '600', margin: '5px 0' }}>
            {!props.album
              ? props.name
              : Object.keys(props.album).length > 0 && props.name.length > 40
              ? props.name.slice(0, 40) + '...'
              : props.name}
          </P>
          {props.artists.length !== 0 && (
            <AtomWrapper
              css={css`
                display: flex;
                justify-content: flex-start;
              `}
            >
              {props?.artists?.map((artist, index) => (
                <Link
                  href={{
                    pathname: '/swap/artist/[id]',
                    query: { id: artist.id },
                  }}
                  passHref
                  key={artist.id}
                >
                  <a>
                    <P
                      styles={{
                        opacity: 0.5,

                        width: 'auto',
                      }}
                      key={artist.id}
                    >
                      {index === 0 ? artist.name : `, ${artist.name}`}
                    </P>
                  </a>
                </Link>
              ))}
            </AtomWrapper>
          )}
        </AtomWrapper>
      </AtomWrapper>
      {Object.keys(props.album).length > 0 && (
        <AtomWrapper
          css={css`
            display: flex;
            flex-direction: column;
            alugin-items: flex-start;
            width: ${props.styles?.width?.album || '50%'};
            @media (max-width: 768px) {
              display: none;
            }
          `}
        >
          <Link
            href={{
              pathname: '/swap/album/[id]',
              query: { id: props?.album?.id },
            }}
            passHref
          >
            <AtomWrapper
              as="a"
              css={css`
                color: #ffffff;
              `}
            >
              <AtomText
                as="p"
                css={css`
                  opacity: 0.5;
                `}
              >
                {props.album.name && props?.album?.name?.length > 40
                  ? props?.album?.name.slice(0, 50) + '...'
                  : props?.album?.name}
              </AtomText>
            </AtomWrapper>
          </Link>
        </AtomWrapper>
      )}

      <Atombutton
        css={css`
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
        <Svg src={props.saved ? '/icons/fullheart' : '/icons/heart'} />
      </Atombutton>
      <AtomWrapper
        css={css`
          @media (max-width: 568px) {
            display: none;
          }
        `}
      >
        <p>
          {' '}
          {hours ? `${hours} ${minutes}` : ''}{' '}
          {!hours
            ? `${minutes}:${
                seconds?.toFixed(0).length === 1
                  ? `0${seconds.toFixed()}`
                  : seconds?.toFixed()
              }`
            : ''}
        </p>
      </AtomWrapper>
    </TrackWrapper>
  )
}

export default Track
