import { titleBanner } from '@Components/@organisms/OrganismBanner'
import { css } from '@emotion/react'
import { colorsAtom } from '@Hooks/UseColor'
import useScreen from '@Hooks/useScreen'
import { SelectFor } from '@Types/redux/reducers/user/types'
import { atom, useAtom } from 'jotai'
import AtomButton from 'lib/Atombutton'
import AtomImage from 'lib/AtomImage'
import AtomText from 'lib/AtomText'
import AtomWrapper from 'lib/Atomwrapper'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'

const scrollAtom = atom<number>(0)

export const stepsId = atom('Playlists')

const validPathsSongs = ['album', 'playlist', 'artist']

export const NavBarAtom = atom(false)

const AtomBarScroll: FC = () => {
  const user = useSelector((state: SelectFor) => state.user)
  const [colors] = useAtom(colorsAtom)
  const [scrollPosition, setScrollPosition] = useAtom(scrollAtom)
  const [steps, setSteps] = useAtom(stepsId)
  const [title] = useAtom(titleBanner)
  const [navbar, setNavbar] = useAtom(NavBarAtom)
  const router = useRouter()
  const screen = useScreen()

  useEffect(() => {
    if (validPathsSongs.includes(router.pathname.split('/')[2])) {
      document?.getElementById('view')?.addEventListener(
        'scroll',
        () => {
          setScrollPosition(
            document?.getElementById('view')?.scrollTop as number
          )
        },
        { passive: true }
      )
    } else {
      document?.getElementById('view')?.removeEventListener('scroll', () => {
        setScrollPosition(0)
      })
    }

    return () => {
      if (validPathsSongs.includes(router.pathname.split('/')[2])) {
        document?.getElementById('view')?.removeEventListener('scroll', () => {
          setScrollPosition(0)
        })
      } else {
        document?.getElementById('view')?.removeEventListener('scroll', () => {
          setScrollPosition(0)
        })
      }
    }
  }, [router])

  return (
    <AtomWrapper
      css={css`
        ${validPathsSongs.includes(router.pathname.split('/')[2]) &&
        scrollPosition >= 280 &&
        css`
          background: ${colors[0]};
        `}
        padding: 10px;
        display: flex;
        justify-content: ${router.asPath.includes('swap/library')
          ? 'space-between'
          : validPathsSongs.includes(router.pathname.split('/')[2]) &&
            scrollPosition >= 280
          ? 'space-between'
          : 'flex-end'};
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 2;
      `}
    >
      {router.asPath.includes('swap/library') && (
        <AtomWrapper
          css={css`
            display: flex;
          `}
        >
          {['Playlists', 'Podcasts', 'Artists', 'Albums'].map((step, index) => (
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
              @media (max-width: 768px) {
                font-size: 18px;
              }
              @media (max-width: 480px) {
                font-size: 14px;
              }
            `}
          >
            {title}
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
            : setNavbar(!navbar)
        }}
      >
        <AtomImage
          src={
            (user?.me?.images[0]?.url as string) ||
            'https://via.placeholder.com/150/92c952'
          }
          alt={user?.me?.display_name as string}
          width={40}
          height={40}
          borderRadius="50%"
        />
      </AtomButton>
    </AtomWrapper>
  )
}

export default AtomBarScroll
