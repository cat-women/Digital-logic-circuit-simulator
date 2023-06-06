import React, { useEffect, useState } from 'react'
import useStyles from './styles'

import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addKMap } from '../../actions'

import {
  decimalToBinary,
  binaryToGray,
  threeVariables
} from '../../services/common'

/**Material UI components */
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default function Kmap(props) {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [positionalArray, setPositionalArray] = useState([])
  const [kMapValue, setKMapValue] = useState([])

  const classes = useStyles()
  let variables = props.variables
  let expression = props.expresion
  let variableCount = variables.length

  let rowElement = variables.slice(0, Math.floor(variables.length / 2))
  let colElement = variables.slice(Math.floor(variables.length / 2))

  let rowElementBitSize = Math.pow(2, rowElement.length)
  let colElementBitSize = Math.pow(2, colElement.length)

  const tableSize = Math.pow(2, variableCount)

  // get kmap positional array
  function getKmapPositionalArray(tableSize) {
    let temp = []
    for (let i = 0; i < tableSize; i++) {
      let graycode = binaryToGray(decimalToBinary(i, variableCount))
      temp.push(graycode)
    }
    setPositionalArray(temp)
  }

  function getKMapValue(rowElementBitSize, tableSize) {
    let newKMap = []
    let kmapIndex = 0

    expression.forEach(item => {
      const key = threeVariables[item]
      if (!newKMap[key[0]]) newKMap[key[0]] = []
      newKMap[key[0]][key[1]] = 1
    })

    for (let j = 0; j < rowElementBitSize; j++)
      for (let i = 0; i < colElementBitSize; i++)
        if (newKMap[j][i] !== 1) newKMap[j][i] = 0

    setKMapValue(newKMap)
    return newKMap
  }

  useEffect(() => {
    getKMapValue(rowElementBitSize, tableSize)
    getKmapPositionalArray(tableSize)
  }, [])

  console.log('positionalArray', positionalArray)

  useEffect(
    () => {
      dispatch(addKMap({ kMapValue, rowElement, colElement }))
    },
    [kMapValue]
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
            <th>00</th>
            <th>01</th>
            <th>11</th>
            <th>10</th>
          </tr>
        </thead>
        <tbody>
          {colElement.map((key, index) => {
            return (
              <tr key={index}>
                <td className={classes.td}>
                  {rowElement[index]}
                </td>
                <th className={classes.td}>
                  {index}
                </th>

                {kMapValue[index].map((value, subIndex) => {
                  return (
                    <td className={classes.td} key={subIndex}>
                      {kMapValue[index][subIndex]}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
}
