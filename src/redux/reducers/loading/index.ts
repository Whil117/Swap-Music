export type Loding = {
  loading: boolean
}

const typesMethods = {
  LOADING: (state: Loding, payload: boolean) => ({
    ...state,
    loading: payload,
  }),
}

type Action = {
  type: keyof typeof typesMethods
  payload: boolean
}

const reducer = (state = { loading: true }, action: Action) => {
  const { type, payload } = action
  const handler = typesMethods[type]
  const newState = handler ? handler(state as Loding, payload) : state
  return newState
}

export default reducer
