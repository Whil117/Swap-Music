import { useEffect, useState } from 'react'

const useTime = ({ ms }: { ms: number }) => {
  const [[hours, minutes, seconds], setTime] = useState<number[]>([])

  useEffect(() => {
    if (ms) {
      const hours = Math.floor(ms / 3600000)
      const minutes = Math.floor(ms / 60000) - hours * 60
      const seconds = Math.round((ms % 60000) / 1000)
      setTime([hours, minutes, seconds])
    }
  }, [ms])
  return [hours, minutes, seconds]
}
export default useTime
