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
        display: grid;
        /* grid-template-columns: 50px 70px 1fr 1fr 50px; */
        grid-template-columns: ${
          props.image ? '50px 70px 1fr 1fr 50px' : '50px  1fr 50px'
        };
        gap: 10px;
        width: 100%;
        align-items: center;
        cursor: ${screen <= 980 ? 'pointer' : 'default'};
        @media (max-width: 568px) {
          grid-template-columns: 1fr;
        }
        }
      `}
      key={props.id}
      onClick={
        screen <= 980 ? () => props.onPlayer && props.onPlayer() : () => {}
      }
    >
      <Atombutton
        onClick={props.onPlayer}
        css={css`
          grid-column: 1;
          justify-self: center;
          align-self: center;
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
      {props.image && (
        <AtomImage
          src={props.image || ''}
          width="100%"
          height="100%"
          alt={props.name}
          borderRadius="5px"
          css={css`
            grid-column: 2 / 3;
            @media (max-width: 568px) {
              display: none;
            }
          `}
        />
      )}
      <AtomWrapper
        css={css`
          grid-column: ${props.image ? '3 / 4' : '2 / 5'};
          @media (max-width: 568px) {
            grid-column: 1 / -1;
          }
        `}
      >
        <AtomText as="p">{props.name}</AtomText>
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
      {Object.keys(props.album).length > 0 && (
        <AtomWrapper
          css={css`
            grid-column: 4 / 5;
            @media (max-width: 568px) {
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
              {props?.album?.name}
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
          grid-column: 5 / 6;
          align-self: center;
          justify-self: center;
          @media (max-width: 568px) {
            display: none;
          }
        `}
      >
        <AtomText as="p">
          {hours ? `${hours} ${minutes}` : ''}
          {!hours
            ? `${minutes}:${
                seconds?.toFixed(0).length === 1
                  ? `0${seconds.toFixed()}`
                  : seconds?.toFixed()
              }`
            : ''}
        </AtomText>
      </AtomWrapper>
    </AtomWrapper>
  )
}

export default Track
