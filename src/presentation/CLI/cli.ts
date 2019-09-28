#!/usr/bin/env node
const menu = require('inquirer-menu') // No types provided :(
const metadata = require('../../../package.json')
import 'reflect-metadata'

import cli from 'caporal'
import chalk from 'chalk'
import { container } from 'tsyringe'
import { config } from '../../app.config'
import { State } from '../../data/repositories/State'

export function start () {
  container.register('AppConfig', { useValue: config })
  const state = container.resolve(State)

  cli.version(metadata.version)
  cli
    .action((args, options) => {
      menu({
        message: 'Donors Choose command line interface',
        choices: {
          'Projects': {

          },
          'User Settings': {

          },
          'General Settings': {

          },
          'Exit': () => {
            return
          }
        }
      })
        .then(() => console.log('Bye!'))
        .catch((err: Error) => console.error(chalk.red(`There was an error in the client: ${err.message}`)))
    })

  cli.parse(process.argv)
}
