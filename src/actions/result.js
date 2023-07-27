import { createAsyncThunk } from '@reduxjs/toolkit'

import config from './config'
let axios = config()

export const addResult = async data => {
  try {
    const resp = await axios.post('exp', data)
    console.log('result added', resp)
    return resp.data
  } catch (error) {
    console.log('Add result api error', error)
    return error
  }
}

export const getResult = createAsyncThunk('results', async thunkAPI => {
  let axios = config()
  try {
    const resp = await axios.get('exp')
    return resp.data
  } catch (error) {
    console.log('Get result api error', error)
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const deleteResult = async id => {
  try {
    const resp = await axios.delete(`exp/${id}`)
    getResult()
    return resp.data
  } catch (error) {
    console.log('Delete result api error', error)
    return error
  }
}

export const deleteAll = async () => {
  try {
    const resp = await axios.delete(`expression`)
    getResult()
    return resp.data
  } catch (error) {
    console.log('Delete all result api error', error)
    return error
  }
}
