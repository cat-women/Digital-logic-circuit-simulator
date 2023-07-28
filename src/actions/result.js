import { createAsyncThunk } from '@reduxjs/toolkit'

import config, { clearSession } from './config'
let axios = config()

export const addResult = async data => {
  try {
    const resp = await axios.post('exp', data)
    console.log('result added', resp)
    return resp.data
  } catch (error) {
    if (error.response.status === 401) clearSession()

    console.log('Add result api error', error)
    return error
  }
}

export const getResult = createAsyncThunk('results', async thunkAPI => {
  let axios = config()
  try {
    const resp = await axios.get('exp')
    console.log(resp.data)
    return resp.data
  } catch (error) {
    if (error.response.status === 401) clearSession()
    console.log('Get result api error', error.response)
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const deleteResult = async id => {
  try {
    const resp = await axios.delete(`exp/${id}`)
    return resp
  } catch (error) {
    if (error.response.status === 401) clearSession()

    console.log('Delete result api error', error)
    return error
  }
}

export const deleteAll = async () => {
  try {
    const resp = await axios.delete(`exp/all`)
    return resp.data
  } catch (error) {
    if (error.response.status === 401) clearSession()

    console.log('Delete all result api error', error)
    return error
  }
}
