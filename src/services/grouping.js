import {
  decimalToBinary,
  binaryToGray,
  isSafe,
  isRightSafe,
  removeRedundant
} from './common.js'
import { getVisited } from './mapping.js'

function makeIslandObject(x1, y1, x2, y2, tableIndex, area, corner) {
  return {
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 },
    area: area ? area : (x2 - x1 + 1) * (y2 - y1 + 1),
    corner: corner ? corner : false,
    table: tableIndex
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

  islands.sort((a, b) => b.area - a.area)
  console.log('before sorting ', islands)
  /** remove redundant that was not remove earlier */
  islands = islands.filter(island => {
    // for three and two variable
    if (row + col < 7 && island.corner === 'col') {
      if (island.area === 4) {
        visited[0][0] = true
        visited[0][3] = true
        visited[1][0] = true
        visited[1][3] = true
      }
      if (island.area === 2) {
        visited[island.start.y][island.start.x] = true
        visited[island.end.y][island.end.x] = true
      }
      return true
    }

    if (row + col > 7) {
      visited = getVisited(island, visited)
    }
    let flag = false

    for (let j = island.start.y; j <= island.end.y; j++) {
      for (let i = island.start.x; i <= island.end.x; i++) {
        // for first table
        if (island.table === 0 && visited[j][i] === false) {
          visited[j][i] = true
          flag = true
        }

        // for second table
        if (
          ((island.endTable && island.endTable === 1) || island.table === 1) &&
          visited[j][i + 4] === false
        ) {
          visited[j][i + 4] = true
          flag = true
        }
        // Second table
        if (
          ((island.endTable && island.endTable === 2) || island.table === 2) &&
          visited[j + 4][i] === false
        ) {
          visited[j + 4][i] = true
          flag = true
        }
        // Third table
        if (
          ((island.endTable && island.endTable === 3) || island.table === 3) &&
          visited[j + 4][i + 4] === false
        ) {
          visited[j + 4][i + 4] = true
          flag = true
        }
        // if (
        //   visited[j][i] === false &&
        //   island.table === 3 &&
        //   visited[j + 4][i + 4] === false
        // ) {
        //   visited[j + 4][i + 4] = true
        //   flag = true
        // }
      }
    }
    return flag
  })

  console.log('final island ', islands)

  /** Dont remove it  */
  // islands = removeRedundantIslands(islands, row, col, kMap)

  islands.forEach(island => {
    let rowVarCount = rowElement.length
    let colVarCount = colElement.length

    let rowVar = rowElement
    let colVar = colElement
    // to get row variables
    let rowSequence = sequence.slice(island.start.y, island.end.y + 1)

    /** For Six variable remove msb */
    if (rowElement.length === 3) {
      rowVar = [...rowElement].slice(1, rowVarCount)
      rowVarCount = rowVar.length

      const msb = rowSequence[0].substring(0, 1)
      const rowBits = rowSequence.map(element => {
        element = element.replace(msb, '')
        return element
      })
      rowSequence = rowBits
    }

    if (island.corner === 'row') {
      rowSequence = [rowSequence[0], rowSequence[rowSequence.length - 1]]
    }
    if (island.corner === 'corner')
      rowSequence = [rowSequence[0], rowSequence[rowSequence.length - 1]]

    /** For six variable add msb variable  */
    if (rowElement.length === 3) {
      if (!island.msbChange) {
        if (island.table === 0 || island.table === 1)
          output += rowElement[0] + "'"
        if (island.table === 2 || island.table === 3) output += rowElement[0]
      }
      // if table changes
      if (!island.msbChange || island.endTable) {
        if (island.table === 0 && island.endTable === 1)
          output += rowElement[0] + "'"
        if (island.table === 2 && island.endTable === 3) output += rowElement[0]
      }
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

    // to get colunm variables
    let colSequence = sequence.slice(island.start.x, island.end.x + 1)

    /** For five and Six variable remove msb */
    if (colVarCount === 3) {
      colVar = colElement.slice(1, colVarCount)
      colVarCount = colVar.length // 2
    }

    if (island.corner === 'col') {
      colSequence = [colSequence[0], colSequence[colSequence.length - 1]]
    }

    if (island.corner === 'corner')
      colSequence = [colSequence[0], colSequence[colSequence.length - 1]]
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
      if (!island.msbChange) {
        if (island.table === 0 || island.table === 2)
          output += colElement[0] + "'"
        if (island.table === 1 || island.table === 3) output += colElement[0]
      }
      // if table changes
      if (!island.msbChange || island.endTable) {
        if (island.table === 0 && island.endTable === 2)
          output += colElement[0] + "'"
        if (island.table === 1 && island.endTable === 3) output += colElement[0]
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

function createMaxtermBooleanFunction(
  islands,
  row,
  col,
  rowElement,
  colElement,
  sequence,
) {
  let output = ''
  let visited = new Array(row)
  for (let i = 0; i < row; i++) visited[i] = new Array(col).fill(false)

  islands.sort((a, b) => b.area - a.area)

  /** remove redundant that was not remove earlier */
  islands = islands.filter(island => {
    // for three and two variable
    if (row + col < 7 && island.corner === 'col') {
      if (island.area === 4) {
        visited[0][0] = true
        visited[0][3] = true
        visited[1][0] = true
        visited[1][3] = true
      }
      if (island.area === 2) {
        visited[island.start.y][island.start.x] = true
        visited[island.end.y][island.end.x] = true
      }
      return true
    }

    if (row + col > 7) {
      visited = getVisited(island, visited)
    }
    let flag = false

    for (let j = island.start.y; j <= island.end.y; j++) {
      for (let i = island.start.x; i <= island.end.x; i++) {
        // for first table
        if (island.table === 0 && visited[j][i] === false) {
          visited[j][i] = true
          flag = true
        }

        // for second table
        if (
          ((island.endTable && island.endTable === 1) || island.table === 1) &&
          visited[j][i + 4] === false
        ) {
          visited[j][i + 4] = true
          flag = true
        }
        // Second table
        if (
          ((island.endTable && island.endTable === 2) || island.table === 2) &&
          visited[j + 4][i] === false
        ) {
          visited[j + 4][i] = true
          flag = true
        }
        // Third table
        if (
          ((island.endTable && island.endTable === 3) || island.table === 3) &&
          visited[j + 4][i + 4] === false
        ) {
          visited[j + 4][i + 4] = true
          flag = true
        }
        // if (
        //   visited[j][i] === false &&
        //   island.table === 3 &&
        //   visited[j + 4][i + 4] === false
        // ) {
        //   visited[j + 4][i + 4] = true
        //   flag = true
        // }
      }
    }
    return flag
  })


  /** Dont remove it  */
  // islands = removeRedundantIslands(islands, row, col, kMap)

  islands.forEach(island => {
    output += '('
    let rowVarCount = rowElement.length
    let colVarCount = colElement.length

    let rowVar = rowElement
    let colVar = colElement
    // to get row variables
    let rowSequence = sequence.slice(island.start.y, island.end.y + 1)

    /** For Six variable remove msb */
    if (rowElement.length === 3) {
      rowVar = [...rowElement].slice(1, rowVarCount)
      rowVarCount = rowVar.length

      const msb = rowSequence[0].substring(0, 1)
      const rowBits = rowSequence.map(element => {
        element = element.replace(msb, '')
        return element
      })
      rowSequence = rowBits
    }

    if (island.corner === 'row') {
      rowSequence = [rowSequence[0], rowSequence[rowSequence.length - 1]]
    }
    if (island.corner === 'corner')
      rowSequence = [rowSequence[0], rowSequence[rowSequence.length - 1]]

    /** For six variable add msb variable  */
    if (rowElement.length === 3) {
      if (!island.msbChange) {
        if (island.table === 0 || island.table === 1)
          output += rowElement[0] + "'" + '+'
        if (island.table === 2 || island.table === 3) output += rowElement[0] + '+'
      }
      // if table changes
      if (!island.msbChange || island.endTable) {
        if (island.table === 0 && island.endTable === 1)
          output += rowElement[0] + "'" + '+'
        if (island.table === 2 && island.endTable === 3) output += rowElement[0] + '+'
      }
    }
    for (let v = 0; v < rowVarCount; v++) {
      let currVarVal = rowSequence[0][rowSequence[0].length - rowVarCount + v]

      for (let i = 0; i < rowSequence.length; i++) {
        if (
          rowSequence[i][rowSequence[i].length - rowVarCount + v] !== currVarVal
        )
          currVarVal = ''
      }
      if (currVarVal === '0') output += rowVar[v] + "'" + '+'
      else if (currVarVal === '1') output += rowVar[v] + '+'
    }

    // to get colunm variables
    let colSequence = sequence.slice(island.start.x, island.end.x + 1)

    /** For five and Six variable remove msb */
    if (colVarCount === 3) {
      colVar = colElement.slice(1, colVarCount)
      colVarCount = colVar.length // 2
    }

    if (island.corner === 'col') {
      colSequence = [colSequence[0], colSequence[colSequence.length - 1]]
    }

    if (island.corner === 'corner')
      colSequence = [colSequence[0], colSequence[colSequence.length - 1]]
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
      if (!island.msbChange) {
        if (island.table === 0 || island.table === 2)
          output += colElement[0] + "'" + '+'
        if (island.table === 1 || island.table === 3) output += colElement[0] + '+'
      }
      // if table changes
      if (!island.msbChange || island.endTable) {
        if (island.table === 0 && island.endTable === 2)
          output += colElement[0] + "'" + '+'
        if (island.table === 1 && island.endTable === 3) output += colElement[0] + '+'
      }
    }

    for (let v = 0; v < colVarCount; v++) {
      let currVarVal = rowBits[0][v]
      for (let i = 1; i < rowBits.length; i++) {
        if (rowBits[i][v] !== currVarVal) currVarVal = ''
      }
      if (currVarVal === '0') output += colVar[v] + "'" + '+'
      else if (currVarVal === '1') output += colVar[v] + '+'
    }

    if (output.substring(output.length - 1) === '+')
      output = output.substring(0, output.length - 1)

    output += ')'
  })

  if (output=== '()') output = '1'
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

function grouping(kMap, row, col, tableIndex) {
  let islands = []
  let rowIslands = []
  let colIslands = []
  let cornerIslands = []

  // For Whole Matrix Grouping
  for (let j = 0; j < row; j++) {
    for (let i = 0; i < col; i++) {
      if (!isSafe(i, j, kMap)) continue
      islands.push(makeIslandObject(i, j, i, j, tableIndex))
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
              islands.push(
                makeIslandObject(i, j, i + w - 1, j + h - 1, tableIndex)
              )
              break
            } else {
              let newW = w
              while (Math.log2(newW) % 1 !== 0) newW--
              islands.push(
                makeIslandObject(i, j, i + newW - 1, j + h - 1, tableIndex)
              )
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
  // for more than 4 variable
  let isZero = kMap.some(row => row.some(element => element === 0))
  if (row + col > 7 && isZero) {
    // For Row  Corner Grouping

    let j = 0
    let isLargest = false

    for (let i = 0; i < col; i++) {
      let w = 1,
        h = 3
      let area = 2
      if (!isSafe(i, j, kMap) || !isSafe(i, j + h, kMap)) continue

      isZero = kMap.some(item => item[i] === 0)

      if (isZero)
        rowIslands.push(
          makeIslandObject(i, j, i, j + h, tableIndex, area, 'row')
        )
      while (true) {
        if (!isSafe(i + w, j, kMap) || !isSafe(i + w, j + h, kMap)) break

        if (Math.log2(w + 1) % 1 !== 0) {
          if (!isSafe(i + w, j, kMap) || !isSafe(i + w, j + h, kMap)) break

          if (!isSafe(i + w + 1, j, kMap) || !isSafe(i + w + 1, j + h, kMap))
            break
          area += 4

          rowIslands.push(
            makeIslandObject(i, j, w + 1, j + h, tableIndex, area, 'row')
          )
          isLargest = true
          break
        } else {
          area += 2
          rowIslands.push(
            makeIslandObject(i, j, i + w, j + h, tableIndex, area, 'row')
          )
        }
        w++
      }
      if (isLargest) break
    }

    /* For column  Corner Grouping */

    let i = 0
    for (let j = 0; j < row; j++) {
      let w = 3,
        h = 1
      let area = 2

      if (!isSafe(i, j, kMap) || !isSafe(i + w, j, kMap)) continue
      isZero = kMap[j].some(element => element === 0)
      if (isZero) {
        colIslands.push(
          makeIslandObject(i, j, i + w, j, tableIndex, area, 'col')
        )
      }
      while (true) {
        if (!isSafe(i, j + h, kMap) || !isSafe(i + w, j + h, kMap)) break

        if (Math.log2(h + 1) % 1 !== 0) {
          if (!isSafe(i, j + h + 1, kMap) || !isSafe(i + w, j + h + 1, kMap))
            break

          area += 4
          colIslands.push(
            makeIslandObject(i, j, w, j + h + 1, tableIndex, area, 'col')
          )
          isLargest = true
          break
        } else {
          isZero = kMap
            .slice(0, 2)
            .some(row => row.some(element => element === 0))
          if (!isZero) break

          area += 2
          colIslands.push(
            makeIslandObject(i, j, i + w, j + h, tableIndex, area, 'col')
          )
        }
        h++
      }
      if (isLargest) break
    }

    // Corner grouping

    if (
      kMap[0][0] === 1 &&
      kMap[0][3] === 1 &&
      kMap[3][0] === 1 &&
      kMap[3][3] === 1
    )
      cornerIslands.push(makeIslandObject(0, 0, 3, 3, tableIndex, 4, 'corner'))
  }

  if (row + col === 6 && isZero) {
    // for three variable
    if (
      kMap[0][0] === 1 &&
      kMap[0][3] === 1 &&
      kMap[1][0] === 1 &&
      kMap[1][3] === 1
    ) {
      colIslands.push(makeIslandObject(0, 0, 3, 1, tableIndex, 4, 'col'))
    } else {
      for (let i = 0; i < 2; i++) {
        isZero = kMap[i].some(element => element === 0)
        if (isZero && kMap[i][0] === 1 && kMap[i][3] === 1)
          colIslands.push(makeIslandObject(0, i, 3, i, tableIndex, 2, 'col'))
      }
    }
  }

  islands.sort((a, b) => b.area - a.area)

  rowIslands.sort((a, b) => b.area - a.area)
  colIslands.sort((a, b) => b.area - a.area)

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

function isIslandsSame(island1, island2) {
  return (
    island1.start.x === island2.start.x &&
    island1.start.y === island2.start.y &&
    island1.end.x === island2.end.x &&
    island1.end.y === island2.end.y &&
    island1.corner === island2.corner
  )
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

    subArrays.forEach((arr, index) => {
      totalIslands.push(grouping(arr, 4, 4, index))
    })

    let newArray = []
    totalIslands.forEach((islands, index) => {
      islands.forEach((island, subIndex) => {
        let found = false
        for (let j = 0; j < newArray.length; j++) {

          if (isIslandsSame(island, newArray[j])) {
            // condition for table not grouping
            // 1. dont groupt table 0 and three
            if (
              newArray[j].table === 0 &&
              !newArray[j].endTable &&
              island.table === 3
            )
              break

            // 2. dont group table 1 and 2
            if (
              newArray[j].table === 1 &&
              !newArray[j].endTable &&
              island.table === 2
            )
              break


            // Either make group of four table or remove
            if (
              island.table === 2 &&
              newArray[j].endTable &&
              newArray[j].endTable === 1 &&
              index + 1 < totalIslands.length
            ) {
              let isSame = totalIslands[index + 1].some(land =>
                isIslandsSame(island, land)
              )
              if (isSame) {
                found = true
                newArray[j].endTable = 3
                newArray[j].area *= 2
                newArray.msbChange = true
                index++
                break
              } else {
                island.endTable = 2
                island.msbChange = true
                island.table = 0
                found = false
                newArray[newArray.length] = island
                break
              }
            }
            if (island.table === 3 && !newArray[j].endTable) {
              found = true
              newArray[j].area += island.area
              newArray[j].endTable = island.table
              newArray[j].msbChange = true
            } else {
              found = true
              newArray[j].area += island.area
              newArray[j].endTable = island.table
              newArray[j].msbChange = true
              break
            }
          }

          // if table is inside another table  16,17,18,19,20,21
          if (newArray[j].area > island.area && !newArray[j].endTable) {
            // check if island is inside newArray
            let positionsOfNewArray = []
            for (let k = newArray[j].start.x; k <= newArray[j].end.x; k++) {
              for (let l = newArray[j].start.y; l <= newArray[j].end.y; l++) {
                positionsOfNewArray.push([k, l])
              }
            }
            let islandStartInside = false
            let islandEndInside = false
            let startFoundInX = 0
            let startFoundInY = 0
            let endFoundInX = 0
            let endFoundInY = 0
            for (let position of positionsOfNewArray) {
              let x = position[0]
              let y = position[1]
              if (island.start.x == x && island.start.y == y) {
                islandStartInside = true
                startFoundInX = x
                startFoundInY = y
              }
              if (island.end.x == x && island.end.y == y) {
                islandEndInside = true
                endFoundInX = x
                endFoundInY = y
              }
            }
            if (islandStartInside && islandEndInside) {
              island.area = island.area * 2
              island.msbChange = true
              island.endTable = island.table
              island.table = newArray[j].table
              break
            }
          }
        }
        if (!found) {
          newArray.push(island)
        }
      })
    })
    islands = newArray
  } else islands = grouping(kMap, row, col, 0)

  if (islands.length === 0) return '0'
  islands.sort((a, b) => b.area - a.area)

  let result = createMaxtermBooleanFunction(
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
