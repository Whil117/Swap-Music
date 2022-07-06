import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const scrollAtom = atom<number>(0)

const validPathsSongs = ['album', 'playlist', 'artist']

const UseScroll = () => {
  const [scrollPosition, setScrollPosition] = useAtom(scrollAtom)

  const router = useRouter()
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
  return scrollPosition
}

export default UseScroll
