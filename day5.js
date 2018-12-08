'use strict'

const ADIFF = 'a'.charCodeAt(0) - 'A'.charCodeAt(0)

function remove (buf, len, code) {
  console.log('remove', code)
  let writePos = 0
  const upper = code - ADIFF

  for (let readPos = 0; readPos < len; readPos++) {
    const r = buf[readPos]
    if ((r !== code) && (r !== upper)) {
      buf[writePos++] = r
    }
  }
  return writePos
}

function react (buf, len) {
  let found
  let writePos

  do {
    found = false
    writePos = 1
    let last = false
    for (let readPos = 1; readPos < len; readPos++, writePos++) {
      if (!last && Math.abs(buf[readPos - 1] - buf[readPos]) === ADIFF) {
        writePos -= 2
        last = true
        found = true
      } else {
        last = false
        buf[writePos] = buf[readPos]
      }
    }
    if (found) {
      len = writePos
    }
  } while (found)
  return len
}

module.exports = (inp) => {
  const buf = Buffer.from(inp, 'utf8')
  const tmp = Buffer.allocUnsafe(buf.length)

  buf.copy(tmp)
  const res = []
  res[0] = react(tmp, buf.length)

  let min = Infinity
  let zed = 'z'.charCodeAt(0)
  let len
  for (let i = 'a'.charCodeAt(0); i <= zed; i++) {
    buf.copy(tmp)
    len = remove(tmp, buf.length, i)
    len = react(tmp, len)
    min = Math.min(min, len)
  }
  res[1] = min
  return res
}
