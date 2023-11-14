import React, { useEffect, useRef, useState } from 'react'
import { dia } from 'jointjs'
import { useSelector, useDispatch } from 'react-redux'

import createGates from './Gates'
import { getIslands } from '../services/grouping'
import { createWire } from '../services/common'
import { addFunctionalExp } from '../actions'
import { useMethod } from '../context'


const DiagramComponent = ({ variables }) => {
     const diagramRef = useRef(null)
     const { kMap, setkMap } = useSelector(state => state)
     const [exp, setExp] = useState('')
     variables = variables ? variables : ['A', 'B', 'C', 'D']

     const { method } = useMethod()
     const dispatch = useDispatch()

     useEffect(
          () => {
               if (!kMap.isNull) {
                    const expression = getIslands(kMap.data, variables, method)
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
          const parts = exp.split(')')
          let x = 50
          let y = 100
          const gates = {}

          parts.forEach((part, index) => {
               if (!part.length) return

               let input = null
               let gate = null
               let wire = null
               let elements = []

               for (let i = 0; i < part.length; i++) {
                    const el = part[i]
                    if (el === '(' || el === ')' || el === '+') continue

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
                    // Gate connecting each variable in each islands 
                    gate = createGates(`${ids}`, x + 300, y - 150).or
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
               const mainGate = createGates('and', 700, 300).and
               graph.addCell(mainGate)

               Object.values(gates).forEach(gate => {
                    const wire = createWire(gate, mainGate)
                    graph.addCell(wire)
               })

               finalWire = createWire(mainGate, output)
          } else finalWire = createWire(gates[keys[0]], output)

          graph.addCell(finalWire)
     }
     if (exp === '1') return <h6>Diagram will be shown here</h6>

     return <div ref={diagramRef} />
}

export default DiagramComponent
