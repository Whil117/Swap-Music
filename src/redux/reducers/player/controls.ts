import colors from '@Styles/global/colors'

/* eslint-disable no-unused-vars */
export type IPlayer = {
  play: boolean
  repeat: boolean
  aleatory: boolean
  loop: boolean
  volumen: number
  color: string
  currentTime: number
}
export type IPlayerPayload = {
  play?: boolean
  repeat?: boolean
  aleatory?: boolean
  loop?: boolean
  volumen?: number
  color?: string
  currentTime?: number
}

export const initialState = {
  play: false,
  repeat: false,
  aleatory: false,
  loop: false,
  volumen: 25,
  color: colors.green_light,
  currentTime: 0,
}

type typesReducers = {
  [key: string]: (state: IPlayer, payload: IPlayerPayload) => IPlayer
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
}
export type ActionPlayer = {
  type: keyof typeof typesReducers
  payload: IPlayerPayload
}

export const reducerplayer = (state = initialState, action: ActionPlayer) => {
  const { type, payload } = action
  const handler = typesReducers[type]
  const newState = handler ? handler(state, payload) : state
  return newState
}

export default reducerplayer
