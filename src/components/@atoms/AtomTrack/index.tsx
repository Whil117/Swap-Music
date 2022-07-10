/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { controlsAtom } from '@Components/Navbar/player'
import { css } from '@emotion/react'
import useScreen from '@Hooks/useScreen'
import useTime from '@Hooks/useTime'
import { ActionPlayer } from '@Redux/reducers/player/controls'
import { useSetAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextRouter, useRouter } from 'next/router'
import { FC } from 'react'
import { toast } from 'react-toastify'

const handleError = (screen: number) => {
  toast.error('This song isn`t available', {
    position: screen <= 980 ? 'top-center' : 'top-right',
    autoClose: 5000,
    style: {
      top: '4.5em',
    },
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

const typeTracks = ({ dispatch, type, screen, router }: DefsTrack) => ({
  album: (props: Props) => {
    const [hours, minutes, seconds] = useTime({ ms: props?.album?.duration })
    const handleClick = () => {
      dispatch({
        type: 'SEVERAL',
        payload: {
          image: props?.album?.image,
          player: {
            currentSite: {
              type: type,
            },
            currentTrack: {
              position: props?.album?.position as number,
              id: props?.id as string,
              name: props?.album?.name as string,
              image: props?.album?.image as string,
              artists: props?.album?.artists as ArtistProps,
              album: props as {
                id?: string
                name?: string
                images?: {
                  url?: string
                }[]
              },
              preview_url: (props?.album?.preview_url as string) ?? '',
            },
            context: props?.album?.context as any,
          },
        },
      })
    }

    return (
      <AtomWrapper
        css={css`
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: 50px 1fr 50px;
          gap: 10px;
          width: 100%;
          align-items: center;
          cursor: ${screen <= 980 ? 'pointer' : 'default'};
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
        `}
        key={props?.id}
        onClick={
          screen <= 980
            ? props?.album?.preview_url
              ? handleClick
              : () => handleError(screen)
            : () => {}
        }
      >
        <AtomButton
          onClick={
            props?.album?.preview_url ? handleClick : () => handleError(screen)
          }
          css={css`
            grid-column: 1;
            justify-self: center;
            align-self: center;
            margin: 0;
            padding: 0;
            @media (max-width: 980px) {
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
            {(props?.album?.position as number) + 1}
          </AtomText>
        </AtomButton>
        <AtomWrapper
          css={css`
            grid-column: 2 / 3;
            @media (max-width: 980px) {
              grid-column: 1 / -1;
            }
          `}
        >
          <AtomText as="p">{props?.album?.name}</AtomText>
          {props?.album?.artists?.length !== 0 && (
            <AtomWrapper
              css={css`
                display: flex;
                justify-content: flex-start;
              `}
            >
              {props?.album?.artists?.map((artist, index) => (
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
                  <AtomText
                    key={artist.id}
                    fontSize="14px"
                    opacity={0.5}
                    css={css`
                      &:hover {
                        text-decoration: underline;
                      }
                    `}
                  >
                    {index === 0 ? artist.name : `, ${artist.name}`}
                  </AtomText>
                </AtomButton>
              ))}
            </AtomWrapper>
          )}
        </AtomWrapper>
        <AtomWrapper
          css={css`
            grid-column: 3 /4;
            align-self: center;
            justify-self: center;
            @media (max-width: 980px) {
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
  },
})

type ArtistProps = {
  name?: string
  id?: string
}[]

type DefsTrack = {
  type: 'album'
  id: string
  screen: number
  dispatch: (update: ActionPlayer) => void
  router: NextRouter
}

type Props = {
  type: 'album'
  id: string
  album?: {
    id?: string
    position?: number
    name?: string
    duration?: number
    preview_url?: string
    image?: string
    artists?: ArtistProps
    context?: never[]
  }
}

const AtomTrack: FC<Props> = (props) => {
  const dispatch = useSetAtom(controlsAtom)
  const router = useRouter()
  const screen = useScreen()
  return typeTracks({
    dispatch,
    router,
    screen,
    id: props.id,
    type: props.type,
  })[props.type](props)
}

export default AtomTrack
//https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/playho.svg
