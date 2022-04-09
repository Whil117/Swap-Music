import Hidratation from '@Components/layout/Hidratation'
import Loading from '@Components/Loading'
import Navbar from '@Components/Navbar'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/components/layout'
import Selector from '@Types/redux/reducers/user/types'
import Image from '@Whil/components/Image'
import AtomWrapper from 'lib/Atomwrapper'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
export type Props = {
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
  const user = useSelector(Selector)

  return (
    <Hidratation {...{ hidratation, setLoading, accessToken }}>
      {pathname.includes('/swap') ? (
        <>
          {loading ? (
            <AtomWrapper
              css={css`
                display: grid;
                grid-template-columns: 206px 1440px auto;
                grid-template-row: 1fr;
                height: 100vh;
                @media (max-width: 768px) {
                  grid-template-columns: 1fr;
                }
              `}
            >
              <Navbar />
              <AtomWrapper
                css={css`
                  @media (max-width: 768px) {
                    display: none;
                  }
                `}
              >
                {' '}
                CONTACTS
              </AtomWrapper>

              <Wrapper>
                <AtomWrapper
                  css={css`
                    padding: 20px;
                    display: flex;
                    justify-content: flex-end;
                    position: sticky;
                    top: 0;
                    z-index: 2;
                  `}
                >
                  <Link
                    href={{
                      pathname: '/swap/profile',
                    }}
                    passHref
                  >
                    <AtomWrapper as="a">
                      <Image
                        src={user.me?.images[0]?.url as string}
                        alt={user.me?.display_name as string}
                        width={50}
                        height={50}
                        styles={{
                          borderRadius: '50%',
                        }}
                      />
                    </AtomWrapper>
                  </Link>
                </AtomWrapper>
                <AtomWrapper
                  css={css`
                    position: absolute;
                    width: 100%;
                    z-index: 1;
                    @media (max-width: 768px) {
                      grid-column: 1 / -1;
                    }
                  `}
                >
                  {children}
                </AtomWrapper>
              </Wrapper>
            </AtomWrapper>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        children
      )}
    </Hidratation>
  )
}

export default Layout
