/* eslint-disable no-unused-vars */
import storage from '@Redux/storage'
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import user from '@Redux/reducers/user'
import loading from '@Redux/reducers/loading'
import playerTracks from '@Redux/reducers/player'
const rootReducer = combineReducers({
  user,
  loading,
  playerTracks,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools())
const persistor = persistStore(store)

export { store, persistor }
