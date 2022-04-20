import { css } from '@emotion/react'
import useScreen from '@Hooks/useScreen'
import useTime from '@Hooks/useTime'
import P from '@Whil/components/P'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { useRouter } from 'next/router'
import { FC } from 'react'

type Props = {
  id: string
  count: number
  onPlayer?: () => void
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
  const router = useRouter()

  const screen = useScreen()
  return (
    <AtomWrapper
      css={css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        cursor: ${screen <= 980 ? 'pointer' : 'default'};
      `}
      key={props.id}
      onClick={
        screen <= 980 ? () => props.onPlayer && props.onPlayer() : () => {}
      }
    >
      <AtomWrapper
        css={css`
          display: flex;
          justify-content: flex-start;
          width: ${props.styles?.width?.song || '100%'};
          @media (max-width: 768px) {
            width: 100%;
          }
        `}
      >
        <Atombutton
          onClick={props.onPlayer}
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
        </Atombutton>
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
                <Atombutton
                  key={artist.id && artist?.id + index}
                  onClick={() => {
                    router
                      .push({
                        pathname: `/swap/artist/[id]`,
                        query: {
                          id: artist.id,
                        },
                      })
                      .then(() => {
                        document?.getElementById('view')?.scroll({
                          top: 0,
                        })
                      })
                  }}
                >
                  <P
                    styles={{
                      opacity: 0.5,

                      width: 'auto',
                    }}
                    key={artist.id}
                  >
                    {index === 0 ? artist.name : `, ${artist.name}`}
                  </P>
                </Atombutton>
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
          <Atombutton
            onClick={() => {
              router
                .push({
                  pathname: `/swap/album/[id]`,
                  query: {
                    id: props?.album?.id,
                  },
                })
                .then(() => {
                  document?.getElementById('view')?.scroll({
                    top: 0,
                  })
                })
            }}
          >
            <AtomText
              as="p"
              css={css`
                opacity: 0.5;
              `}
            >
              {props.album.name && props?.album?.name?.length > 40
                ? props?.album?.name.slice(0, 40) + '...'
                : props?.album?.name}
            </AtomText>
          </Atombutton>
        </AtomWrapper>
      )}

      {/* <Atombutton
        css={css`
          @media (max-width: 768px) {
            display: none;
          }
        `}
      >
        <Svg src={props.saved ? '/icons/fullheart' : '/icons/heart'} />
      </Atombutton> */}
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
    </AtomWrapper>
  )
}

export default Track
