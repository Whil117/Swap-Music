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
                    src={user.me?.images[0]?.url as string}
                    alt={user.me?.display_name as string}
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
