import { configureStore } from '@reduxjs/toolkit'

import kMapReducer from './reducers/kMapReducer'
import functionalExpReducer from './reducers/expressionReducer'
import userReducer from './reducers/auth'
import resultReducer from './reducers/result'

const store = configureStore({
  reducer: {
    kMap: kMapReducer,
    funcExp: functionalExpReducer,
    auth: userReducer,
    results: resultReducer
  }
})

export default store
