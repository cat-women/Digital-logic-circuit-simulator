import { createAsyncThunk } from '@reduxjs/toolkit'
import config from './config'
const axios = config()

export const signUp = async data => {
  try {
    const resp = await axios.post('user/signup', data)
    return resp.data
  } catch (error) {
    console.log('signup api error', error)
    return error
  }
}

export const signIn = createAsyncThunk('auth', async (data, thunkAPI) => {
  try {
    const resp = await axios.post('user/signin', data)
    
   if (resp.data) {
      sessionStorage.setItem('user', JSON.stringify(resp.data))
      localStorage.setItem('user', JSON.stringify(resp.data))
    }
    return resp.data
  } catch (error) {
    console.log('signin api error', error)
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const signOut = () => {
  localStorage.removeItem('user')
  sessionStorage.removeItem('user')
}
