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

export const addFunctionalExp = createAsyncThunk(
  'funcExp',
  async (exp, thunkAPI) => {
    try {
      return exp
    } catch (error) {
      console.log('Functional exp error:', error)
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
