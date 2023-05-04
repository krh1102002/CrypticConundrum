import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/Reducer'
export const store = configureStore({
  reducer: {
    user:userSlice
  },
})