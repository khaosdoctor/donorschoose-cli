#!/usr/bin/env node
const menu = require('inquirer-menu') // No types provided :(
const metadata = require('../../../package.json')

import 'reflect-metadata'
import cli from 'caporal'
import chalk from 'chalk'
import { container } from 'tsyringe'
import { config } from '../../app.config'
import services from '../../services'
import interactions from './interactions'
import { Logger } from '../../utils/logger'

export function start () {
  container.register('AppConfig', { useValue: config })
  const logger = new Logger(chalk)

  cli.version(metadata.version)
  cli
    .action(() => {
      menu({
        message: chalk.yellow('Donors Choose command line interface:'),
        choices: {
          'Proposals': {
            message: chalk.cyan('Projects Menu: This is where you can query Donors Choose projects'),
            choices: {
              'List Proposals': () => interactions.proposals.listProposals(services.donorsChooseService, services.userService, services.googleService, logger)
            }
          },
          'User Settings': {
            message: chalk.cyan('Users menu: This is where you can edit, add and remove users'),
            choices: {
              'List Users': () => interactions.user.listUsers(services.userService, logger),
              'View Active User': () => interactions.user.listActive(services.userService, logger),
              'Select User': () => interactions.user.chooseUser(services.userService, logger),
              'Add User': () => interactions.user.addUser(services.userService, logger),
              'Remove User': () => interactions.user.removeUser(services.userService, logger),
              'Edit User': () => interactions.user.editUser(services.userService, logger)
            }
          },
          'General Settings': {
            message: chalk.cyan('Settings menu: This is where you can edit general settings'),
            choices: {
              'List all client config': () => interactions.config.listConfig(services.googleService, services.donorsChooseService, logger),
              'Change Donors Choose API key': () => interactions.config.changeDonorsKey(services.donorsChooseService, logger),
              'Change Donors Choose base URL': () => interactions.config.changeDonorsBaseURL(services.donorsChooseService, logger),
              'Change Google API key': () => interactions.config.changePlacesKey(services.googleService, logger),
              'Change Google base URL': () => interactions.config.changePlacesBaseURL(services.googleService, logger)
            }
          },
          'Exit': () => {
            return process.exit(0)
          }
        }
      })
        .then(() => console.log('Bye!'))
        .catch((err: Error) => console.error(chalk.red(`There was an error in the interface: ${err.message}`)))
    })

  cli.parse(process.argv)
}
