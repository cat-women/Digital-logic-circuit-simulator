import { configureStore } from '@reduxjs/toolkit'

import kMapReducer from './reducers/kMapReducer'
import functionalExpReducer from './reducers/expressionReducer'

const store = configureStore({
  reducer: {
    kMap: kMapReducer,
    funcExp: functionalExpReducer
  }
})

export default store
