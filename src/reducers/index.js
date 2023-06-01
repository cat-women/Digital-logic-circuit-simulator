import { combineReducers } from 'redux'

import kMapReducer from './kMapReducer'

const rootReducer = combineReducers({
  kMap: kMapReducer
})

export default rootReducer
