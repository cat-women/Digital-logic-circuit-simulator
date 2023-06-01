import { util } from 'jointjs'

//  const initializeSignal = (graph, paper) => {
//   // ... initializeSignal implementation ...
//   var signal = Math.random()
//   // > 0 wire with a positive signal is alive
//   // < 0 wire with a negative signal means, there is no signal
//   // 0 none of the above - reset value

//   // cancel all signals stores in wires
//   util.invoke(graph.getLinks(), 'set', 'signal', 0)

//   // remove all 'live' classes
//   V(paper.viewport).find('.live').forEach(function(vel) {
//     vel.removeClass('live')
//   })

//   graph.getElements().forEach(function(element) {
//     // broadcast a new signal from every input in the graph
//     if (element instanceof joint.shapes.logic.Input) {
//       broadcastSignal(element, signal)
//     }
//   })

//   return signal
// }
// const broadcastSignal = (gate, signal) => {
//   setTimeout(function() {
//     util.invoke(
//       graph.getConnectedLinks(gate, {
//         outbound: true
//       }),
//       'set',
//       'signal',
//       signal
//     )
//   }, 0)
// }
// const toggleLive = (paper, model, signal) => {
//   model.findView(paper).vel.toggleClass('live', signal > 0)
// }

export const lightSignal = (element, wire) => {
  console.log("in light signal");
  element.on('change:attrs', (cell, attrs) => {
    // Update the signal on the output wire based on the output state
    if (attrs.signal === '1') {
      wire.attr('line/stroke', 'green')
    } else {
      wire.attr('line/stroke', 'black')
    }
  })
}
