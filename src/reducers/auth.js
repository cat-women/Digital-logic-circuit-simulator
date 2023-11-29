import { createSlice } from '@reduxjs/toolkit'

import { signIn } from '../actions/auth'

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending]: state => {
      state.isLoggedIn = false
    },
    [signIn.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.result
    },
    [signIn.rejected]: (state, action) => {
      state.isLoggedIn = false
      state.error = action.payload.msg
    }
  }
})

export default authSlice.reducer
