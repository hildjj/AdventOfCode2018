'use strict'

class Matrix {
  constructor (w, h, defaultVal) {
    this.w = w
    this.h = h

    this.vals = Array.from({ length: w },
      (_, i) => Array.from({ length: h },
        (_, j) => {
          return (typeof defaultVal === 'function') ? defaultVal(i, j) : defaultVal
        }))
  }

  toString (joiner = ' ') {
    let res = ''
    for (let j = 0; j < this.h; j++) {
      res += this.row(j).join(joiner) + '\n'
    }
    return res
  }

  get (x, y, defaultVal = null) {
    const val = this.vals[x][y]
    return !defaultVal ? val : (val || defaultVal)
  }

  set (x, y, v) {
    this.vals[x][y] = v
  }

  setEach (f) {
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        this.vals[i][j] = f(i, j)
      }
    }
  }

  forEach (f) {
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        f(this.vals[i][j], i, j)
      }
    }
  }

  push (val) {
    if (Array.isArray(val)) {
      for (const [i, v] of val.entries()) {
        this.vals[i].push(v)
      }
    } else {
      throw new Error('Must only push arrays for now')
    }
  }

  row (num) {
    return Array.from({ length: this.w }, (v, i) => this.vals[i][num])
  }

  col (num) {
    return this.vals[num]
  }

  transpose () {
    return new Matrix(this.h, this.w, (i, j) => this.vals[j][i])
  }
}

module.exports = Matrix
