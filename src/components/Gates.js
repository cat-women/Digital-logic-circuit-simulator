import { shapes } from 'jointjs'

const createGates = (id, x = 90, y = 90) => ({
  repeater: new shapes.logic.Repeater({
    id: id + '-repeater',
    position: { x, y }
  }),
  or: new shapes.logic.Or({
    id: id + '-or',
    position: { x, y }
  }),
  and: new shapes.logic.And({
    id: id + '-and',
    position: { x, y },
    size: { width: 100, height: 50 }
  }),
  not: new shapes.logic.Not({
    id: id + '-not',
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  nand: new shapes.logic.Nand({
    id: id + '-nand',
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  nor: new shapes.logic.Nor({
    id: id + '-nor',
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  xor: new shapes.logic.Xor({
    id: id + '-xor',
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  xnor: new shapes.logic.Xnor({
    id: id + '-xnor',
    size: { width: 100, height: 50 },
    position: { x, y }
  }),
  input: new shapes.logic.Input({
    id: id + '-input',
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
    id: id + '-output',
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
