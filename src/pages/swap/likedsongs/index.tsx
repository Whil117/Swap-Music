/* eslint-disable react-hooks/rules-of-hooks */
import AtomTable from '@Components/@atoms/AtomTable'
import { css } from '@emotion/react'
import useScreen from '@Hooks/useScreen'
import useTime from '@Hooks/useTime'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Svg from '@Whil/components/Svg'
import Atombutton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomLink from 'lib/AtomLink'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageFCProps } from 'next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const LikedSongs: NextPageFCProps = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const router = useRouter()
  const screen = useScreen()
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
        <AtomTable
          tableWidth="1440px"
          data={user?.SavedTracks?.items}
          columns={
            screen >= 768
              ? [
                  {
                    id: 'position&play',
                    title: '',
                    customCSS: css`
                      text-align: center;
                    `,
                    view: (item, index) => <AtomText as="p">{index}</AtomText>,
                  },
                  {
                    id: 'image',
                    title: '',
                    view: (item) => (
                      <AtomImage
                        src={item?.track.album.images[0].url as string}
                        width="50px"
                        height="50px"
                        alt={item?.track.name as string}
                      />
                    ),
                  },
                  {
                    id: 'songname',
                    customCSS: css`
                      padding: 0px;
                    `,
                    title: '',
                    view: (item) => {
                      return (
                        <>
                          <AtomText as="p">{item?.track.name}</AtomText>
                          {item?.track?.artists.length !== 0 && (
                            <AtomWrapper
                              css={css`
                                display: flex;
                                justify-content: flex-start;
                              `}
                            >
                              {item?.track?.artists?.map((artist, index) => (
                                <Atombutton
                                  key={artist.id && artist?.id + index}
                                  css={css`
                                    color: #888888;
                                  `}
                                  onClick={() => {
                                    router
                                      .push({
                                        pathname: `/swap/artist/[id]`,
                                        query: {
                                          id: artist.id,
                                        },
                                      })
                                      .then(() => {
                                        document
                                          ?.getElementById('view')
                                          ?.scroll({
                                            top: 0,
                                          })
                                      })
                                  }}
                                >
                                  {index === 0
                                    ? artist.name
                                    : `, ${artist.name}`}
                                </Atombutton>
                              ))}
                            </AtomWrapper>
                          )}
                        </>
                      )
                    },
                  },
                  {
                    id: 'album',
                    title: '',
                    view: (item) => (
                      <Atombutton
                        onClick={() => {
                          router
                            .push({
                              pathname: `/swap/album/[id]`,
                              query: {
                                id: item?.track?.album?.id,
                              },
                            })
                            .then(() => {
                              document?.getElementById('view')?.scroll({
                                top: 0,
                              })
                            })
                        }}
                      >
                        <AtomText as="span">{item?.track?.name}</AtomText>
                      </Atombutton>
                    ),
                  },
                  {
                    id: 'duration',
                    title: '',
                    view: (item) => {
                      const [hours, minutes, seconds] = useTime({
                        ms: item?.track.duration_ms,
                      })
                      return (
                        <AtomText as="p">
                          {' '}
                          {hours ? `${hours} ${minutes}` : ''}
                          {!hours
                            ? `${minutes}:${
                                seconds?.toFixed(0).length === 1
                                  ? `0${seconds.toFixed()}`
                                  : seconds?.toFixed()
                              }`
                            : ''}
                        </AtomText>
                      )
                    },
                  },
                  {
                    id: 'actions',
                    title: '',
                    customCSS: css`
                      text-align: center;
                    `,
                    view: () => (
                      <AtomImage
                        alt="options"
                        width={'5px'}
                        src="https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/icons%2Foptions.svg?alt=media&token=61084285-326c-4b8e-989a-34dc57737eed"
                      />
                    ),
                  },
                ]
              : [
                  {
                    id: 'songname',
                    customCSS: css`
                      padding: 0px;
                    `,
                    title: '',
                    view: (item) => {
                      return (
                        <>
                          <AtomText as="p">{item?.track.name}</AtomText>
                          {item?.track?.artists.length !== 0 && (
                            <AtomWrapper
                              css={css`
                                display: flex;
                                justify-content: flex-start;
                              `}
                            >
                              {item?.track?.artists?.map((artist, index) => (
                                <Atombutton
                                  key={artist.id && artist?.id + index}
                                  css={css`
                                    color: #888888;
                                  `}
                                  onClick={() => {
                                    router
                                      .push({
                                        pathname: `/swap/artist/[id]`,
                                        query: {
                                          id: artist.id,
                                        },
                                      })
                                      .then(() => {
                                        document
                                          ?.getElementById('view')
                                          ?.scroll({
                                            top: 0,
                                          })
                                      })
                                  }}
                                >
                                  {index === 0
                                    ? artist.name
                                    : `, ${artist.name}`}
                                </Atombutton>
                              ))}
                            </AtomWrapper>
                          )}
                        </>
                      )
                    },
                  },
                ]
          }
        />
        {/* {user?.SavedTracks?.items?.map((item, index) => (
          <Track
            {...{ ...item.track }}
            key={item.track.id}
            position={index}
            withImage
          />
        ))} */}
      </AtomWrapper>
    </AtomWrapper>
  )
}
LikedSongs.Layout = 'swap'
export default LikedSongs
