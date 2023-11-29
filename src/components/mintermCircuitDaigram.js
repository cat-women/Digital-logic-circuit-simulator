import React, { useEffect, useRef, useState } from 'react'
import { dia } from 'jointjs'
import { useSelector } from 'react-redux'

import createGates from './Gates'
import { getIslands } from '../services/grouping'
import { createWire } from '../services/common'
import { useMethod } from '../context'


const DiagramComponent = () => {
  const { variables, booleanExpression, setBooleanExpression } = useMethod();

  const diagramRef = useRef(null)
  const { kMap, setkMap } = useSelector(state => state)

  useEffect(
    () => {
      if (!kMap.isNull) {
        const expression = getIslands(kMap.data, variables)
        setBooleanExpression(expression)
      }
    },
    [kMap]
  )
  useEffect(
    () => {
      createCircuit()
    },
    [booleanExpression]
  )

  function createCircuit() {
    if (booleanExpression === '1') return <h6>Diagram will be shown here</h6>

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
    const parts = booleanExpression?.split(' + ')
    let x = 50
    let y = 100
    const gates = {}

    parts?.forEach((part, index) => {
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

          elements.push(gate || input)
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

    const output = createGates('output', 900, 300).output
    graph.addCell(output)
    let finalWire

    const keys = Object.keys(gates)

    if (keys.length > 1) {
      const mainGate = createGates('or', 700, 300).or
      graph.addCell(mainGate)

      Object.values(gates).forEach(gate => {
        const wire = createWire(gate, mainGate)
        graph.addCell(wire)
      })

      finalWire = createWire(mainGate, output)
    } else finalWire = createWire(gates[keys[0]], output)

    graph.addCell(finalWire)
  }

  return <div ref={diagramRef} />
}

export default DiagramComponent
