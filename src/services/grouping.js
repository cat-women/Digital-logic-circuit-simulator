import { decimalToBinary, binaryToGray, isSafe, isRightSafe } from './common.js'

function makeIslandObject(x1, y1, x2, y2, area, corner) {
  return {
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 },
    area: area ? area : (x2 - x1 + 1) * (y2 - y1 + 1),
    corner: corner ? corner : false
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
  /** has original function  */
  /*
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
*/
  islands = islands.filter(island => {
    if (island.corner === 'row' || islands.corner === 'col') {
      return true
    }

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

  // islands = removeRedundantIslands(islands, row, col, kMap)

  let rowVarCount = rowElement.length
  let colVarCount = colElement.length

  let rowVar = rowElement
  let colVar = colElement

  islands.forEach(island => {
    let rowSequence = sequence.slice(island.start.y, island.end.y + 1)

    /**If this is corner row  */
    if (island.corner === 'row') {
      let end = '',
        one = 0

      kMap.forEach((row, index) => {
        if (row[0] === 0) return
        end = rowSequence[index]
        one++
      })
      if (one === 4) rowSequence = [rowSequence[0], end]
    }

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

    if (island.corner === 'col') {
      // let end = '',
      //   one = 0
      // let colBits = kMap[0]
      // colBits.forEach((col, index) => {
      //   if (col === 0) return
      //   end = colSequence[index]
      //   one++
      // })

      colSequence = [colSequence[0], colSequence[colSequence.length - 1]]
    }

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

  // For Whole Matrix Grouping
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

  let rowIslands = []
  // For Row  Corner Grouping
  for (let j = 0; j < row; j += 4) {
    for (let i = 0; i < col; i++) {
      /**w = width of island , h = height of island  */

      let w = 1,
        h = 3
      let area = 2
      if (!isSafe(i, j, kMap) || !isSafe(i, j + h, kMap)) break
      rowIslands.push(makeIslandObject(i, j, i, j + h, area, 'row'))
      while (true) {
        if (!isSafe(i + w, j, kMap) || !isSafe(i + w, j + h, kMap)) break

        if (Math.log2(w + 1) % 1 !== 0) {
          if (!isSafe(i + w, j, kMap) || !isSafe(i + w, j + h, kMap)) break

          if (!isSafe(i + w + 1, j, kMap) || !isSafe(i + w + 1, j + h, kMap))
            break
          area += 4

          rowIslands.push(makeIslandObject(i, j, w + 1, j + h, area, 'row'))
          break
        } else {
          area += 2
          rowIslands.push(makeIslandObject(i, j, i + w, j + h, area, 'row'))
        }
        w++
      }
    }
  }

  let colIslands = []
  /* For column  Corner Grouping */
  for (let i = 0; i < col; i += 4) {
    for (let j = 0; j < row; j++) {
      /**w = width of island , h = height of island  */
      let w = 3,
        h = 1
      let area = 2

      if (!isSafe(i, j, kMap) || !isSafe(i + w, j, kMap)) break
      colIslands.push(makeIslandObject(i, j, i + w, j, area, 'col'))
      while (true) {
        if (!isSafe(i, j + h, kMap) || !isSafe(i + w, j + h, kMap)) break

        if (Math.log2(h + 1) % 1 !== 0) {
          // if (!isSafe(i, j+h, kMap) || !isSafe(i + w, j + h, kMap)) break

          if (!isSafe(i, j + h + 1, kMap) || !isSafe(i + w, j + h + 1, kMap))
            break
          area += 4

          colIslands.push(makeIslandObject(i, j, w, j + h + 1, area, 'col'))
          break
        } else {
          area += 2
          colIslands.push(makeIslandObject(i, j, i + w, j + h, area, 'col'))
        }
        h++
      }
    }
  }

  rowIslands = islands.concat(rowIslands)
  colIslands = islands.concat(colIslands)
  rowIslands.sort((a, b) => b.area - a.area)
  colIslands.sort((a, b) => b.area - a.area)

  rowIslands = removeRedundantIslands(rowIslands, row, col, kMap)
  colIslands = removeRedundantIslands(colIslands, row, col, kMap)

  islands = [
    ...(rowIslands.length ? rowIslands : []),
    ...(colIslands.length ? colIslands : []),
    ...islands
  ]

  if (islands.length === 0) return '0'
  islands.sort((a, b) => b.area - a.area)
  let result = createBooleanFunction(
    islands,
    row,
    col,
    rowElement,
    colElement,
    sequence,
    kMap
  )
  return result
}
