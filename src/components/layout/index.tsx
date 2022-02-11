import Hidratation from '@Components/layout/Hidratation'
import Loading from '@Components/Loading'
import Navbar from '@Components/Navbar'
import { Profile, Wrapper } from '@Styles/components/layout'
import Selector from '@Types/redux/reducers/user/types'
import Image from '@Whil/components/Image'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
type Props = {
  router: NextRouter
  hidratation: boolean
}

const Layout: FC<Props> = ({ children, router: { pathname }, hidratation }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const user = useSelector(Selector)

  return (
    <Hidratation {...{ hidratation, setLoading }}>
      {pathname.includes('/swap') ? (
        <>
          {loading ? (
            <>
              <Navbar />
              <Link
                href={{
                  pathname: '/swap/profile',
                }}
                passHref
              >
                <Profile>
                  <Image
                    src={user.me?.image}
                    alt={user.me?.name as string}
                    width={50}
                    height={50}
                    styles={{
                      borderRadius: '50%',
                    }}
                  />
                </Profile>
              </Link>
              <Wrapper>{children}</Wrapper>
            </>
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
