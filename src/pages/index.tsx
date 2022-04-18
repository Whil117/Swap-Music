import { clientId, clientSecret } from '@Assets/swap'
import { css } from '@emotion/react'
import * as S from '@Styles/pages'
import Svg from '@Whil/components/Svg'
import axios from 'axios'
import { useFormik } from 'formik'
import Atombutton from 'lib/Atombutton'
import AtomInput from 'lib/AtomInput'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { NextPageContext, NextPageFC } from 'next'
import { getProviders, getSession, signIn } from 'next-auth/react'
import { useState } from 'react'
import * as Yup from 'yup'

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
  access_token: string
}

const LandingPage: NextPageFC<SpotifyAuthProps> = ({ providers }) => {
  const [show, setShow] = useState<boolean>(false)
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
    }),
    onSubmit: () => {},
  })
  return (
    <S.LadingPageWrapper>
      <Svg
        src="/image/landing/spotify"
        css={css`
          position: fixed;
          bottom: 0;
          @media (max-width: 1148px) {
            display: none;
          }
        `}
        style={{ p0sition: 'fixed', margin: '-100px -40px' }}
      />
      <S.LandingPageContent>
        <h1>Welcome back!</h1>
        <AtomText as="h4">
          ¡NOTE! remember first register you and after login
        </AtomText>
        <Atombutton
          css={css`
            color: white;
            font-weight: 600;
            margin: 20px 0;
            border: 1px solid white;
            border-radius: 5px;
          `}
          onClick={() => setShow(!show)}
        >
          or {show ? 'Sign up' : 'Sign in'}
        </Atombutton>
        {show ? (
          <AtomWrapper>
            {FormProps.map((props) => (
              <AtomInput {...props} key={props.key} formik={formik} />
            ))}
            <AtomText
              as="p"
              css={css`
                font-size: 12px;
                opacity: 0.5;
              `}
            >
              This form is going to go Spotify.Inc
            </AtomText>
            <S.LandingPageButton
              type="submit"
              onClick={() => {
                formik.validateForm()
                formik.handleSubmit()
              }}
            >
              Register
            </S.LandingPageButton>
          </AtomWrapper>
        ) : (
          <S.LandingPageButton onClick={() => signIn(providers.spotify.id)}>
            Sign In
          </S.LandingPageButton>
        )}
      </S.LandingPageContent>
      <footer>
        <S.LandingPageImg src="/image/landing/landingbg.png" alt="landingbg" />
      </footer>
    </S.LadingPageWrapper>
  )
}

const FormProps = [
  {
    key: 1,
    id: 'name',
    placeholder: 'Enter your name',
    label: 'Name',
  },
  {
    key: 2,
    id: 'email',
    placeholder: 'Enter your spotify email address',
    label: 'Email',
  },
]
export async function getServerSideProps(context: NextPageContext) {
  const providers = await getProviders()
  const redirect = await getSession(context)
  const res = await axios('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    },
    data: 'grant_type=client_credentials',
  })
  const {
    data: { access_token },
  } = res
  //get token from project spotify
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
          access_token,
        },
      }
}
LandingPage.Layout = 'swap'

export default LandingPage
