import AtomSectionHeader from '@Components/@atoms/AtomSection/Header'
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import { css } from '@emotion/react'
import Selector from '@Types/redux/reducers/user/types'
import Greetings from '@Utils/greetings'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { useSelector } from 'react-redux'
import { SwiperSlide } from 'swiper/react'
const SwapPage = () => {
  const user = useSelector(Selector)

  const data = [
    {
      id: '1',
      title: 'New Releases',
      assets: user?.NewReleases?.albums?.items,
    },
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
    <AtomWrapper
      css={css`
        margin-top: 50px;
        margin: 100px 40px 40px 40px;
      `}
    >
      <AtomWrapper>
        <AtomText as="h1">
          {Greetings()} - {user.me?.display_name}!
        </AtomText>
      </AtomWrapper>
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
            <AtomSectionHeader setShow={setShow} title="Today's suggestions" />
          )}
        >
          {user.SavedAlbums.items?.map((artist, index) => (
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
  )
}

export default SwapPage
