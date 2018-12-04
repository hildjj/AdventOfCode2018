'use strict'

const { parse } = require('./day4.peg')

class Elf {
  constructor (id) {
    this.id = id
    this.minutes = Array.from({ length: 60 }, () => 0)
    this.total = 0
  }
  add (start, end) {
    this.total += (end - start)
    for (let i = start; i < end; i++) {
      this.minutes[i]++
    }
  }
  max () {
    let maxVal = -Infinity
    let maxIndex = null
    this.minutes.forEach((v, i) => {
      if (v > maxVal) {
        [maxVal, maxIndex] = [v, i]
      }
    })
    return [maxVal, maxIndex]
  }
}

module.exports = (inp) => {
  const lines = parse(inp)
  lines.sort((a, b) => a.date.getTime() - b.date.getTime())

  const elves = {}

  let cur = null
  let last = null
  for (const l of lines) {
    if (l.date.getUTCHours() === 23) {
      // move to upcoming midnight.  Nice job, early elves.
      l.date.setUTCHours(0)
      l.date.setUTCMinutes(0)
      l.date.setUTCDate(l.date.getUTCDate() + 1)
    }
    if (typeof l.action === 'number') {
      // begin
      cur = elves[l.action]
      if (!cur) {
        cur = elves[l.action] = new Elf(l.action)
      }
    } else if (l.action === 'sleep') {
      last = l.date.getUTCMinutes()
    } else {
      // wake
      cur.add(last, l.date.getUTCMinutes())
      last = null
      // with less careful inputs, would need to deal with elves
      // that are still asleep at the end of the hour
    }
  }
  const ret = []
  let maxElf = null
  let maxMins = -Infinity
  for (const elf of Object.values(elves)) {
    if (elf.total > maxMins) {
      [maxMins, maxElf] = [elf.total, elf]
    }
  }
  ret[0] = maxElf.id * maxElf.max()[1]

  maxElf = null
  maxMins = -Infinity
  let maxIndex = null
  for (const elf of Object.values(elves)) {
    const [mv, mi] = elf.max()
    if (mv > maxMins) {
      [maxMins, maxIndex, maxElf] = [mv, mi, elf]
    }
  }
  ret[1] = maxElf.id * maxIndex
  return ret
}
