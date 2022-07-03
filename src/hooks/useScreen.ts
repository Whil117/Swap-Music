import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
const ScreenAtom = atom(0 as number)

const updateHeight = () => {
  const w = document.documentElement.clientWidth
  return w
}

const useScreen = () => {
  const [screenWidth, setscreenWidth] = useAtom(ScreenAtom)

  useEffect(() => {
    setscreenWidth(updateHeight())
    window.addEventListener(`resize`, () => updateHeight())
    return () => {
      window.removeEventListener(`resize`, () => {})
    }
  }, [])

  return screenWidth
}

export default useScreen
