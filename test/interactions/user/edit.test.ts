import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import { expect } from 'chai'
import { loadStateFile } from '../loadStateFile'

const testCli = require('inquirer-test')
const { DOWN, ENTER, UP } = testCli
process.env.DATA_APP_CONFIGURATIONPATH = path.resolve(__dirname, '../../.testState/')
const testStatePath = process.env.DATA_APP_CONFIGURATIONPATH

async function createUser () {
  const executionSteps = [DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, 'Test', ENTER, 't@l.com', ENTER, '09123', ENTER, UP, ENTER, UP, ENTER]
  return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
}

describe('Interactions', () => {
  describe('User', () => {
    describe('Edit user', () => {
      it('Should edit an user', () => {
        rimraf.sync(testStatePath)
        return createUser().then(() => {
          const executionSteps = [DOWN, ENTER, UP, UP, ENTER, ENTER, 'Test2', ENTER, 'l@l.com', ENTER, '09111', ENTER, UP, ENTER, UP, ENTER]
          return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
            .then((result: string) => {
              expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
              expect(/\? Please select an user to edit: .*/gm.test(result)).to.equal(true)
              expect(loadStateFile(testStatePath + '/state.json').users[0].name).to.equal('Test2')
            })
        })
      })

      it('Should not list if there are no users', () => {
        rimraf.sync(testStatePath)
        const executionSteps = [DOWN, ENTER, UP, UP, ENTER]
        return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(false)
            expect(/There are no registered users, please register an user in order to edit it/gm.test(result)).to.equal(true)
          })
      })

      it('Should not allow invalid e-mails', () => {
        rimraf.sync(testStatePath)
        return createUser().then(() => {
          const executionSteps = [DOWN, ENTER, UP, UP, ENTER, ENTER, 'Test2', ENTER, 'l', ENTER]
          return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
            .then((result: string) => {
              expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
              expect(/Invalid Email/gm.test(result)).to.equal(true)
              expect(loadStateFile(testStatePath + '/state.json').users[0].name).to.not.equal('Test2')
            })
        })
      })

      it('Should not allow invalid zipcodes', () => {
        rimraf.sync(testStatePath)
        return createUser().then(() => {
          const executionSteps = [DOWN, ENTER, UP, UP, ENTER, ENTER, 'Test2', ENTER, 'l@l.com', ENTER, '000', ENTER]
          return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
            .then((result: string) => {
              expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
              expect(loadStateFile(testStatePath + '/state.json').users[0].name).to.not.equal('Test2')
              expect(/Invalid zipcode/gm.test(result)).to.equal(true)
            })
        })
      })
    })
  })
})
