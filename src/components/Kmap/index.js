import React, { useEffect, useState } from 'react'
import useStyles from './styles'

import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addKMap } from '../../actions'

import {
  decimalToBinary,
  binaryToGray,
  getKmapPositionalArray
} from '../../services/common'

import {
  twoVariables,
  threeVariables,
  fourVariables,
  fiveVariables,
  sixVariables
} from '../../services/mapping'


import { useMethod } from '../../context'

export default function Kmap() {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [positionalArray, setPositionalArray] = useState([])

  const { method, userExpression, variables } = useMethod()

  // const [kMapValue, setKMapValue] = useState([])

  const classes = useStyles()
  let variableCount = variables.length
  let rowElement = variables.slice(0, Math.floor(variables.length / 2))
  let colElement = variables.slice(Math.floor(variables.length / 2))
  let rowElementBitSize = Math.pow(2, rowElement.length)
  let colElementBitSize = Math.pow(2, colElement.length)

  const rowBits = []
  const colBits = []

  /** Set row can col bits  */
  for (let i = 0; i < rowElementBitSize; i++)
    rowBits.push(binaryToGray(decimalToBinary(i, rowElement.length)))

  for (let i = 0; i < colElementBitSize; i++)
    colBits.push(binaryToGray(decimalToBinary(i, colElement.length)))

  let kMapValue = []
  let kmapIndex = 0
  switch (variableCount) {
    case 2:
      userExpression.forEach(item => {
        const key = twoVariables[item]
        if (!kMapValue[key[0]]) kMapValue[key[0]] = []
        kMapValue[key[0]][key[1]] = 1
      })
      break
    case 3:
      userExpression.forEach(item => {
        const key = threeVariables[item]
        if (!kMapValue[key[0]]) kMapValue[key[0]] = []
        kMapValue[key[0]][key[1]] = 1
      })
      break
    case 4:
      userExpression.forEach(item => {
        const key = fourVariables[item]
        if (!kMapValue[key[0]]) kMapValue[key[0]] = []
        kMapValue[key[0]][key[1]] = 1
      })
      break
    case 5:
      userExpression.forEach(item => {
        const key = fiveVariables[item]
        if (!kMapValue[key[0]]) kMapValue[key[0]] = []
        kMapValue[key[0]][key[1]] = 1
      })
      break
    case 6:
      userExpression.forEach(item => {
        const key = sixVariables[item]
        if (!kMapValue[key[0]]) kMapValue[key[0]] = []
        kMapValue[key[0]][key[1]] = 1
      })
      break
    default:
      break
  }

  for (let j = 0; j < rowElementBitSize; j++) {
    if (!kMapValue[j]) kMapValue[j] = []
    for (let i = 0; i < colElementBitSize; i++)
      if (kMapValue[j][i] !== 1) kMapValue[j][i] = 0
  }
  const handleClick = (i, j) => {
    console.log('click', i, j, kMapValue[i][j])
    kMapValue[i][j] = (kMapValue[i][j] = 1) ? 0 : 1
  }
  useEffect(
    () => {
      // setKMapValue(getKMapValue(rowElementBitSize, tableSize))
      // get kmap positional array
      if (rowBits.length > 0 && colBits.length > 0)
        setPositionalArray(getKmapPositionalArray(rowBits, colBits))
    },
    [variables]
  )

  useEffect(
    () => {
      dispatch(addKMap({ kMapValue, rowElement, colElement }))
    },
    [userExpression, variables]
  )
  return kMapValue.length < 1
    ? <h6> Kmap Table</h6>
    : <table border="1" className={classes.table}>
      <thead>
        <tr>
          <th />
          <th colSpan="5">
            {colElement.map(key => key)}
          </th>
        </tr>
        <tr>
          <th />
          <th />
          {colBits.map(bit =>
            <th
              key={bit}
              className={` ${bit === 4 ? classes.doubleDarkBorder : ''}`}
            >
              {bit}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {rowBits.map((key, index) => {
          return (
            <tr key={index}>
              {index === 0 &&
                <th className={classes.td} rowSpan={rowElementBitSize}>
                  {rowElement}
                </th>}
              <th className={classes.td}>
                {key}
              </th>

              {kMapValue[index].map((value, subIndex) => {
                return (
                  <td
                    className={`${classes.td}  ${isActive(kMapValue[index][subIndex], method)
                      ? classes.tdGreen
                      : classes.tdGray}

                        ${index === 4 ? classes.top : ''}

                        ${subIndex === 4 ? classes.left : ''}
  
                        `}
                    key={subIndex}
                  >
                    <button
                      className={`${classes.button} ${isActive(kMapValue[index][subIndex], method)
                        ? classes.tdGreen
                        : classes.tdGray}`}
                      key={subIndex}
                      onClick={() => handleClick(index, subIndex)}
                    >
                      {method === 'pos' && (kMapValue[index][subIndex] === 1 ? 0 : 1)}
                      {method === 'sop' && kMapValue[index][subIndex]}
                    </button>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
}

function isActive(value, method) {
  if (value) return true
  return false
}