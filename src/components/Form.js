import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Form(props) {
  const [inputValue, setInputValue] = useState('')

  const handleNewExpression = e => {
    const value = e.target.value
    setInputValue(value)
  }
  const handleExpression = () => {
    if (!inputValue.length) {
      alert('Enter a valid number')
      return false
    }

    const exp = inputValue.split(/[ ,]+/)
    const newExp = exp.filter((item, index) => exp.indexOf(item) === index)
    let isValid = true
    for (const element of newExp) {
      if (element > Math.pow(2, props.variables.length)) {
        alert('Invalid position for the given variable')
        isValid = false
        break
      }
    }

    if (isValid) {
      props.handleExpression(newExp)
    }

    return isValid
  }

  return (
    <div>
      <TextField
        id="standard-basic"
        label="Expression"
        variant="standard"
        value={inputValue}
        onChange={handleNewExpression}
      />
      <Button onClick={handleExpression}>Solve</Button>
    </div>
  )
}
