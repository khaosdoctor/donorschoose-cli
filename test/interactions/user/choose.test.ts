import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import { expect } from 'chai'
import { loadStateFile } from '../loadStateFile'

const testCli = require('inquirer-test')
const { UP, DOWN, ENTER } = testCli
process.env.DATA_APP_CONFIGURATIONPATH = path.resolve(__dirname, '../../.testState/')
const testStatePath = process.env.DATA_APP_CONFIGURATIONPATH

describe('Interactions', () => {
  describe('User', () => {
    describe('Select user', () => {
      it('Should list if there are active users', () => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, 'Test', ENTER, 't@l.com', ENTER, '09123', ENTER, DOWN, DOWN, ENTER, ENTER, UP, ENTER, UP, ENTER]
        return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
            expect(loadStateFile(testStatePath + '/state.json').users.length).to.be.greaterThan(0)
            expect(loadStateFile(testStatePath + '/state.json').selectedUser).to.not.be.equal(null)
            expect(/User with ID .{32} is now the active user/gm.test(result)).to.equal(true)
          })
      })

      it('Should not list if there are no users', () => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, DOWN, DOWN, ENTER]
        return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(false)
            expect(/There are no users registered, please register a new user before selecting/gm.test(result)).to.equal(true)
          })
      })
    })
  })
})
