'use strict'

module.exports = (man) => {
  switch (man) {
    case 'one':
      throw new Error('test error')
    default:
      return 2
  }
}
