import * as S from '@Styles/components/Navbar'
import Svg from '@Whil/components/Svg'
import { FC } from 'react'
import Section from './section'

type Props = {}

const Navbar: FC<Props> = () => {
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
          path: '/swap/library/likedsongs',
          icon: 'heart',
        },
      ],
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
