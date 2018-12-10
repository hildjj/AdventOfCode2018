'use strict'
const { parse } = require('./day10.peg')
const Matrix = require('./matrix')

function print (m) {
  for (let i = 0; i < m.h; i++) {
    console.log(m.row(i).join(''))
  }
  console.log('\n')
}

module.exports = (inp) => {
  const points = parse(inp)
  // const x = points.map(p => p.pos.x)
  // const y = points.map(p => p.pos.y)
  // const vx = points.map(p => p.vel.x)
  // const vy = points.map(p => p.vel.y)

  // while (true) {

  // }
  // let last = Infinity

  for (const p of points) {
    p.pos.x += (10375 * p.vel.x)
    p.pos.y += (10375 * p.vel.y)
  }

  const x = points.map(p => p.pos.x)
  const y = points.map(p => p.pos.y)
  const minX = Math.min(...x)
  const maxX = Math.max(...x)
  const minY = Math.min(...y)
  const maxY = Math.max(...y)
  const w = maxX - minX + 1
  const h = maxY - minY + 1
  const m = new Matrix(w, h, '.')
  for (const p of points) {
    m.set(p.pos.x - minX, p.pos.y - minY, '#')
  }
  print(m)

  return __expected
}
