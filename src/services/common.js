import { shapes } from 'jointjs'

// decimal to binary conversion
export function decimalToBinary(x, fixedLengthSize = 0) {
  return x.toString(2).padStart(fixedLengthSize, '0')
}

// binary to gray code
export function binaryToGray(bin) {
  let prefix = ''
  if (bin.length === 3 && bin[0] === '1') {
    prefix = '1'
    bin = bin.substring(1)
  }
  let gray = bin[0]
  for (let i = 1; i < bin.length; i++) {
    gray += bin[i - 1] ^ bin[i]
  }
  return prefix + gray
}

export function isSafe(i, j, kMap) {
  return !(
    i < 0 ||
    i >= kMap[0].length ||
    j < 0 ||
    j >= kMap.length ||
    kMap[j][i] === 0
  )
}
export function isRightSafe(w, h, i, j, kmap) {
  for (let k = 0; k < h; k++) {
    if (!isSafe(i + w, j + k, kmap)) return false
  }
  return true
}

export const createWire = (source, target) => {
  const wire = new shapes.standard.Link({
    source: { id: source?.id, port: source?.id },
    target: { id: target.id, port: target.id },
    attrs: {
      line: { strokeWidth: 2, stroke: 'black' }
    }
  })

  return wire
}

export function getKmapPositionalArray(row, col) {
    let posArray = []
    for(let i = 0 ; i < row.length; i++ ) {
        for(let j = 0 ; j < col.length ; j++) {
            posArray.push(`${row[i]}${col[j]}`)
        }
    }
  return posArray;
}