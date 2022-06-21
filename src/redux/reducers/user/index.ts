export type State = {
  followedArtists: {
    artists: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>
  }
  me: {
    display_name: string
    images: SpotifyApi.ImageObject[]
    id: string
    email: string
    country: string
    product: string
    type: string
    birthdate: string
    uri: string
    href: string
    accessToken: string
  }
  Playlists: SpotifyApi.CursorBasedPagingObject<SpotifyApi.PlaylistObjectSimplified>
  TopArtists: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>
  SavedAlbums: SpotifyApi.CursorBasedPagingObject<SpotifyApi.SavedAlbumObject>
  NewReleases: SpotifyApi.ListOfNewReleasesResponse
  SavedTracks: SpotifyApi.CursorBasedPagingObject<SpotifyApi.SavedTrackObject>
}

const TypesReducers = {
  HIDRATATION: (state: State, payload: State) => ({
    ...payload,
  }),
}

type Action = {
  type: keyof typeof TypesReducers
  payload: State
}

const reducer = (state = {}, action: Action) => {
  const { type, payload } = action
  const handler = TypesReducers[type]
  const newState = handler ? handler(state as State, payload) : state
  return newState
}
export default reducer
