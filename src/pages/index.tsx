// import { clientId, clientSecret } from '@Assets/swap'
// import { css } from '@emotion/react'
// import colors from '@Styles/global/colors'
// import * as S from '@Styles/pages'
// import Svg from '@Whil/components/Svg'
// import axios from 'axios'
// import AtomImage from 'lib/AtomImage'
// import AtomSeoLayout from 'lib/AtomSeo'
// import AtomText from 'lib/AtomText'
// import AtomWrapper from 'lib/Atomwrapper'
// import { NextPageContext, NextPageFC } from 'next'
// import { getProviders, getSession, signIn } from 'next-auth/react'
// import { useState } from 'react'

// type SpotifyAuthProps = {
//   providers: {
//     spotify: {
//       callbackUrl: string
//       id: string
//       name: string
//       signinUrl: string
//       type: string
//     }
//   }
//   access_token: string
// }

// const LandingPage: NextPageFC<SpotifyAuthProps> = ({ providers }) => {
//   const [loading, setloading] = useState(false)
//   return (
//     <>
//       <AtomSeoLayout
//         title="Swap"
//         page="Music Plataform"
//         image="https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2Fedsheeran2.png?alt=media&token=6fc753ab-7d01-42b0-8a5a-3e6ebee623ca"
//       />
//       <AtomWrapper
//         css={css`
//           display: grid;
//           grid-template-columns: 1fr 640px;
//           height: 100vh;
//           color: ${colors.white};
//           background-color: ${colors.black_tertiary};
//           @media (max-width: 980px) {
//             position: relative;
//             grid-template-columns: 1fr;
//             z-index: 1;
//             background-color: black;
//           }
//         `}
//       >
//         {loading && (
//           <AtomWrapper
//             css={css`
//               grid-column: 1;
//               align-self: center;
//               justify-self: center;
//               text-align: center;
//               z-index: 1;
//               @media (max-width: 980px) {
//                 grid-column: 1;
//                 position: absolute;
//               }
//             `}
//           >
//             <AtomText
//               as="h1"
//               css={css`
//                 font-size: 3rem;
//                 font-weight: bold;
//                 @media (max-width: 980px) {
//                   font-size: 2rem;
//                 }
//               `}
//             >
//               ¡Welcome back!
//             </AtomText>
//             <AtomText
//               as="p"
//               css={css`
//                 font-size: 1.5rem;
//                 font-weight: 500;
//                 display: flex;
//                 align-items: center;
//                 gap: 1rem;
//                 justify-content: center;
//                 @media (max-width: 980px) {
//                   font-size: 1.5rem;
//                 }
//               `}
//             >
//               Sign in with Spotify
//               <Svg
//                 src="/icons/spotify"
//                 css={css`
//                   svg {
//                     path {
//                       fill: ${colors.green_light};
//                     }
//                   }
//                 `}
//               />
//             </AtomText>

//             <AtomText
//               as="p"
//               css={css`
//                 font-size: 1rem;
//                 font-weight: 400;
//                 opacity: 0.5;
//                 @media (max-width: 980px) {
//                   font-size: 0.8rem;
//                 }
//               `}
//             >
//               ¡NOTE!: Your session is manage for Spotify Inc.
//             </AtomText>
//             <S.LandingPageButton onClick={() => signIn(providers.spotify.id)}>
//               Sign In
//             </S.LandingPageButton>
//           </AtomWrapper>
//         )}
//         <AtomWrapper
//           css={css`
//             grid-column: 2;
//             position: relative;
//           `}
//         >
//           {!loading && (
//             <Svg
//               src="/icons/loading"
//               css={css`
//                 position: absolute;
//                 width: 100%;
//                 height: 100%;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 background-color: ${colors.black_tertiary};
//                 svg {
//                   width: 100px;
//                   height: 100px;
//                 }
//                 circle:nth-of-type(1) {
//                   stroke: ${colors.gray};
//                 }
//                 circle:nth-of-type(2) {
//                   stroke: ${colors.black_quaternary};
//                 }
//               `}
//             />
//           )}
//           <AtomImage
//             css={css`
//               grid-column: 2;
//               height: 99%;
//               width: 100%;
//               object-fit: cover;
//               object-position: center;
//               @media (max-width: 1148px) {
//                 opacity: 0.5;
//                 z-index: -1;
//               }
//             `}
//             src="https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2Fedsheeran2.png?alt=media&token=6fc753ab-7d01-42b0-8a5a-3e6ebee623ca"
//             alt="landingbg"
//             loading="lazy"
//             onLoad={() => {
//               setloading(true)
//             }}
//           />
//         </AtomWrapper>
//       </AtomWrapper>
//     </>
//   )
// }

// export async function getServerSideProps(context: NextPageContext) {
//   const providers = await getProviders()
//   const redirect = await getSession(context)
//   const res = await axios('https://accounts.spotify.com/api/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization:
//         'Basic ' +
//         Buffer.from(clientId + ':' + clientSecret).toString('base64'),
//     },
//     data: 'grant_type=client_credentials',
//   })
//   const {
//     data: { access_token },
//   } = res
//   //get token from project spotify
//   LandingPage.SEO = {
//     title: 'Music Plataform',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2Fedsheeran2.png?alt=media&token=6fc753ab-7d01-42b0-8a5a-3e6ebee623ca',
//     keywords: [
//       'Music',
//       'Swap',
//       'Plataform',
//       'Spotify',
//       'Playlist',
//       'Music',
//       'Swap',
//     ],
//     description:
//       'Music Plataform is a platform that allows you to create and share playlists with your friends. You can also search for music and create your own playlists.',
//   }
//   return redirect?.accessToken
//     ? {
//         redirect: {
//           permanent: false,
//           destination: '/swap',
//         },
//         props: {},
//       }
//     : {
//         props: {
//           providers,
//           access_token,
//         },
//       }
// }
// LandingPage.Layout = 'public'

// export default LandingPage
import { clientId, clientSecret } from '@Assets/swap'
import { css } from '@emotion/react'
import * as S from '@Styles/pages'
import axios from 'axios'
import { useFormik } from 'formik'
import Atombutton from 'lib/Atombutton'
import AtomInput from 'lib/AtomInput'
import AtomSeoLayout from 'lib/AtomSeo'
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
    <>
      <AtomSeoLayout
        title="Swap"
        page="Music Plataform"
        image="https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2Fedsheeran2.png?alt=media&token=6fc753ab-7d01-42b0-8a5a-3e6ebee623ca"
      />
      <S.LadingPageWrapper>
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
            <AtomWrapper
              width="500px"
              css={css`
                @media (max-width: 980px) {
                  width: 350px;
                }
              `}
            >
              {FormProps.map((props) => (
                <AtomInput
                  {...props}
                  key={props.key}
                  formik={formik}
                  css={css`
                    width: 100%;
                  `}
                />
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
          <S.LandingPageImg
            src="https://firebasestorage.googleapis.com/v0/b/swap-4f04f.appspot.com/o/images%2Fedsheeran2.png?alt=media&token=6fc753ab-7d01-42b0-8a5a-3e6ebee623ca"
            alt="landingbg"
          />
        </footer>
      </S.LadingPageWrapper>
    </>
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
LandingPage.Layout = 'public'

export default LandingPage
