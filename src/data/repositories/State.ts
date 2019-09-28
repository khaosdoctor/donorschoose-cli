import fs from 'fs'
import path from 'path'
import { AppConfig } from '../../app.config'
import { User, CreateUserData } from '../../domain/User'
import { inject, injectable } from 'tsyringe'

export interface StateFile {
  selectedUser: number | null
  users: User[]
  donorsChooseApiKey: string
  placesApiKey: string
}

@injectable()
export class State {
  selectedUser: number | null = null
  users: User[] = []
  donorsChooseApiKey: string = ''
  placesApiKey: string = ''
  private readonly configurationPath = path.resolve(`${__dirname}/../../../.donorsChoose/`)
  private readonly configurationFile = 'state.json'

  constructor (@inject('AppConfig') config: AppConfig) {
    this.donorsChooseApiKey = config.data.donorsChoose.apiKey
    this.placesApiKey = config.data.googlePlaces.apiKey
    this.load() // Replaces data if state file already exists
  }

  async save () {
    const stateObject = {
      selectedUser: this.selectedUser,
      donorsChooseApiKey: this.donorsChooseApiKey,
      placesApiKey: this.placesApiKey,
      users: this.users.map(user => user.serialize())
    }
    if (!fs.existsSync(this.configurationPath)) fs.mkdirSync(this.configurationPath, { recursive: true })
    await fs.promises.writeFile(this.configFile, JSON.stringify(stateObject))
    return this
  }

  load () {
    if (!fs.existsSync(this.configFile)) return

    const data: StateFile = require(this.configFile)
    this.donorsChooseApiKey = data.donorsChooseApiKey
    this.placesApiKey = data.placesApiKey
    this.selectedUser = data.selectedUser
    this.users = data.users.map((user: CreateUserData) => new User(user))
  }

  get configFile () {
    return path.join(this.configurationPath, this.configurationFile)
  }
}
