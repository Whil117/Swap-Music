import {
  LadingPageWrapper,
  LandingPageButton,
  LandingPageContent,
  LandingPageImg,
} from '@Styles/pages'
import Svg from '@Whil/components/Svg'
import { NextPage } from 'next'

import { signIn } from 'next-auth/react'

type Props = {}

const LandingPage: NextPage<Props> = () => {
  const handleLogin = () => {
    signIn('spotify', { callbackUrl: 'http://localhost:3000/home' })
  }
  return (
    <LadingPageWrapper>
      <Svg
        src="/image/landing/spotify"
        style={{ p0sition: 'fixed', margin: '-100px -40px' }}
      />
      <LandingPageContent>
        <h1>Welcome back!</h1>
        <h3>Sign in with spotify</h3>
        <LandingPageButton onClick={handleLogin}>Sign In</LandingPageButton>
      </LandingPageContent>
      <footer>
        <LandingPageImg src="/image/landing/landingbg.png" alt="landingbg" />
      </footer>
    </LadingPageWrapper>
  )
}

export default LandingPage
