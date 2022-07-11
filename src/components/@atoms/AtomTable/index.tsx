/* eslint-disable no-unused-vars */
import { css, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'
import AtomWrapper from 'lib/Atomwrapper'

type Types = {
  customCSS?: SerializedStyles
}

export const AtomTableStyled = styled.table<AtomTableTypes<Types>>`
  border-collapse: collapse;
  table-layout: auto;
  font-family: 'Montserrat', sans-serif;
  width: ${({ width }) => width || `100%`};
  height: ${({ height }) => height || `max-content`};
  margin: ${({ margin }) => margin || `0px 0px;`};
  color: ${({ color }) => color || `black`};
  width: max-content;
  min-width: 100%;
  border-radius: ${({ borderRadius }) => borderRadius || `15px`};
  thead {
    font-family: 'Montserrat', sans-serif;
    height: fit-content;
    text-align: center;
    /* background-color: white; */
    th {
      font-family: 'Montserrat', sans-serif;
      text-align: left;
      color: #565656;
      font-size: 14px;
      font-weight: 700;
      padding: 15px 30px 15px 30px;
      span {
        font-size: 8px;
      }
    }
  }
  ${({ customCSS }) => customCSS};
`

export const AtomTbodyStyled = styled.tbody<Types>`
  td {
    font-family: 'Montserrat', sans-serif;
    color: #565656;
    font-size: 14px;
    /* padding: 15px 30px; */
    /* text-align: left;         */
  }
  tr {
    border-radius: 10px;
    padding: 15px;
    /* background-color: #fefefe; */
    transition: all 0.3s ease-in-out;
  }
  tr:active {
    padding: 15px;
    background-color: #302d2d;
  }
  tr:hover {
    padding: 15px;
    background-color: #302d2d;
  }
`

export const TDStyled = styled.td<Types>`
  ${({ customCSS }) => customCSS};
`

export type AtomTableTypes<T> = {
  tableWidth?: string
  width?: string
  height?: string
  margin?: string
  color?: string
  borderRadius?: string
  data?: T[]
  columns?: AtomTableColumnTypes<T>[]
  customCSS?: SerializedStyles
}

export type AtomTableColumnTypes<T> = {
  id?: string
  title: string
  width?: string
  view: (data?: T, index?: number) => JSX.Element
  customCSS?: SerializedStyles
}

function AtomTable<T>(props: AtomTableTypes<T>) {
  const { columns, data, tableWidth, customCSS } = props

  const TableData = { ...props, data: data, customCSS: customCSS }
  return (
    <AtomWrapper
      width={tableWidth || `100%`}
      css={
        customCSS ??
        css`
          overflow-x: auto;
          /* width */
          ::-webkit-scrollbar {
            height: 10px;
          }

          ::-webkit-scrollbar-thumb {
            border-radius: 2px;
          }
        `
      }
    >
      <AtomTableStyled customCSS={customCSS}>
        <thead>
          <tr>
            {columns &&
              columns.length > 0 &&
              columns?.map((e, i) => (
                <th
                  style={{ width: `${e.width}` }}
                  key={`header ${e.id ?? i + 1}`}
                >
                  {e.title}
                </th>
              ))}
          </tr>
        </thead>
        <AtomTbodyStyled>
          {data &&
            data?.length > 0 &&
            data?.map((e: any, i: number) => (
              <tr key={`row ${e.id ?? i + 1}`}>
                {columns &&
                  columns.length > 0 &&
                  columns?.map((td, j) => (
                    <TDStyled key={`cell ${i + 1} ${j + 1}`} {...td}>
                      {td.view(e, i + 1)}
                    </TDStyled>
                  ))}
              </tr>
            ))}
        </AtomTbodyStyled>
      </AtomTableStyled>
    </AtomWrapper>
  )
}
export default AtomTable
