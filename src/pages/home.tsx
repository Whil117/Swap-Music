import { customGet } from '@Utils/customGet'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { FC } from 'react'

type Props = {}

const Home: FC<Props> = ({ newReleases, featuredPlaylists }) => {
  const { data: session } = useSession()
  console.log({ newReleases, featuredPlaylists })

  return (
    <div>
      <h1>name</h1>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  const newReleases = await customGet(
    'https://api.spotify.com/v1/browse/new-releases?country=IN&limit=25',
    session
  )

  const featuredPlaylists = await customGet(
    'https://api.spotify.com/v1/browse/featured-playlists?country=IN',
    session
  )

  return { props: { newReleases, featuredPlaylists, session } }
}

export default Home
