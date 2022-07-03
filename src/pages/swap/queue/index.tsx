/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { controlsAtom } from '@Components/Navbar/player'
import Track from '@Components/Track/Track'
import { css } from '@emotion/react'
import reducerplayer, { Inti } from '@Redux/reducers/player/controls'
import { useReducerAtom } from 'jotai/utils'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'

const typeQueue = {
  album: () => {
    const [controls, dispatch] = useReducerAtom(controlsAtom, reducerplayer)

    return (
      <AtomWrapper
        css={css`
          display: flex;
          alig-items: flex-start;
          padding: 0 90px;
          flex-direction: column;
          gap: 20px;
          @media (max-width: 980px) {
            padding: 0 30px;
          }
        `}
      >
        {controls?.player?.context?.map((item, index) => (
          <Track
            {...{ ...item }}
            key={item.id}
            context={controls?.player?.context}
            album={{
              id: controls?.player?.currentSite?.album?.id,
            }}
            withImage
            position={index}
            type="album"
            site={{
              album: {
                id: controls?.player?.currentSite?.album?.id,
                name: controls?.player?.currentSite?.album?.name,
                image: controls?.player?.currentSite?.album?.image,
              },
            }}
            image={controls?.player?.currentSite?.album?.image}
          />
        ))}
      </AtomWrapper>
    )
  },
  playlist: (controls: Inti) => (
    <AtomWrapper
      css={css`
        display: flex;
        alig-items: flex-start;
        padding: 0 90px;
        flex-direction: column;
        gap: 20px;
        @media (max-width: 980px) {
          padding: 0 30px;
        }
      `}
    >
      {controls?.player?.context?.map((item, index) => (
        <Track {...{ ...item }} key={item.id} position={index} withImage />
      ))}
    </AtomWrapper>
  ),
}

const Queue: NextPageFCProps = () => {
  const [controls, dispatch] = useReducerAtom(controlsAtom, reducerplayer)

  return (
    <AtomWrapper>
      <h1>Queue</h1>
      {typeQueue[controls?.player?.currentSite.type as keyof typeof typeQueue](
        controls
      )}
    </AtomWrapper>
  )
}
Queue.Layout = 'swap'

export default Queue
