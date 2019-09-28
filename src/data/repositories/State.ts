import fs from 'fs'
import path from 'path'
import { AppConfig } from '../../app.config'
import { User, CreateUserData } from '../../domain/User'
import { inject, injectable } from 'tsyringe'

export interface StateFile {
  selectedUser: User | null
  users: User[]
  donorsChoose: {
    apiKey: string
    baseApiUri: string
  }
  googlePlaces: {
    apiKey: string
    baseApiUri: string
  }
}

@injectable()
export class State {
  selectedUser: User | null = null
  users: User[] = []
  donorsChoose: StateFile['donorsChoose'] = {
    apiKey: '',
    baseApiUri: ''
  }
  googlePlaces: StateFile['googlePlaces'] = {
    apiKey: '',
    baseApiUri: ''
  }
  private readonly configurationPath = path.resolve(`${__dirname}/../../../.donorsChoose/`)
  private readonly configurationFile = 'state.json'

  constructor (@inject('AppConfig') config: AppConfig) {
    this.donorsChoose = config.data.donorsChoose
    this.googlePlaces = config.data.googlePlaces
    this.load() // Replaces data if state file already exists
  }

  async save () {
    const stateObject = {
      selectedUser: this.selectedUser ? this.selectedUser.serialize() : null,
      donorsChoose: this.donorsChoose,
      googlePlaces: this.googlePlaces,
      users: this.users.map(user => user.serialize())
    }
    if (!fs.existsSync(this.configurationPath)) fs.mkdirSync(this.configurationPath, { recursive: true })
    await fs.promises.writeFile(this.configFile, JSON.stringify(stateObject))
    return this
  }

  load () {
    if (!fs.existsSync(this.configFile)) return

    const data: StateFile = require(this.configFile)
    this.donorsChoose = data.donorsChoose
    this.googlePlaces = data.googlePlaces
    this.selectedUser = data.selectedUser ? new User(data.selectedUser) : null
    this.users = data.users.map((user: CreateUserData) => new User(user))
  }

  get configFile () {
    return path.join(this.configurationPath, this.configurationFile)
  }
}
