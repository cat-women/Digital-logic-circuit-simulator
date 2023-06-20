import { combineReducers } from 'redux'

import kMapReducer from './kMapReducer'
import expressionReducer from './expressionReducer'

const rootReducer = combineReducers({
  kMap: kMapReducer,
  expression: expressionReducer
})

export default rootReducer
