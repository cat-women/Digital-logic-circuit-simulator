import React, { useEffect, useRef } from 'react'
import { dia, shapes } from 'jointjs'

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

    // Create the AND gate
    const andGate = new shapes.logic.Or({
      position: { x: 200, y: 200 },
      size: { width: 100, height: 50 },
      attrs: {
        '.label': {
          text: 'OR',
          'ref-x': 0.5,
          'ref-y': 0.5,
          'y-alignment': 'middle',
          'x-alignment': 'middle'
        }
      }
    })

    graph.addCell(andGate)

    // Create the input circles
    const input1 = new shapes.basic.Circle({
      position: { x: 50, y: 100 },
      size: { width: 20, height: 20 },
      attrs: {
        circle: { fill: 'red' }
      },
      ports: { groups: { in: { id: 'in1' } } }
    })

    const input2 = new shapes.basic.Circle({
      position: { x: 50, y: 150 },
      size: { width: 20, height: 20 },
      attrs: {
        circle: { fill: 'blue' }
      },
      ports: { groups: { in: { id: 'in2' } } }
    })

    graph.addCell(input1)
    graph.addCell(input2)

    // Create the wires
    const wire1 = new shapes.standard.Link({
      source: { id: input1.id, port: 'in' },
      target: { id: andGate.id, port: 'in1' },
      attrs: {
        line: {
          strokeWidth: 2,
          stroke: 'black'
        }
      }
    })

    const wire2 = new shapes.standard.Link({
      source: { id: input2.id, port: 'in' },
      target: { id: andGate.id, port: 'in2' },
      attrs: {
        line: {
          strokeWidth: 2,
          stroke: 'black'
        }
      }
    })

    graph.addCell(wire1)
    graph.addCell(wire2)
  }, [])

  return <div ref={diagramRef} />
}

export default DiagramComponent
