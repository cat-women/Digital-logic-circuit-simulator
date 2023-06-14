import React, { useEffect, useRef } from 'react'
import { dia, shapes, g, V, util } from 'jointjs'

const LogicGateDiagram = () => {
  const paperRef = useRef(null)

  useEffect(() => {
    let current = 0
    const graph = new dia.Graph()
    const paper = new dia.Paper({
      el: paperRef.current,
      model: graph,
      width: 1000,
      height: 600,
      gridSize: 5,
      snapLinks: true,
      linkPinning: false,
      defaultLink: new shapes.logic.Wire(),
      validateConnection: function(vs, ms, vt, mt, e, vl) {
        if (e === 'target') {
          // target requires an input port to connect
          if (
            !mt ||
            !mt.getAttribute('class') ||
            mt.getAttribute('class').indexOf('input') < 0
          )
            return false

          // check whether the port is being already used
          var portUsed = this.model.getLinks().some(function(link) {
            return (
              link.id !== vl.model.id &&
              link.get('target').id === vt.model.id &&
              link.get('target').port === mt.getAttribute('port')
            )
          })

          return !portUsed
        } else {
          // e === 'source'

          // source requires an output port to connect
          return (
            ms &&
            ms.getAttribute('class') &&
            ms.getAttribute('class').indexOf('output') >= 0
          )
        }
      }
    })

    paper.scale(1.5, 1.5)

    function toggleSignal(element) {
      const currentValue = element.attr('signal')
      const newSignal = currentValue === 0 ? 1 : 0
      element.attr('signal', newSignal)

      const connectedLinks = graph.getConnectedLinks(element, {
        outbound: true
      })
      connectedLinks.forEach(link => {
        link.attr('signal', newSignal)
        const targetElement = link.getTargetElement()
        if (targetElement) {
          toggleSignal(targetElement)
        }
      })
    }

    function broadcastSignal(gate, signal) {
      // ... broadcastSignal implementation ...
      setTimeout(function() {
        util.invoke(
          graph.getConnectedLinks(gate, {
            outbound: true
          }),
          'set',
          'signal',
          signal
        )
      }, 0)
    }

    function initializeSignal() {
      // ... initializeSignal implementation ...
      var signal = Math.random()
      // > 0 wire with a positive signal is alive
      // < 0 wire with a negative signal means, there is no signal
      // 0 none of the above - reset value

      // cancel all signals stores in wires
      util.invoke(graph.getLinks(), 'set', 'signal', 0)

      // remove all 'live' classes
      V(paper.viewport).find('.live').forEach(function(vel) {
        vel.removeClass('live')
      })

      graph.getElements().forEach(function(element) {
        // broadcast a new signal from every input in the graph
        if (element instanceof shapes.logic.Input) {
          broadcastSignal(element, signal)
        }
      })

      return signal
    }

    // ... Gate prototypes and other functions ...

    // diagram setup
    const gates = {
      repeater: new shapes.logic.Repeater({
        position: { x: 410, y: 25 }
      }),
      or: new shapes.logic.Or({
        position: { x: 550, y: 50 }
      }),
      and: new shapes.logic.And({
        position: { x: 550, y: 150 }
      }),
      not: new shapes.logic.Not({
        position: { x: 90, y: 140 }
      }),
      nand: new shapes.logic.Nand({
        position: { x: 550, y: 250 }
      }),
      nor: new shapes.logic.Nor({
        position: { x: 270, y: 190 }
      }),
      xor: new shapes.logic.Xor({
        position: { x: 550, y: 200 }
      }),
      xnor: new shapes.logic.Xnor({
        position: { x: 550, y: 100 }
      }),
      input: new shapes.logic.Input({
        position: { x: 5, y: 45 }
      }),
      output: new shapes.logic.Output({
        position: { x: 440, y: 290 }
      })
    }

    const wires = [
      {
        source: { id: gates.input.id, port: 'out' },
        target: { id: gates.not.id, port: 'in' }
      },
      {
        source: { id: gates.not.id, port: 'out' },
        target: { id: gates.nor.id, port: 'in1' }
      },
      {
        source: { id: gates.nor.id, port: 'out' },
        target: { id: gates.repeater.id, port: 'in' }
      },
      {
        source: { id: gates.nor.id, port: 'out' },
        target: { id: gates.output.id, port: 'in' }
      },
      {
        source: { id: gates.repeater.id, port: 'out' },
        target: { id: gates.nor.id, port: 'in2' },
        vertices: [{ x: 215, y: 100 }]
      }
    ]

    graph.addCells(util.toArray(gates))

    util.forIn(wires, function(attributes) {
      graph.addCell(paper.getDefaultLink().set(attributes))
    })

    graph.on('change:source change:target', function(model, end) {
      var e = 'target' in model.changed ? 'target' : 'source'

      if (
        (model.previous(e).id && !model.get(e).id) ||
        (!model.previous(e).id && model.get(e).id)
      ) {
        // if source/target has been connected to a port or disconnected from a port reinitialize signals
        current = initializeSignal()
      }
    })

    graph.on('change:signal', function(wire, signal) {
      toggleSignal(wire, signal)

      var magnitude = Math.abs(signal)

      // if a new signal has been generated stop transmitting the old one
      if (magnitude !== current) return

      var gate = wire.getTargetElement()
      if (gate) {
        gate.onSignal(signal, function() {
          // get an array of signals on all input ports
          var inboundLinks = graph.getConnectedLinks(gate, {
            inbound: true
          })
          var linksByPorts = util.groupBy(inboundLinks, function(wire) {
            return wire.get('target').port
          })
          var inputs = util.toArray(linksByPorts).map(function(wires) {
            return Math.max.apply(this, util.invoke(wires, 'get', 'signal')) > 0
          })

          // calculate the output signal
          var output = magnitude * (gate.operation.apply(gate, inputs) ? 1 : -1)

          broadcastSignal(gate, output)
        })
      }
    })

    current = initializeSignal()

    return () => {
      // Cleanup function
      paper.remove()
    }
  }, [])

  return <div ref={paperRef} />
}

export default LogicGateDiagram
