'use strict'

const assert = require('assert')
const fs = require('fs').promises
const path = require('path')
const Mocha = require('mocha')
const parser = require('./testFile')

const EXCEPTION = Symbol('EXCEPTION')

function addTest (suite, lt, js) {
  suite.addTest(new Mocha.Test(`line ${lt.line}`, async () => {
    let res = null
    try {
      res = await js(...lt.inputs, lt)
    } catch (e) {
      assert.strictEqual(lt.expected, EXCEPTION)
      return
    }
    assert.notStrictEqual(lt.expected, EXCEPTION)
    if (typeof res === 'string') {
      assert.strictEqual(res, lt.expected)
    } else {
      const expected = JSON.parse(lt.expected)
      assert.deepStrictEqual(res, expected)
    }
  }))
}

;(async () => {
  const mocha = new Mocha()

  const files = await fs.readdir(__dirname)
  assert(files.length > 0)
  const day = process.env.DAY

  for (const f of files) {
    if (!f.endsWith('.tests')) {
      continue
    }
    if (day && f !== `day${day}.tests`) {
      continue
    }

    const suite = Mocha.Suite.create(mocha.suite, f)
    const contents = await fs.readFile(path.join(__dirname, f), 'utf8')
    const parsed = parser.parse(contents, { EXCEPTION })

    const jsFile = parsed.script
      ? path.resolve(__dirname, parsed.script)
      : path.resolve(__dirname, f.replace(/([^./]*)\.tests?$/, '../$1.js'))
    const js = require(jsFile)
    suite.addTest(new Mocha.Test('has JS', () => {
      assert.strictEqual(typeof js, 'function')
    }))
    for (const pt of parsed.tests) {
      addTest(suite, pt, js)
    }
  }

  return new Promise((resolve, reject) => {
    mocha.run(resolve)
  })
})().catch(console.error)
