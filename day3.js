'use strict'

const { parse } = require('./day3.peg')

const WIDTH = 1000
const HEIGHT = 1000

module.exports = (inp) => {
  const a = new Set()
  const fabric = Array.from(
    { length: WIDTH },
    () => Array.from({ length: HEIGHT }, () => []))
  for (const c of parse(inp)) {
    a.add(c.id)
    for (let i = c.x; i < c.x + c.w; i++) {
      for (let j = c.y; j < c.y + c.h; j++) {
        fabric[i][j].push(c.id)
      }
    }
  }
  let count = 0
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (fabric[i][j].length >= 2) {
        count++
        for (const id of fabric[i][j]) {
          a.delete(id)
        }
      }
    }
  }
  return [count, [...a][0]]
}
