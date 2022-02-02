import { css } from '@emotion/react'
import styled from '@emotion/styled'
import colors from '@Whil/styles/global/colors'
import ButtonProps from '@Whil/types/components/Button'

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ props }) =>
    props
      ? css`
          width: ${props?.style?.width || 'auto'};
          margin: ${props?.style?.margin || '10px'};
          color: ${props?.style?.color || props.type === 'default'
            ? '#000'
            : colors.default};
          padding: ${props?.style?.padding || '0.5rem 1rem'};
          font-size: ${props?.style?.fontSize || '14px'};
          font-weight: ${props?.style?.fontWeight || 'bold'};
          border-radius: ${props?.style?.borderRadius || '5px'};
          border: ${props?.style?.border || 'none'};
          background: ${props?.style?.background || colors[props.type]};
          box-shadow: 0px 0px 2px
            ${props.type === 'default'
              ? 'rgba(0, 0, 0, 0.25)'
              : colors[props.type || '#fff']};
          &:hover {
            box-shadow: none;
            box-shadow: 0px 0px 4px
              ${props.type === 'default'
                ? 'rgba(0, 0, 0, 0.25)'
                : colors[props.type] || '#fff'};
          }
          &:active {
            box-shadow: none;
            background: ${colors[props.type] || '#fff'};
            box-shadow: 0px 0px 8px
              ${props.type === 'default'
                ? 'rgba(0, 0, 0, 0.25)'
                : colors[props.type] || '#fff'};
          }
          box-shadow: none;
        `
      : ''}
`
