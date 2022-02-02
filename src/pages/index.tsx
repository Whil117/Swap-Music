import * as S from '@Styles/pages'
import Svg from '@Whil/components/Svg'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'

const LandingPage: NextPage = () => (
  <S.LadingPageWrapper>
    <Svg
      src="/image/landing/spotify"
      style={{ p0sition: 'fixed', margin: '-100px -40px' }}
    />
    <S.LandingPageContent>
      <h1>Welcome back!</h1>
      <h3>Sign in with spotify</h3>
      <S.LandingPageButton
        onClick={() => {
          signIn('spotify', { callbackUrl: 'http://localhost:3000/home' })
        }}
      >
        Sign In
      </S.LandingPageButton>
    </S.LandingPageContent>
    <footer>
      <S.LandingPageImg src="/image/landing/landingbg.png" alt="landingbg" />
    </footer>
  </S.LadingPageWrapper>
)

export default LandingPage
