import { SvgWrapper } from '@Whil/styles/components/Svg'
import SvgProps from '@Whil/types/components/Svg'
import dynamic from 'next/dynamic'
import { FC, useMemo } from 'react'

const Svg: FC<SvgProps> = (props) => {
  const Icon = useMemo(
    () => dynamic(() => import(`../../../../../public${props.src}.svg`)),
    [props.src]
  )
  if (!Icon) return null
  return (
    <SvgWrapper {...{ style: props.style }}>
      <Icon />
    </SvgWrapper>
  )
}

export default Svg
