import { PayloadAction, createSlice } from '@reduxjs/toolkit'
export interface CounterState {
  loading: boolean
}
const initialState: CounterState = {
  loading: false,
}
export const globalStore = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, actions: PayloadAction<boolean>) => {
      state.loading = actions.payload
    }
  },
})
export const {setLoading} = globalStore.actions
export default globalStore.reducer