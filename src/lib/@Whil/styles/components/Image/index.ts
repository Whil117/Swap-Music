import { css } from '@emotion/react'
import styled from '@emotion/styled'
import ImageProps from '@Whil/types/components/Image'
import Image from 'next/image'

const ImageWrapper = styled(Image)<ImageProps>`
  border-radius: 10px;
  object-fit: cover
    ${({ styles }) =>
      styles
        ? css`
            margin: ${styles.margin || '10px'};
            background: ${styles.background || '#ffffff'};
            object-fit: ${styles.objectfit || 'cover'};
            border-radius: ${styles.borderRadius || '5px'};
          `
        : ''};
`
export default ImageWrapper
