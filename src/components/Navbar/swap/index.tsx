import { NavBarAtom } from '@Components/@atoms/AtomBarScroll'
import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Svg from '@Whil/components/Svg'
import { useAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomIcon from 'lib/AtomIcon'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
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
  const [controls, dispatch] = useAtom(controlsAtom)
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
          grid-template-rows: ${controls?.view ? 'auto 1fr auto' : 'auto 1fr'};
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
        <AtomButton
          padding="0px"
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0px 1rem;
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
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 0px 1rem;
            gap: 1rem;
            grid-row: 2;
          `}
        >
          {Sections.map((section) => (
            <AtomButton
              key={`section_option_${section.path}`}
              onClick={() => {
                router
                  .push({
                    pathname: section.path,
                  })
                  .then(() => {
                    document?.getElementById('view')?.scroll({
                      top: 0,
                      behavior: 'smooth',
                    })
                  })
              }}
            >
              <AtomText
                as="a"
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
            </AtomButton>
          ))}
          <AtomWrapper
            css={css`
              overflow: hidden;
              overflow-y: auto;
              /* width: -webkit-fill-available; */
              display: flex;
              flex-direction: column;
              flex-wrap: initial;

              gap: 1rem;
              width: -webkit-fill-available;
              /* height: ${controls?.view ? '385px' : '500px'}; */
              height: calc(100vh - 575px);
              ::-webkit-scrollbar {
                width: 5px;
                /* height: 8px; */
              }
              ::-webkit-scrollbar-thumb {
                background: #ccc;
                width: 8px;
                border-radius: 4px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: #b3b3b3;
                width: 8px;
                box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
              }
            `}
          >
            {user?.Playlists?.items
              ?.map((playlist) => ({
                name: playlist.name,
                path: `/swap/playlist/${playlist.id}`,
                icon: 'playlist',
              }))
              .map((section) => (
                <AtomButton
                  key={`section_option_${section.path}`}
                  onClick={() => {
                    router
                      .push({
                        pathname: section.path,
                      })
                      .then(() => {
                        document?.getElementById('view')?.scroll({
                          top: 0,
                          behavior: 'smooth',
                        })
                      })
                  }}
                  css={css`
                    justify-content: flex-start;
                  `}
                >
                  <AtomText
                    as="a"
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
                </AtomButton>
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
