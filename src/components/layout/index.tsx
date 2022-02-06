import Hidratation from '@Components/layout/Hidratation'
import Navbar from '@Components/Navbar'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/components/layout'
import { LoadingWrapper } from '@Styles/components/layout/Hidratation/Loading'
import colors from '@Styles/global/colors'
import Svg from '@Whil/components/Svg'
import { NextRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

type Props = {
  router: NextRouter
  hidratation: boolean
  accessToken: string
}

const Layout: FC<Props> = ({
  children,
  router: { pathname },
  hidratation,
  accessToken,
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (hidratation) {
      setTimeout(() => {
        setLoading(true)
      }, 2000)
    }
  }, [hidratation])

  return (
    <Hidratation {...{ hidratation, accessToken }}>
      {pathname.includes('/swap') ? (
        <>
          {loading ? (
            <>
              <Navbar />
              <Wrapper>{children}</Wrapper>
            </>
          ) : (
            <>
              <LoadingWrapper>
                <Svg
                  src="/icons/loading"
                  customStyles={css`
                    position: fixed;
                    z-index: 1;
                    svg {
                      width: 100px;
                      height: 100px;
                    }
                    circle:nth-of-type(1) {
                      stroke: ${colors.black_quaternary};
                    }
                    circle:nth-of-type(2) {
                      stroke: ${colors.black_quinary};
                    }
                  `}
                />
              </LoadingWrapper>
            </>
          )}
        </>
      ) : (
        children
      )}
    </Hidratation>
  )
}

export default Layout
