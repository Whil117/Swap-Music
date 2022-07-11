import { css } from '@emotion/react'
import Svg from '@Whil/components/Svg'
import AtomWrapper from 'lib/Atomwrapper'
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
    <>
      {props?.options?.map((option) => (
        <Link
          key={`section_option_${option.path}`}
          href={{
            pathname: option.path,
          }}
          passHref
        >
          <AtomWrapper
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <Svg src={`/icons/${option.icon}`} />
            {option.name.length > 15 ? (
              <p>{option.name.slice(0, 15)}...</p>
            ) : (
              <p>{option.name}</p>
            )}
          </AtomWrapper>
        </Link>
      ))}
    </>
  )
}

export default Section
