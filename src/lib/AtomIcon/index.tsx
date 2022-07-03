import { SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import { FC, useEffect, useState } from 'react'

export interface AtomIconTypes {
  icon?: string
  url?: string
  color?: string
  width?: string
  height?: string
  customCSS?: SerializedStyles
}
export const IconContainer = styled('div')<AtomIconTypes>`
  display: flex;
  width: max-content;
  height: max-content;
  svg {
    width: ${({ width }) => width || `34px`};
    height: ${({ height }) => height || `34px`};
    path {
      fill: ${({ color }) => color || `#000`}!important;
    }
    polygon {
      fill: ${({ color }) => color || `#000`}!important;
    }
    circle {
      fill: ${({ color }) => color || `#000`}!important;
    }
  }

  ${({ customCSS }) => customCSS};
`

export const PlaceholderIcon = styled('div')<AtomIconTypes>`
  width: ${({ width }) => width || `34px`};
  height: ${({ height }) => height || `34px`};
`

const DefaultIcon = `https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/icon.svg`

const AtomIcon: FC<AtomIconTypes> = (props) => {
  const { icon } = props
  const [getIcon, setGetIcon] = useState(``)

  useEffect(() => {
    const fetchIcon = () =>
      fetch(icon || DefaultIcon)
        .then((response) => response.text())
        .then((res) => res && setGetIcon(res))
    fetchIcon()
    return () => {
      setGetIcon('')
    }
  }, [icon])

  return getIcon ? (
    <IconContainer
      {...props}
      color="default"
      dangerouslySetInnerHTML={{
        __html: getIcon,
      }}
    />
  ) : (
    <PlaceholderIcon />
  )
}

export default AtomIcon
