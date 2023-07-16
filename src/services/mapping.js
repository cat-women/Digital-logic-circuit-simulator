/** Maping of area and visited cell  */
export function getVisited(island, visited) {
  if (island.corner === 'col') {
    switch (island.area) {
      case 8:
        for (let i = 0; i < 4; i++) {
          visited[i][0] = true
          visited[i][3] = true
        }
        break
      case 4:
        visited[island.start.y][0] = true
        visited[island.start.y][3] = true
        visited[island.end.y][0] = true
        visited[island.end.y][3] = true
        break
      case 2:
        visited[island.start.y][0] = true
        visited[island.start.y][3] = true
        break

      default:
        break
    }
  }
  if (island.corner === 'row') {
    switch (island.area) {
      case 8:
        for (let i = 0; i < 4; i++) {
          visited[0][i] = true
          visited[3][i] = true
        }
        break
      case 4:
        visited[0][island.start.x] = true
        visited[3][island.start.x] = true
        visited[0][island.end.x] = true
        visited[3][island.end.x] = true
        break
      case 2:
        visited[0][island.start.x] = true
        visited[3][island.start.x] = true
        break

      default:
        break
    }
  }
  if (island.corner === 'corner') {
    let startx = 0,
      starty = 0
    switch (island.table) {
      case 1:
        startx = 0
        starty = 4
        break
      case 2:
        startx = 4
        starty = 0
        break
      case 3:
        startx = 4
        starty = 4
        break

      default:
        startx = 0
        starty = 0
        break
    }
    visited[0 + startx][0 + starty] = true
    visited[3 + startx][0 + starty] = true
    visited[0 + startx][3 + starty] = true
    visited[3 + startx][3 + starty] = true
    if (island.endTable) {
      const endCoordinates = [
        { endx: 0, endy: 4 },
        { endx: 4, endy: 0 },
        { endx: 4, endy: 4 }
      ]
      let endx, endy
      for (let i = 1; i <= island.endTable; i++) {
        endx = endCoordinates[i - 1].endx
        endy = endCoordinates[i - 1].endy
        visited[0 + endx][0 + endy] = true
        visited[3 + endx][0 + endy] = true
        visited[0 + endx][3 + endy] = true
        visited[3 + endx][3 + endy] = true
      }
    }
  }
  return visited
}

/** Mapping between number of variable and functional expression */

/** Mapping from function to kmap */

export const twoVariables = {
  0: [0, 0],
  1: [0, 1],
  2: [1, 0],
  3: [1, 1]
}
export const threeVariables = {
  0: [0, 0],
  1: [0, 1],
  2: [0, 3],
  3: [0, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 3],
  7: [1, 2]
}

export const fourVariables = {
  0: [0, 0],
  1: [0, 1],
  2: [0, 3],
  3: [0, 2],

  4: [1, 0],
  5: [1, 1],
  6: [1, 3],
  7: [1, 2],

  8: [3, 0],
  9: [3, 1],
  10: [3, 3],
  11: [3, 2],

  12: [2, 0],
  13: [2, 1],
  14: [2, 3],
  15: [2, 2]
}

export const fiveVariables = {
  0: [0, 0],
  1: [0, 1],
  2: [0, 3],
  3: [0, 2],

  4: [1, 0],
  5: [1, 1],
  6: [1, 3],
  7: [1, 2],

  8: [3, 0],
  9: [3, 1],
  10: [3, 3],
  11: [3, 2],

  12: [2, 0],
  13: [2, 1],
  14: [2, 3],
  15: [2, 2],

  16: [0, 4],
  17: [0, 5],
  18: [0, 7],
  19: [0, 6],

  20: [1, 4],
  21: [1, 5],
  22: [1, 7],
  23: [1, 6],

  24: [3, 4],
  25: [3, 5],
  26: [3, 7],
  27: [3, 6],

  28: [2, 4],
  29: [2, 5],
  30: [2, 7],
  31: [2, 6]
}

export const sixVariables = {
  0: [0, 0],
  1: [0, 1],
  2: [0, 3],
  3: [0, 2],

  4: [1, 0],
  5: [1, 1],
  6: [1, 3],
  7: [1, 2],

  8: [3, 0],
  9: [3, 1],
  10: [3, 3],
  11: [3, 2],

  12: [2, 0],
  13: [2, 1],
  14: [2, 3],
  15: [2, 2],

  16: [0, 4],
  17: [0, 5],
  18: [0, 7],
  19: [0, 6],

  20: [1, 4],
  21: [1, 5],
  22: [1, 7],
  23: [1, 6],

  24: [3, 4],
  25: [3, 5],
  26: [3, 7],
  27: [3, 6],

  28: [2, 4],
  29: [2, 5],
  30: [2, 7],
  31: [2, 6],

  32: [4, 0],
  33: [4, 1],
  34: [4, 3],
  35: [4, 2],

  36: [5, 0],
  37: [5, 1],
  38: [5, 3],
  39: [5, 2],

  40: [7, 0],
  41: [7, 1],
  42: [7, 3],
  43: [7, 2],

  44: [6, 0],
  45: [6, 1],
  46: [6, 3],
  47: [6, 2],

  48: [4, 4],
  49: [4, 5],
  50: [4, 7],
  51: [4, 6],

  52: [5, 4],
  53: [5, 5],
  54: [5, 7],
  55: [5, 6],

  56: [7, 4],
  57: [7, 5],
  58: [7, 7],
  59: [7, 6],

  60: [6, 4],
  61: [6, 5],
  62: [6, 7],
  63: [6, 6]
}
