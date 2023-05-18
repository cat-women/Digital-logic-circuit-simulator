import React, { useEffect, useRef } from 'react'
import { dia, shapes } from 'jointjs'
import createGates from './Gates'

const DiagramComponent = () => {
  const diagramRef = useRef(null)
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

    const andGate = createGates('and', 200, 100).and
    const input1 = createGates('in1', 50, 100).input
    const input2 = createGates('in2', 50, 150).input
    const output = createGates('output', 400, 100).output

    graph.addCell(andGate)

    graph.addCell(input1)
    graph.addCell(input2)
    graph.addCell(output)

    // Create the wires
    const wire1 = new shapes.standard.Link({
      source: { id: input1.id, port: input1.id },
      target: { id: andGate.id, port: andGate.id },
      attrs: {
        line: {
          strokeWidth: 2,
          stroke: 'black'
        }
      }
    })

    const wire2 = new shapes.standard.Link({
      source: { id: input2.id, port: input2.id },
      target: { id: andGate.id, port: andGate.id },
      attrs: {
        line: {
          strokeWidth: 2,
          stroke: 'black'
        }
      }
    })

    graph.addCell(wire1)
    graph.addCell(wire2)

    const outputWire = new shapes.standard.Link({
      source: { id: andGate.id, port: andGate.id },
      target: { id: output.id, port: output.id }
    })
    graph.addCell(outputWire)
  }, [])

  return <div ref={diagramRef} />
}

export default DiagramComponent
