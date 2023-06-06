import { decimalToBinary, binaryToGray, isSafe, isRightSafe } from './common.js'

function makeIslandObject(x1, y1, x2, y2) {
  return {
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 },
    area: (x2 - x1 + 1) * (y2 - y1 + 1)
  }
}

function createBooleanFunction(
  islands,
  row,
  col,
  rowElement,
  colElement,
  sequence,
  kMap
) {
  let output = ''
  let visited = new Array(row)
  for (let i = 0; i < row; i++) visited[i] = new Array(col).fill(false)

  islands = islands.filter(island => {
    let flag = false
    for (let j = island.start.y; j <= island.end.y; j++) {
      for (let i = island.start.x; i <= island.end.x; i++) {
        if (visited[j][i] === false) {
          visited[j][i] = true
          flag = true
        }
      }
    }
    return flag
  })

  islands = removeRedundantIslands(islands, row, col, kMap)

  let rowVarCount = rowElement.length
  let colVarCount = colElement.length

  let rowVar = rowElement
  let colVar = colElement
  /**
  islands.forEach(island => {

    // for (let i = 0; i < rowSequence.length; i++) {
    //   if (rowSequence[i][1] === rowSequence[i + 1][1]) {
    //     return output += colElement[0]
    //   }
    //   if (rowSequence[i+1][1] === rowSequence[i+1][2]) {
    //     return output += colElement[1]
    //   }

    // }
  })
  if (output.substring(output.length - 3) === ' + ')
    output = output.substring(0, output.length - 3)
  if (output === '') output = '1'
  return output
   */

  islands.forEach(island => {
    let rowSequence = sequence.slice(island.start.y, island.end.y + 1)

    for (let v = 0; v < rowVarCount; v++) {
      let currVarVal = rowSequence[0][rowSequence[0].length - rowVarCount + v]

      for (let i = 0; i < rowSequence.length; i++) {
        if (
          rowSequence[i][rowSequence[i].length - rowVarCount + v] !== currVarVal
        )
          currVarVal = ''
      }
      if (currVarVal === '0') output += rowVar[v] + "'"
      else if (currVarVal === '1') output += rowVar[v]
    }

    let colSequence = sequence.slice(island.start.x, island.end.x + 1)

    const toRemove = colSequence[0].substring(0, rowVarCount)

    const rowBits = colSequence.map(element => {
      element = element.replace(toRemove, '')
      return element
    })

    for (let v = 0; v < colVarCount; v++) {
      let currVarVal = rowBits[0][v]
      for (let i = 1; i < rowBits.length; i++) {
        if (rowBits[i][v] !== currVarVal) currVarVal = ''
      }
      if (currVarVal === '0') output += colVar[v] + "'"
      else if (currVarVal === '1') output += colVar[v]
    }
    output += ' + '
  })

  if (output.substring(output.length - 3) === ' + ')
    output = output.substring(0, output.length - 3)
  if (output === '') output = '1'
  return output
}

function removeRedundantIslands(islands, row, col, kMap) {
  for (let i = islands.length - 1; i >= 0; i--) {
    let isRedundant = true
    let complementMap = new Array(row)
    for (let j = 0; j < row; j++) {
      complementMap[j] = new Array(col)
      for (let i = 0; i < col; i++) {
        complementMap[j][i] = Number(!kMap[j][i])
      }
    }
    let island = islands[i]
    islands.forEach(land => {
      if (land === island) return
      for (let y = land.start.y; y <= land.end.y; y++) {
        for (let x = land.start.x; x <= land.end.x; x++) {
          complementMap[y][x] = 1
        }
      }
    })
    for (let j = 0; j < row; j++) {
      if (complementMap[j].every(val => val === 1) === false) {
        isRedundant = false
        break
      }
    }
    if (isRedundant) islands.splice(i, 1)
  }
  return islands
}

export function getIslands(data, variables = ['A', 'B', 'C', 'D']) {
  // let kMap = [[1, 1, 1, 0], [1, 1, 1, 0], [1, 1, 0, 0], [0, 0, 1, 1]]
  // if (data.length > 0) kMap = data
  let kMap = data.kMapValue
  const colElement = data.colElement
  const rowElement = data.rowElement
  const variableCount = variables.length

  const col = colElement.length > 1 ? Math.pow(data.colElement.length, 2) : 2
  const row = rowElement.length > 1 ? Math.pow(data.rowElement.length, 2) : 2

  if (kMap.length < 1) return null
  /** sequence to store kmap varibale combination */
  let sequence = []

  for (let i = 0; i < Math.pow(2, variableCount); i++) {
    sequence.push(binaryToGray(decimalToBinary(i, variableCount)))
  }

  let islands = []
  for (let j = 0; j < row; j++) {
    for (let i = 0; i < col; i++) {
      if (!isSafe(i, j, kMap)) continue
      islands.push(makeIslandObject(i, j, i, j))
      let w = 1,
        h = 1
      while (isSafe(i, j + h - 1, kMap)) {
        if (Math.log2(h) % 1 !== 0) {
          h++
          continue
        }
        w = 1
        while (true) {
          if (!isRightSafe(w, h, i, j, kMap)) {
            if (Math.log2(w) % 1 === 0) {
              islands.push(makeIslandObject(i, j, i + w - 1, j + h - 1))
              break
            } else {
              let newW = w
              while (Math.log2(newW) % 1 !== 0) newW--
              islands.push(makeIslandObject(i, j, i + newW - 1, j + h - 1))
              break
            }
          }
          w++
        }
        h++
      }
    }
  }

  if (islands.length === 0) return '0'
  islands.sort((a, b) => b.area - a.area)

  return createBooleanFunction(
    islands,
    row,
    col,
    rowElement,
    colElement,
    sequence,
    kMap
  )
}
