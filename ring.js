'use strict'

const assert = require('assert')

const NEXT = 0
const PREV = 1

class Ring {
  constructor (length) {
    this.length = length
    this.slots = Array.from({ length }, () => [-1, -1])
    this.slots[0][NEXT] = 0
    this.slots[0][PREV] = 0
    this.pos = 0
  }

  toString () {
    let ret = ''
    let cur = 0
    while (this.slots[cur][NEXT] === -1) {
      cur++
    }
    const first = cur
    do {
      if (cur === this.pos) {
        ret += ` (${cur})`
      } else {
        ret += ` ${cur}`
      }
      cur = this.slots[cur][NEXT]
    } while (cur !== first)
    return ret
  }
  move (offset = 0) {
    while (offset > 0) {
      this.pos = this.slots[this.pos][NEXT]
      offset--
    }
    while (offset < 0) {
      this.pos = this.slots[this.pos][PREV]
      offset++
    }
  }
  insert (val, offset) {
    this.move(offset)
    // 0 1 2 ^ 3 4
    this.slots[val][NEXT] = this.slots[this.pos][NEXT]
    this.slots[val][PREV] = this.pos
    this.slots[this.slots[this.pos][NEXT]][PREV] = val
    this.slots[this.pos][NEXT] = val
    this.pos = val
  }
  delete (offset) {
    this.move(offset)
    const ret = this.pos
    this.pos = this.slots[ret][NEXT]
    // 0 1 (2) 3 4
    this.slots[this.slots[ret][PREV]][NEXT] = this.pos
    this.slots[this.pos][PREV] = this.slots[ret][PREV]
    this.slots[ret][NEXT] = -1
    this.slots[ret][PREV] = -1
    return ret
  }
}

module.exports = Ring
