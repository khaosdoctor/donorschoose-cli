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

export function start () {
  container.register('AppConfig', { useValue: config })

  cli.version(metadata.version)
  cli
    .action(() => {
      menu({
        message: chalk.yellow('Donors Choose command line interface:'),
        choices: {
          'Projects': {
            message: chalk.cyan('Projects Menu: This is where you can query Donors Choose projects'),
            choices: {
              'List Projects': () => interactions.projects.listProjects(services.donorsChooseService)
            }
          },
          'User Settings': {
            message: chalk.cyan('Users menu: This is where you can edit, add and remove users'),
            choices: {
              'List Users': () => interactions.user.listUsers(services.userService),
              'Add User': () => interactions.user.addUser(services.userService),
              'Remove User': () => interactions.user.removeUser(services.userService),
              'Edit User': () => interactions.user.editUser(services.userService),
              'Select User': () => interactions.user.chooseUser(services.userService)
            }
          },
          'General Settings': {
            message: chalk.cyan('Settings menu: This is where you can edit general settings'),
            choices: {
              'Change Donors Choose API key': () => interactions.config.changeDonorsKey(services.donorsChooseService),
              'Change Donors Choose base URL': () => interactions.config.changeDonorsBaseURL(services.donorsChooseService),
              'Change Google Places API key': () => interactions.config.changePlacesKey(services.placesService),
              'Change Google Places base URL': () => interactions.config.changePlacesBaseURL(services.placesService)
            }
          },
          'Exit': () => {
            return process.exit(0)
          }
        }
      })
        .then(() => console.log('Bye!'))
        .catch((err: Error) => console.error(chalk.red(`There was an error in the client: ${err.message}`)))
    })

  cli.parse(process.argv)
}
