/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import AtomTrack from '@Components/@atoms/AtomTrack'
import { controlsAtom } from '@Components/Navbar/player'
import { css } from '@emotion/react'
import { Inti } from '@Redux/reducers/player/controls'
import { useAtomValue } from 'jotai/utils'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'

const typeQueue = {
  album: (controls: Inti) => {
    return (
      <AtomWrapper
        css={css`
          display: flex;
          alig-items: flex-start;
          flex-direction: column;
          gap: 20px;
        `}
      >
        {controls?.player?.context?.map((track, idx) => (
          <AtomTrack
            key={track?.id}
            type="likedsongs"
            id={track?.album?.id as string}
            likedSongs={{
              id: track?.album?.id,
              name: track?.name,
              preview_url: track?.preview_url as string,
              position: idx,
              album: {
                id: track?.album?.id,
                name: track?.album?.name,
                image: track?.album?.image as string,
              },
              image: track?.album?.image,
              duration: track?.duration,
              artists: track?.artists,
              context: controls?.player?.context,
            }}
          />
        ))}
      </AtomWrapper>
    )
  },
  likedsongs: (controls: Inti) => (
    <AtomWrapper
      css={css`
        display: flex;
        alig-items: flex-start;
        flex-direction: column;
        gap: 20px;
      `}
    >
      {controls?.player?.context?.map((track, idx) => (
        <AtomTrack
          key={track?.id}
          type="likedsongs"
          id={track?.album?.id as string}
          likedSongs={{
            id: track?.album?.id,
            name: track?.name,
            preview_url: track?.preview_url as string,
            position: idx,
            album: {
              id: track?.album?.id,
              name: track?.album?.name,
              image: track?.album?.image as string,
            },
            image: track?.album?.image,
            duration: track?.duration,
            artists: track?.artists,
            context: controls?.player?.context,
          }}
        />
      ))}
    </AtomWrapper>
  ),
}

const Queue: NextPageFCProps = () => {
  const controls = useAtomValue(controlsAtom)

  return (
    <AtomWrapper>
      <AtomWrapper
        maxWidth="1440px"
        padding="0px 90px"
        margin="50px 0px 0px 0px"
        gap="20px"
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <AtomText fontSize="28px" fontWeight="bold">
          Queue
        </AtomText>
        <AtomWrapper>
          <AtomText opacity={0.5} fontWeight="bold">
            Now Playing
          </AtomText>
          <AtomTrack
            key={controls?.player?.currentTrack?.id}
            type="likedsongs"
            id={controls?.player?.currentTrack?.id as string}
            likedSongs={{
              id: controls?.player?.currentTrack?.id,
              name: controls?.player?.currentTrack?.name,
              preview_url: controls?.player?.currentTrack
                ?.preview_url as string,
              position: 0,
              album: {
                id: controls?.player?.currentTrack?.album?.id,
                name: controls?.player?.currentTrack?.album?.name,
                image: controls?.player?.currentTrack?.image as string,
              },
              image: controls?.player?.currentTrack?.image,
              duration: 0,
              artists: [],
              context: [],
            }}
            customCSS={css`
              margin-bottom: 0px;
            `}
          />
        </AtomWrapper>
        {/* <AtomWrapper
          css={css`
            background-color: #555555;
            height: 1px;
            width: 100%;
          `}
        ></AtomWrapper> */}
        <AtomText opacity={0.5} fontWeight="bold">
          Next up
        </AtomText>
        {typeQueue[
          controls?.player?.currentSite.type as keyof typeof typeQueue
        ](controls)}
      </AtomWrapper>
    </AtomWrapper>
  )
}
Queue.Layout = 'swap'

export default Queue
