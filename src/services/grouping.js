const col = 4;
const row = 4;
let sequence = [];
const variableCount = 4;
const variables = "ABCD";

const kMap = [[1, 1, 1, 0], [1, 1, 1, 0], [1, 1, 0, 0], [0, 0, 1, 1]];

// decimal to binary conversion
function decimalToBinary(x, fixedLengthSize = 0) {
  return x.toString(2).padStart(fixedLengthSize, "0");
}
// binary to gray code
function binaryToGray(binary) {
  let gray = "";
  gray += binary[0];
  for (let i = 1; i < binary.length; i++) {
    gray += binary[i - 1] ^ binary[i];
  }
  return gray;
}

for (let i = 0; i < col; i++)
  sequence.push(binaryToGray(decimalToBinary(i, Math.log2(col))));
console.log(sequence);

function isSafe(i, j) {
  return !(
    i < 0 ||
    i >= kMap[0].length ||
    j < 0 ||
    j >= kMap.length ||
    kMap[j][i] == 0
  );
}
function isRightSafe(w, h, i, j) {
  for (let k = 0; k < h; k++) {
    if (!isSafe(i + w, j + k)) return false;
  }
  return true;
}
function makeIslandObject(x1, y1, x2, y2) {
  return {
    start: { x: x1, y: y1 },
    end: { x: x2, y: y2 },
    area: (x2 - x1 + 1) * (y2 - y1 + 1)
  };
}
function createBooleanFunction(islands) {
  let output = "";
  let visited = new Array(row);
  for (let i = 0; i < row; i++) visited[i] = new Array(col).fill(false);

  islands = islands.filter(island => {
    let flag = false;
    for (let j = island.start.y; j <= island.end.y; j++) {
      for (let i = island.start.x; i <= island.end.x; i++) {
        if (visited[j][i] == false) {
          visited[j][i] = true;
          flag = true;
        }
      }
    }
    return flag;
  });

  islands = removeRedundantIslands(islands);
  console.log(islands);

  islands.forEach(island => {
    let rowVarCount = Math.floor(variableCount / 2);
    let colVarCount = variableCount - rowVarCount;
    let rowVar = variables.substring(0, rowVarCount);
    let colVar = variables.substring(rowVarCount, rowVarCount + colVarCount);

    let rowSequence = sequence.slice(island.start.x, island.end.x + 1);

    for (let v = 0; v < rowVarCount; v++) {
      let currVarVal = rowSequence[0][v];

      for (let i = 1; i < rowSequence.length; i++) {
        if (
          rowSequence[i][rowSequence[i].length - rowVarCount + v] != currVarVal
        )
          currVarVal = "";
      }
      if (currVarVal == "0") output += rowVar[v] + "'";
      else if (currVarVal == "1") output += rowVar[v];
    }

    let colSequence = sequence.slice(island.start.y, island.end.y + 1);
    for (let v = 0; v < colVarCount; v++) {
      let currVarVal = colSequence[0][colSequence[0].length - colVarCount + v];

      for (let i = 1; i < colSequence.length; i++) {
        if (colSequence[i][v] != currVarVal) currVarVal = "";
      }
      if (currVarVal == "0") output += colVar[v] + "'";
      else if (currVarVal == "1") output += colVar[v];
    }
    output += " + ";
  });
  if (output.substring(output.length - 3) == " + ")
    output = output.substring(0, output.length - 3);
  if (output == "") output = "1";
  return output;
}

function removeRedundantIslands(islands) {
  for (let i = islands.length - 1; i >= 0; i--) {
    let isRedundant = true;
    let complementMap = new Array(row);
    for (let j = 0; j < row; j++) {
      complementMap[j] = new Array(col);
      for (let i = 0; i < col; i++) {
        complementMap[j][i] = Number(!kMap[j][i]);
      }
    }
    let island = islands[i];
    islands.forEach(land => {
      if (land == island) return;
      for (let y = land.start.y; y <= land.end.y; y++) {
        for (let x = land.start.x; x <= land.end.x; x++) {
          complementMap[y][x] = 1;
        }
      }
    });
    for (let j = 0; j < row; j++) {
      if (complementMap[j].every(val => val == 1) == false) {
        isRedundant = false;
        break;
      }
    }
    if (isRedundant) islands.splice(i, 1);
  }
  return islands;
}

function getIslands() {
  let islands = [];
  for (let j = 0; j < row; j++) {
    for (let i = 0; i < col; i++) {
      if (!isSafe(i, j)) continue;
      islands.push(makeIslandObject(i, j, i, j));
      let w = 1,
        h = 1;
      while (isSafe(i, j + h - 1)) {
        if (Math.log2(h) % 1 != 0) {
          h++;
          continue;
        }
        w = 1;
        while (true) {
          if (!isRightSafe(w, h, i, j)) {
            if (Math.log2(w) % 1 == 0) {
              islands.push(makeIslandObject(i, j, i + w - 1, j + h - 1));
              break;
            } else {
              let newW = w;
              while (Math.log2(newW) % 1 != 0) newW--;
              islands.push(makeIslandObject(i, j, i + newW - 1, j + h - 1));
              break;
            }
          }
          w++;
        }
        h++;
      }
    }
  }
  if (islands.length == 0) return "0";
  islands.sort((a, b) => b.area - a.area);

  return createBooleanFunction(islands);
}

console.log(`The maximum number of islands is: `, getIslands());
