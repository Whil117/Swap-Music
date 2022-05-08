import AtomSectionHeader from '@Components/@atoms/AtomSection/Header'
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Greetings from '@Utils/greetings'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'
import { useSelector } from 'react-redux'
import { SwiperSlide } from 'swiper/react'
const SwapPage: NextPageFCProps = () => {
  const user = useSelector((state: SelectFor) => state.user)
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
    <AtomSeoLayout title="Swap - Menú">
      <AtomWrapper
        css={css`
          margin-top: 50px;
          margin: 100px 40px 40px 40px;
          max-width: 1440px;
          @media (max-width: 980px) {
            margin: 20px;
          }
        `}
      >
        <AtomWrapper>
          <AtomText as="h1">
            {Greetings()} - {user?.me?.display_name}!
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
    </AtomSeoLayout>
  )
}
SwapPage.Layout = 'swap'
export default SwapPage
