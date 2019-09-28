#!/usr/bin/env node
import 'reflect-metadata'
import cli from 'caporal'
import { State } from '../../data/repositories/State'
import { container } from 'tsyringe'
import { config } from '../../app.config'

const metadata = require('../../../package.json')

export function start () {
  container.register('AppConfig', { useValue: config })
  const state = container.resolve(State)

  cli.version(metadata.version)
  cli
    .command('init', 'Start a fresh new installation of your project')
    .action((args, options, logger) => {
      console.log(args, options, logger, state)
    })

  cli.parse(process.argv)
}
