'use strict'

const { parse } = require('./day6.peg')

function manhattan (a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
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

module.exports = (inp, max) => {
  // https://en.wikipedia.org/wiki/Voronoi_diagram
  const lines = parse(inp)
  const b = bounds(lines)
  const [h, w] = [b.maxX - b.minX, b.maxY - b.minY]

  let count = 0
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let tot = 0
      for (const p of lines) {
        tot += manhattan(p, [i + b.minX, j + b.minY])
      }
      if (tot < max) {
        count++
      }
    }
  }
  return count
}
