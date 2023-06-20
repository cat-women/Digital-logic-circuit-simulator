import { createSlice } from '@reduxjs/toolkit'
import { addFunctionalExp } from '../actions'

const initialState = {
  exp: '',
  isNull: true
}

const expSlice = createSlice({
  name: 'funcExp',
  initialState,
  reducers: {},
  extraReducers: {
    [addFunctionalExp.pending]: state => {
      state.isNull = true
    },
    [addFunctionalExp.fulfilled]: (state, action) => {
      state.isNull = false
      state.exp = action.payload
    },
    [addFunctionalExp.rejected]: state => {
      state.isNull = true
    }
  }
})

export default expSlice.reducer



