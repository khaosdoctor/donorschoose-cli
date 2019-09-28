#!/usr/bin/env node

import { start } from './presentation/CLI/cli'
import { State } from './data/repositories/State'
import { config } from './app.config'

const state = new State(config)
start(state)
