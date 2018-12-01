'use strict'

module.exports = (inp) => {
  const changes = inp.split(/[,\n][ \t]*/gm).map(i => parseInt(i))
  const sum = changes.reduce((last, i) => last + i, 0)
  if (__expected[0] !== '[') {
    return sum
  }
  const seen = { 0: 1 }
  let cur = 0
  for (let offset = 0; true; offset = (offset + 1) % changes.length) {
    cur += changes[offset]
    seen[cur] = (seen[cur] || 0) + 1
    if (seen[cur] === 2) {
      return [sum, cur]
    }
  }
}
