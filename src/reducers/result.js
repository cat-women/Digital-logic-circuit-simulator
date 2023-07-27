import { createSlice } from '@reduxjs/toolkit'

import { getResult } from '../actions/result'

const initialState = {
  data: null,
  isLoading: true
}

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {},
  extraReducers: {
    [getResult.pending]: state => {
      state.isLoading = true
    },
    [getResult.fulfilled]: (state, action) => {
      state.isLoading = false
      state.data = action.payload
    },
    [getResult.rejected]: state => {
      state.isLoading = true
    }
  }
})

export default resultsSlice.reducer
