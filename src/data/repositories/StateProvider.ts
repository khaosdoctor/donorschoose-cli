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
  google: {
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
  google: StateFile['google'] = {
    apiKey: '',
    baseApiUri: ''
  }
  private readonly configurationPath = path.resolve(`${__dirname}/../../../.donorsChoose/`)
  private readonly configurationFile = 'state.json'

  constructor (@inject('AppConfig') config: AppConfig) {
    this.donorsChoose = config.data.donorsChoose
    this.google = config.data.google
    this.load() // Replaces data if state file already exists
  }

  async save () {
    const stateObject = {
      selectedUser: this.selectedUser ? this.selectedUser.serialize() : null,
      donorsChoose: this.donorsChoose,
      googlePlaces: this.google,
      users: this.users.map(user => user.serialize())
    }
    if (!fs.existsSync(this.configurationPath)) fs.mkdirSync(this.configurationPath, { recursive: true })
    await fs.promises.writeFile(this.configFile, JSON.stringify(stateObject))
    return this
  }

  load () {
    if (!fs.existsSync(this.configFile)) return

    // Cannot use require since JS Modules have internal cache which would not reflect the latest modifications
    const data: StateFile = JSON.parse(fs.readFileSync(this.configFile).toString())
    this.donorsChoose = data.donorsChoose
    this.google = data.google
    this.selectedUser = data.selectedUser ? new User(data.selectedUser) : null
    this.users = data.users.map((user: CreateUserData) => new User(user))
  }

  get configFile () {
    return path.join(this.configurationPath, this.configurationFile)
  }
}
