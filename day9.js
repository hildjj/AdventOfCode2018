'use strict'

const Ring = require('./ring')

module.exports = (numPlayers, last) => {
  numPlayers = parseInt(numPlayers)
  last = parseInt(last)

  const r = new Ring(last + 1)
  const players = Array.from({ length: numPlayers }, () => 0)

  for (let i = 1; i <= last; i++) {
    if (i % 23) {
      r.insert(i, 1)
    } else {
      players[i % numPlayers] += i
      players[i % numPlayers] += r.delete(-7)
    }
    // console.log(r.toString())
  }
  return Math.max(...players)
}
