'use strict'

const assert = require('assert')

function diff (a, b) {
  assert(a.length === b.length)
  let d = 0
  let last = -1
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      d++
      last = i
    }
  }
  return [d, last]
}

module.exports = (inp) => {
  const words = inp.split('\n')
  for (const a of words) {
    for (const b of words) {
      const [d, last] = diff(a, b)
      if (d === 1) {
        const edited = Array.from(a)
        edited.splice(last, 1)
        return edited.join('')
      }
    }
  }
}
