/* eslint-disable no-unused-vars */
import AtomSectionHeader from '@Components/@atoms/AtomSection/Header'
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import { css } from '@emotion/react'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Greetings from '@Utils/greetings'
import { atom, PrimitiveAtom, useAtom } from 'jotai'
import { atomFamily, atomWithStorage, useReducerAtom } from 'jotai/utils'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomSeoLayout from 'lib/AtomSeo'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { SwiperSlide } from 'swiper/react'

const dataFn = (user: SelectFor['user']) => {
  return [
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
}

export const recentListened = atomWithStorage(
  'recentListened',
  [] as RecentListened[]
)

export type RecentListened = {
  id: string
  name: string
  type: string
  image: string
  url: string
}

const dataFamily = atomFamily((user: SelectFor['user']) => atom(dataFn(user)))

type typesReducers = {
  [key: string]: (
    state: RecentListened[],
    payload: Action['payload']
  ) => RecentListened[] | undefined
}

const typesReduers: typesReducers = {
  set: (state, payload) => {
    const findRepeat = state.find((item) => item.id === payload.id)
    if (findRepeat) {
      return state
    } else if (state.length < 6) {
      return [payload, ...state]
    } else {
      return [payload, ...state.slice(0, 6)]
    }
  },
}

type Action = {
  type: keyof typeof typesReduers
  payload: RecentListened
}

export const reducerRecent = (state: RecentListened[], action: Action) =>
  typesReduers[action.type](state, action.payload) as RecentListened[]

const SwapPage: NextPageFCProps = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const router = useRouter()
  const [recent] = useReducerAtom(
    recentListened as PrimitiveAtom<RecentListened[]>,
    reducerRecent
  )
  const [data] = useAtom(dataFamily(user))

  return (
    <>
      <AtomSeoLayout title="Feed" description="Welcome" />
      <AtomWrapper
        css={css`
          margin-top: 50px;
          margin: 50px 40px 40px 40px;
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
          <AtomWrapper
            css={css`
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              gap: 10px;
              justify-content: flex-start;
              @media (max-width: 520px) {
                /* flex-direction: column; */
                align-items: center;
                justify-content: center;
              }
            `}
          >
            <Atombutton
              css={css`
                display: flex;
                align-items: center;
                width: max-content;
                width: 300px;
                height: 80px;
                background: #191922;
                border-radius: 10px;
              `}
            >
              Liked Songs
            </Atombutton>
            {recent?.map((item) => (
              <Atombutton
                onClick={() => {
                  router.push(item?.url)
                }}
                key={item.id}
                css={css`
                  text-align: left;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  width: 300px;
                  height: 80px;
                  background: #191922;
                  border-radius: 10px;
                `}
              >
                <AtomImage
                  width={80}
                  height={80}
                  borderRadius="10px 0 0 10px"
                  src={item.image ?? ''}
                  alt={item.name}
                />
                {item.name.length > 15 ? (
                  <AtomText
                    as="p"
                    css={css`
                      /* width: 100px; */
                      padding: 0 10px;
                    `}
                  >
                    {item.name.slice(0, 40)}...
                  </AtomText>
                ) : (
                  <AtomText
                    as="p"
                    css={css`
                      /* width: 100px; */
                      padding: 0 10px;
                    `}
                  >
                    {item.name}
                  </AtomText>
                )}
              </Atombutton>
            ))}
          </AtomWrapper>
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
    </>
  )
}
SwapPage.Layout = 'swap'
export default SwapPage
