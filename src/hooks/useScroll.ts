import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'

const scrollAtom = atom<number>(0)

const UseScroll = () => {
  const [scrollPosition, setScrollPosition] = useAtom(scrollAtom)
  const handleScroll = () => {
    const currentScrollY = document.getElementById('view')?.scrollTop
    setScrollPosition(currentScrollY)
  }
  useCallback(() => {
    document.getElementById('view')?.addEventListener('scroll', handleScroll)
    return () =>
      document
        .getElementById('view')
        ?.removeEventListener('scroll', handleScroll)
  }, [])
  return scrollPosition
}

export default UseScroll
