import React, { useEffect, useRef, useState } from 'react'
import { dia, shapes } from 'jointjs'
import { useSelector } from 'react-redux'

import createGates from './Gates'
import { getIslands } from '../services/grouping'
import { createWire } from '../services/common'

const DiagramComponent = () => {
  const diagramRef = useRef(null)
  const { kMap, setkMap } = useSelector(state => state)
  const [exp, setExp] = useState([])

  // const expression = `A'C' + BC' + A'D + ACD'`
  const variables = ['A', 'B', 'C', 'D']
  useEffect(
    () => {
      if (!kMap.isNull) setExp(getIslands(kMap.data))
    },
    [kMap]
  )

  console.log('expression from grouping ', exp)

  useEffect(
    () => {
      createCircuit()
    },
    [exp]
  )

  function createCircuit() {
    if (exp.length < 1) return

    const graph = new dia.Graph()
    const paper = new dia.Paper({
      el: diagramRef.current,
      model: graph,
      width: 1000,
      height: 1500,
      background: {
        color: 'rgba(0, 255, 0, 0.3)'
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
      let andGate = null
      for (let i = 0; i < part.length; i++) {
        const el = part[i]
        if (variables.includes(el)) {
          gate = null
          input = createGates(el, x - 25, y).input
          graph.addCell(input)

          if (part[i + 1] === `'`) {
            if (input) gate = createGates(`${input.id}not`, x + 100, y).not
            else gate = createGates(`not`, x + 100, y).not
            graph.addCell(gate)

            if (input && gate) {
              wire = createWire(input, gate)
              graph.addCell(wire)
            }
            i++
          }
          elements.push(gate ? gate : input)
        }
        y += 100
      }
      if (elements.length > 1) {
        let ids = []
        elements.forEach(element => {
          ids.push(element.id)
        })
        gate = createGates(`${ids}`, x + 300, y - 150).and
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
    const orGate = createGates('or', 700, 300).or
    graph.addCell(orGate)

    Object.values(gates).forEach(gate => {
      const wire = createWire(gate, orGate)
      graph.addCell(wire)
    })

    const output = createGates('output', 900, 300).output
    graph.addCell(output)

    const finalWire = createWire(orGate, output)
    graph.addCell(finalWire)
  }

  return <div ref={diagramRef} />
}

export default DiagramComponent
