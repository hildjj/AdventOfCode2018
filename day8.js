'use strict'

function sum (a) {
  return a.reduce((last, i) => i ? last + i : last, 0)
}

function val (inp) {
  const [nchild, nmeta] = inp
  let len = 2
  let total = 0
  const children = Array.from({ length: nchild }, () => {
    const [cl, ct, cv] = val(inp.slice(len))
    len += cl
    total += ct
    return cv
  })
  const meta = inp.slice(len, len += nmeta)
  const sumMeta = sum(meta)
  return [
    len,
    total + sumMeta,
    !nchild ? sumMeta : sum(meta.map(i => children[i - 1]))
  ]
}

module.exports = (inp) => {
  const c = inp.split(' ').map(n => +n)
  return val(c).slice(1)
}
