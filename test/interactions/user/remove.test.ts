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
    describe('Remove user', () => {
      it('Should remove the added user users', (done: any) => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, 'Test', ENTER, 't@l.com', ENTER, '09123', ENTER, UP, UP, UP, ENTER, ENTER, UP, ENTER, UP, ENTER]
        testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
            expect(loadStateFile(testStatePath + '/state.json').users.length).to.be.equal(0)
            expect(/User .{32} was removed/gm.test(result)).to.equal(true)
            done()
          })
      })

      it('Should not list if there are no users', (done: any) => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, UP, UP, UP, ENTER]
        testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(false)
            expect(/There are no registered users, please register an user in order to delete it/gm.test(result)).to.equal(true)
            done()
          })
      })
    })
  })
})
