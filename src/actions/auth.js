import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = 'http://localhost:8000/'
axios.defaults.baseURL = url

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
    console.log(resp)
    if (resp.data) {
      localStorage.setItem('user', JSON.stringify(resp.data))
      sessionStorage.setItem('user', JSON.stringify(resp.data))
    }
    return resp.data
  } catch (error) {
    console.log('signin api error', error)
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const signOut = createAsyncThunk('auth', async () => {
  localStorage.removeItem('user')
  sessionStorage.removeItem('user')
})
