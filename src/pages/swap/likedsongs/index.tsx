import Track from '@Components/Track/Track'
import styled from '@emotion/styled'
import * as S from '@Styles/pages/swap/liked songs'
import Selector from '@Types/redux/reducers/user/types'
import Div from '@Whil/components/Div'
import P from '@Whil/components/P'
import Svg from '@Whil/components/Svg'
import { FC } from 'react'
import { useSelector } from 'react-redux'

type Props = {}

export const TrackWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  width: 100%;
  align-items: center;
`

const LikedSongs: FC<Props> = () => {
  const user = useSelector(Selector)

  return (
    <S.LikedSongsApp>
      <S.LikedSongsWrapper>
        <Div
          styles={{
            height: '200px',
            width: '200px',

            background:
              ' linear-gradient(110deg, rgba(90, 28, 28, 0) 0%, #121216 100%),#1e7ae5',
          }}
        >
          <Svg src="/icons/bigheart" />
        </Div>
        <S.LikedSongsProps>
          <h1>Liked Songs</h1>
          <P
            styles={{
              opacity: 0.5,
            }}
          >
            {user.me?.name} • {user.SavedTracks.total} Songs
          </P>
        </S.LikedSongsProps>
      </S.LikedSongsWrapper>
      <Div
        styles={{
          alignitems: 'flex-start',
          margin: '0 60px',
        }}
      >
        {user.SavedTracks.items.map((item, index) => (
          <Track
            key={item.track.id}
            {...{
              id: item.track.id,
              count: index,
              name: item.track.name,
              image: item.track.album.images[0].url,
              artists: item.track.artists,
              album: item.track.album,
              duration: item.track.duration_ms,
            }}
          />
        ))}
      </Div>
    </S.LikedSongsApp>
  )
}

export default LikedSongs
