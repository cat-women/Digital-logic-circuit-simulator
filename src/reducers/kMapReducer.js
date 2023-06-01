import { createSlice } from '@reduxjs/toolkit'
import { addKMap } from '../actions'

const initialState = {
  data: [],
  isNull: true
}

const KMapSlice = createSlice({
  name: 'kMap',
  initialState,
  reducers: {},
  extraReducers: {
    [addKMap.pending]: state => {
      state.isNull = true
    },
    [addKMap.fulfilled]: (state, action) => {
      state.isNull = false
      state.data = action.payload
    },
    [addKMap.rejected]: state => {
      state.isNull = true
    }
  }
})

export default KMapSlice.reducer
