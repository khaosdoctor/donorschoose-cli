import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import { expect } from 'chai'
import { loadStateFile } from '../loadStateFile'

const testCli = require('inquirer-test')
const { DOWN, ENTER, UP } = testCli
process.env.DATA_APP_CONFIGURATIONPATH = path.resolve(__dirname, '../../.testState/')
const testStatePath = process.env.DATA_APP_CONFIGURATIONPATH

describe('Interactions', () => {
  describe('User', () => {
    describe('Add user', () => {
      it('Should add an user', () => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, 'Test', ENTER, 't@l.com', ENTER, '09123', ENTER, UP, ENTER, UP, ENTER]
        return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
            expect(/User Test was added with id .{32}/gm.test(result)).to.equal(true)
            expect(loadStateFile(testStatePath + '/state.json').users[0].name).to.equal('Test')
          })
      })

      it('Should not allow invalid e-mails', () => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, 'Test', ENTER, 't@', ENTER]
        return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(false)
            expect(/Invalid Email/gm.test(result)).to.equal(true)
          })
      })

      it('Should not allow invalid zipcodes', () => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, 'Test', ENTER, 't@t.com', ENTER, '000', ENTER]
        return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(false)
            expect(/Invalid zipcode/gm.test(result)).to.equal(true)
          })
      })
    })
  })
})
