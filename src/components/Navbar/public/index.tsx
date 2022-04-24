import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import { SelectFor } from '@Types/redux/reducers/user/types'
import Svg from '@Whil/components/Svg'
import AtomImage from 'lib/AtomImage'
import AtomLink from 'lib/AtomLink'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import Link from 'next/link'
import { FC } from 'react'
import { useSelector } from 'react-redux'
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
    name: 'My Library',
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
  return (
    <AtomWrapper
      as="nav"
      css={css`
        padding: 1rem 1.5rem;
        color: ${colors.white};
        width: auto;
        z-index: 2;
        grid-row: 1 / 2;
        grid-column: 1 / 2;
        background: #1a1c1e;
        display: grid;
        grid-template-rows: auto auto auto 1fr;
        border-radius: 0px 10px 0px 0px;
        top: 0;
        @media (max-width: 980px) {
          display: none;
        }
      `}
    >
      <AtomText
        as="h1"
        css={css`
          grid-row: 1 / 2;
          align-self: center;
          display: flex;
          align-items: center;
        `}
      >
        <AtomImage
          alt="swap"
          src="https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/icons%2Fswapicon.svg?alt=media&token=95c124e6-ebd4-4f72-8258-f1c4fad57f070"
        />
        Swap
      </AtomText>
      <AtomWrapper
        css={css`
          grid-row: 2 / 3;
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
                  font-size: 16px;
                  font-weight: 500;
                `}
              >
                {section.name}
              </AtomText>
            </AtomText>
          </AtomLink>
        ))}
      </AtomWrapper>
      <AtomWrapper
        css={css`
          background: rgba(255, 255, 255, 0.5);
          height: 2px;
          width: 100%;
        `}
      ></AtomWrapper>
      <AtomWrapper
        css={css`
          grid-row: 4 / 5;
        `}
      >
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
                css={css`
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
                      font-weight: 500;
                    `}
                  >
                    {section.name.slice(0, 13)}...
                  </AtomText>
                ) : (
                  <AtomText
                    as="p"
                    css={css`
                      color: ${colors.white};
                      font-size: 16px;
                      font-weight: 500;
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
  )
}

export default Navbar