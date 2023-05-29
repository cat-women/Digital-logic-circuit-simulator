import React, { useEffect, useRef } from 'react'
import { dia, shapes } from 'jointjs'
import createGates from './Gates'

const DiagramComponent = () => {
  const diagramRef = useRef(null)
  const expression = ` A'C' + BC' + A'D`
  const variables = ['A', 'B', 'C', 'D']

  const createWire = (source, target) => {
    const wire = new shapes.standard.Link({
      source: { id: source.id, port: source.id },
      target: { id: target.id, port: target.id },
      attrs: {
        line: { strokeWidth: 2, stroke: 'black' }
      }
    })

    return wire
  }

  const graph = new dia.Graph()
  const paper = new dia.Paper({
    el: diagramRef.current,
    model: graph,
    width: 1000,
    height: 700,
    background: {
      color: 'rgba(0, 255, 0, 0.3)'
    }
  })

  useEffect(() => {
    const parts = expression.split(' + ')
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
        for (let i = 0; i < elements.length; i++) {
          gate = createGates(`${elements[0].id}-and`, x + 300, y - 150).and
          graph.addCell(gate)

          wire = createWire(elements[i], gate)
          graph.addCell(wire)
          wire = createWire(elements[i + 1], gate)
          graph.addCell(wire)
          i++
        }
      }
      if (input && !gate && !andGate) {
        gate = input
      }
      if (andGate) gate = andGate

      gates[part] = gate
    })


    const orGate = createGates('or', x + 400, y).or
    graph.addCell(orGate)

    Object.values(gates).forEach(gate => {
      console.log('gates child', gate)
      const wire = createWire(gate, orGate)
      graph.addCell(wire)
    })

    const output = createGates('output', 800, 300).output
    graph.addCell(output)

    const finalWire = createWire(orGate, output)
    graph.addCell(finalWire)
  }, [])

  return <div ref={diagramRef} />
}

export default DiagramComponent
