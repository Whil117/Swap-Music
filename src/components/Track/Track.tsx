/* eslint-disable no-unused-vars */
import { controlsAtom } from '@Components/Navbar/player'
import { css } from '@emotion/react'
import useScreen from '@Hooks/useScreen'
import useTime from '@Hooks/useTime'
import reducerplayer from '@Redux/reducers/player/controls'
import { useReducerAtom } from 'jotai/utils'
import AtomButton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'

type Props = {
  id?: string
  position?: number
  onPlayer?: () => void
  name?: string
  image?: string
  artists: {
    name?: string
    id?: string
  }[]
  album?: {
    id?: string
    name?: string
    images?: {
      url?: string
    }[]
  }
  context: []
  preview_url?: string | null
  duration_ms?: number
  type: 'album' | 'artist' | 'playlist' | 'track'
  site?: {
    album?: {
      id: string
      name: string
      image: string
    }
    playlist?: {
      id: string
      name: string
      image: string
    }
  }
  withImage?: boolean
}

const Track: FC<Props> = (props) => {
  const [hours, minutes, seconds] = useTime({ ms: props.duration_ms })
  const [controls, dispatch] = useReducerAtom(controlsAtom, reducerplayer)
  const router = useRouter()
  const screen = useScreen()

  return (
    <AtomWrapper
      css={css`
        margin: 15px 0px;
        display: grid;
        grid-template-columns: ${props.withImage
          ? '50px 70px 1fr 1fr 50px'
          : '50px  1fr 50px'};
        gap: 10px;
        width: 100%;
        align-items: center;
        cursor: ${screen <= 980 ? 'pointer' : 'default'};
        @media (max-width: 568px) {
          grid-template-columns: 1fr;
        }
      `}
      key={props.id}
      onClick={
        screen <= 980
          ? () =>
              props.onPlayer && props.preview_url
                ? props.onPlayer()
                : toast.error('This song isn`t available', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
          : () => {}
      }
    >
      {/* {useseesion.data.accessToken} */}
      <AtomButton
        onClick={
          props.preview_url
            ? () => {
                dispatch({
                  type: 'VIEWIMAGESIDEBAR',
                  payload: {
                    image: props.image,
                  },
                })

                dispatch({
                  type: 'SETTRACK',
                  payload: {
                    player: {
                      currentSite: {
                        type: props.type,
                        ...props.site,
                      },
                      currentTrack: {
                        position: props?.position as number,
                        id: props.id as string,
                        name: props.name as string,
                        image: props.image as string,
                        artists: props.artists as Props['artists'],
                        album: props.album as {
                          id?: string
                          name?: string
                          images?: {
                            url?: string
                          }[]
                        },
                        preview_url: (props.preview_url as string) ?? '',
                      },
                      context: props.context,
                    },
                  },
                })
              }
            : () => {
                toast.error('This song isn`t available', {
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              }
        }
        css={css`
          grid-column: 1;
          justify-self: center;
          align-self: center;
          margin: 0;
          padding: 0;
          @media (max-width: 568px) {
            display: none;
          }
        `}
      >
        <AtomText
          as="p"
          css={css`
            margin: 0;
            padding: 0;
            font-size: 16px;
            font-weight: 600;
          `}
        >
          {(props.position as number) + 1}
        </AtomText>
      </AtomButton>
      {props.withImage && (
        <AtomImage
          src={
            props.image ??
            ((props?.album?.images && props?.album?.images[0]?.url) as string)
          }
          width="60px"
          height="60px"
          alt={props.name as string}
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
          grid-column: ${props.withImage ? '3 / 4' : '2 / 3'};
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
              <AtomButton
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
                <AtomText key={artist.id}>
                  {index === 0 ? artist.name : `, ${artist.name}`}
                </AtomText>
              </AtomButton>
            ))}
          </AtomWrapper>
        )}
      </AtomWrapper>
      {Object.keys(props.album ?? {}).length > 0 && (
        <AtomWrapper
          css={css`
            grid-column: 4 / 5;
            @media (max-width: 568px) {
              display: none;
            }
          `}
        >
          <AtomButton
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
          </AtomButton>
        </AtomWrapper>
      )}

      <AtomWrapper
        css={css`
          grid-column: ${props.withImage ? '5 / 6' : '3 /4'};
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
