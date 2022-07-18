/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import { colorsAtom } from '@Hooks/UseColor'
import useScreen from '@Hooks/useScreen'
import { PLAYATOM } from '@Redux/reducers/player/controls'
import { SelectFor } from '@Types/redux/reducers/user/types'
import axios from 'axios'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithDefault } from 'jotai/utils'
import AtomButton from 'lib/Atombutton'
import AtomIcon from 'lib/AtomIcon'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'

export const stepsId = atom('Playlists')

const validPathsSongs = [
  'album',
  'artist',
  'library',
  'profile',
  'playlist',
  'likedsongs',
]
const scrollHeightAtom = atom(0)
const clientHeightAtom = atom(0)
const scrollTopAtom = atom(0)
export const isBottomAtom = atom(false)

export const initialSongs = atom(
  async (get) =>
    await getLikedSongs(
      get(accessTokenAtom),
      'https://api.spotify.com/v1/me/tracks?limit=50&locale=en,es-419;q=0.9,es;q=0.8'
    ).then((res) => res)
)

export const likedSongsAtom =
  atomWithDefault<SpotifyApi.UsersSavedTracksResponse>(async (get) =>
    get(initialSongs)
  )
export const accessTokenAtom = atom('')
type ScrollProps = {
  scrollHeight: number
  clientHeight: number
  scrollTop: number
  likedSongs?: SpotifyApi.SavedTrackObject[]
  accessToken?: string
  isBottom?: boolean
}

const urlAtom = atom(
  'https://api.spotify.com/v1/me/tracks?offset=50&limit=50&locale=en,es-419;q=0.9,es;q=0.8'
)

export const NavBarAtom = atom(false)

const getLikedSongs = async (
  accessToken: string,
  url: string,
  setUrl?: (newurl: string) => void
): Promise<SpotifyApi.UsersSavedTracksResponse> => {
  const songs = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  songs.data.next !== null && setUrl && setUrl(songs.data.next)
  return songs.data
}
export const validPaths = atom(['likedsongs'])
export const routerAtom = atom('')

export const scrollPositionAtom = atom(
  (get) => ({
    scrollHeight: get(scrollHeightAtom),
    router: get(routerAtom),
    clientHeight: get(clientHeightAtom),
    scrollTop: get(scrollTopAtom),
    isBottom: get(isBottomAtom),
    validPaths: get(validPaths),
    accessToken: get(accessTokenAtom),
  }),
  async (get, set, args: ScrollProps) => {
    const { scrollHeight, clientHeight, scrollTop, isBottom } = args
    set(scrollHeightAtom, scrollHeight)
    set(clientHeightAtom, clientHeight)
    set(scrollTopAtom, scrollTop)
    set(
      isBottomAtom,
      get(validPaths).includes(get(routerAtom)) &&
        scrollTop + clientHeight >= scrollHeight - 1
    )

    if (
      get(validPaths).includes(get(routerAtom)) &&
      isBottom &&
      get(likedSongsAtom)?.items?.length < get(likedSongsAtom)?.total
    ) {
      set(likedSongsAtom, {
        ...get(likedSongsAtom),
        items: [
          ...get(likedSongsAtom)?.items,
          ...(
            await getLikedSongs(get(accessTokenAtom), get(urlAtom), (newurl) =>
              set(urlAtom, newurl)
            )
          ).items,
        ],
      })
    }
  }
)

const AtomBarScroll: FC = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const colors = useAtomValue(colorsAtom)
  const [play, setPlay] = useAtom(PLAYATOM)
  const [steps, setSteps] = useAtom(stepsId)
  const setNavbar = useSetAtom(NavBarAtom)
  const router = useRouter()
  const screen = useScreen()
  const scrollPosition = useAtomValue(scrollPositionAtom)

  return (
    <>
      {validPathsSongs.includes(router.pathname.split('/')[2]) &&
        scrollPosition.scrollTop >= 19.5 && (
          <AtomWrapper
            css={css`
              ${validPathsSongs.includes(router.pathname.split('/')[2]) &&
              scrollPosition.scrollTop >= 19.5 &&
              css`
                backgroun-opacity: 0.75;
                background: ${colors[0]};
              `}
              display: flex;
              justify-content: ${router.asPath.includes('swap/library')
                ? 'space-between'
                : validPathsSongs.includes(router.pathname.split('/')[2]) &&
                  scrollPosition.scrollTop >= 19.5
                ? 'space-between'
                : 'flex-end'};
              align-items: center;
              width: 100%;
              padding: 15px 0px;
              position: sticky;
              top: 0;
              z-index: 2;
            `}
          >
            <AtomWrapper
              flexDirection="row"
              width="100%"
              css={css`
                display: flex;
                padding: 0px 15px;
                align-items: center;
                justify-content: ${router.asPath.includes('swap/library')
                  ? 'space-between'
                  : validPathsSongs.includes(router.pathname.split('/')[2]) &&
                    scrollPosition.scrollTop >= 19.5
                  ? 'space-between'
                  : 'flex-end'};
              `}
            >
              {router.asPath.includes('swap/library') && (
                <AtomWrapper
                  css={css`
                    display: flex;
                  `}
                >
                  {['Playlists', 'Artists', 'Albums'].map((step, index) => (
                    <AtomButton
                      key={step + index}
                      onClick={() => {
                        setSteps(step)
                      }}
                      css={css`
                        border-radius: 5px;
                        color: white;
                        font-weight: bold;
                        padding: 10px;
                        background-color: ${steps === step
                          ? 'rgba(255,255,255,0.25)'
                          : 'transparent'};
                      `}
                    >
                      {step}
                    </AtomButton>
                  ))}
                </AtomWrapper>
              )}
              {validPathsSongs.includes(router.pathname.split('/')[2]) &&
                scrollPosition.scrollTop >= 19.5 && (
                  <AtomWrapper
                    css={css`
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      gap: 10px;
                    `}
                  >
                    <AtomButton onClick={() => router.back()}>
                      <AtomIcon
                        width="25px"
                        height="25px"
                        icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/goback.svg"
                      />
                    </AtomButton>
                    <AtomButton
                      width="40px"
                      height="40px"
                      css={css`
                        background-color: white;
                        border-radius: 50%;
                      `}
                      onClick={() => {
                        setPlay((prev) => !prev)
                        const audio = document.getElementById(
                          'AUDIOPLAYER'
                        ) as HTMLAudioElement
                        play ? audio.pause() : audio.play()
                      }}
                    >
                      <AtomIcon
                        customCSS={css`
                          padding: 5px;
                          margin-left: ${play ? '0px' : '2px'};
                          margin-top: ${play ? '0px' : '2px'};
                        `}
                        width="20px"
                        height="20px"
                        color={colors[0] as string}
                        icon={
                          play
                            ? 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/pausee.svg'
                            : 'https://storage.googleapis.com/cdn-bucket-ixulabs-platform/WHIL/icons/playho.svg'
                        }
                      />
                    </AtomButton>
                    <AtomText
                      as="p"
                      fontWeight="bold"
                      fontSize="18px"
                      css={css`
                        @media (max-width: 980px) {
                          font-size: 16px;
                        }
                        @media (max-width: 480px) {
                          font-size: 14px;
                        }
                      `}
                    >
                      {
                        document.getElementById('headerBarScrollTitle')
                          ?.innerText
                      }
                    </AtomText>
                  </AtomWrapper>
                )}
              <AtomButton
                onClick={() => {
                  screen >= 980
                    ? router.push('/swap/profile').then(() => {
                        document?.getElementById('view')?.scroll({
                          top: 0,
                        })
                      })
                    : setNavbar((prev) => !prev)
                }}
              >
                <AtomImage
                  src={user?.me?.images[0]?.url as string}
                  alt={user?.me?.display_name as string}
                  width={40}
                  height={40}
                  borderRadius="50%"
                />
              </AtomButton>
            </AtomWrapper>
          </AtomWrapper>
        )}
    </>
  )
}

export default AtomBarScroll
