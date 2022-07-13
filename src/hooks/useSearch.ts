/* eslint-disable no-console */
import { atom, useAtom } from 'jotai'
import spotifyAPI from 'lib/spotify/spotify'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'

export const countAtom = atom(0)
export const dataAtom = atom({} as SpotifyApi.SearchResponse)

function useSearch(search: string) {
  const [data, setData] = useAtom(dataAtom)
  const [count, setCount] = useAtom(countAtom)
  const Session = getSession()

  useEffect(() => {
    const handler = async () => {
      const token = await Session
      spotifyAPI.setAccessToken(token?.accessToken as string)
      const data = await spotifyAPI.search(
        search,
        ['album', 'artist', 'episode', 'playlist', 'show', 'track'],
        {
          include_external: 'audio',
          limit: 50,
        }
      )
      setData(data.body)
    }
    if (count === 20 && search !== '') {
      handler()
    }
  }, [count])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search !== '' && count < 20) {
        setCount(count + 1)
      }
    }, 50)
    return () => clearTimeout(handler)
  }, [count, search])

  return data
}

export default useSearch
