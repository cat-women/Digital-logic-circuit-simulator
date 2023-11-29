import { createSlice } from '@reduxjs/toolkit'

import { getResult, deleteResult, deleteAll } from '../actions/result'

const initialState = {
  data: null,
  isLoading: true,
  error: null
}

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getResult.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload
      })
      .addCase(deleteResult.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(deleteResult.fulfilled, (state, action) => {
        const newData = state.data.filter(result => result._id !== action.payload.exp._id);
        state.data = newData
        state.isLoading = false
      })
      .addCase(deleteResult.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload
      })
      .addCase(deleteAll.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(deleteAll.fulfilled, (state, action) => {
        return {
          ...state,
          data: [],
          isLoading: false
        };
      })
      .addCase(deleteAll.rejected, (state, action) => {
        state.isLoading = true;
        state.error = action.payload
      });
  },
})

export default resultsSlice.reducer
