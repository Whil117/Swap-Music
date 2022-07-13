import AtomCard from '@Components/@atoms/AtomCard'
import SectionProps from '@Components/List'
import { css } from '@emotion/react'
import useSearch, { countAtom } from '@Hooks/useSearch'
import { atom, useAtom, useSetAtom } from 'jotai'
import AtomInput from 'lib/AtomInput'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'
import { SwiperSlide } from 'swiper/react'
const searchAtom = atom('')

const SearchPage: NextPageFCProps = () => {
  const [search, setSearch] = useAtom(searchAtom)
  const setCount = useSetAtom(countAtom)

  const data = useSearch(search)

  return (
    <AtomWrapper
      maxWidth="1440px"
      padding="0px 90px"
      margin="50px 0px 0px 0px"
      css={css`
        @media (max-width: 980px) {
          padding: 0px 30px;
        }
      `}
    >
      <AtomInput
        type="text"
        id="search"
        onChange={(e) => {
          setSearch(e.target.value)
          setCount(0)
        }}
        css={css`
          width: 400px;
          height: 25px;
        `}
      />
      {data?.artists?.items && data?.artists?.items?.length > 0 && (
        <SectionProps title="Artists">
          {data?.artists.items.map((artist) => (
            <SwiperSlide key={artist.id} style={{ width: 'auto' }}>
              <AtomCard
                key={artist?.id}
                name={artist?.name}
                type={artist?.type}
                id={artist?.id}
                image={artist?.images[0]?.url}
              />
            </SwiperSlide>
          ))}
        </SectionProps>
      )}
      {data?.albums?.items && data?.albums?.items?.length > 0 && (
        <SectionProps title="Albums">
          {data?.albums.items.map((artist) => (
            <SwiperSlide key={artist.id} style={{ width: 'auto' }}>
              <AtomCard
                key={artist?.id}
                name={artist?.name}
                type={artist?.type}
                id={artist?.id}
                image={artist?.images[0]?.url}
              />
            </SwiperSlide>
          ))}
        </SectionProps>
      )}
      {data?.playlists?.items && data?.playlists?.items?.length > 0 && (
        <SectionProps title="Playlists">
          {data?.playlists.items.map((artist) => (
            <SwiperSlide key={artist.id} style={{ width: 'auto' }}>
              <AtomCard
                key={artist?.id}
                name={artist?.name}
                type={artist?.type}
                id={artist?.id}
                image={artist?.images[0]?.url}
              />
            </SwiperSlide>
          ))}
        </SectionProps>
      )}
      {data?.shows?.items && data?.shows?.items?.length > 0 && (
        <SectionProps title="Shows">
          {data?.shows.items.map((artist) => (
            <SwiperSlide key={artist.id} style={{ width: 'auto' }}>
              <AtomCard
                key={artist?.id}
                name={artist?.name}
                type={artist?.type}
                id={artist?.id}
                image={artist?.images[0]?.url}
              />
            </SwiperSlide>
          ))}
        </SectionProps>
      )}
      {data?.episodes?.items && data?.episodes?.items?.length > 0 && (
        <SectionProps title="Episodies">
          {data?.episodes.items.map((artist) => (
            <SwiperSlide key={artist.id} style={{ width: 'auto' }}>
              <AtomCard
                key={artist?.id}
                name={artist?.name}
                type={artist?.type}
                id={artist?.id}
                image={artist?.images[0]?.url}
              />
            </SwiperSlide>
          ))}
        </SectionProps>
      )}
    </AtomWrapper>
  )
}
SearchPage.Layout = 'swap'

export default SearchPage
