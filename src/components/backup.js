import React, { useEffect, useRef } from 'react'
import { dia, shapes } from 'jointjs'
import createGates from './Gates'

const DiagramComponent = () => {
  const diagramRef = useRef(null)
  const expression = ` A'C' + BC' + A'D + ACD'`
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

  useEffect(() => {
    const graph = new dia.Graph()
    const paper = new dia.Paper({
      el: diagramRef.current,
      model: graph,
      width: 600,
      height: 400,
      background: {
        color: 'rgba(0, 255, 0, 0.3)'
      }
    })

    const gates = {}

    const parts = expression.split(' + ')
    let x = 50
    let y = 100

    parts.forEach(part => {
      let input, gate
      console.log('part', part) //this gives A'C'
      for (const element of part) {
        console.log('element', element)
        if (variables.includes(element)) {
          input = createGates('input', x, y + 25).input
          graph.addCell(input)
          x += 50
        } else {
          const gateType = part.includes("'") ? 'not' : 'and'
          gate = createGates(gateType, x, y).gateType
          console.log(gate)
          graph.addCell(gate)

          const wire = createWire(input, gate)

          graph.addCell(wire)
          x += 100
        }

        gates[part] = gate
      }

      x += 50
    })

    // Create the output gate
    const output = createGates('output', x, y).input
    graph.addCell(output)
    gates['output'] = output

    console.log('expression partision', parts)
    console.log('all gates', gates)

    // Connect the gates and wires
    /*
    parts.forEach(part => {
      const gate = gates[part]

      for (let i = 0; i < part.length; i++) {
        const element = part[i]
        if (variables.includes(element)) {
          const input = gates[element]
          const wire = createWire(input, gate)
          graph.addCell(wire)
        }
      }

      if (part.includes("'")) {
        const input = gates[part.replace("'", '')]
        const notGate = createGates(
          'not',
          gate.position().x,
          gate.position().y - 75
        )
        const notWire = createWire(gate, notGate)
        graph.addCell(notGate)
        graph.addCell(notWire)
      }
    })

    // Connect the last gate to the output gate
    const lastPart = parts[parts.length - 1]
    const lastGate = gates[lastPart]
    const outputWire = createWire(lastGate, output)
    graph.addCell(outputWire)
    */
  }, [])

  return <div ref={diagramRef} />
}

export default DiagramComponent
