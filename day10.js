'use strict'
const { parse } = require('./day10.peg')
const Matrix = require('./matrix')

const min = Infinity
const max = -Infinity

/**
 * area at time t
 */
function area (t, points) {
  let res = area.memo[t]
  if (!res) {
    res = {
      x: { min, max },
      y: { min, max }
    }
    for (let i = 0; i < points.length; i++) {
      let tmp = points[i].pos.x + (points[i].vel.x * t)
      if (tmp < res.x.min) res.x.min = tmp
      if (tmp > res.x.max) res.x.max = tmp
      tmp = points[i].pos.y + (points[i].vel.y * t)
      if (tmp < res.y.min) res.y.min = tmp
      if (tmp > res.y.max) res.y.max = tmp
    }
    res.area = (res.x.max - res.x.min) * (res.y.max - res.y.min)
    area.memo[t] = res
  }
  return res.area
}
area.memo = {}

module.exports = (inp) => {
  area.memo = {}
  const points = parse(inp)

  // As the points coalesce, the size of the box they fit in will approach
  // a minimum.  Once the size goes up again, back up one, and print.

  // secant method
  let [n0, n1] = [0, 1]
  let [a0, a1] = [area(n0, points), area(n1, points)]
  while (n0 !== n1) {
    [n0, n1] = [n1, n1 - Math.floor((a1 * (n1 - n0) / (a1 - a0)))];
    [a0, a1] = [a1, area(n1, points)]
  }
  const res = area.memo[n0]
  const w = res.x.max - res.x.min + 1
  const h = res.y.max - res.y.min + 1
  const m = new Matrix(w, h, ' ')
  for (let i = 0; i < points.length; i++) {
    const xt = points[i].pos.x + (points[i].vel.x * n0)
    const yt = points[i].pos.y + (points[i].vel.y * n0)
    m.set(xt - res.x.min, yt - res.y.min, '#')
  }

  console.log(m.toString(''))
  return n0
}
