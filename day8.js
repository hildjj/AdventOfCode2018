'use strict'

function sum (a) {
  return a.reduce((last, i) => last + i, 0)
}

class Node {
  constructor (data) {
    this.data = data
    this.children = []
    this.meta = []
    this.length = 2

    const nchild = data[0]
    const nmeta = data[1]
    for (let i = 0; i < nchild; i++) {
      const n = new Node(data.slice(this.length))
      this.children.push(n)
      this.length += n.length
    }
    for (let i = 0; i < nmeta; i++) {
      this.meta.push(data[this.length++])
    }
  }
  reduce (f, last) {
    last = f(last, this)
    for (const c of this.children) {
      last = c.reduce(f, last)
    }
    return last
  }
  value () {
    if (this.children.length === 0) {
      return sum(this.meta)
    }
    const ch = this.meta.map(i => this.children[i - 1]).filter(c => c)
    return sum(ch.map(c => c.value()))
  }
}

module.exports = (inp) => {
  const buf = Buffer.from(inp.split(' '))
  const n = new Node(buf)
  return [n.reduce((last, n) => last + sum(n.meta), 0), n.value()]
}
