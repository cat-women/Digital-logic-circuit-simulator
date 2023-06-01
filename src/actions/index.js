import { createAsyncThunk } from '@reduxjs/toolkit'

export const addKMap = createAsyncThunk('kMap', (data, thunkAPI) => {
  try {
    return data
  } catch (error) {
    console.log('KMap add error', error)
    return thunkAPI.rejectWithValue(error.message)
  }
})

export const deleteKMap = createAsyncThunk('kMap', (id, thunkAPI) => {
  try {
    return id
  } catch (error) {
    console.log('kMap delete error', error)
    return thunkAPI.rejectWithValue(error.message)
  }
})
