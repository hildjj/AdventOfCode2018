'use strict'

const { parse } = require('./testFile')

module.exports = (text) => {
  return parse(text).tests
}
