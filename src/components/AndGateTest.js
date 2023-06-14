import React, { useEffect } from 'react'
import { dia, shapes } from 'jointjs'

const DiagramComponent = () => {
  useEffect(() => {
    const initializeDiagram = () => {
      // Create a new graph
      const graph = new dia.Graph()

      // Create a new paper to render the graph
      const paper = new dia.Paper({
        el: document.getElementById('diagram-container'),
        model: graph,
        width: 600,
        height: 400,
        gridSize: 1
      })

      // Create an AND gate
      const andGate = new shapes.logic.And({
        position: {
          x: 200,
          y: 150
        }
      })

      // Create input and output shapes
      const input1 = new shapes.logic.Input({
        position: {
          x: 50,
          y: 100
        },
        attrs: {
          circle: {
            fill: 'red'
          }
        }
      })

      const input2 = new shapes.logic.Input({
        position: {
          x: 50,
          y: 200
        },
        attrs: {
          circle: {
            fill: 'red'
          }
        }
      })

      const output = new shapes.logic.Output({
        position: {
          x: 350,
          y: 150
        }
      })

      // Add the shapes to the graph
      graph.addCells([andGate, input1, input2, output])

      // Create a link between the inputs and the AND gate
      const link1 = new shapes.standard.Link({
        source: {
          id: input1.id
        },
        target: {
          id: andGate.id,
          port: 'in1'
        }
      })

      const link2 = new shapes.standard.Link({
        source: {
          id: input2.id
        },
        target: {
          id: andGate.id,
          port: 'in2'
        }
      })

      // Add the links to the graph
      graph.addCells([link1, link2])

      // Handle click events on input shapes
      input1.on('change:signal', (shape, signal) => {
        // Update the link signal when the input signal changes
        link1.attr('line/stroke', signal ? 'green' : 'red')
        // Update the output signal based on the input signals
        const outputSignal = input1.get('signal') && input2.get('signal')
        output.attr('circle/fill', outputSignal ? 'green' : 'red')
      })

      input2.on('change:signal', (shape, signal) => {
        // Update the link signal when the input signal changes
        link2.attr('line/stroke', signal ? 'green' : 'red')
        // Update the output signal based on the input signals
        const outputSignal = input1.get('signal') && input2.get('signal')
        output.attr('circle/fill', outputSignal ? 'green' : 'red')
      })

      // Function to toggle the input signal on click
      const toggleSignal = input => {
        const currentSignal = input.get('signal')
        input.set('signal', !currentSignal)
      }

      // Bind click events to input shapes
      input1.on('element:pointerclick', evt => {
        if (evt.target.getAttribute('fill') === 'red') {
          input1.set('signal', true)
          evt.target.setAttribute('fill', 'green')
        } else {
          input1.set('signal', false)
          evt.target.setAttribute('fill', 'red')
        }
      })

      input2.on('element:pointerclick', evt => {
        if (evt.target.getAttribute('fill') === 'red') {
          input2.set('signal', true)
          evt.target.setAttribute('fill', 'green')
        } else {
          input2.set('signal', false)
          evt.target.setAttribute('fill', 'red')
        }
      })
    }

    initializeDiagram()
  }, [])

  return <div id="diagram-container" />
}

export default DiagramComponent
