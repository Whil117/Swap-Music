/* eslint-disable no-unused-vars */
import Card from '@Components/Cards/Card'
import SectionProps from '@Components/List'
import { css } from '@emotion/react'
import useScreen from '@Hooks/useScreen'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Greetings from '@Utils/greetings'
import Svg from '@Whil/components/Svg'
import { atom, PrimitiveAtom, useAtom } from 'jotai'
import { atomFamily, atomWithStorage, useReducerAtom } from 'jotai/utils'
import AtomButton from 'lib/Atombutton'
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
  const screen = useScreen()
  const [recent] = useReducerAtom(
    recentListened as PrimitiveAtom<RecentListened[]>,
    reducerRecent
  )
  const [data] = useAtom(dataFamily(user))

  return (
    <>
      <AtomSeoLayout
        title="Swap"
        page="Feed"
        description="Welcome"
        image={user?.SavedAlbums?.items[0]?.album?.images[0].url}
      />
      <AtomWrapper alignItems="center" justifyContent="center">
        <AtomWrapper
          maxWidth="1440px"
          padding="0px 90px"
          css={css`
            margin-top: 50px;
            gap: 20px;
            @media (max-width: 980px) {
              padding: 0px 15px;
              width: auto;
            }
          `}
        >
          <AtomText as="h1" fontWeight="700" margin="10px 0px">
            {Greetings()} - {user?.me?.display_name}!
          </AtomText>
          <AtomWrapper
            margin="20px 0px"
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 10px;
              justify-content: flex-start;
              @media (max-width: 980px) {
                /* flex-direction: column; */
                align-items: center;
                justify-content: center;
              }
            `}
          >
            <AtomButton
              css={css`
                padding: 0px;
                text-align: left;
                cursor: pointer;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                width: 100%;
                background: #191922;
                border-radius: 10px;
                @media (max-width: 980px) {
                  width: 100%;
                  height: auto;
                }
              `}
            >
              <Svg
                src="/icons/heart"
                width="40px"
                height="40px"
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: #0072ff;
                  border-radius: 10px 0 0 10px;
                  width: 80px;
                  height: 80px;
                  svg {
                    fill: white;
                  }
                `}
              />
              <AtomText
                as="p"
                css={css`
                  padding: 0 10px;
                `}
              >
                Liked Songs
              </AtomText>
            </AtomButton>
            {recent
              .filter((item, index) => (screen > 980 ? 8 : index < 3))
              ?.map((item) => (
                <AtomButton
                  onClick={() => {
                    router.push(item?.url)
                  }}
                  key={item.id}
                  css={css`
                    padding: 0px;
                    text-align: left;
                    cursor: pointer;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    width: 100%;
                    background: #191922;
                    border-radius: 10px;
                    @media (max-width: 980px) {
                      width: 100%;
                      height: auto;
                    }
                  `}
                >
                  <AtomImage
                    width={80}
                    height={80}
                    borderRadius="10px 0 0 10px"
                    src={item.image ?? ''}
                    alt={item.name}
                  />
                  {item.name.length > 12 ? (
                    <AtomText
                      as="p"
                      css={css`
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
                </AtomButton>
              ))}
          </AtomWrapper>
          <AtomWrapper
            maxWidth="1440px"
            css={css`
              display: flex;
              flex-direction: column;
              gap: 20px;
            `}
          >
            {data.map((item) => (
              <SectionProps key={item.id} title={item.title}>
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
            ))}
            <SectionProps title="Today's suggestions">
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
    </>
  )
}
SwapPage.Layout = 'swap'
export default SwapPage
