import { configureStore } from '@reduxjs/toolkit'

import kMapReducer from './reducers/kMapReducer'

const store = configureStore({
  reducer: {
    kMap: kMapReducer
  }
})

export default store
