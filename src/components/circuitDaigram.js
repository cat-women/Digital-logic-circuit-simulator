import React, { useEffect, useRef, useState } from 'react'
import { dia } from 'jointjs'
import { useSelector, useDispatch } from 'react-redux'

import createGates from './Gates'
import { getIslands } from '../services/grouping'
import { createWire } from '../services/common'
import { addFunctionalExp } from '../actions'


function sopToPos(sop) {
  let pos = ''
  const terms = sop.split('+')
  terms.map(t => {
    pos += '('
    let temp = ''
    for (let i = 0; i < t.length; i++) {
      temp += t[i]
      t[i + 1] === `'` ? i++ : temp += `'`

      if (i !== t.length - 1)
        temp += '+'
    }
    pos += temp + ')'

  })
  return pos

}
const DiagramComponent = ({ variables, method }) => {
  const diagramRef = useRef(null)
  const { kMap, setkMap } = useSelector(state => state)
  const [exp, setExp] = useState('')
  variables = variables ? variables : ['A', 'B', 'C', 'D']


  //   For sop 
  let primaryGate = (method === 'pos') ? 'and' : 'or'
  let secondaryGate = (method === 'pos') ? "or" : 'and'

  const dispatch = useDispatch()

  useEffect(
    () => {
      if (!kMap.isNull) {
        const expression = getIslands(kMap.data, variables)
        setExp(expression)
        dispatch(addFunctionalExp(exp))
      }
    },
    [kMap]
  )
  useEffect(
    () => {
      createCircuit()
    },
    [exp]
  )

  function createCircuit() {
    const graph = new dia.Graph()
    new dia.Paper({
      el: diagramRef.current,
      model: graph,
      width: 1000,
      height: 1200,
      background: {
        color: 'rgba(255, 255, 255, 0.8)'
      }
    })
    const parts = exp.split(' + ')
    let x = 50
    let y = 100
    const gates = {}

    parts.forEach((part, index) => {
      let input = null
      let gate = null
      let wire = null
      let elements = []

      for (let i = 0; i < part.length; i++) {
        const el = part[i]

        if (variables.includes(el)) {
          gate = null
          input = createGates(el, x - 25, y).input
          graph.addCell(input)

          // POS
          if (method = 'pos' && part[i + 1] !== `'`) {
            if (input) gate = createGates(`${input.id}not`, x + 100, y).not
            else gate = createGates(`not`, x + 100, y).not
            graph.addCell(gate)

            if (input && gate) {
              wire = createWire(input, gate)
              graph.addCell(wire)
            }
          }

          // SOP          
          if (method === 'sop' && part[i + 1] === `'`) {
            if (input) gate = createGates(`${input.id}not`, x + 100, y).not
            else gate = createGates(`not`, x + 100, y).not
            graph.addCell(gate)

            if (input && gate) {
              wire = createWire(input, gate)
              graph.addCell(wire)
            }
            i++
          }

          elements.push(gate || input)
        }
        y += 100
      }
      if (elements.length > 1) {
        let ids = []
        elements.forEach(element => {
          ids.push(element.id)
        })
        gate = createGates(`${ids}`, x + 300, y - 150)[primaryGate]
        graph.addCell(gate)

        for (let i = 0; i < elements.length; i++) {
          wire = createWire(elements[i], gate)
          graph.addCell(wire)
        }
      }
      if (input && !gate) {
        gate = input
      }

      gates[part] = gate
    })

    const output = createGates('output', 900, 300).output
    graph.addCell(output)
    let finalWire

    const keys = Object.keys(gates)

    if (keys.length > 1) {
      const orGate = createGates('or', 700, 300)[secondaryGate]
      graph.addCell(orGate)

      Object.values(gates).forEach(gate => {
        const wire = createWire(gate, orGate)
        graph.addCell(wire)
      })

      finalWire = createWire(orGate, output)
    } else finalWire = createWire(gates[keys[0]], output)

    graph.addCell(finalWire)
  }
  if (exp === '1') return <h6>Diagram will be shown here</h6>

  return <div ref={diagramRef} />
}

export default DiagramComponent
