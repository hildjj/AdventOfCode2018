'use strict'

const { parse } = require('./test/testFile')

module.exports = (text) => {
  return parse(text)
}
