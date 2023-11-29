import { createAsyncThunk } from '@reduxjs/toolkit'
import config from './config'
const axios = config()

export const signUp = async data => {
  try {
    const resp = await axios.post('user/signup', data)
    console.log("in action", resp)
    return resp
  } catch (error) {
    console.log('signup api error', error)
    return error.response
  }
}

// export const signIn = createAsyncThunk('auth', async (data, thunkAPI) => {
//   try {
//     const resp = await axios.post('user/signin', data)

//    if (resp.data) {
//       sessionStorage.setItem('user', JSON.stringify(resp.data))
//       localStorage.setItem('user', JSON.stringify(resp.data))
//     }
//     return resp.data
//   } catch (error) {
//     console.log('signin api error', error)
//     return thunkAPI.rejectWithValue(error.response)
//   }
// })

export const signIn = async (data) => {
  try {
    const resp = await axios.post('user/signin', data)
    if (resp.data) {
      sessionStorage.setItem('user', JSON.stringify(resp.data))
      localStorage.setItem('user', JSON.stringify(resp.data))
    }
    return resp
  } catch (error) {
    console.log('signin api error', error)
    return error.response
  }
}

export const signOut = () => {
  localStorage.removeItem('user')
  sessionStorage.removeItem('user')
}
