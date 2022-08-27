import { configureStore } from '@reduxjs/toolkit';
import mapReducer from '../features/map/mapSlice';
import { combineReducers } from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
  key: 'root',
  storage,
}
const reducers = combineReducers({
  map: mapReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers)



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});