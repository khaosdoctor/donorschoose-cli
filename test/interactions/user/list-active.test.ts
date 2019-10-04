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
    describe('View active users', () => {
      it('Should list if there are active users', (done: any) => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, 'Test', ENTER, 't@l.com', ENTER, '09123', ENTER, DOWN, DOWN, ENTER, ENTER, DOWN, ENTER, UP, ENTER, UP, ENTER]
        testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
            expect(loadStateFile(testStatePath + '/state.json').users.length).to.be.greaterThan(0)
            expect(loadStateFile(testStatePath + '/state.json').selectedUser).to.not.be.equal(null)
            expect(/Currently active user is:/gm.test(result)).to.equal(true)
            done()
          })
      })

      it('Should not list if there are no users', (done: any) => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, DOWN, ENTER]
        testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(false)
            expect(/There are no active users, please select an user in order to list projects/gm.test(result)).to.equal(true)
            done()
          })
      })
    })
  })
})
