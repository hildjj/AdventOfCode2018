'use strict'

function check (word) {
  const counts = {}
  for (const c of word) {
    counts[c] = (counts[c] || 0) + 1
  }
  let two = 0
  let three = 0
  for (const n of Object.values(counts)) {
    if (n === 2) {
      two = 1
    } else if (n === 3) {
      three = 1
    }
  }
  return [two, three]
}

module.exports = (inp) => {
  const [two, three] = inp.split('\n').map(check).reduce((last, [tw, th]) => {
    last[0] += tw
    last[1] += th
    return last
  }, [0, 0])
  return two * three
}
