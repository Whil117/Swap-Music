import AtomBanner from '@Components/@atoms/AtomBanner'
import AtomSectionHeader from '@Components/@atoms/AtomSection/Header'
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFC } from 'next'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { SwiperSlide } from 'swiper/react'

type Props = {}

const Profile: FC & NextPageFC<Props> = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const data = [
    {
      id: '2',
      title: 'Top Artists',
      assets: user?.TopArtists?.items,
    },
    {
      id: '3',
      title: 'Your favorite artists',
      assets: user?.followedArtists?.artists?.items,
    },
  ]

  return (
    <AtomWrapper>
      <AtomBanner
        image_url={user.me.images[0].url}
        type="profile"
        profile={{
          name: user.me.display_name,
          type: user.me.type,
          followers: user.me.followers.total,
        }}
      />
      <AtomWrapper
        css={css`
          margin-top: 50px;
          margin: 100px 40px 40px 40px;
          max-width: 1440px;
          @media (max-width: 980px) {
            margin: 0px 20px;
          }
        `}
      >
        {data.map((item) => (
          <AtomWrapper key={item.id}>
            <SectionProps
              Elements={({ setShow }) => (
                <AtomSectionHeader setShow={setShow} title={item.title} />
              )}
            >
              {item.assets?.map((artist) => (
                <SwiperSlide key={artist.id} style={{ width: 'auto' }}>
                  <Card
                    {...{
                      id: artist.id,
                      type: artist.type,
                      image: artist.images[0].url,
                      name: artist.name,
                    }}
                  />
                </SwiperSlide>
              ))}
            </SectionProps>
          </AtomWrapper>
        ))}
        <AtomWrapper>
          <SectionProps
            Elements={({ setShow }) => (
              <AtomSectionHeader
                setShow={setShow}
                title="Today's suggestions"
              />
            )}
          >
            {user?.SavedAlbums?.items?.map((artist, index) => (
              <SwiperSlide key={index} style={{ width: 'auto' }}>
                <Card
                  key={artist.album.id}
                  {...{
                    id: artist.album.id,
                    type: artist.album.type,
                    image: artist.album.images[0].url,
                    name: artist.album.name,
                  }}
                />
              </SwiperSlide>
            ))}
          </SectionProps>
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  )
}
Profile.Layout = 'swap'
export default Profile
