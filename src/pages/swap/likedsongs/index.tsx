import Track from '@Components/Track/Track'
import { css } from '@emotion/react'
import Selector from '@Types/redux/reducers/user/types'
import Div from '@Whil/components/Div'
import Svg from '@Whil/components/Svg'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import { useSelector } from 'react-redux'

type Props = {
  color: string
}

const LikedSongs: FC<Props> = ({ color }) => {
  const user = useSelector(Selector)
  return (
    <AtomWrapper>
      <AtomWrapper
        css={css`
          height: 400px;
          display: flex;
          align-items: center;
          padding: 30px 60px;
          justify-content: flex-start;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(90, 28, 28, 0) 0%,
              #121216 100%
            ),
            ${color};
        `}
      >
        <AtomWrapper
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            padding: 20px;
          `}
        >
          <AtomWrapper
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              height: 145px;
              width: 150px;
            `}
          >
            <Svg src="/icons/bigheart" />
          </AtomWrapper>
          <AtomWrapper
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
            `}
          >
            <AtomText
              as="p"
              css={css`
                /* text-align: justify;
                text-justify: inter-word; */
                font-size: 64px;
                margin: 0;
              `}
            >
              Liked Songs
            </AtomText>
            <AtomWrapper
              css={css`
                display: flex;
                align-items: center;
                justify-content: flex-start;
              `}
            >
              <AtomImage
                src={user.me?.images[0]?.url as string}
                alt={user.me?.display_name as string}
                borderRadius="50%"
                width={35}
                height={35}
              />
              <AtomText as="p">
                {user.me?.display_name} • {user.SavedTracks.total} Songs
              </AtomText>
            </AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
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
    </AtomWrapper>
  )
}
export async function getServerSideProps() {
  return {
    props: {
      color: '#007fff',
    },
  }
}
export default LikedSongs
