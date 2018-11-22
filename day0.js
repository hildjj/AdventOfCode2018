'use strict'

module.exports = (man, ban, other) => {
  switch (man) {
    case 'one':
      throw new Error('test error')
    default:
      // console.log('other', JSON.stringify(other))
      return 2
  }
}
