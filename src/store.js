import { configureStore } from '@reduxjs/toolkit'

import kMapReducer from './reducers/kMapReducer'
import functionalExpReducer from './reducers/expressionReducer'
import userReducer from './reducers/auth'

const store = configureStore({
  reducer: {
    kMap: kMapReducer,
    funcExp: functionalExpReducer,
    auth: userReducer
  }
})

export default store
