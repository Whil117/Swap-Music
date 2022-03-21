import * as S from '@Styles/pages'
import Svg from '@Whil/components/Svg'
import { NextPageContext } from 'next'
import { getProviders, getSession, signIn } from 'next-auth/react'

type SpotifyAuthProps = {
  providers: {
    spotify: {
      callbackUrl: string
      id: string
      name: string
      signinUrl: string
      type: string
    }
  }
}

const LandingPage = ({ providers }: SpotifyAuthProps) => {
  return (
    <S.LadingPageWrapper>
      <Svg
        src="/image/landing/spotify"
        style={{ p0sition: 'fixed', margin: '-100px -40px' }}
      />
      <S.LandingPageContent>
        <h1>Welcome back!</h1>
        <h3>Sign in with spotify</h3>
        <S.LandingPageButton onClick={() => signIn(providers.spotify.id)}>
          Sign In
        </S.LandingPageButton>
      </S.LandingPageContent>

      <footer>
        <S.LandingPageImg src="/image/landing/landingbg.png" alt="landingbg" />
      </footer>
    </S.LadingPageWrapper>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const providers = await getProviders()
  const redirect = await getSession(context)
  return redirect?.accessToken
    ? {
        redirect: {
          permanent: false,
          destination: '/swap',
        },
        props: {},
      }
    : {
        props: {
          providers,
        },
      }
}

export default LandingPage
