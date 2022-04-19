import { css } from '@emotion/react'
import SvgProps from '@Whil/types/components/Svg'
import AtomWrapper from 'lib/Atomwrapper'
import dynamic from 'next/dynamic'
import { FC, useMemo } from 'react'

const Svg: FC<SvgProps> = (props) => {
  const Icon = useMemo(
    () => dynamic(() => import(`../../../../../public${props.src}.svg`)),
    [props.src]
  )
  if (!Icon) return null
  return (
    <AtomWrapper
      css={css`
        svg {
          width: ${props.width || ''};
          height: ${props.height || ''};
        }
        ${props.css}
      `}
    >
      <Icon />
    </AtomWrapper>
  )
}

export default Svg
