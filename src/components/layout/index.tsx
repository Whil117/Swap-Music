import Hidratation from '@Components/layout/Hidratation'
import Loading from '@Components/Loading'
import Navbar from '@Components/Navbar'
import { css } from '@emotion/react'
import { Wrapper } from '@Styles/components/layout'
import { SelectFor } from '@Types/redux/reducers/user/types'
import AtomImage from 'lib/AtomImage'
import AtomWrapper from 'lib/Atomwrapper'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { createContext, FC, RefObject } from 'react'
import { useSelector } from 'react-redux'
export type Props = {
  router: NextRouter
  hidratation: boolean
  accessToken: string
}

type ContextScroll = {
  view: RefObject<HTMLDivElement>
}

export const ContextScroll = createContext<ContextScroll>({} as ContextScroll)

const Layout: FC<Props> = ({
  children,
  router: { pathname },
  hidratation,
  accessToken,
}) => {
  const user = useSelector((state: SelectFor) => state.user)

  const { loading } = useSelector((state: SelectFor) => state.loading)

  return (
    <Hidratation {...{ hidratation, accessToken }}>
      {pathname.includes('/swap') ? (
        <>
          <AtomWrapper
            css={css`
              display: grid;
              grid-template-columns: 206px 1440px auto;
              grid-template-rows: 1fr auto;
              height: 100vh;
              @media (max-width: 768px) {
                grid-template-columns: 1fr;
              }
            `}
          >
            <Navbar />
            <AtomWrapper
              css={css`
                grid-column: 3;
                @media (max-width: 768px) {
                  display: none;
                }
              `}
            >
              {' '}
              CONTACTS
            </AtomWrapper>

            <Wrapper id="view">
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
                    <AtomImage
                      src={(user?.me?.images[0]?.url as string) || ''}
                      alt={user?.me?.display_name as string}
                      width={50}
                      height={50}
                      borderRadius="50%"
                    />
                  </AtomWrapper>
                </Link>
              </AtomWrapper>
              <AtomWrapper
                css={css`
                  position: absolute;
                  width: 100%;
                  z-index: 1;
                  top: 0;
                  @media (max-width: 768px) {
                    grid-column: 1 / -1;
                  }
                `}
              >
                {children}
              </AtomWrapper>
            </Wrapper>
            {/* <NavbarPlayer /> */}
          </AtomWrapper>
          {loading && <Loading />}
        </>
      ) : (
        children
      )}
    </Hidratation>
  )
}

export default Layout
