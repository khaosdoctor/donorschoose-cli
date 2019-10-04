import fs from 'fs'
import path from 'path'
import nock from 'nock'
import rimraf from 'rimraf'
import { expect } from 'chai'
import { loadStateFile } from '../loadStateFile'
import { singleProposal } from './fixtures/proposal'
import { geocodingResult } from './fixtures/geocoding'

const testCli = require('inquirer-test')
const { DOWN, ENTER, UP } = testCli
process.env.DATA_DONORSCHOOSE_APIKEY = 'test_donors_key'
process.env.DATA_DONORSCHOOSE_BASEAPIURI = 'http://donorschoose.mock'
process.env.DATA_GOOGLE_APIKEY = 'test_google_key'
process.env.DATA_GOOGLE_BASEAPIURI = 'http://geocoding.mock'

process.env.DATA_APP_CONFIGURATIONPATH = path.resolve(__dirname, '../../.testState/')
const testStatePath = process.env.DATA_APP_CONFIGURATIONPATH

async function createUser () {
  const executionSteps = [DOWN, ENTER, DOWN, DOWN, DOWN, ENTER, 'Test', ENTER, 't@l.com', ENTER, '09123', ENTER, UP, ENTER, UP, ENTER]
  return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
}

async function chooseUser () {
  const executionSteps = [DOWN, ENTER, DOWN, DOWN, ENTER, ENTER, UP, ENTER, UP, ENTER]
  return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
}

describe('Interactions', () => {
  describe('Proposal', () => {
    describe('By Keyword', () => {
      it('Should prompt for an user when there are no users registered', () => {
        rimraf.sync(testStatePath)
        const executionSteps = [ENTER, DOWN, ENTER, 'Test', ENTER, 't@l.com', ENTER, '09123', ENTER, ENTER]
        return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
          .then((result: string) => {
            expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
            expect(loadStateFile(testStatePath + '/state.json').users[0].name).to.equal('Test')
            expect(/There are no users registered, let us register one.../gm.test(result)).to.equal(true)
            expect(/You must set an active user in order to fetch data from the API/gm.test(result)).to.equal(true)
            expect(/User with ID .{32} is now the active user/gm.test(result)).to.equal(true)
          })
      })

      // it('Should list proposals by keyword', () => {
      //   rimraf.sync(testStatePath)
      //   const executionSteps = [ENTER, DOWN, DOWN, ENTER, 'keyword']

      //   const donorsInterceptor = nock(process.env.DATA_DONORSCHOOSE_BASEAPIURI!)
      //     .get('/json_feed.html')
      //     .query({ keywords: `"keyword"`, APIKey: 'test_donors_key' })
      //     .reply(200, singleProposal)

      //   const googleInterceptor = nock(process.env.DATA_GOOGLE_BASEAPIURI!)
      //     .get('/json')
      //     .reply(200, geocodingResult)

      //   return createUser()
      //     .then(chooseUser)
      //     .then(() => {
      //       return testCli([path.resolve(__dirname, '../../../dist/index.js')], executionSteps)
      //         .then((result: string) => {
      //           expect(fs.existsSync(path.join(testStatePath, 'state.json'))).to.equal(true)
      //           expect(loadStateFile(testStatePath + '/state.json').users[0].name).to.equal('Test')
      //           console.log(result)
      //           expect(donorsInterceptor.isDone()).to.equal(true)
      //           expect(googleInterceptor.isDone()).to.equal(true)
      //         })
      //     })
      // })
    })
  })
})
