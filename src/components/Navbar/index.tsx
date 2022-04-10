import * as S from '@Styles/components/Navbar'
import Svg from '@Whil/components/Svg'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import Section from './section'
import Selector from '@Types/redux/reducers/user/types'
type Props = {}

const Navbar: FC<Props> = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const Sections = [
    {
      section_name: 'Menu',
      options: [
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
      ],
    },
    {
      section_name: 'Library',
      options: [
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
      ],
    },
    {
      section_name: 'Playlists',
      options: user?.Playlists?.items?.map((playlist) => ({
        name: playlist.name,
        path: `/swap/playlist/${playlist.id}`,
        icon: 'playlist',
      })),
    },
  ]
  return (
    <S.Navbar>
      <S.NavbarHeader>
        <Svg src="/icons/ipod" />
        <h1>Swap</h1>
      </S.NavbarHeader>
      {Sections.map((section) => (
        <Section key={`section_${section.section_name}`} {...section} />
      ))}
    </S.Navbar>
  )
}

export default Navbar
