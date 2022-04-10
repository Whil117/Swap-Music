import { NavbarSection, NavbarSectionName } from '@Styles/components/Navbar'
import Svg from '@Whil/components/Svg'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  section_name: string
  options: {
    name: string
    path: string
    icon: string
  }[]
}

const Section: FC<Props> = (props) => {
  return (
    <div>
      <NavbarSectionName>{props.section_name}</NavbarSectionName>
      {props?.options?.map((option) => (
        <Link
          key={`section_option_${option.path}`}
          href={{
            pathname: option.path,
          }}
          passHref
        >
          <NavbarSection>
            <Svg src={`/icons/${option.icon}`} />
            {option.name.length > 15 ? (
              <p>{option.name.slice(0, 15)}...</p>
            ) : (
              <p>{option.name}</p>
            )}
          </NavbarSection>
        </Link>
      ))}
    </div>
  )
}

export default Section
