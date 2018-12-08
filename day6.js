'use strict'

const { parse } = require('./day6.peg')
const Matrix = require('./matrix')

function manhattan (a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
}

function closest (lines, pt) {
  let min = Infinity
  let minPt = null

  for (const l of lines) {
    const mdist = manhattan(l, pt)
    if (mdist < min) {
      minPt = [l]
      min = mdist
    } else if (mdist === min) {
      minPt.push(l)
    }
  }
  if (minPt.length === 1) {
    return minPt[0]
  }
  return null
}

function bounds (a) {
  // todo: doesn't work for negative
  return {
    minX: Math.min(...a.map(([x, y]) => x)) - 1,
    minY: Math.min(...a.map(([x, y]) => y)) - 1,
    maxX: Math.max(...a.map(([x, y]) => x)) + 1,
    maxY: Math.max(...a.map(([x, y]) => y)) + 1
  }
}

module.exports = (inp) => {
  // https://en.wikipedia.org/wiki/Voronoi_diagram
  const lines = parse(inp)
  const b = bounds(lines)
  console.log(b)
  const pts = new Matrix(b.maxX - b.minX, b.maxY - b.minY, 0)
  const areas = {}

  pts.setEach((i, j) => {
    const c = closest(lines, [i + b.minX, j + b.minY])
    areas[c] = (areas[c] || 0) + 1
    return c
  })

  console.log('TOTAL', Object.values(areas).reduce((l,v) => l + v, 0))

  // anything that touches the edge is infinite
  pts.forEach((v, i, j) => {
    if ((i === 0) || (j === 0) ||
        (i === pts.w - 1) || (j === pts.h - 1)) {
      delete areas[v]
    }
  })

  console.log(areas)
  return Math.max(...Object.values(areas))
}
