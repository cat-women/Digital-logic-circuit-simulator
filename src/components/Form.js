import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'

import { getResult, addResult } from '../actions/result'

import { useMethod } from '../context'

export default function Form() {
  const [inputValue, setInputValue] = useState('')
  const { setUserExpression, variables, userExpression, user, booleanExpression, userHistory, setUserHistory } = useMethod()

  const dispatch = useDispatch()

  const handleNewExpression = e => {
    const value = e.target.value
    setInputValue(value)
  }
  const handleExpression = async () => {
    if (!inputValue.length) {
      alert('Enter a valid number')
      setInputValue('')
      dispatch(getResult())
      return false
    }

    const exp = inputValue.split(/[ ,]+/)
    const newExp = exp.filter((item, index) => exp.indexOf(item) === index)
    let isValid = true

    for (const element of newExp) {
      if (element >= Math.pow(2, variables.length)) {
        alert('Invalid position for the given variable')
        setInputValue('')
        isValid = false
        break
      }
    }

    if (isValid) {
      setUserExpression(newExp)

      // save sovled expresssion 
      if (user && booleanExpression)
        await addResult({ input: newExp, expression: booleanExpression })
    }

    return isValid
  }

  return (
    <div>
      <TextField
        id='standard-basic'
        variant='standard'
        label={JSON.stringify(userExpression)}
        value={inputValue}
        onChange={handleNewExpression}
      />
      <Button onClick={handleExpression}>Solve</Button>
    </div>
  )
}
