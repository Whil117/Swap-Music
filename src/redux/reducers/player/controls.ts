import { ContextTracks } from '@Components/@atoms/AtomTrack'
import colors from '@Styles/global/colors'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

/* eslint-disable no-unused-vars */

export type Inti = {
  play?: boolean
  repeat?: boolean
  aleatory?: boolean
  loop?: boolean
  volumen?: number
  color?: string
  player?: {
    currentSite: {
      type: 'album' | 'artist' | 'playlist' | 'track' | 'likedsongs'
      album?: {
        id: string
        name: string
        image: string
      }
      playlist?: {
        id: string
        name: string
        image: string
      }
    }
    currentTrack: {
      id: string
      position: number
      name: string
      artists: {
        name?: string
        id?: string
      }[]
      youtube_url?: string
      youtube_id?: string
      preview_url: string
      image: string
      album: {
        id?: string
        name?: string
        image?: string
      }
      duration?: number
      context?: ContextTracks[]
    }
    context: ContextTracks[]
  }
  currentTime?: number
  image?: string
  view?: boolean
}

export const initialState = {
  play: false,
  repeat: false,
  aleatory: false,
  loop: false,
  volumen: 5,
  color: colors.green_light,
  player: {
    currentSite: {
      type: '' as 'album' | 'artist' | 'playlist' | 'track',
      album: {
        id: '',
        name: '',
        image: '',
      },
      playlist: {
        id: '',
        name: '',
        image: '',
      },
    },
    currentTrack: {
      id: '',
      position: 0,
      name: '',
      artists: [] as {
        name?: string
        id?: string
      }[],
      preview_url: '',
      image: '',
      album: {
        id: '',
        name: '',
      },
    },
    context: [],
  },
  currentTime: 0,
  image: '',
  view: false,
}

type typesReducers = {
  [key: string]: (state: Inti, payload: Inti) => Inti
}

const typesReducers: typesReducers = {
  PLAY: (state, payload) => ({
    ...state,
    play: payload.play as boolean,
  }),
  REPEAT: (state, payload) => ({
    ...state,
    repeat: payload.repeat as boolean,
  }),
  ALEATORY: (state, payload) => ({
    ...state,
    aleatory: payload.aleatory as boolean,
  }),
  LOOP: (state, payload) => ({
    ...state,
    loop: payload.loop as boolean,
  }),
  VOLUMEN: (state, payload) => ({
    ...state,
    volumen: payload.volumen as number,
  }),
  COLOR: (state, payload) => ({
    ...state,
    color: payload.color as string,
  }),
  CURRENT_TIME: (state, payload) => ({
    ...state,
    currentTime: Math.round(payload.currentTime as number),
  }),
  VIEWIMAGESIDEBAR: (state, payload) => ({
    ...state,
    ...payload,
    image: payload.image as string,
  }),
  HIDEIMAGESIDEBAR: (state, payload) => ({
    ...state,
    view: false,
  }),
  SETTRACK: (state, payload) => ({
    ...state,
    player: payload.player,
  }),
  SEVERAL: (state, payload) => ({
    ...state,
    ...payload,
  }),
}
export type ActionPlayer = {
  type: keyof typeof typesReducers
  payload?: Inti
}

export const reducerplayer = (
  state = initialState as Inti,
  action: ActionPlayer
) => {
  const { type, payload } = action
  const handler = typesReducers[type]
  const newState = handler
    ? handler(state, payload as typeof initialState)
    : state
  return newState as Inti
}

export const PLAYATOM = atom(false)

export const controlsWithStorage = atomWithStorage(
  'SWAPPLAYER',
  initialState as Inti
)
const family = atom((get) => ({
  ...get(controlsWithStorage),
  play: get(PLAYATOM),
}))

const ReducerAtomPlayer = (reducer: (v: Inti, a: ActionPlayer) => Inti) => {
  const anAtom = atom(
    (get) => get(family),
    (get, set, action: ActionPlayer) =>
      set(controlsWithStorage, reducer(get(controlsWithStorage), action))
  )
  return anAtom
}

export default ReducerAtomPlayer
