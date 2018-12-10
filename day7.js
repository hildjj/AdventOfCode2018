'use strict'

const { parse } = require('./day7.peg')

function graph (reqs) {
  const all = {}
  for (const [pre, post] of reqs) {
    if (!all[post]) {
      all[post] = []
    }
    if (!all[pre]) {
      all[pre] = []
    }
    all[post].push(pre)
  }
  return all
}

function available (all, atMost = Infinity) {
  let possible = []
  for (const [k, v] of Object.entries(all)) {
    if (v.length === 0) {
      possible.push(k)
    }
  }
  possible.sort((a, b) => a.localeCompare(b))
  return possible.slice(0, atMost)
}

function clean (all, c) {
  for (const v of Object.values(all)) {
    // delete
    const i = v.indexOf(c)
    if (i >= 0) {
      v.splice(i, 1)
    }
  }
}

function assign (elves, possible, bias, clamp) {
  for (const [i, v] of possible.entries()) {
    let found = false
    for (const ev of elves) {
      if (ev[0] <= 0) {
        ev[0] = clamp ? 1 : v.charCodeAt(0) - 64 + bias
        ev[1] = v
        found = true
        break
      }
    }
    if (!found) {
      return possible.slice(i)
    }
  }
  return []
}

function calc (reqs, bias, workers, clamp) {
  const all = graph(reqs)
  let ret = ''
  let elves = Array.from({ length: workers }, () => [0, null])
  let t = 0

  while ((Object.values(all).length > 0) || elves.some(e => e[0] > 0)) {
    let possible = available(all, elves.filter(e => e[0] <= 0).length)
    possible.forEach(p => delete all[p])
    assign(elves, possible, bias, clamp)
    elves.forEach(e => e[0]--)
    const done = elves.filter(e => e[0] === 0)
    done.sort((a, b) => a[1] - b[1])
    ret += done.map(e => {
      clean(all, e[1])
      return e[1]
    }).join('')
    t++
  }

  return [ret, t]
}

module.exports = (inp, bias, workers) => {
  bias = parseInt(bias)
  workers = parseInt(workers)

  const reqs = parse(inp)
  return [calc(reqs, bias, 1, true), calc(reqs, bias, workers)]
}
