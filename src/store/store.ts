import { configureStore } from '@reduxjs/toolkit'
import globalStore  from './globalStore'
export const store = configureStore({
  reducer: {
    globalStore: globalStore,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch