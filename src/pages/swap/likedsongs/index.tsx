import Track from '@Components/Track/Track'
import colors from '@Styles/global/colors'
import * as S from '@Styles/pages/swap/liked songs'
import Selector from '@Types/redux/reducers/user/types'
import Div from '@Whil/components/Div'
import P from '@Whil/components/P'
import Svg from '@Whil/components/Svg'
import { FC } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  color: string
}

const LikedSongs: FC<Props> = ({ color }) => {
  const user = useSelector(Selector)
  return (
    <S.LikedSongsApp>
      <S.LikedSongsWrapper {...{ color }}>
        <Div
          styles={{
            height: '200px',
            width: '200px',
            background: colors.black_quinary,
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
            {user.me?.display_name} • {user.SavedTracks.total} Songs
          </P>
        </S.LikedSongsProps>
      </S.LikedSongsWrapper>
      <Div
        styles={{
          alignitems: 'flex-start',
          width: '93%',
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
              saved: true,
            }}
          />
        ))}
      </Div>
    </S.LikedSongsApp>
  )
}
export async function getServerSideProps() {
  return {
    props: {
      color: '#0461ee',
    },
  }
}
export default LikedSongs
