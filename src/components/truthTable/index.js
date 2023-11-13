import React from 'react'
import useStyles from './styles'

import { decimalToBinary } from '../../services/common'
export default function TruthTable(props) {
  const classes = useStyles()

  const truthTable = []
  const variables = props.variables //[('A', 'B', 'C', 'D', 'E', 'F')]
  const variableCount = variables ? variables.length : 4

  let expresion = props.expression.map(item => Number(item))
  let fValue = []

  const tableSize = Math.pow(2, variableCount)

  // truth table values
  for (let i = 0; i < tableSize; i++) {
    truthTable.push(i)
    // functional value
    // for sop 
    if (props.method === 'sop')
      expresion.includes(i) ? fValue.push(1) : fValue.push(0)
    if (props.method === 'pos')
      expresion.includes(i) ? fValue.push(0) : fValue.push(1)


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
                {/* if its in minterm i.e sop highlight 1 else if its in maxterm highlight 0 */}
                {props.method === 'sop' ?
                  <td
                    key={index}
                    td
                    className={`${classes.td} ${fValue[index] === 0
                      ? classes.tdGray
                      : classes.tdGreen}`}
                  >
                    {fValue[index]}
                  </td>
                  :
                  <td
                    key={index}
                    td
                    className={`${classes.td} ${fValue[index] === 0
                      ? classes.tdGreen
                      : classes.tdGray}`}
                  >
                    {fValue[index]}
                  </td>
                }
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
