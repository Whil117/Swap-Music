/* eslint-disable no-unused-vars */
import { TRACKBYSLUG } from '@Apollo/client/querys/track'
import { controlsAtom } from '@Components/Navbar/player'
import { css } from '@emotion/react'
import { colorsAtom } from '@Hooks/UseColor'
import { PLAYATOM } from '@Redux/reducers/player/controls'
import { useAtomValue, useSetAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomIcon from 'lib/AtomIcon'
import AtomText from 'lib/AtomText'
import { client } from 'pages/_app'
import { FC } from 'react'

type Props = {
  name: string
  slug: string
  artist: string
  title_track: string
  onTrack: (
    url: string,
    yt_url: string,
    id: string,
    youtube_video: string,
    lyrics: string
  ) => void
  position: number
}

const AtomPlayTrack: FC<Props> = (props) => {
  const controls = useAtomValue(controlsAtom)
  const color = useAtomValue(colorsAtom)
  const setPlayPlayer = useSetAtom(PLAYATOM)
  const playPlayer = useAtomValue(PLAYATOM)

  return (
    <AtomButton
      onClick={async () => {
        if (controls?.player?.currentTrack?.name === props?.name) {
          const audio = document.getElementById(
            'AUDIOPLAYER'
          ) as HTMLAudioElement
          playPlayer ? audio.pause() : audio.play()
          setPlayPlayer(!playPlayer)
        } else {
          const data = await client.query({
            fetchPolicy: 'no-cache',
            variables: {
              slug: props.slug,
              artist: props.artist,
              title_track: props.title_track,
            },
            query: TRACKBYSLUG,
          })
          props.onTrack(
            data?.data?.trackBySlug?.url,
            data?.data?.trackBySlug?.youtube_url,
            data?.data?.trackBySlug?.id,
            data?.data?.trackBySlug?.youtube_video,
            data?.data?.trackBySlug?.lyrics
          )
        }
      }}
      css={css`
        grid-column: 1;
        justify-self: center;
        align-self: center;
        position: relative;
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
          opacity: 1;
          &:hover {
            display: none;
            opacity: 0;
          }
        `}
      >
        {(props?.position as number) + 1}
      </AtomText>
      {controls?.player?.currentTrack?.name === props?.name && (
        <AtomIcon
          customCSS={css`
            background-color: #121216;
            position: absolute;
            &:hover {
              background-color: #222229;
              opacity: 1;
            }
          `}
          width="18px"
          height="18px"
          color={color[0] as string}
          icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/fluent_sound-wave-circle-24-regular.svg"
        />
      )}
      <AtomIcon
        customCSS={css`
          padding: 5px;
          background-color: #121216;
          position: absolute;
          opacity: 0;
          &:hover {
            background-color: #222229;
            opacity: 1;
          }
        `}
        width="18px"
        height="18px"
        color={color[0] as string}
        icon={
          controls?.player?.currentTrack?.name === props?.name && playPlayer
            ? ' https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/PUASE.svg'
            : 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/playho.svg'
        }
      />
    </AtomButton>
  )
}

export default AtomPlayTrack
