import { NavBarAtom } from '@Components/@atoms/AtomBarScroll'
import { css } from '@emotion/react'
import reducerplayer from '@Redux/reducers/player/controls'
import colors from '@Styles/global/colors'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Svg from '@Whil/components/Svg'
import { useAtom } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import AtomButton from 'lib/Atombutton'
import AtomIcon from 'lib/AtomIcon'
import AtomImage from 'lib/AtomImage'
import AtomLink from 'lib/AtomLink'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { controlsAtom } from '../player'
type Props = {}
const Sections = [
  {
    name: 'Home',
    path: '/swap',
    icon: 'home',
  },
  {
    name: 'Search',
    path: '/swap/search',
    icon: 'search',
  },
  {
    name: 'Library',
    path: '/swap/library',
    icon: 'library',
  },
  {
    name: 'Liked Songs',
    path: '/swap/likedsongs',
    icon: 'fullheart',
  },
]

const Navbar: FC<Props> = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const router = useRouter()
  const [controls, dispatch] = useReducerAtom(controlsAtom, reducerplayer)
  const [navbar, setNavbar] = useAtom(NavBarAtom)

  return (
    <AtomWrapper
      onClick={() => setNavbar(false)}
      css={css`
        grid-row: 1 / 2;
        grid-column: 1 / 2;
        ${navbar &&
        css`
          z-index: 4;
          width: 100%;
          height: 100vh;
          position: fixed;
          backdrop-filter: blur(10px);
        `}
      `}
    >
      <AtomWrapper
        as="nav"
        css={css`
          color: ${colors.white};
          height: 100%;
          z-index: 2;
          background: #191922;
          display: grid;
          grid-template-rows: auto auto;
          border-radius: 0px 10px 0px 0px;
          top: 0;
          @media (max-width: 980px) {
            display: ${navbar ? 'block  ' : 'none'};
            ${navbar &&
            css`
              z-index: 6;
              width: 180px;
              height: 100vh;
            `}
          }
        `}
      >
        <AtomWrapper padding="0rem 1rem">
          <AtomButton
            padding="0px"
            css={css`
              display: flex;
              align-items: center;
              justify-content: flex-start;
            `}
            onClick={() =>
              router.push('/').then(() =>
                document?.getElementById('view')?.scroll({
                  top: 0,
                })
              )
            }
          >
            <AtomIcon
              width="50px"
              height="50px"
              customCSS={css`
                grid-row: 1 / 2;
                gap: 2px;
                align-self: center;
                display: flex;
                align-items: center;
              `}
              color="default"
              icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/icon.svg"
            />
          </AtomButton>
          <AtomWrapper
            css={css`
              grid-row: 2;
            `}
          >
            {Sections.map((section) => (
              <AtomLink
                key={`section_option_${section.path}`}
                href={{
                  pathname: section.path,
                }}
                passHref
              >
                <AtomText
                  as="a"
                  margin="10px 0"
                  fontSize="18px"
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 15px;
                  `}
                >
                  <Svg src={`/icons/${section.icon}`} />
                  <AtomText
                    as="p"
                    css={css`
                      color: ${colors.white};
                      font-weight: 400;
                    `}
                  >
                    {section.name}
                  </AtomText>
                </AtomText>
              </AtomLink>
            ))}
            {user?.Playlists?.items
              ?.map((playlist) => ({
                name: playlist.name,
                path: `/swap/playlist/${playlist.id}`,
                icon: 'playlist',
              }))
              .map((section) => (
                <Link
                  key={`section_option_${section.path}`}
                  href={{
                    pathname: section.path,
                  }}
                  passHref
                >
                  <AtomText
                    as="a"
                    margin="15px 0"
                    fontSize="18px"
                    css={css`
                      opacity: 0.5;
                      display: flex;
                      align-items: center;
                      gap: 15px;
                    `}
                  >
                    <Svg src={`/icons/${section.icon}`} />
                    {section.name.length > 15 ? (
                      <AtomText
                        as="p"
                        css={css`
                          color: ${colors.white};
                          font-size: 16px;
                          font-weight: 400;
                        `}
                      >
                        {section.name.slice(0, 17)}...
                      </AtomText>
                    ) : (
                      <AtomText
                        as="p"
                        css={css`
                          color: ${colors.white};
                          font-size: 16px;
                          font-weight: 400;
                        `}
                      >
                        {section.name}
                      </AtomText>
                    )}
                  </AtomText>
                </Link>
              ))}
          </AtomWrapper>
        </AtomWrapper>
        {controls?.view && (
          <AtomButton
            padding="0px"
            width="100%"
            height="100%"
            onClick={() => {
              dispatch({
                type: 'HIDEIMAGESIDEBAR',
              })
            }}
          >
            <AtomImage
              width="100%"
              height="100%"
              alt="swap"
              borderRadius="10px 10px 0px 0px"
              src={controls.image as string}
              css={css`
                img {
                  transition: transform 0.5s ease-in-out;

                  height: 100%;
                }
              `}
            />
          </AtomButton>
        )}
      </AtomWrapper>
    </AtomWrapper>
  )
}

export default Navbar
