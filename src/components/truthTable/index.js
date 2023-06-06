import React from 'react'
import useStyles from './styles'

import { decimalToBinary } from '../../services/common'
export default function TruthTable(props) {
  const classes = useStyles()

  const truthTable = []
  const variables = props.variables
  const variableCount = variables ? variables.length : 4

  let expresion = [2, 3, 5]
  let fValue = []

  const tableSize = Math.pow(2, variableCount)

  // truth table values
  for (let i = 0; i < tableSize; i++) {
    truthTable.push(i)
    // functional value
    expresion.includes(i) ? fValue.push(1) : fValue.push(0)
  }
  return (
    <div>
      <table border="1" className={classes.table}>
        <thead>
          <tr>
            {variables.map(variable =>
              <th key={variable}>
                {variable}
              </th>
            )}
            <th>F</th>
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
                <td key={index} className={classes.td}>
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
