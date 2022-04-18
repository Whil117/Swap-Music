import { useEffect, useState } from 'react'

const useScreen = () => {
  const [screenWidth, setscreenWidth] = useState<number>(0)

  useEffect(() => {
    const updateHeight = () => {
      const w = document.documentElement.clientWidth
      setscreenWidth(w)
    }
    updateHeight()
    window.addEventListener(`resize`, updateHeight)
  }, [])
  return screenWidth
}

export default useScreen
