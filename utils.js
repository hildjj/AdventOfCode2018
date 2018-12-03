'use strict'

function list (head, tail) {
  tail.unshift(head)
  return tail
}

module.exports = {
  list
}
