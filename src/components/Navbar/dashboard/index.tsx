import { css } from '@emotion/react'
import colors from '@Styles/global/colors'
import Svg from '@Whil/components/Svg'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { FC } from 'react'
import Section from '../section'

type Props = {}

const Sections = [
  {
    section_name: 'LIST',
    options: [
      {
        name: 'Artists',
        path: '/dashboard/artists',
        icon: 'people',
      },
    ],
  },
]
const Create = [
  {
    section_name: 'CREATE',
    options: [
      {
        name: 'Artist',
        path: '/dashboard/artist/new',
        icon: 'new',
      },
    ],
  },
]

const NavbarDashboard: FC<Props> = () => {
  return (
    <AtomWrapper
      css={css`
        padding: 1rem 1.5rem;
        color: ${colors.white};
        width: auto;
        z-index: 2;
        grid-row: 1 / 2;
        grid-column: 1 / 2;
        background: ${colors.black_quaternary};
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
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 24px;
          gap: 10px;
        `}
      >
        <Svg src="/icons/ipod" />
        Swap
      </AtomText>
      {Sections.map((section) => (
        <Section key={`section_${section.section_name}`} {...section} />
      ))}
      {Create.map((section) => (
        <Section key={`section_${section.section_name}`} {...section} />
      ))}
    </AtomWrapper>
  )
}

export default NavbarDashboard
