import {
  decimalToBinary,
  binaryToGray,
  isSafe,
  isRightSafe,
  removeRedundant
} from './common.js'

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
  islands.sort((a, b) => b.area - a.area)

  /** remove redundant that was not remove earlier */
  islands = islands.filter(island => {
    if (
      island.corner === 'row' ||
      islands.corner === 'col' ||
      island.corner === 'corner'
    ) {
      for (let j = island.start.y; j <= island.end.y; j++) {
        for (let i = island.start.x; i <= island.end.x; i++) {
          if (visited[j][i] === false) {
            visited[j][i] = true
          }
        }
      }
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
  console.log('final island ', islands)
  // islands = removeRedundantIslands(islands, row, col, kMap)

  let rowVarCount = rowElement.length
  let colVarCount = colElement.length

  let rowVar = rowElement
  let colVar = colElement

  islands.forEach(island => {
    // to get row variables
    let rowSequence = sequence.slice(island.start.y, island.end.y + 1)

    /** For Six variable remove msb */
    if (rowElement.length === 3) {
      rowVar = rowElement.slice(1, rowVarCount)
      rowVarCount = rowVar.length

      const msb = rowSequence[0].substring(0, 1)
      const rowBits = rowSequence.map(element => {
        element = element.replace(msb, '')
        return element
      })
      rowSequence = rowBits
    }

    if (island.corner === 'row' || island.corner === 'corner') {
      rowSequence = [rowSequence[0], rowSequence[rowSequence.length - 1]]
    }

    for (let v = 0; v < rowVarCount; v++) {
      let currVarVal = rowSequence[0][rowSequence[0].length - rowVarCount + v]

      for (let i = 0; i < rowSequence.length; i++) {
        if (
          rowSequence[i][rowSequence[i].length - rowVarCount + v] !== currVarVal
        )
          currVarVal = ''
      }

      /** For six variable add msb variable  */
      if (rowSequence.length === 6) {
        if (
          !(
            island.msbChange &&
            (island.msbChange === 'row' || island.msbChange === 'rowcol')
          )
        ) {
          if (island.table === 0 || island.table === 1)
            output += rowElement[0] + "'"
          if (island.table === 0 || island.table === 1) output += rowElement[0]
        }
      }

      if (currVarVal === '0') output += rowVar[v] + "'"
      else if (currVarVal === '1') output += rowVar[v]
    }

    // to get colunm variables
    let colSequence = sequence.slice(island.start.x, island.end.x + 1)

    /** For five and Six variable remove msb */
    if (colVarCount === 3) {
      colVar = colElement.slice(1, colVarCount)
      colVarCount = colVar.length // 2
    }

    if (island.corner === 'col' || island.corner === 'corner') {
      colSequence = [colSequence[0], colSequence[colSequence.length - 1]]
    }

    // remove first rowElement bit and msb
    let end = rowElement.length
    if (colElement.length === 3) end += 1
    const toRemove = colSequence[0].substring(0, end)

    const rowBits = colSequence.map(element => {
      element = element.replace(toRemove, '')
      return element
    })


    /** For six variable add msb variable  */
    if (colElement.length === 3) {
      if (
        !(
          island.msbChange &&
          (island.msbChange === 'col' || island.msbChange === 'rowcol')
        ) ||
        !island.msbChange
      ) {

        if (island.table === 0 || island.table === 2)
          output += colElement[0] + "'"
        console.log("output",output);
        if (island.table === 1 || island.table === 3) output += colElement[0]
      }
    }

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

function grouping(kMap, row, col) {
  let islands = []
  let rowIslands = []
  let colIslands = []
  let cornerIslands = []

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

  // corner grouping

  if (
    kMap[0][0] === 1 &&
    kMap[0][3] === 1 &&
    kMap[3][0] === 1 &&
    kMap[3][3] === 1
  ) {
    let temp = makeIslandObject(0, 0, 3, 3, 4, 'corner')

    cornerIslands = [temp]
  }
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

  islands.sort((a, b) => b.area - a.area)

  rowIslands.sort((a, b) => b.area - a.area)
  colIslands.sort((a, b) => b.area - a.area)
  islands.sort((a, b) => b.area - a.area)

  // remove redundant
  rowIslands = removeRedundantIslands(rowIslands, row, col, kMap)
  // again remove cause above one is not working
  rowIslands = removeRedundant(rowIslands, row, col)
  // same as in row islands
  colIslands = removeRedundantIslands(colIslands, row, col, kMap)
  colIslands = removeRedundant(colIslands, row, col)
  islands = removeRedundantIslands(islands, row, col, kMap)

  // remove redundant rowislands and colislands
  if (cornerIslands.length > 0) {
    rowIslands = rowIslands.filter(island => {
      if (
        (island.start.x === 0 &&
          island.start.y === 0 &&
          island.end.x === 3 &&
          island.end.y === 0) ||
        (island.start.x === 0 &&
          island.start.y === 0 &&
          island.end.x === 0 &&
          island.end.y === 3) ||
        (island.start.x === 0 &&
          island.start.y === 3 &&
          island.end.x === 3 &&
          island.end.y === 3) ||
        (island.start.x === 3 &&
          island.start.y === 0 &&
          island.end.x === 3 &&
          island.end.y === 3)
      ) {
        return false
      } else return true
    })
    colIslands = colIslands.filter(island => {
      if (
        (island.start.x === 0 &&
          island.start.y === 0 &&
          island.end.x === 3 &&
          island.end.y === 0) ||
        (island.start.x === 0 &&
          island.start.y === 0 &&
          island.end.x === 0 &&
          island.end.y === 3) ||
        (island.start.x === 0 &&
          island.start.y === 3 &&
          island.end.x === 3 &&
          island.end.y === 3) ||
        (island.start.x === 3 &&
          island.start.y === 0 &&
          island.end.x === 3 &&
          island.end.y === 3)
      ) {
        return false
      } else {
        return true
      }
    })
  }

  islands = [
    ...(rowIslands.length ? rowIslands : []),
    ...(colIslands.length ? colIslands : []),
    ...cornerIslands,
    ...islands
  ]

  return islands
}

function createSubArray(kMap) {
  let subArrays = []
  const subArraySize = 4

  for (let i = 0; i < kMap.length; i += subArraySize) {
    for (let j = 0; j < kMap[i].length; j += subArraySize) {
      const subArray = []
      for (let row = i; row < i + subArraySize; row++) {
        const subRow = kMap[row].slice(j, j + subArraySize)
        subArray.push(subRow)
      }
      subArrays.push(subArray)
    }
  }
  return subArrays
}

export function getIslands(data, variables = ['A', 'B', 'C', 'D']) {
  let kMap = data.kMapValue
  const colElement = data.colElement
  const rowElement = data.rowElement
  const variableCount = variables.length

  const col = colElement.length > 1 ? Math.pow(2, data.colElement.length) : 2
  const row = rowElement.length > 1 ? Math.pow(2, data.rowElement.length) : 2
  let subArrays
  let islands

  if (kMap.length < 1) return null
  /** sequence to store kmap varibale combination */
  let sequence = []

  for (let i = 0; i < Math.pow(2, variableCount); i++) {
    sequence.push(binaryToGray(decimalToBinary(i, variableCount)))
  }
  if (variableCount > 4) subArrays = createSubArray(kMap)
  if (subArrays) {
    let totalIslands = []

    subArrays.forEach(arr => {
      totalIslands.push(grouping(arr, 4, 4))
    })

    let newArray = []
    let msbChange
    totalIslands.forEach((islands, index) => {
      switch (index) {
        case 1:
          msbChange = 'col'
          break
        case 2:
          msbChange = 'row'
          break
        case 3:
          msbChange = 'rowcol'
          break
        default:
          break
      }

      islands.forEach(island => {
        let found = false
        island.table = index

        for (let j = 0; j < newArray.length; j++) {
          if (
            island.start.x === newArray[j].start.x &&
            island.start.y === newArray[j].start.y &&
            island.end.x === newArray[j].end.x &&
            island.end.y === newArray[j].end.y &&
            islands.corner === newArray.corner
          ) {
            found = true
            newArray[j].area += island.area
            newArray[j].msbChange = msbChange
            newArray[j].table = index
            break
          }
        }
        if (!found) {
          newArray.push(island)
        }
      })
    })
    islands = newArray
  } else islands = grouping(kMap, row, col)

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
