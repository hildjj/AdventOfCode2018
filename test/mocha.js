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
    const tres = typeof res
    switch (tres) {
      case 'string':
        assert.strictEqual(res, lt.expected)
        break
      case 'number':
        assert.strictEqual(res.toString(), lt.expected)
        break
      case 'object':
        const expected = JSON.parse(lt.expected)
        assert.deepStrictEqual(res, expected)
        break
      default:
        throw new Error(`Unknown result type: ${tres}`) // YAGNI
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

    const jsFile = path.resolve(__dirname,
      f.replace(/([^./]*)\.tests?$/, '../$1.js'))
    const js = require(jsFile)
    suite.addTest(new Mocha.Test('has JS', () => {
      assert.strictEqual(typeof js, 'function')
    }))
    const contents = await fs.readFile(path.join(__dirname, f), 'utf8')
    const parsedTests = parser.parse(contents, { EXCEPTION })
    for (const pt of parsedTests) {
      addTest(suite, pt, js)
    }
  }

  return new Promise((resolve, reject) => {
    mocha.run(resolve)
  })
})().catch(console.error)
