import { shapes } from 'jointjs'

const createGates = (id, x = 90, y = 90) => ({
  repeater: new shapes.logic.Repeater({
    id: id + '-repeater',
    position: { x, y }
  }),
  or: new shapes.logic.Or({
    id: id,
    position: { x, y }
  }),
  and: new shapes.logic.And({
    id: id,
    position: { x, y },
    size: { width: 100, height: 50 }
  }),
  not: new shapes.logic.Not({
    id: id,
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  nand: new shapes.logic.Nand({
    id: id,
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  nor: new shapes.logic.Nor({
    id: id,
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  xor: new shapes.logic.Xor({
    id: id,
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  xnor: new shapes.logic.Xnor({
    id: id,
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  input: new shapes.logic.Input({
    id: id,
    position: { x, y },
    size: { width: 20, height: 20 },
    attrs: {
      circle: { fill: 'green' },
      text: {
        text: id
      }
    },
    ports: { groups: { in: { id: id } } }
  }),
  output: new shapes.logic.Output({
    id: id,
    position: { x, y },
    size: { width: 20, height: 20 },
    attrs: {
      circle: { fill: 'red' },
      text: {
        text: 'Output'
      }
    },
    ports: { groups: { in: { id: id } } }
  })
})

export default createGates
