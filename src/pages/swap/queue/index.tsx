/* eslint-disable no-unused-vars */
import { titleBanner } from '@Components/@organisms/OrganismBanner'
import Track from '@Components/Track/Track'
import { css } from '@emotion/react'
import { ActionPlayerTracks } from '@Redux/reducers/player'
import { SelectFor } from '@Types/redux/reducers/user/types'
import { useAtom } from 'jotai'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { convertPlayerTracks } from '../album/[id]'

const Queue: NextPageFCProps = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const dispatch = useDispatch<Dispatch<ActionPlayerTracks>>()
  const [_, setTitle] = useAtom(titleBanner)
  useEffect(() => {
    setTitle('Queue')
  }, [])
  return (
    <AtomWrapper
      css={css`
        padding: 20px;
      `}
    >
      <h1>Queue</h1>
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
        {user?.SavedTracks?.items?.map((item, index) => (
          <Track
            {...{ ...item.track }}
            key={item.track.id}
            position={index}
            withImage
            onPlayer={() => {
              convertPlayerTracks(dispatch, {
                id: item?.track?.id,
                position: index,
                data: user?.SavedTracks?.items,
              })
            }}
          />
        ))}
      </AtomWrapper>
    </AtomWrapper>
  )
}
Queue.Layout = 'swap'

// export async function getServerSideProps(params: NextPageContext) {
//   titleBanner('Queue')
// }
export default Queue
