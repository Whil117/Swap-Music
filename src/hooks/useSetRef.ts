/* eslint-disable no-unused-vars */
import { SetStateAction } from 'jotai'
import { MutableRefObject, useEffect } from 'react'

const useSetRef = <T>(
  ref: MutableRefObject<T>,
  set: (e: SetStateAction<T>) => void
) => {
  useEffect(() => {
    if (ref.current as MutableRefObject<T>) {
      set(ref as T)
    }
  }, [ref, set])
}

export default useSetRef
