import React from 'react'
import useStyles from './styles'
import { useMethod } from '../../context'

import { decimalToBinary } from '../../services/common'
import { Typography } from '@mui/material'
export default function TruthTable() {
  const classes = useStyles()

  const truthTable = []
  const { variables, method, userExpression } = useMethod()

  const variableCount = variables ? variables.length : 4

  let expresion = userExpression.map(item => Number(item))
  let fValue = []

  const tableSize = Math.pow(2, variableCount)

  // truth table values
  for (let i = 0; i < tableSize; i++) {
    truthTable.push(i)
    // functional value
    // for sop 
    if (method === 'pos')
      expresion.includes(i) ? fValue.push(0) : fValue.push(1)
    if (method === 'sop') {
      expresion.includes(i) ? fValue.push(1) : fValue.push(0)
    }


  }
  return (
    <div>
      <table border="1" className={classes.table}>
        <thead>
          <tr>
            {variables.map(variable =>
              <th key={variable} className={classes.th}>
                {variable}
              </th>
            )}
            <th className={classes.th}>F</th>
          </tr>
        </thead>
        <tbody>
          {truthTable.map((decimalNumber, index) => {
            const binary = decimalToBinary(decimalNumber, variableCount)
            return (
              <tr key={decimalNumber}>
                {binary.split('').map((bit, index) =>
                  <td key={index} className={classes.td}>
                    {bit}
                  </td>
                )}
                <td
                  key={index}
                  className={`${isActive(fValue[index], method) 
                    ? classes.tdGreen
                    : classes.tdGray} ${classes.td}` }
                >
                  {fValue[index]}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function isActive(value, method) {
  if (value && method ==='sop') return true
  if (!value && method ==='pos') return true

  return false
}