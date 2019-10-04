import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import { expect } from 'chai'
import { loadStateFile } from '../loadStateFile'

const testCli = require('inquirer-test')
const { DOWN, ENTER } = testCli
process.env.DATA_APP_CONFIGURATIONPATH = path.resolve(__dirname, '../../.testState/')
const testStatePath = process.env.DATA_APP_CONFIGURATIONPATH

describe('Interactions', () => {
  describe('User', () => {
    describe('List users', () => {
      it('Should list if there are users', () => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, 'Test', ENTER, 't@l.com', ENTER, '09123', ENTER, ENTER]
        return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
            expect(/User Test was added with id .{32}/gm.test(result)).to.equal(true)
            expect(loadStateFile(testStatePath + '/state.json').users.length).to.be.greaterThan(0)
            expect(/These are the currently registered users/gm.test(result)).to.equal(true)
          })
      })

      it('Should not list if there are no users', () => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, ENTER]
        return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(false)
            expect(/There are no registered users, please register a new user/gm.test(result)).to.equal(true)
          })
      })
    })
  })
})
