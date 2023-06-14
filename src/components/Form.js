import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

export default function Form(props) {
  const [inputValue, setInputValue] = useState('')

  const handleNewExpression = e => {
    const value = e.target.value
    setInputValue(value)
  }
  const handlelExpression = () => {
    if (!inputValue || inputValue.length > 0) {
      const exp = inputValue.split(/[ ,]+/)
      const newExp = exp.filter((item, index) => exp.indexOf(item) === index)
      props.handlelExpression(newExp)
      return
    }
    alert('Enter valid Number')
    return
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
      <Button onClick={handlelExpression}>Solve</Button>
    </div>
  )
}
