/* eslint-disable no-unused-vars */
import { css } from '@emotion/react'
import { colorsAtom } from '@Hooks/UseColor'
import useScreen from '@Hooks/useScreen'
import UseScroll from '@Hooks/useScroll'
import { SelectFor } from '@Types/redux/reducers/user/types'
import { atom, useAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useSelector } from 'react-redux'

export const stepsId = atom('Playlists')

const validPathsSongs = ['album', 'artist', 'library', 'profile', 'playlist']

export const NavBarAtom = atom(false)

const AtomBarScroll: FC = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const [colors] = useAtom(colorsAtom)
  const [steps, setSteps] = useAtom(stepsId)
  const [_, setNavbar] = useAtom(NavBarAtom)
  const router = useRouter()
  const screen = useScreen()
  const scrollPosition = UseScroll()
  return (
    <>
      {validPathsSongs.includes(router.pathname.split('/')[2]) && (
        <AtomWrapper
          css={css`
            ${validPathsSongs.includes(router.pathname.split('/')[2]) &&
            scrollPosition >= 280 &&
            css`
              /* opacity: 0.75; */
              backgroun-opacity: 0.75;
              background: ${colors[0]};
            `}
            /* backdrop-filter: blur(8px); */
            display: flex;
            justify-content: ${router.asPath.includes('swap/library')
              ? 'space-between'
              : validPathsSongs.includes(router.pathname.split('/')[2]) &&
                scrollPosition >= 280
              ? 'space-between'
              : 'flex-end'};
            align-items: center;
            width: 100%;
            padding: 15px 0px;
            position: sticky;
            top: 0;
            z-index: 2;
          `}
        >
          <AtomWrapper
            flexDirection="row"
            width="100%"
            css={css`
              display: flex;
              padding: 0px 15px;
              align-items: center;
              justify-content: ${router.asPath.includes('swap/library')
                ? 'space-between'
                : validPathsSongs.includes(router.pathname.split('/')[2]) &&
                  scrollPosition >= 280
                ? 'space-between'
                : 'flex-end'};
            `}
          >
            {router.asPath.includes('swap/library') && (
              <AtomWrapper
                css={css`
                  display: flex;
                `}
              >
                {['Playlists', 'Artists', 'Albums'].map((step, index) => (
                  <AtomButton
                    key={step + index}
                    onClick={() => {
                      setSteps(step)
                    }}
                    css={css`
                      border-radius: 5px;
                      color: white;
                      font-weight: bold;
                      padding: 10px;
                      background-color: ${steps === step
                        ? 'rgba(255,255,255,0.25)'
                        : 'transparent'};
                    `}
                  >
                    {step}
                  </AtomButton>
                ))}
              </AtomWrapper>
            )}
            {validPathsSongs.includes(router.pathname.split('/')[2]) &&
              scrollPosition >= 280 && (
                <AtomText
                  as="p"
                  fontWeight="bold"
                  fontSize="18px"
                  css={css`
                    @media (max-width: 980px) {
                      font-size: 16px;
                    }
                    @media (max-width: 480px) {
                      font-size: 14px;
                    }
                  `}
                >
                  {document.getElementById('headerBarScrollTitle')?.innerText}
                </AtomText>
              )}
            <AtomButton
              onClick={() => {
                screen >= 980
                  ? router.push('/swap/profile').then(() => {
                      document?.getElementById('view')?.scroll({
                        top: 0,
                      })
                    })
                  : setNavbar((prev) => !prev)
              }}
            >
              <AtomImage
                src={user?.me?.images[0]?.url as string}
                alt={user?.me?.display_name as string}
                width={40}
                height={40}
                borderRadius="50%"
              />
            </AtomButton>
          </AtomWrapper>
        </AtomWrapper>
      )}
    </>
  )
}

export default AtomBarScroll
