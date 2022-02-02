import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Styles from '@Whil/types/styles'

export const DivWrapper = styled.div<{ styles?: Styles }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  ${({ styles }) =>
    styles
      ? css`
          text-decoration: none;
          line-height: ${styles.lineheight || '14px'};
          display: ${styles.display || 'flex'};
          flex-direction: ${styles.flexdirection || 'column'};
          justify-content: ${styles.justifycontent || 'center'};
          align-items: ${styles.alignitems || 'center'};
          width: ${styles.width || 'auto'};
          height: ${styles.height || 'auto'};
          padding: ${styles.padding || '0'};
          font-size: ${styles.fontSize || '14px'};
          font-weight: ${styles.fontWeight || 'normal'};
          border-radius: ${styles.borderRadius || '10px'};
          background: ${styles.background || 'transparent'};
          border: ${styles.border || '0'};
          color: ${styles.color || 'black'};
          object-fit: ${styles.objectfit || 'cover'};
          margin: ${styles.margin || '0'};
          box-shadow: ${styles.boxshadow || '0px 0px 2px rgba(0, 0, 0, 0.25)'};
        `
      : ''};
`
