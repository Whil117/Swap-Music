import Track from '@Components/Track/Track'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Svg from '@Whil/components/Svg'
import AtomImage from 'lib/AtomImage'
import AtomLink from 'lib/AtomLink'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'
import { useSelector } from 'react-redux'

const LikedSongs: NextPageFCProps = () => {
  const user = useSelector((state: SelectFor) => state.user)
  return (
    <AtomWrapper>
      <AtomWrapper
        css={css`
          height: 400px;
          display: flex;
          align-items: center;
          padding: 0px 90px;
          justify-content: flex-start;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(90, 28, 28, 0) 0%,
              #121216 100%
            ),
            #007fff;
          @media (max-width: 768px) {
            padding: 0;
          }
        `}
      >
        <AtomWrapper
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            @media (max-width: 568px) {
              flex-direction: column;
            }
          `}
        >
          <AtomWrapper
            css={css`
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 200px;
              width: 200px;
              background: rgba(0, 0, 0, 0.1);
              margin: 10px;
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
                font-size: 64px;
                margin: 0;
                @media (max-width: 768px) {
                  font-size: 40px;
                }
              `}
            >
              Liked Songs
            </AtomText>
            <AtomWrapper
              css={css`
                display: flex;
                align-items: center;
                justify-content: flex-start;
                @media (max-width: 568px) {
                  justify-content: center;
                }
              `}
            >
              <AtomLink href="/swap/profile" passHref>
                <AtomWrapper
                  as="a"
                  css={css`
                    display: flex;
                    text-decoration: none;
                    align-items: center;
                    color: #fff;
                    width: 100%;
                    @media (max-width: 568px) {
                      width: auto;
                    }
                  `}
                >
                  <AtomImage
                    src={user?.me?.images[0]?.url as string}
                    alt={user?.me?.display_name as string}
                    borderRadius="50%"
                    width={35}
                    height={35}
                  />
                  <AtomText as="p">
                    {user?.me?.display_name} • {user?.SavedTracks?.total} Songs
                  </AtomText>
                </AtomWrapper>
              </AtomLink>
            </AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
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
      </AtomWrapper>
    </AtomWrapper>
  )
}
LikedSongs.Layout = 'swap'
export default LikedSongs
