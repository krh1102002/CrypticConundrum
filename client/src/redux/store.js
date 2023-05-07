import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/Reducer'
import levelSlice from './level/Reducer'
export const store = configureStore({
  reducer: {
    user:userSlice,
    level:levelSlice
  },
  devTools: process.env.NODE_ENV !== 'production'
})